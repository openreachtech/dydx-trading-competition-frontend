import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  EVENT_NAME,
} from '~/components/competition-add/AddCompetitionFormSteps.vue'

/**
 * AddCompetitionFormStepsContext
 *
 * @extends {BaseFuroContext<(typeof EVENT_NAME)[keyof typeof EVENT_NAME]>}
 */
export default class AddCompetitionFormStepsContext extends BaseFuroContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return EVENT_NAME
  }

  /**
   * get: currentStep
   *
   * @returns {number}
   */
  get currentStep () {
    return this.props.currentStep
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
   * Check if is last step.
   *
   * @returns {boolean} `true` if the current step is the last step.
   */
  isLastStep () {
    return this.currentStep === this.generateSteps().length
  }

  /**
   * Go to next step.
   *
   * @returns {void}
   */
  nextStep () {
    if (this.isLastStep()) {
      return
    }

    this.goToStep({
      step: this.currentStep + 1,
    })
  }

  /**
   * Generate action button label.
   *
   * @returns {string}
   */
  generateActionButtonLabel () {
    return this.isLastStep()
      ? 'Host New League'
      : 'Next'
  }

  /**
   * Generate action button type.
   *
   * @returns {'submit' | 'button'}
   */
  generateActionButtonType () {
    return this.isLastStep()
      ? 'submit'
      : 'button'
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

  /**
   * Generate steps.
   *
   * @returns {Array<Step>}
   */
  generateSteps () {
    return [
      {
        step: 1,
        title: 'Details',
      },
      {
        step: 2,
        title: 'Timeline',
      },
      {
        step: 3,
        title: 'Participation',
      },
      {
        step: 4,
        title: 'Rank & Prize',
      },
    ]
  }
}

/**
 * @typedef {{
 *   step: number
 *   title: string
 * }} Step
 */
