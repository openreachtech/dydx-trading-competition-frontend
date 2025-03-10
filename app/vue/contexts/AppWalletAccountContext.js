import {
  disconnect as disconnectWagmi,
} from '@wagmi/core'
import wagmiConfig from '~/wagmi.config'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
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
    isShowingDropdownRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.accountStore = accountStore
    this.walletStore = walletStore
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
    isShowingDropdownRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        accountStore,
        isShowingDropdownRef,
      })
    )
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
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 *   isShowingDropdownRef: import('vue').Ref<boolean>
 * }} AppWalletAccountContextParams
 */

/**
 * @typedef {AppWalletAccountContextParams} AppWalletAccountContextFactoryParams
 */
