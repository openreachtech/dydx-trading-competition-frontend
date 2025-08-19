import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  ENROLLMENT_VERIFICATION_STEP,
} from '~/app/constants'

/**
 * EnrollmentVerificationDialogContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class EnrollmentVerificationDialogContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {EnrollmentVerificationDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    currentStepRef,
    dialogComponentShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.currentStepRef = currentStepRef
    this.dialogComponentShallowRef = dialogComponentShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof EnrollmentVerificationDialogContext ? X : never} T, X
   * @override
   * @param {EnrollmentVerificationDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    currentStepRef,
    dialogComponentShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        currentStepRef,
        dialogComponentShallowRef,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      FETCH_CURRENT_EQUITY: 'fetchCurrentEquity',
    }
  }

  /**
   * get: currentStep
   *
   * @returns {(typeof ENROLLMENT_VERIFICATION_STEP)[keyof typeof ENROLLMENT_VERIFICATION_STEP]}
   */
  get currentStep () {
    return this.currentStepRef.value
  }

  /**
   * get: dialogComponent
   *
   * @returns {import('~/components/units/AppDialog.vue').default | null}
   */
  get dialogComponent () {
    return this.dialogComponentShallowRef.value
  }

  /**
   * Setup component.
   *
   * @template {X extends EnrollmentVerificationDialogContext ? X : never} T, X
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
   * Emit `fetchCurrentEquity` event.
   *
   * @returns {void}
   */
  emitFetchCurrentEquity () {
    this.emit(
      this.EMIT_EVENT_NAME.FETCH_CURRENT_EQUITY
    )
  }

  /**
   * Generate expose hash.
   *
   * @override
   * @returns {{
   *   showDialog: () => void
   *   dismissDialog: () => void
   * }}
   */
  generateExposeHash () {
    return {
      showDialog: () => this.showDialog(),
      dismissDialog: () => this.dismissDialog(),
    }
  }

  /**
   * Show dialog.
   *
   * @returns {void}
   */
  showDialog () {
    this.dialogComponent?.showDialog()
  }

  /**
   * Dismiss Dialog
   */
  dismissDialog () {
    this.dialogComponent?.dismissDialog()
  }

  /**
   * Go to next step.
   *
   * @returns {void}
   */
  goToNextStep () {
    this.currentStepRef.value += 1
  }

  /**
   * Check if is at `verifyingBalance` step.
   *
   * @returns {boolean}
   */
  isAtVerifyingBalanceStep () {
    return this.currentStep === ENROLLMENT_VERIFICATION_STEP.VERIFYING_BALANCE
  }

  /**
   * Check if is at `awaitingAdditionalDeposit` step.
   *
   * @returns {boolean}
   */
  isAtAwaitingAdditionalDepositStep () {
    return this.currentStep === ENROLLMENT_VERIFICATION_STEP.AWAITING_ADDITIONAL_DEPOSIT
  }

  /**
   * Check if is at `enrolledActive` step.
   *
   * @returns {boolean}
   */
  isAtEnrolledActiveStep () {
    return this.currentStep === ENROLLMENT_VERIFICATION_STEP.ENROLLED_ACTIVE
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   currentStepRef: import('vue').Ref<(typeof ENROLLMENT_VERIFICATION_STEP)[keyof typeof ENROLLMENT_VERIFICATION_STEP]>
 *   dialogComponentShallowRef: import('vue').ShallowRef<import('~/components/units/AppDialog.vue').default | null>
 * }} EnrollmentVerificationDialogContextParams
 */

/**
 * @typedef {EnrollmentVerificationDialogContextParams} EnrollmentVerificationDialogContextFactoryParams
 */
