import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
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
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.walletStore = walletStore
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
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        walletStore,
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
 * }} WalletSelectionDialogContextParams
 */

/**
 * @typedef {WalletSelectionDialogContextParams} WalletSelectionDialogContextFactoryParams
 */
