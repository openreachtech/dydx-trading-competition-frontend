import WagmiConnector from '~/app/wallets/WagmiConnector'
import PhantomConnector from '~/app/wallets/PhantomConnector'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
  MIPD_RDNS_HASH,
  ONBOARDING_STATUS,
  WALLETS,
  CONNECTOR_TYPE,
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
    walletStore,
    accountStore,
    mipdStore,
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

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
    walletStore,
    accountStore,
    mipdStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
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
   * Generate displayed wallets.
   *
   * @returns {Array<WalletDetails>} Displayed wallets.
   */
  generateDisplayedWallets () {
    const injectedWallets = this.generateInjectedWallets()
    const phantomWallet = this.generatePhantomWallet()

    return [
      ...injectedWallets,
      phantomWallet,
    ]
  }

  /**
   * Generate MIPD (Multi Injected Provider Discovery) wallets.
   *
   * @returns {Array<WalletDetails>}
   */
  generateInjectedWallets () {
    const wagmiConnector = WagmiConnector.create({
      mipdStore: this.mipdStore,
      walletStore: this.walletStore,
    })
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
        // // Remove Coinbase injected support because the regular Coinbase connector already supports
        // // handling switching between injected/mobile/smart account
        // && wallet.details.info.rdns !== MIPD_RDNS_HASH.COINBASE
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
   * Generate Phantom Solana wallet.
   *
   * @returns {WalletDetails}
   */
  generatePhantomWallet () {
    const phantomConnector = PhantomConnector.create({
      walletStore: this.walletStore,
    })

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
    if (
      wallet.connectorType === CONNECTOR_TYPE.DOWNLOAD_WALLET
      && wallet.downloadLink
    ) {
      window.open(wallet.downloadLink, '_blank')

      return
    }

    this.walletStore.setWalletDetail({
      walletDetail: wallet,
    })

    await this.connectWallet({
      wallet,
    })

    this.accountStore.setOnboardingStatus({
      onboardingStatus: ONBOARDING_STATUS.WALLET_CONNECTED,
    })

    this.emit(this.EMIT_EVENT_NAME.NEXT_STEP)
  }

  /**
   * Connect wallet.
   *
   * @param {{
   *   wallet: WalletDetails
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async connectWallet ({
    wallet,
  }) {
    try {
      if (wallet.connectorType === CONNECTOR_TYPE.INJECTED) {
        const wagmiConnector = WagmiConnector.create({
          mipdStore: this.mipdStore,
          walletStore: this.walletStore,
        })

        await wagmiConnector.connectToEvmNetwork({
          wallet,
        })
      }

      if (wallet.connectorType === CONNECTOR_TYPE.PHANTOM_SOLANA) {
        const phantomConnector = PhantomConnector.create({
          walletStore: this.walletStore,
        })

        await phantomConnector.connectPhantom()
      }
    } catch (error) {
      // TODO: Handle error.
    }
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>
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
