import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  DYDX_TRADE_CTA_URL,
  ENROLLMENT_VERIFICATION_STEP,
} from '~/app/constants'

/**
 * EnrollmentVerificationDialogContext
 *
 * @extends {BaseAppContext<null, PropsType, CompetitionEmitEvents>}
 */
export default class EnrollmentVerificationDialogContext extends BaseAppContext {
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

  /**
   * get: dydxTradeUtmUrl
   *
   * @returns {string}
   */
  get dydxTradeUtmUrl () {
    return DYDX_TRADE_CTA_URL
  }

  /**
   * get: competition
   *
   * @returns {PropsType['competition']}
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: minimumDeposit
   *
   * @returns {string | null}
   */
  get minimumDeposit () {
    return this.competition
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: minimumTradingVolume
   *
   * @returns {string | null}
   */
  get minimumTradingVolume () {
    return this.competition
      ?.minimumTradingVolume
      ?? null
  }

  /**
   * get: competitionTitle
   *
   * @returns {string | null}
   */
  get competitionTitle () {
    return this.competition
      ?.title
      ?? null
  }

  /**
   * get: currentEquity
   *
   * @returns {PropsType['currentEquity']}
   */
  get currentEquity () {
    return this.props.currentEquity
  }

  /**
   * get: userInterfaceState
   *
   * @returns {PropsType['userInterfaceState']}
   */
  get userInterfaceState () {
    return this.props.userInterfaceState
  }

  /**
   * get: isFetchingCurrentEquity
   *
   * @returns {boolean}
   */
  get isFetchingCurrentEquity () {
    return this.userInterfaceState.isFetchingCurrentEquity
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      FETCH_CURRENT_EQUITY: 'fetchCurrentEquity',
      JOIN_COMPETITION: 'joinCompetition',
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
   * Dismiss dialog in success state.
   *
   * @returns {void}
   */
  dismissSuccessDialog () {
    this.dismissDialog()
    this.emitJoinCompetition()
  }

  /**
   * Emit 'joinCompetition' event.
   *
   * @returns {void}
   */
  emitJoinCompetition () {
    this.emit(
      this.EMIT_EVENT_NAME.JOIN_COMPETITION
    )
  }

  /**
   * Emit `fetchCurrentEquity` event.
   *
   * @returns {void}
   */
  emitFetchCurrentEquity () {
    this.emit(
      this.EMIT_EVENT_NAME.FETCH_CURRENT_EQUITY, {
        afterRequestCallback: () => this.processEquityVerificationOutcome(),
      }
    )
  }

  /**
   * Handle event after request.
   *
   * @returns {void}
   */
  processEquityVerificationOutcome () {
    if (this.hasSufficientEquity()) {
      this.goToEnrolledActiveStep()

      return
    }

    this.goToAwaitingAdditionalDepositStep()
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

    this.processEquityVerificationOutcome()
  }

  /**
   * Dismiss Dialog
   */
  dismissDialog () {
    this.dialogComponent?.dismissDialog()

    this.goToFirstStep()
  }

  /**
   * Format competition title.
   *
   * @returns {string}
   */
  formatCompetitionTitle () {
    return this.competitionTitle
      ?? 'this competition'
  }

  /**
   * Format current equity.
   *
   * @returns {string} The formatted current equity.
   */
  formatCurrentEquity () {
    if (!this.currentEquity) {
      return '0'
    }

    return this.formatNumber({
      value: this.currentEquity,
    })
  }

  /**
   * Format minimum deposit amount.
   *
   * @returns {string} The formatted minimum deposit amount.
   */
  formatMinimumDeposit () {
    return this.formatNumber({
      value: this.minimumDeposit,
    })
  }

  /**
   * Format minimum trading volume.
   *
   * @returns {string} The formatted minimum trading volume.
   */
  formatMinimumTradingVolume () {
    return this.formatNumber({
      value: this.minimumTradingVolume,
    })
  }

  /**
   * Check if the user has made a deposit.
   *
   * @returns {boolean}
   */
  hasMadeADeposit () {
    return !this.hasNotMadeADeposit()
  }

  /**
   * Check if the user has not made a deposit.
   *
   * @returns {boolean}
   */
  hasNotMadeADeposit () {
    return this.currentEquity === null
  }

  /**
   * Check if competition title exists.
   *
   * @returns {boolean}
   */
  hasCompetitionTitle () {
    return Boolean(this.competitionTitle)
  }

  /**
   * Check if the user has sufficient equity.
   *
   * @returns {boolean}
   */
  hasSufficientEquity () {
    if (
      this.minimumDeposit === null
      || this.currentEquity === null
    ) {
      return false
    }

    const numericMinimumDeposit = parseFloat(this.minimumDeposit)

    return this.currentEquity >= numericMinimumDeposit
  }

  /**
   * Go to `awaitingAdditionalDeposit` step.
   *
   * @returns {void}
   */
  goToAwaitingAdditionalDepositStep () {
    this.currentStepRef.value = ENROLLMENT_VERIFICATION_STEP.AWAITING_ADDITIONAL_DEPOSIT
  }

  /**
   * Go to `enrolledActive` step.
   *
   * @returns {void}
   */
  goToEnrolledActiveStep () {
    this.currentStepRef.value = ENROLLMENT_VERIFICATION_STEP.ENROLLED_ACTIVE
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
   * Go to the first step.
   *
   * @returns {void}
   */
  goToFirstStep () {
    this.currentStepRef.value = ENROLLMENT_VERIFICATION_STEP.VERIFYING_BALANCE
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   currentStepRef: import('vue').Ref<(typeof ENROLLMENT_VERIFICATION_STEP)[keyof typeof ENROLLMENT_VERIFICATION_STEP]>
 *   dialogComponentShallowRef: import('vue').ShallowRef<import('~/components/units/AppDialog.vue').default | null>
 * }} EnrollmentVerificationDialogContextParams
 */

/**
 * @typedef {EnrollmentVerificationDialogContextParams} EnrollmentVerificationDialogContextFactoryParams
 */

/**
 * @typedef {{
 *   competition: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity | null
 *   currentEquity: number | null
 *   userInterfaceState: import('~/app/vue/contexts/CompetitionDetailsPageContext.js').StatusReactive
 * }} PropsType
 */

/**
 * @typedef {'fetchCurrentEquity'
 *   | 'joinCompetition'
 * } CompetitionEmitEvents
 */
