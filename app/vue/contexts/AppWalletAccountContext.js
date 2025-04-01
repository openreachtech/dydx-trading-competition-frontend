import {
  onMounted,
} from 'vue'

import {
  disconnect as disconnectWagmi,
} from '@wagmi/core'
import wagmiConfig from '~/wagmi.config'

import WagmiConnector from '~/app/wallets/WagmiConnector'
import PhantomConnector from '~/app/wallets/PhantomConnector'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  CONNECTOR_TYPE,
  ONBOARDING_STATUS,
} from '~/app/constants'

/**
 * AppWalletAccountContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppWalletAccountContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppWalletAccountContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    accountStore,
    walletStore,
    mipdStore,
    isShowingDropdownRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.accountStore = accountStore
    this.walletStore = walletStore
    this.mipdStore = mipdStore
    this.isShowingDropdownRef = isShowingDropdownRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppWalletAccountContext ? X : never} T, X
   * @override
   * @param {AppWalletAccountContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    walletStore,
    accountStore,
    mipdStore,
    isShowingDropdownRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        accountStore,
        mipdStore,
        isShowingDropdownRef,
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

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      SHOW_KEY_DERIVATION_DIALOG: 'showKeyDerivationDialog',
    }
  }

  /**
   * get: localWalletAddress
   *
   * @returns {string | null}
   */
  get localWalletAddress () {
    return this.walletStore.walletStoreRef.value
      .localWallet
      .address
  }

  /** @override */
  setupComponent () {
    onMounted(async () => {
      await this.attemptWalletReconnection()
    })

    return this
  }

  /**
   * Attempt to disconnect wallet.
   *
   * @returns {Promise<void>}
   */
  async attemptWalletDisconnection () {
    await disconnectWagmi(wagmiConfig)

    this.walletStore.clearSourceAccount()
    this.walletStore.clearLocalWallet()

    this.accountStore.setOnboardingStatus({
      onboardingStatus: ONBOARDING_STATUS.DISCONNECTED,
    })
  }

  /**
   * Attempt to reconnect wallet.
   *
   * @returns {Promise<void>}
   */
  async attemptWalletReconnection () {
    const lastConnectorType = this.walletStore.walletStoreRef.value
      .sourceAccount
      .walletDetail
      ?.connectorType
      ?? null

    if (!lastConnectorType) {
      return
    }

    const handlerMap = this.reconnectionHandlerMap

    await handlerMap[lastConnectorType]?.()
    this.accountStore.setOnboardingStatus({
      onboardingStatus: ONBOARDING_STATUS.WALLET_CONNECTED,
    })
  }

  /**
   * get: reconnectionHandlerMap
   *
   * @returns {Record<string, () => Promise<boolean>>}
   */
  get reconnectionHandlerMap () {
    const wagmiConnector = WagmiConnector.create({
      mipdStore: this.mipdStore,
      walletStore: this.walletStore,
    })
    const phantomConnector = PhantomConnector.create({
      walletStore: this.walletStore,
    })

    return {
      [CONNECTOR_TYPE.INJECTED]: () => wagmiConnector.reconnectToEvmNetwork(),
      [CONNECTOR_TYPE.COINBASE]: () => wagmiConnector.reconnectToEvmNetwork(),
      [CONNECTOR_TYPE.WALLET_CONNECT]: () => wagmiConnector.reconnectToEvmNetwork(),
      [CONNECTOR_TYPE.PHANTOM_SOLANA]: () => phantomConnector.connectPhantom(),
    }
  }

  /**
   * Generate wallet image URL.
   *
   * @returns {string}
   */
  generateWalletImageUrl () {
    return this.walletStore.walletStoreRef.value
      .sourceAccount
      .walletDetail
      ?.icon
      ?? this.Ctor.defaultWalletImageUrl
  }

  /**
   * Show KeyDerivationDialog.
   *
   * @returns {void}
   */
  showKeyDerivationDialog () {
    this.emit(this.EMIT_EVENT_NAME.SHOW_KEY_DERIVATION_DIALOG)
  }

  /**
   * Generate profile URL.
   *
   * @returns {string}
   */
  generateProfileUrl () {
    const localWalletAddress = this.walletStore.walletStoreRef.value
      .localWallet
      .address

    if (!localWalletAddress) {
      // Return empty string instead of `null` to avoid type error.
      return ''
    }

    return `/profiles/${localWalletAddress}`
  }

  /**
   * Generate address URL on Mintscan.
   *
   * @returns {string}
   */
  generateAddressUrl () {
    const localWalletAddress = this.walletStore.walletStoreRef.value.localWallet.address

    return localWalletAddress
      ? `https://www.mintscan.io/dydx/address/${localWalletAddress}`
      : ''
  }

  /**
   * Generate local account's address.
   *
   * @returns {string} Source account's address.
   */
  generateLocalAccountAddress () {
    return this.shortenAddress({
      address: this.walletStore.walletStoreRef.value
        .localWallet
        ?.address
        ?? null,
    })
  }

  /**
   * Generate source account's address.
   *
   * @returns {string} Source account's address.
   */
  generateSourceAccountAddress () {
    return this.shortenAddress({
      address: this.walletStore.walletStoreRef.value
        .sourceAccount
        ?.address
        ?? null,
    })
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address: string | null
   * }} params - Parameters
   * @returns {string} Shortened address.
   */
  shortenAddress ({
    address,
  }) {
    if (!address) {
      return '--'
    }

    if (address.length <= 12) {
      return address
    }

    const firstSevenCharacters = address.slice(0, 7)
    const lastFiveCharacters = address.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Check if local wallet has been recovered.
   *
   * @returns {boolean} `true` if local wallet has been recovered.
   */
  hasRecoveredLocalWallet () {
    return this.walletStore.walletStoreRef.value
      .localWallet
      .address !== null
  }

  /**
   * Toggle dropdown.
   *
   * @returns {void}
   */
  toggleDropdown () {
    this.isShowingDropdownRef.value = !this.isShowingDropdownRef.value
  }

  /**
   * Close dropdown.
   *
   * @returns {void}
   */
  closeDropdown () {
    this.isShowingDropdownRef.value = false
  }

  /**
   * Generate dropdown classes.
   *
   * @returns {Record<string, boolean>} Dropdown classes.
   */
  generateDropdownClasses () {
    return {
      'show-dropdown': this.isShowingDropdownRef.value,
      recovered: this.hasRecoveredLocalWallet(),
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 *   mipdStore: ReturnType<import('mipd').createStore>
 *   isShowingDropdownRef: import('vue').Ref<boolean>
 * }} AppWalletAccountContextParams
 */

/**
 * @typedef {AppWalletAccountContextParams} AppWalletAccountContextFactoryParams
 */
