import {
  ref,
  shallowRef,
} from 'vue'

import {
  navigateTo,
} from '#imports'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AddCompetitionPageContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class AddCompetitionPageContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    formClerkHash,
    statusReactive,
    errorMessageHashReactive,
    currentStepRef,
    addCompetitionFormShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.statusReactive = statusReactive
    this.errorMessageHashReactive = errorMessageHashReactive
    this.currentStepRef = currentStepRef
    this.addCompetitionFormShallowRef = addCompetitionFormShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionPageContext ? X : never} T, X
   * @override
   * @param {AddCompetitionPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    formClerkHash,
    graphqlClientHash,
    statusReactive,
    errorMessageHashReactive,
  }) {
    const currentStepRef = this.generateCurrentStepRef()
    const addCompetitionFormShallowRef = this.generateAddCompetitionFormShallowRef()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        formClerkHash,
        statusReactive,
        errorMessageHashReactive,
        currentStepRef,
        addCompetitionFormShallowRef,
      })
    )
  }

  /**
   * Generate `currentStepRef`.
   *
   * @returns {import('vue').Ref<number>}
   */
  static generateCurrentStepRef () {
    return ref(1)
  }

  /**
   * Generate addCompetition form shallow ref.
   *
   * @returns {import('vue').ShallowRef<HTMLFormElement | null>}
   */
  static generateAddCompetitionFormShallowRef () {
    return shallowRef(null)
  }

  /**
   * get: steps
   *
   * @returns {Array<Step>}
   */
  get steps () {
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

  /**
   * get: currentStep
   *
   * @returns {number}
   */
  get currentStep () {
    return this.currentStepRef.value
  }

  /**
   * Check if is first step.
   *
   * @returns {boolean} `true` if the current step is the first step.
   */
  isFirstStep () {
    return this.currentStep === 1
  }

  /**
   * Check if is last step.
   *
   * @returns {boolean} `true` if the current step is the last step.
   */
  isLastStep () {
    return this.currentStep === this.steps.length
  }

  /**
   * get: addCompetitionFormClerk
   *
   * @returns {AddCompetitionPageContextParams['formClerkHash']['addCompetition']}
   */
  get addCompetitionFormClerk () {
    return this.formClerkHash.addCompetition
  }

  /**
   * get: addCompetitionValidation
   *
   * @returns {furo.ValidatorHashType}
   */
  get addCompetitionValidation () {
    return this.addCompetitionFormClerk.validationRef.value
  }

  /**
   * get: addCompetitionValidationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get addCompetitionValidationMessage () {
    return this.addCompetitionValidation.message
  }

  /**
   * Submit form.
   *
   * @returns {Promise<void>}
   */
  async submitForm () {
    if (!this.addCompetitionFormShallowRef.value) {
      return
    }

    await this.addCompetitionFormClerk.submitForm({
      formElement: this.addCompetitionFormShallowRef.value,
      hooks: this.addCompetitionLauncherHooks,
    })
  }

  /**
   * get: addCompetitionLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addCompetitionLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false

        if (capsule.hasError()) {
          this.errorMessageHashReactive.addCompetition = capsule.getResolvedErrorMessage()

          return
        }

        await navigateTo(`/competitions/${capsule.competitionId}`)
      },
    }
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
    this.currentStepRef.value = step
  }

  /**
   * Go to previous step.
   *
   * @returns {void}
   */
  goToPreviousStep () {
    if (this.isFirstStep()) {
      return
    }

    this.currentStepRef.value = this.currentStep - 1
  }

  /**
   * Go to next step.
   *
   * @param {{
   *   mouseEvent: MouseEvent
   * }} params - Parameters.
   * @returns {void}
   */
  goToNextStep ({
    mouseEvent,
  }) {
    if (this.isLastStep()) {
      return
    }

    // Prevent default event before last step because `this.generateActionButtonType()`
    // runs before the the event is invoked, which causes the form to submit before last step.
    mouseEvent.preventDefault()

    this.goToStep({
      step: this.currentStep + 1,
    })
  }

  /**
   * Generate next-step button label.
   *
   * @returns {string}
   */
  generateNextStepButtonLabel () {
    return this.isLastStep()
      ? 'Create a New Arena'
      : 'Save & Continue'
  }

  /**
   * Generate next-step button type.
   *
   * @returns {'submit' | 'button'}
   */
  generateNextStepButtonType () {
    return this.isLastStep()
      ? 'submit'
      : 'button'
  }

  /**
   * Wheter to disable previous-step button or not.
   *
   * @returns {boolean}
   */
  shouldDisablePreviousStepButton () {
    return this.isFirstStep()
  }

  /**
   * Generate CSS classes for step element.
   *
   * @param {{
   *   step: number
   * }} params - Parameters.
   * @returns {Array<string | Record<string, boolean>>}
   */
  generateStepClasses ({
    step,
  }) {
    return [
      {
        hidden: this.currentStepRef.value !== step,
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<GraphqlClientHashKeys, AppFormClerk>
 *   statusReactive: StatusReactive
 *   errorMessageHashReactive: import('vue').Reactive<Record<string, string | null>>
 *   currentStepRef: import('vue').Ref<number>
 *   addCompetitionFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 * }} AddCompetitionPageContextParams
 */

/**
 * @typedef {Omit<AddCompetitionPageContextParams, FactoryOmittedKeys>} AddCompetitionPageContextFactoryParams
 */

/**
 * @typedef {'addCompetition'} GraphqlClientHashKeys
 */

/**
 * @typedef {'addCompetitionFormShallowRef'
 *   | 'currentStepRef'
 * } FactoryOmittedKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} AppFormClerk
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */

/**
 * @typedef {{
 *   step: number
 *   title: string
 * }} Step
 */
