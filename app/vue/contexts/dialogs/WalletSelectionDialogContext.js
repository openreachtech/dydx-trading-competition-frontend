import {
  connect as connectWagmi,
} from '@wagmi/core'
import {
  injected,
} from '@wagmi/connectors'
import wagmiConfig from '~/wagmi.config'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
  ONBOARDING_STATUS,
  WALLETS,
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

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      ...super.EMIT_EVENT_NAME,

      NEXT_STEP: 'nextStep',
    }
  }

  /**
   * Select wallet.
   *
   * @param {{
   *   walletDetail: import('~/stores/wallet').WalletDetail
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async selectWallet ({
    walletDetail,
  }) {
    await this.connectWallet({
      walletDetail,
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
   *   walletDetail: import('~/stores/wallet').WalletDetail
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async connectWallet ({
    walletDetail,
  }) {
    try {
      // TODO: Condition for other wallets.
      await connectWagmi(wagmiConfig, {
        connector: injected(),
      })

      this.walletStore.setWalletDetail({
        walletDetail,
      })
    } catch (error) {
      // TODO: Handle error.
    }
  }

  /**
   * Has phantom wallet or not.
   *
   * @returns {boolean} `true` if has phantom wallet.
   */
  hasPhantomWallet () {
    return Boolean(window.phantom?.solana)
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
 * }} WalletSelectionDialogContextParams
 */

/**
 * @typedef {WalletSelectionDialogContextParams} WalletSelectionDialogContextFactoryParams
 */
