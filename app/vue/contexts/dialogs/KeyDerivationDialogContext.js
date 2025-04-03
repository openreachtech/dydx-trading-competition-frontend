import {
  switchChain,
  signTypedData as signWagmiTypedMessage,
} from '@wagmi/core'
import wagmiConfig from '~/wagmi.config'

import {
  BECH32_PREFIX,
  onboarding,
} from '@dydxprotocol/v4-client-js'

import {
  DirectSecp256k1HdWallet,
  makeSignDoc,
  makeAuthInfoBytes,
  makeSignBytes,
} from '@cosmjs/proto-signing'
import {
  fromHex,
  toBase64,
  fromBase64,
} from '@cosmjs/encoding'

import {
  Buffer,
} from 'node:buffer'

import stableStringify from 'fast-json-stable-stringify'

import {
  WALLETS_CONFIG_HASH,
  CONNECTOR_TYPE,
  DERIVATION_STATUS_HASH,
} from '~/app/constants'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

/**
 * KeyDerivationDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class KeyDerivationDialogContext extends AppDialogContext {
  /**
   * Constructor
   *
   * @param {KeyDerivationDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    dialogComponentRef,
    walletStore,
    accountStore,
    errorMessageRef,
    derivationStatusRef,
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.walletStore = walletStore
    this.accountStore = accountStore
    this.errorMessageRef = errorMessageRef
    this.derivationStatusRef = derivationStatusRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof KeyDerivationDialogContext ? X : never} T, X
   * @override
   * @param {KeyDerivationDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentRef,
    walletStore,
    accountStore,
    errorMessageRef,
    derivationStatusRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        walletStore,
        accountStore,
        errorMessageRef,
        derivationStatusRef,
      })
    )
  }

  /**
   * get: defaultWalletImageUrl
   *
   * @returns {string}
   */
  static get defaultWalletImageUrl () {
    return '/img/wallets/generic-wallet.svg'
  }

  /**
   * get: errorMessage
   *
   * @returns {string | null} Value of `errorMessageRef`.
   */
  get errorMessage () {
    return this.errorMessageRef.value
  }

  /**
   * get: derivationStatus
   *
   * @returns {(typeof DERIVATION_STATUS_HASH)[keyof typeof DERIVATION_STATUS_HASH]} Value of `derivationStatusRef`.
   */
  get derivationStatus () {
    return this.derivationStatusRef.value
  }

  /**
   * get: derivationLoaders
   *
   * @returns {Array<DerivationLoader>} Derivation loaders.
   */
  get derivationLoaders () {
    return [
      {
        corespondingStatus: DERIVATION_STATUS_HASH.DERIVING,
        caption: 'Generate your dYdX Chain wallet',
        description: 'Verify that you own this wallet.',
      },
      {
        corespondingStatus: DERIVATION_STATUS_HASH.ENSURING_DETERMINISM,
        caption: 'Verify wallet compatibility',
        description: 'Ensures your wallet is supported.',
      },
    ]
  }

  /**
   * Attempt to sign a typed message with wagmi.
   *
   * @returns {Promise<void>}
   */
  async deriveKeys () {
    try {
      this.derivationStatusRef.value = DERIVATION_STATUS_HASH.DERIVING
      if (this.errorMessage) {
        this.errorMessageRef.value = null
      }

      await this.matchNetwork()

      const firstSignature = await this.signMessage()

      const {
        wallet,
      } = await this.extractWalletFromSignature({
        signature: firstSignature,
      })

      this.derivationStatusRef.value = DERIVATION_STATUS_HASH.ENSURING_DETERMINISM

      const secondSignature = await this.signMessage()

      if (firstSignature !== secondSignature) {
        throw new Error('Your wallet does not support deterministic signing. Please switch to a different wallet provider.')
      }

      await this.setLocalAccount({
        wallet,
      })

      await this.generateWalletCredential({
        wallet,
      })

      this.derivationStatusRef.value = DERIVATION_STATUS_HASH.PENDING
      this.dismissDialog()
    } catch (error) {
      this.derivationStatusRef.value = DERIVATION_STATUS_HASH.PENDING
      this.errorMessageRef.value = this.resolveErrorMessage({
        error,
      })
    }
  }

  /**
   * Sign a message.
   *
   * @returns {Promise<`0x${string}`>} Signature
   * @throws {Error} If connector type was not found.
   */
  async signMessage () {
    const selectedConnectorType = this.walletStore.walletStoreRef.value.sourceAccount.walletDetail?.connectorType
    if (!selectedConnectorType) {
      throw new Error('Can not derive keys without a connected wallet')
    }

    const typedMessage = this.generateTypedMessage({
      selectedDydxChainId: this.accountStore.selectedDydxChainIdComputed.value,
    })

    if (selectedConnectorType === CONNECTOR_TYPE.PHANTOM_SOLANA) {
      const solanaSignature = await this.signSolanaMessage({
        typedMessage,
      })

      return solanaSignature
    }

    const signature = await signWagmiTypedMessage(wagmiConfig, {
      ...typedMessage,
      domain: {
        ...typedMessage.domain,
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      },
    })

    return signature
  }

  /**
   * Sign Solana message.
   *
   * @param {{
   *   typedMessage: TypedMessage
   * }} params - Parameters.
   * @returns {Promise<`0x${string}`>} Signature
   */
  async signSolanaMessage ({
    typedMessage,
  }) {
    const message = stableStringify(typedMessage)
    const encodedMessage = new TextEncoder()
      .encode(message)
    const signedMessage = await window.phantom.solana.signMessage(encodedMessage, 'utf8')
    // Left pad the signature with a 0 byte so that the signature is 65 bytes long, a solana signature is 64 bytes by default.
    const signature = /** @type {`0x${string}`} */ (
      Buffer.from([0, ...signedMessage.signature])
        .toString('hex')
    )

    return signature
  }

  /**
   * Extract wallet from signature.
   *
   * @param {{
   *   signature: string
   * }} params - Parameters.
   * @returns {Promise<ExtractedFromSignatureWallet>} Extracted wallet.
   */
  async extractWalletFromSignature ({
    signature,
  }) {
    const {
      mnemonic,
      privateKey,
      publicKey,
    } = onboarding.deriveHDKeyFromEthereumSignature(signature)

    return {
      wallet: await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: BECH32_PREFIX,
      }),
      mnemonic,
      privateKey,
      publicKey,
    }
  }

  /**
   * Generate verification signature.
   *
   * @param {{
   *   wallet: DirectSecp256k1HdWallet
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async generateWalletCredential ({
    wallet,
  }) {
    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: fromBase64('4444'),
    }
    /** @type {Array<import('cosmjs-types/cosmos/base/v1beta1/coin').Coin>} */
    const fee = []
    const gasLimit = 0
    const feeGranter = undefined
    const feePayer = undefined
    const chainId = ''
    const accountNumber = 1
    const bodyBytes = fromHex('4444')
    const authInfoBytes = makeAuthInfoBytes(
      [{
        pubkey,
        sequence: 1,
      }],
      fee,
      gasLimit,
      feeGranter,
      feePayer
    )

    const signDoc = makeSignDoc(
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    )

    const accounts = await wallet.getAccounts()
    const [firstAccount] = accounts
    const firstAccountAddress = firstAccount.address

    const signedResult = await wallet.signDirect(
      firstAccountAddress,
      signDoc
    )

    const signDocBytes = makeSignBytes(signDoc)
    const base64SignDocBytes = toBase64(signDocBytes)

    this.walletStore.setCredential({
      credential: {
        signDoc: base64SignDocBytes,
        signature: signedResult.signature.signature,
        publicKey: signedResult.signature.pub_key.value,
        address: firstAccountAddress,
      },
    })
  }

  /**
   * Set local account.
   *
   * @param {{
   *   wallet: ExtractedFromSignatureWallet['wallet']
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async setLocalAccount ({
    wallet,
  }) {
    const accounts = await wallet.getAccounts()
    const [firstAccount] = accounts
    const firstAccountAddress = firstAccount.address

    this.walletStore.setLocalWallet({
      address: firstAccountAddress,
    })
  }

  /**
   * Generate a typed message to sign for dYdX Chain.
   *
   * @param {{
   *   selectedDydxChainId: keyof typeof WALLETS_CONFIG_HASH
   * }} params - Parameters.
   * @returns {TypedMessage} A typed message for signing.
   */
  generateTypedMessage ({
    selectedDydxChainId,
  }) {
    return /** @type {const} */ ({
      primaryType: 'dYdX',
      domain: {
        name: WALLETS_CONFIG_HASH[selectedDydxChainId].signTypedDataDomainName,
      },
      types: {
        dYdX: [
          {
            name: 'action',
            type: 'string',
          },
        ],
      },
      message: {
        action: WALLETS_CONFIG_HASH[selectedDydxChainId].signTypedDataAction,
      },
    })
  }

  /**
   * Match network.
   *
   * @returns {Promise<void>}
   */
  async matchNetwork () {
    await switchChain(wagmiConfig, {
      chainId: this.accountStore.selectedEthereumChainIdComputed.value,
    })
  }

  /**
   * Generate wallet icon source.
   *
   * @returns {string}
   */
  generateWalletIconSource () {
    return this.walletStore.walletStoreRef.value
      .sourceAccount
      .walletDetail
      ?.icon
      ?? this.Ctor.defaultWalletImageUrl
  }

  /**
   * Resolve error message.
   *
   * @param {{
   *   error: unknown
   * }} params - Parameters.
   * @returns {string}
   */
  resolveErrorMessage ({
    error,
  }) {
    if (error instanceof Error) {
      return error.message
    }

    if (typeof error !== 'string') {
      return 'Unknown Error'
    }

    return 'error'
  }

  /**
   * Generate loader CSS classes.
   *
   * @param {{
   *   status: (typeof DERIVATION_STATUS_HASH)[keyof typeof DERIVATION_STATUS_HASH]
   * }} params - Parameters.
   * @returns {Record<string, boolean>} CSS classes
   */
  generateLoaderClasses ({
    status,
  }) {
    return {
      hidden: this.derivationStatus < status,
      done: this.derivationStatus > status,
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 *   errorMessageRef: import('vue').Ref<string | null>
 *   derivationStatusRef: import('vue').Ref<(typeof DERIVATION_STATUS_HASH)[keyof typeof DERIVATION_STATUS_HASH]>
 * }} KeyDerivationDialogContextParams
 */

/**
 * @typedef {KeyDerivationDialogContextParams} KeyDerivationDialogContextFactoryParams
 */

/**
 * @typedef {{
 *   primaryType: 'dYdX'
 *   domain: {
 *     name: string
 *   }
 *   types: {
 *     dYdX: Array<{
 *       name: string
 *       type: string
 *     }>
 *   }
 *   message: {
 *     action: string
 *   }
 * }} TypedMessage
 */

/**
 * @typedef {{
 *   wallet: DirectSecp256k1HdWallet
 *   mnemonic: string
 *   privateKey: Uint8Array<ArrayBufferLike> | null
 *   publicKey: Uint8Array<ArrayBufferLike> | null
 * }} ExtractedFromSignatureWallet
 */

/**
 * @typedef {{
 *   corespondingStatus: (typeof DERIVATION_STATUS_HASH)[keyof typeof DERIVATION_STATUS_HASH]
 *   caption: string
 *   description: string
 * }} DerivationLoader
 */
