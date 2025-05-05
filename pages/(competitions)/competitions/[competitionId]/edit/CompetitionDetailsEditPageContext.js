import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * CompetitionDetailsEditPageContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class CompetitionDetailsEditPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {CompetitionDetailsEditPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    fetcherHash,
    currentStepRef,
    editCompetitionFormShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.fetcherHash = fetcherHash
    this.currentStepRef = currentStepRef
    this.editCompetitionFormShallowRef = editCompetitionFormShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionDetailsEditPageContext ? X : never} T, X
   * @override
   * @param {CompetitionDetailsEditPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    fetcherHash,
    currentStepRef,
    editCompetitionFormShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        fetcherHash,
        currentStepRef,
        editCompetitionFormShallowRef,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends CompetitionDetailsEditPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.fetcherHash
      .competitionDetailsEdit
      .fetchCompetitionOnMounted()

    return this
  }

  /**
   * get: competitionDetailsEditCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').default}
   */
  get competitionDetailsEditCapsule () {
    return this.fetcherHash
      .competitionDetailsEdit
      .competitionCapsule
  }

  /**
   * Generate initial form value hash for step details.
   *
   * @returns {import('~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext').InitialFormValueHash}
   */
  generateStepDetailsInitialValueHash () {
    return {
      title: this.competitionDetailsEditCapsule.title,
      description: this.competitionDetailsEditCapsule.description,
      competitionImageUrl: this.competitionDetailsEditCapsule.image,
    }
  }

  /**
   * Generate initial form value hash for step details.
   *
   * @returns {import('~/components/competition-add/AddCompetitionFormStepTimelineContext').InitialFormValueHash}
   */
  generateStepTimelineInitialValueHash () {
    return {
      schedules: this.competitionDetailsEditCapsule.schedules,
    }
  }

  /**
   * Generate initial form value hash for step participation.
   *
   * @returns {import('~/components/competition-add/AddCompetitionFormStepParticipationContext').InitialFormValueHash}
   */
  generateStepParticipationInitialValueHash () {
    return {
      participantLowerLimit: this.competitionDetailsEditCapsule.participantLowerLimit,
      participantUpperLimit: this.competitionDetailsEditCapsule.participantUpperLimit,
      minimumDeposit: this.competitionDetailsEditCapsule.minimumDeposit,
    }
  }

  /**
   * Generate initial form value hash for step prize.
   *
   * @returns {import('~/components/competition-add/AddCompetitionFormStepPrizeContext').InitialFormValueHash}
   */
  generateStepPrizeInitialValueHash () {
    const prizeRules = this.competitionDetailsEditCapsule
      .prizeRules
      .map(prizeRule => ({
        ...prizeRule,
        isRankRange: prizeRule.rankFrom !== prizeRule.rankTo,
      }))

    return {
      prizeRules,
    }
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
   * Generate competition details URL.
   *
   * @returns {string}
   */
  generateCompetitionDetailsUrl () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return '/competitions'
    }

    return `/competitions/${competitionId}`
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
   * Generate CSS classes for step element.
   *
   * @param {{
   *   step: number
   * }} params - Parameters.
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generateStepClasses ({
    step,
  }) {
    return [
      {
        hidden: this.currentStep !== step,
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   fetcherHash: {
 *     competitionDetailsEdit: import('./CompetitionDetailsEditFetcher').default
 *   }
 *   currentStepRef: import('vue').Ref<number>
 *   editCompetitionFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 * }} CompetitionDetailsEditPageContextParams
 */

/**
 * @typedef {CompetitionDetailsEditPageContextParams} CompetitionDetailsEditPageContextFactoryParams
 */

/**
 * @typedef {{
 *   step: number
 *   title: string
 * }} Step
 */
