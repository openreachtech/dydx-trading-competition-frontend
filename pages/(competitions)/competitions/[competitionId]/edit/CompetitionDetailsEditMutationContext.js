import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * CompetitionDetailsEditMutationContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class CompetitionDetailsEditMutationContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {CompetitionDetailsEditMutationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    graphqlClientHash,
    formClerkHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionDetailsEditMutationContext ? X : never} T, X
   * @override
   * @param {CompetitionDetailsEditMutationContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    graphqlClientHash,
    formClerkHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        graphqlClientHash,
        formClerkHash,
        statusReactive,
      })
    )
  }

  /**
   * get: updateCompetitionFormClerk
   *
   * @returns {FormClerk}
   */
  get updateCompetitionFormClerk () {
    return this.formClerkHash
      .updateCompetition
  }

  /**
   * get: updateCompetitionValidation
   *
   * @returns {furo.ValidatorHashType}
   */
  get updateCompetitionValidation () {
    return this.updateCompetitionFormClerk
      .validationRef
      .value
  }

  /**
   * get: updateCompetitionValidationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get updateCompetitionValidationMessage () {
    return this.updateCompetitionValidation
      .message
  }

  /**
   * get: updateCompetitionSchedulesFormClerk
   *
   * @returns {FormClerk}
   */
  get updateCompetitionSchedulesFormClerk () {
    return this.formClerkHash
      .updateCompetitionSchedules
  }

  /**
   * get: updateCompetitionSchedulesValidation
   *
   * @returns {furo.ValidatorHashType}
   */
  get updateCompetitionSchedulesValidation () {
    return this.updateCompetitionSchedulesFormClerk
      .validationRef
      .value
  }

  /**
   * get: updateCompetitionSchedulesValidationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get updateCompetitionSchedulesValidationMessage () {
    return this.updateCompetitionSchedulesValidation
      .message
  }

  /**
   * get: updateCompetitionLimitsFormClerk
   *
   * @returns {FormClerk}
   */
  get updateCompetitionLimitsFormClerk () {
    return this.formClerkHash
      .updateCompetitionLimits
  }

  /**
   * get: updateCompetitionLimitsValidation
   *
   * @returns {furo.ValidatorHashType}
   */
  get updateCompetitionLimitsValidation () {
    return this.updateCompetitionLimitsFormClerk
      .validationRef
      .value
  }

  /**
   * get: updateCompetitionLimitsValidationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get updateCompetitionLimitsValidationMessage () {
    return this.updateCompetitionLimitsValidation
      .message
  }

  /**
   * get: updateCompetitionPrizeRulesFormClerk
   *
   * @returns {FormClerk}
   */
  get updateCompetitionPrizeRulesFormClerk () {
    return this.formClerkHash
      .updateCompetitionPrizeRules
  }

  /**
   * get: updateCompetitionPrizeRulesValidation
   *
   * @returns {furo.ValidatorHashType}
   */
  get updateCompetitionPrizeRulesValidation () {
    return this.updateCompetitionPrizeRulesFormClerk
      .validationRef
      .value
  }

  /**
   * get: updateCompetitionPrizeRulesValidationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get updateCompetitionPrizeRulesValidationMessage () {
    return this.updateCompetitionPrizeRulesValidation
      .message
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   statusReactive: StatusReactive
 * }} CompetitionDetailsEditMutationContextParams
 */

/**
 * @typedef {CompetitionDetailsEditMutationContextParams} CompetitionDetailsEditMutationContextFactoryParams
 */

/**
 * @typedef {'updateCompetition'
 *   | 'updateCompetitionSchedules'
 *   | 'updateCompetitionLimits'
 *   | 'updateCompetitionPrizeRules'
 * } GraphqlClientHashKeys
 */

/**
 * @typedef {'updateCompetition'
 *   | 'updateCompetitionSchedules'
 *   | 'updateCompetitionLimits'
 *   | 'updateCompetitionPrizeRules'
 * } FormClerkHashKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} FormClerk
 */

/**
 * @typedef {{
 *   isUpdatingCompetition: boolean
 *   isUpdatingCompetitionSchedules: boolean
 *   isUpdatingCompetitionLimits: boolean
 *   isUpdatingCompetitionPrizeRules: boolean
 * }} StatusReactive
 */
