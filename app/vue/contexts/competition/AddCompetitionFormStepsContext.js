import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  EVENT_NAME,
} from '~/components/competition-add/AddCompetitionFormSteps.vue'

/**
 * AddCompetitionFormStepsContext
 *
 * @extends {BaseAppContext<null, PropsType, (typeof EVENT_NAME)[keyof typeof EVENT_NAME]>}
 */
export default class AddCompetitionFormStepsContext extends BaseAppContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return EVENT_NAME
  }

  /**
   * get: steps
   *
   * @returns {PropsType['steps']}
   */
  get steps () {
    return this.props.steps
  }

  /**
   * get: currentStep
   *
   * @returns {PropsType['currentStep']}
   */
  get currentStep () {
    return this.props.currentStep
  }

  /**
   * get: errorMessageHash
   *
   * @returns {PropsType['errorMessageHash']}
   */
  get errorMessageHash () {
    return this.props.errorMessageHash
  }

  /**
   * get: addCompetitionErrorMessage
   *
   * @returns {string | null}
   */
  get addCompetitionErrorMessage () {
    return this.errorMessageHash
      ?.addCompetition
      ?? null
  }

  /**
   * Go to step.
   *
   * @param {{
   *   step: number
   * }} params - Parameters.
   * @returns {void}
   */
  goToStep ({
    step,
  }) {
    this.emit(this.EMIT_EVENT_NAME.GO_TO_STEP, {
      step,
    })
  }

  /**
   * Check if is current step.
   *
   * @param {{
   *   step: number
   * }} params - Parameters.
   * @returns {boolean} `true` if the current step is the given step.
   */
  isCurrentStep ({
    step,
  }) {
    return step === this.currentStep
  }

  /**
   * Generate aria-current.
   *
   * @param {{
   *   step: number
   * }} params - Parameters.
   * @returns {'step' | 'false'} Value of aria-current.
   */
  generateAriaCurrent ({
    step,
  }) {
    const isCurrentStep = this.isCurrentStep({
      step,
    })

    return isCurrentStep
      ? 'step'
      : 'false'
  }
}

/**
 * @typedef {{
 *   step: number
 *   title: string
 * }} Step
 */

/**
 * @typedef {{
 *   steps: Array<import('~/app/vue/contexts/AddCompetitionPageContext').Step>
 *   currentStep: number
 *   errorMessageHash: Record<string, string | null> | null
 * }} PropsType
 */
