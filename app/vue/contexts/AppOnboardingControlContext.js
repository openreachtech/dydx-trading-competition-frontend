import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  ONBOARDING_STATUS,
} from '~/app/constants'

/**
 * AppOnboardingControlContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class AppOnboardingControlContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AppOnboardingControlContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    accountStore,
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.accountStore = accountStore
    this.walletSelectionDialogRef = walletSelectionDialogRef
    this.keyDerivationDialogRef = keyDerivationDialogRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppOnboardingControlContext ? X : never} T, X
   * @override
   * @param {AppOnboardingControlContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    accountStore,
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        accountStore,
        walletSelectionDialogRef,
        keyDerivationDialogRef,
      })
    )
  }

  /**
   * Go to derivation step.
   *
   * @returns {void}
   */
  goToDerivationStep () {
    this.dismissDialog({
      dialogElement: this.walletSelectionDialogRef.value,
    })

    this.showDialog({
      dialogElement: this.keyDerivationDialogRef.value,
    })
  }

  /**
   * Show wallet selection dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  showDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.showDialog()
  }

  /**
   * Dismiss wallet selection dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  dismissDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.dismissDialog()
  }

  /**
   * Generate onboarding control classes.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateOnboardingControlClasses () {
    return {
      connected: this.shouldShowConnectedWallet(),
    }
  }

  /**
   * Should show connected wallet or not.
   *
   * @returns {boolean} `true` if wallet is at least connected.
   */
  shouldShowConnectedWallet () {
    return [
      ONBOARDING_STATUS.WALLET_CONNECTED,
      ONBOARDING_STATUS.ACCOUNT_CONNECTED,
    ]
      .includes(this.accountStore.accountStateRef.value.onboardingStatus)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   accountStore: import('~/stores/account').AccountStore
 *   walletSelectionDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   keyDerivationDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 * }} AppOnboardingControlContextParams
 */

/**
 * @typedef {AppOnboardingControlContextParams} AppOnboardingControlContextFactoryParams
 */
