import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppOnboardingControlContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppOnboardingControlContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppOnboardingControlContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    super({
      props,
      componentContext,
    })

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
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   walletSelectionDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   keyDerivationDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 * }} AppOnboardingControlContextParams
 */

/**
 * @typedef {AppOnboardingControlContextParams} AppOnboardingControlContextFactoryParams
 */
