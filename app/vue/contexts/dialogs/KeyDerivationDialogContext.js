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
  WALLETS_CONFIG_HASH,
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
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.walletStore = walletStore
    this.accountStore = accountStore
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
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        walletStore,
        accountStore,
      })
    )
  }

  /**
   * Attempt to sign a typed message with wagmi.
   *
   * @returns {Promise<void>}
   */
  async deriveKeys () {
    const networkMatchingResult = await this.matchNetwork()

    if (!networkMatchingResult) {
      return
    }

    const typedMessage = this.generateTypedMessage({
      selectedDydxChainId: this.accountStore.selectedDydxChainIdComputed.value,
    })

    const firstSignature = await signWagmiTypedMessage(wagmiConfig, {
      ...typedMessage,
      domain: {
        ...typedMessage.domain,
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      },
    })

    const {
      wallet,
    } = await this.extractWalletFromSignature({
      signature: firstSignature,
    })

    const secondSignature = await signWagmiTypedMessage(wagmiConfig, {
      ...typedMessage,
      domain: {
        ...typedMessage.domain,
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      },
    })

    if (firstSignature !== secondSignature) {
      throw new Error('Your wallet does not support deterministic signing. Please switch to a different wallet provider.')
    }

    await this.setLocalAccount({
      wallet,
    })

    await this.generateWalletCredential({
      wallet,
    })

    this.dismissDialog()
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
   * @returns {Promise<boolean>} `true` if the network is matched, `false` otherwise.
   */
  async matchNetwork () {
    try {
      await switchChain(wagmiConfig, {
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      })

      return true
    } catch (error) {
      return false
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
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
