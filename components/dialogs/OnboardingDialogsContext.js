import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * OnboardingDialogsContext
 *
 * @extends {BaseAppContext<null, {}, null>}
 */
export default class OnboardingDialogsContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {OnboardingDialogsContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    walletStore,
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.walletStore = walletStore
    this.walletSelectionDialogRef = walletSelectionDialogRef
    this.keyDerivationDialogRef = keyDerivationDialogRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof OnboardingDialogsContext ? X : never} T, X
   * @override
   * @param {OnboardingDialogsContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    walletStore,
    walletSelectionDialogRef,
    keyDerivationDialogRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        walletSelectionDialogRef,
        keyDerivationDialogRef,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends OnboardingDialogsContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.expose(
      this.generateExposeHash()
    )

    return this
  }

  /**
   * Expose stuff to parents.
   *
   * @override
   * @returns {{
   *   showWalletSelectionDialog: () => void
   *   showKeyDerivationDialog: () => void
   * }}
   */
  generateExposeHash () {
    return {
      showWalletSelectionDialog: () => this.showDialog({
        dialogElement: this.walletSelectionDialogRef.value,
      }),
      showKeyDerivationDialog: () => this.showDialog({
        dialogElement: this.keyDerivationDialogRef.value,
      }),
    }
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   walletSelectionDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   keyDerivationDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 * }} OnboardingDialogsContextParams
 */

/**
 * @typedef {OnboardingDialogsContextParams} OnboardingDialogsContextFactoryParams
 */
