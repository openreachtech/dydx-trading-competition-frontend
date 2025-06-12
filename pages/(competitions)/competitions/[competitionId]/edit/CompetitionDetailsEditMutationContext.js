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
    toastStore,
    graphqlClientHash,
    formClerkHash,
    fetcherHash,
    statusReactive,
    updateCompetitionFormShallowRef,
    updateCompetitionSchedulesFormShallowRef,
    updateCompetitionLimitsFormShallowRef,
    updateCompetitionPrizeRulesFormShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.toastStore = toastStore
    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.fetcherHash = fetcherHash
    this.statusReactive = statusReactive
    this.updateCompetitionFormShallowRef = updateCompetitionFormShallowRef
    this.updateCompetitionSchedulesFormShallowRef = updateCompetitionSchedulesFormShallowRef
    this.updateCompetitionLimitsFormShallowRef = updateCompetitionLimitsFormShallowRef
    this.updateCompetitionPrizeRulesFormShallowRef = updateCompetitionPrizeRulesFormShallowRef
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
    toastStore,
    graphqlClientHash,
    formClerkHash,
    fetcherHash,
    statusReactive,
    updateCompetitionFormShallowRef,
    updateCompetitionSchedulesFormShallowRef,
    updateCompetitionLimitsFormShallowRef,
    updateCompetitionPrizeRulesFormShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        toastStore,
        graphqlClientHash,
        formClerkHash,
        fetcherHash,
        statusReactive,
        updateCompetitionFormShallowRef,
        updateCompetitionSchedulesFormShallowRef,
        updateCompetitionLimitsFormShallowRef,
        updateCompetitionPrizeRulesFormShallowRef,
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

  /**
   * get: updateCompetitionFormElement
   *
   * @returns {HTMLFormElement | null}
   */
  get updateCompetitionFormElement () {
    return this.updateCompetitionFormShallowRef
      .value
  }

  /**
   * get: updateCompetitionSchedulesFormElement
   *
   * @returns {HTMLFormElement | null}
   */
  get updateCompetitionSchedulesFormElement () {
    return this.updateCompetitionSchedulesFormShallowRef
      .value
  }

  /**
   * get: updateCompetitionLimitsFormElement
   *
   * @returns {HTMLFormElement | null}
   */
  get updateCompetitionLimitsFormElement () {
    return this.updateCompetitionLimitsFormShallowRef
      .value
  }

  /**
   * get: updateCompetitionPrizeRulesFormElement
   *
   * @returns {HTMLFormElement | null}
   */
  get updateCompetitionPrizeRulesFormElement () {
    return this.updateCompetitionPrizeRulesFormShallowRef
      .value
  }

  /**
   * Extract competition id from route params.
   *
   * @returns {number | null}
   */
  extractCompetitionIdFromRoute () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }

  /**
   * Submit form `updateCompetition`.
   *
   * @returns {Promise<void>}
   */
  async submitFormUpdateCompetition () {
    if (!this.updateCompetitionFormElement) {
      return
    }

    await this.updateCompetitionFormClerk
      .submitForm({
        formElement: this.updateCompetitionFormElement,
        hooks: this.updateCompetitionLauncherHooks,
      })
  }

  /**
   * get: updateCompetitionLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get updateCompetitionLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUpdatingCompetition = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isUpdatingCompetition = false

        await this.fetcherHash
          .competition
          .fetchCompetitionOnEvent()
      },
    }
  }

  /**
   * get: isUpdatingCompetition
   *
   * @returns {boolean}
   */
  get isUpdatingCompetition () {
    return this.statusReactive.isUpdatingCompetition
  }

  /**
   * Submit form `updateCompetitionSchedules`.
   *
   * @returns {Promise<void>}
   */
  async submitFormUpdateCompetitionSchedules () {
    if (!this.updateCompetitionSchedulesFormElement) {
      return
    }

    await this.updateCompetitionSchedulesFormClerk
      .submitForm({
        formElement: this.updateCompetitionSchedulesFormElement,
        hooks: this.updateCompetitionSchedulesLauncherHooks,
      })
  }

  /**
   * get: updateCompetitionSchedulesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get updateCompetitionSchedulesLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUpdatingCompetitionSchedules = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isUpdatingCompetitionSchedules = false

        await this.fetcherHash
          .competition
          .fetchCompetitionOnEvent()
      },
    }
  }

  /**
   * get: isUpdatingCompetitionSchedules
   *
   * @returns {boolean}
   */
  get isUpdatingCompetitionSchedules () {
    return this.statusReactive.isUpdatingCompetitionSchedules
  }

  /**
   * Submit form `updateCompetitionLimits`.
   *
   * @returns {Promise<void>}
   */
  async submitFormUpdateCompetitionLimits () {
    if (!this.updateCompetitionLimitsFormElement) {
      return
    }

    await this.updateCompetitionLimitsFormClerk
      .submitForm({
        formElement: this.updateCompetitionLimitsFormElement,
        hooks: this.updateCompetitionLimitsLauncherHooks,
      })
  }

  /**
   * get: updateCompetitionLimitsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get updateCompetitionLimitsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUpdatingCompetitionLimits = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isUpdatingCompetitionLimits = false

        await this.fetcherHash
          .competition
          .fetchCompetitionOnEvent()
      },
    }
  }

  /**
   * get: isUpdatingCompetitionLimits
   *
   * @returns {boolean}
   */
  get isUpdatingCompetitionLimits () {
    return this.statusReactive.isUpdatingCompetitionLimits
  }

  /**
   * Submit form `updateCompetitionPrizeRules`.
   *
   * @returns {Promise<void>}
   */
  async submitFormUpdateCompetitionPrizeRules () {
    if (!this.updateCompetitionPrizeRulesFormElement) {
      return
    }

    await this.updateCompetitionPrizeRulesFormClerk
      .submitForm({
        formElement: this.updateCompetitionPrizeRulesFormElement,
        hooks: this.updateCompetitionPrizeRulesLauncherHooks,
      })
  }

  /**
   * get: updateCompetitionPrizeRulesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get updateCompetitionPrizeRulesLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUpdatingCompetitionPrizeRules = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isUpdatingCompetitionPrizeRules = false

        await this.fetcherHash
          .competition
          .fetchCompetitionOnEvent()
      },
    }
  }

  /**
   * get: isUpdatingCompetitionPrizeRules
   *
   * @returns {boolean}
   */
  get isUpdatingCompetitionPrizeRules () {
    return this.statusReactive.isUpdatingCompetitionPrizeRules
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   toastStore: import('~/stores/toast').ToastStore
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   fetcherHash: {
 *     competition: import('./CompetitionDetailsEditFetcher').default
 *   }
 *   statusReactive: StatusReactive
 *   updateCompetitionFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   updateCompetitionSchedulesFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   updateCompetitionLimitsFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   updateCompetitionPrizeRulesFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
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
