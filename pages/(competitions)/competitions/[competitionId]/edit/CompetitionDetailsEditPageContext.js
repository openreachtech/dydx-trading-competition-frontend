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
    currentStepRef,
    editCompetitionFormShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
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
    currentStepRef,
    editCompetitionFormShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        currentStepRef,
        editCompetitionFormShallowRef,
      })
    )
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
