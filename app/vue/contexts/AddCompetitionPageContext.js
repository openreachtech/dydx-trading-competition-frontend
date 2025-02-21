import {
  ref,
  shallowRef,
} from 'vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AddCompetitionPageContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AddCompetitionPageContext extends BaseFuroContext {
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
      'step',
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
