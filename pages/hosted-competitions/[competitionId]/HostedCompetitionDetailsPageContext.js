import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * HostedCompetitionDetailsPageContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class HostedCompetitionDetailsPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {HostedCompetitionDetailsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    fetcherHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.fetcherHash = fetcherHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HostedCompetitionDetailsPageContext ? X : never} T, X
   * @override
   * @param {HostedCompetitionDetailsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        fetcherHash,
        statusReactive,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends HostedCompetitionDetailsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.fetcherHash
      .hostedCompetitionDetails
      .fetchCompetitionOnMounted()

    return this
  }

  /**
   * get: competitionCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').default}
   */
  get competitionCapsule () {
    return this.fetcherHash
      .hostedCompetitionDetails
      .competitionCapsule
  }

  /**
   * Extract `competition.`
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity | null}
   */
  extractCompetition () {
    return this.competitionCapsule.extractCompetition()
  }

  /**
   * Generate title.
   *
   * @returns {string}
   */
  generateTitle () {
    return this.competitionCapsule
      .title
      ?? '----'
  }

  /**
   * Generate image URL.
   *
   * @returns {string}
   */
  generateImageUrl () {
    return this.competitionCapsule
      .image
      ?? '/img/badges/league-badge-placeholder.png'
  }

  /**
   * get: tabs.
   *
   * @returns {Array<{
   *   tabKey: string
   *   label: string
   * }>} Tabs.
   */
  get tabs () {
    return [
      {
        tabKey: 'details',
        label: 'Arena Details',
      },
      {
        tabKey: 'participants',
        label: 'Participants',
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   fetcherHash: {
 *     hostedCompetitionDetails: import('./HostedCompetitionDetailsFetcher').default
 *   }
 *   statusReactive: StatusReactive
 * }} HostedCompetitionDetailsPageContextParams
 */

/**
 * @typedef {HostedCompetitionDetailsPageContextParams} HostedCompetitionDetailsPageContextFactoryParams
 */

/**
 * @typedef {import('vue').Reactive<Record<string, boolean>>} StatusReactive
 */
