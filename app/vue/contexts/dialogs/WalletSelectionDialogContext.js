import {
  toBase64,
} from '@cosmjs/encoding'

import KeplrConnector from '~/app/wallets/KeplrConnector'
import WagmiConnector from '~/app/wallets/WagmiConnector'
import PhantomConnector from '~/app/wallets/PhantomConnector'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
  MIPD_RDNS_HASH,
  ONBOARDING_STATUS,
  WALLETS,
  CONNECTOR_TYPE,
  KEPLR_DOWNLOAD_LINK,
  SIGNATURE_TYPE,
} from '~/app/constants'

/**
 * WalletSelectionDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class WalletSelectionDialogContext extends AppDialogContext {
  /**
   * Constructor
   *
   * @param {WalletSelectionDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    dialogComponentRef,
    errorMessageRef,
    walletStore,
    accountStore,
    mipdStore,
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.errorMessageRef = errorMessageRef
    this.walletStore = walletStore
    this.accountStore = accountStore
    this.mipdStore = mipdStore
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof WalletSelectionDialogContext ? X : never} T, X
   * @override
   * @param {WalletSelectionDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentRef,
    errorMessageRef,
    walletStore,
    accountStore,
    mipdStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        errorMessageRef,
        walletStore,
        accountStore,
        mipdStore,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      ...super.EMIT_EVENT_NAME,

      NEXT_STEP: 'nextStep',
    }
  }

  /**
   * get: errorMessage
   *
   * @returns {string | null} Value of `errorMessageRef`
   */
  get errorMessage () {
    return this.errorMessageRef.value
  }

  /**
   * Generate displayed wallets.
   *
   * @returns {Array<WalletDetails>} Displayed wallets.
   */
  generateDisplayedWallets () {
    const injectedWallets = this.generateInjectedWallets()
    const phantomWallet = this.generatePhantomWallet()
    const coinbaseWallet = this.generateCoinbaseWallet()
    const keplrWallet = this.generateKeplrWallet()

    return [
      ...injectedWallets,
      keplrWallet,
      phantomWallet,
      coinbaseWallet,
    ]
  }

  /**
   * Generate MIPD (Multi Injected Provider Discovery) wallets.
   *
   * @returns {Array<WalletDetails>}
   */
  generateInjectedWallets () {
    const wagmiConnector = this.createWagmiConnector()
    const providers = this.mipdStore.getProviders()
    const injectedWallets = providers.map(providerDetails => ({
      connector: wagmiConnector.generateConnectorFromProvider({
        providerDetails,
      }),
      details: providerDetails,
    }))

    const normalizedInjectedWallets = injectedWallets
      .filter(wallet =>
        // Remove Metamask. We will always show it at the first spot if it exists
        wallet.details.info.rdns !== MIPD_RDNS_HASH.METAMASK
        // Remove Phantom EVM support
        && wallet.details.info.rdns !== MIPD_RDNS_HASH.PHANTOM
        // Remove Keplr EVM support since Keplr Cosmos is supported
        && wallet.details.info.rdns !== MIPD_RDNS_HASH.KEPLR
        // Remove Coinbase injected support because the regular Coinbase connector already supports
        // handling switching between injected/mobile/smart account
        && wallet.details.info.rdns !== MIPD_RDNS_HASH.COINBASE
      )
      .map(wallet => this.normalizeInjectedWallet({
        wallet,
      }))
    const metamaskInjectedWallet = this.normalizeInjectedWallet({
      wallet: injectedWallets.find(wallet => wallet.details.info.rdns === MIPD_RDNS_HASH.METAMASK) ?? null,
    })

    return [
      metamaskInjectedWallet,
      ...normalizedInjectedWallets,
    ]
      .filter(it => it !== null)
  }

  /**
   * Generate Keplr wallet.
   *
   * @returns {WalletDetails}
   */
  generateKeplrWallet () {
    const keplrConnector = this.createKeplrConnector()

    const connectorType = keplrConnector.hasKeplrWallet()
      ? CONNECTOR_TYPE.COSMOS
      : CONNECTOR_TYPE.DOWNLOAD_WALLET
    const downloadLink = keplrConnector.hasKeplrWallet()
      ? null
      : KEPLR_DOWNLOAD_LINK

    return {
      connectorType,
      icon: '/img/wallets/keplr.svg',
      name: 'Keplr',
      rdns: MIPD_RDNS_HASH.KEPLR,
      downloadLink,
    }
  }

  /**
   * Generate Phantom Solana wallet.
   *
   * @returns {WalletDetails}
   */
  generatePhantomWallet () {
    const phantomConnector = this.createPhantomConnector()

    const downloadLink = phantomConnector.hasPhantomWallet()
      ? null
      : 'https://phantom.app/download'
    const connectorType = phantomConnector.hasPhantomWallet()
      ? CONNECTOR_TYPE.PHANTOM_SOLANA
      : CONNECTOR_TYPE.DOWNLOAD_WALLET

    return {
      connectorType,
      icon: '/img/wallets/phantom.svg',
      name: 'Phantom',
      rdns: MIPD_RDNS_HASH.PHANTOM,
      downloadLink,
    }
  }

  /**
   * Generate Coinbase wallet.
   *
   * @returns {WalletDetails}
   */
  generateCoinbaseWallet () {
    return {
      connectorType: CONNECTOR_TYPE.COINBASE,
      icon: '/img/wallets/coinbase-wallet.svg',
      name: 'Coinbase',
      rdns: MIPD_RDNS_HASH.COINBASE,
    }
  }

  /**
   * Normalize injected wallet.
   *
   * @param {{
   *   wallet: MipdInjectedWallet | null
   * }} params - Parameters.
   * @returns {WalletDetails | null}
   */
  normalizeInjectedWallet ({
    wallet,
  }) {
    if (!wallet) {
      return null
    }

    return {
      connectorType: CONNECTOR_TYPE.INJECTED,
      icon: wallet.details.info.icon,
      name: wallet.details.info.name,
      rdns: wallet.details.info.rdns,
    }
  }

  /**
   * Select wallet.
   *
   * @param {{
   *   wallet: WalletDetails
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async selectWallet ({
    wallet,
  }) {
    try {
      if (this.errorMessage) {
        this.errorMessageRef.value = null
      }

      if (
        wallet.connectorType === CONNECTOR_TYPE.DOWNLOAD_WALLET
        && wallet.downloadLink
      ) {
        window.open(wallet.downloadLink, '_blank')

        return
      }

      await this.connectWallet({
        wallet,
      })

      this.walletStore.setWalletDetail({
        walletDetail: wallet,
      })

      this.accountStore.setOnboardingStatus({
        onboardingStatus: ONBOARDING_STATUS.WALLET_CONNECTED,
      })

      if (wallet.connectorType === CONNECTOR_TYPE.COSMOS) {
        // Cosmos wallets do not need another additional derivation step.
        this.dismissDialog()

        return
      }

      this.emit(this.EMIT_EVENT_NAME.NEXT_STEP)
    } catch (error) {
      this.errorMessageRef.value = this.resolveErrorMessage({
        error,
      })
    }
  }

  /**
   * Connect wallet.
   *
   * @param {{
   *   wallet: WalletDetails
   * }} params - Parameters.
   * @returns {Promise<void>}
   * @throws {Error} Will throw if connector type is invalid.
   */
  async connectWallet ({
    wallet,
  }) {
    if (this.isWagmiConnectorType({
      wallet,
    })) {
      const wagmiConnector = this.createWagmiConnector()

      await wagmiConnector.connectToEvmNetwork({
        wallet,
      })

      return
    }

    if (wallet.connectorType === CONNECTOR_TYPE.PHANTOM_SOLANA) {
      const phantomConnector = this.createPhantomConnector()

      await phantomConnector.connectPhantom()

      return
    }

    if (this.isKeplrConnector({
      wallet,
    })) {
      await this.connectKeplrWallet()

      return
    }

    throw new Error('Unknown Connector.')
  }

  /**
   * Connect Keplr wallet.
   *
   * @returns {Promise<void>}
   * @throws {Error} Will throw if connection fails.
   */
  async connectKeplrWallet () {
    const keplrConnector = this.createKeplrConnector()

    await keplrConnector.disconnect()
    await keplrConnector.connect()

    if (keplrConnector.address === null) {
      throw new Error('Failed to connect to Keplr wallet.')
    }

    const signResult = await keplrConnector.signArbitrary()

    if (!signResult) {
      throw new Error('Unable to verify wallet eligibility. Please ensure you sign the verification message to continue.')
    }

    const {
      signDoc,
      signature,
    } = signResult

    this.saveCosmosWalletDetails({
      address: keplrConnector.address,
      chain: keplrConnector.chainId,
      signDoc,
      signature,
    })
  }

  /**
   * Save wallet details for wallets from the Cosmos chain.
   *
   * @param {import('~/app/wallets/BaseCosmosConnector').ArbitrarySigningResult & {
   *   address: string
   *   chain: string
   * }} params - Parameters.
   * @returns {void}
   */
  saveCosmosWalletDetails ({
    address,
    chain,
    signDoc,
    signature,
  }) {
    this.walletStore.setSourceAddress({
      address,
      chain,
    })

    this.walletStore.setLocalWallet({
      address,
    })

    this.walletStore.setCredential({
      credential: {
        signDoc: toBase64(signDoc),
        signature: signature.signature,
        publicKey: signature.pub_key.value,
        address,
        signatureType: SIGNATURE_TYPE.COSMOS,
      },
    })
  }

  /**
   * get: supportedWallets
   *
   * @returns {typeof WALLETS} Supported wallets.
   */
  get supportedWallets () {
    // TODO: If wallet extensions are not installed, return their download link.
    return WALLETS
  }

  /**
   * Create WagmiConnector instance.
   *
   * @returns {WagmiConnector}
   */
  createWagmiConnector () {
    return WagmiConnector.create({
      mipdStore: this.mipdStore,
      walletStore: this.walletStore,
    })
  }

  /**
   * Create PhantomConnector instance.
   *
   * @returns {PhantomConnector}
   */
  createPhantomConnector () {
    return PhantomConnector.create({
      walletStore: this.walletStore,
    })
  }

  /**
   * Create KeplrConnector instance.
   *
   * @returns {KeplrConnector}
   */
  createKeplrConnector () {
    return KeplrConnector.create()
  }

  /**
   * Check if is Wagmi connector type.
   *
   * @param {{
   *   wallet: WalletDetails
   * }} params - Parameters.
   * @returns {boolean}
   */
  isWagmiConnectorType ({
    wallet,
  }) {
    return [
      CONNECTOR_TYPE.INJECTED,
      CONNECTOR_TYPE.COINBASE,
      CONNECTOR_TYPE.WALLET_CONNECT,
    ]
      .includes(wallet.connectorType)
  }

  /**
   * Check if is Keplr connector.
   *
   * @param {{
   *   wallet: WalletDetails
   * }} params - Parameters.
   * @returns {boolean}
   */
  isKeplrConnector ({
    wallet,
  }) {
    return wallet.connectorType === CONNECTOR_TYPE.COSMOS
      && wallet.rdns === MIPD_RDNS_HASH.KEPLR
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>
 *   errorMessageRef: import('vue').Ref<string | null>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 *   mipdStore: ReturnType<import('mipd').createStore>
 * }} WalletSelectionDialogContextParams
 */

/**
 * @typedef {WalletSelectionDialogContextParams} WalletSelectionDialogContextFactoryParams
 */

/**
 * @typedef {{
 *   connector: ReturnType<import('@wagmi/connectors').injected>
 *   details: import('mipd').EIP6963ProviderDetail
 * }} MipdInjectedWallet
 */

/**
 * @typedef {{
 *   connectorType: (typeof CONNECTOR_TYPE)[keyof typeof CONNECTOR_TYPE]
 *   name: string
 *   icon: string
 *   rdns: string
 *   downloadLink?: string | null
 * }} WalletDetails
 */
