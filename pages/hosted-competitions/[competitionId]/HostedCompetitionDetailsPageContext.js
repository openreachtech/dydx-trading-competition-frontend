import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

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

    route,
    fetcherHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
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
    route,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
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
      .competitionParticipants
      .fetchCompetitionParticipantsOnMounted()

    this.fetcherHash
      .hostedCompetitionDetails
      .fetchCompetitionOnMounted()

    this.watch(
      [
        () => this.extractCurrentPageFromRoute(),
        () => this.extractStatusIdFromRoute(),
      ],
      async () => {
        await this.fetcherHash
          .competitionParticipants
          .fetchCompetitionParticipantsOnEvent()
      }
    )

    return this
  }

  /**
   * Extract current page from route.
   *
   * @returns {number}.
   */
  extractCurrentPageFromRoute () {
    const currentPageQuery = Array.isArray(this.route.query.page)
      ? this.route.query.page[0]
      : this.route.query.page
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
  }

  /**
   * Extract statusId from route.
   *
   * @returns {number | null}.
   */
  extractStatusIdFromRoute () {
    const statusIdQuery = Array.isArray(this.route.query.statusId)
      ? this.route.query.statusId[0]
      : this.route.query.statusId
    const statusId = Number(statusIdQuery)

    return isNaN(statusId)
      ? null
      : statusId
  }

  /**
   * get: competitionParticipantsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').default}
   */
  get competitionParticipantsCapsule () {
    return this.fetcherHash
      .competitionParticipants
      .competitionParticipantsCapsule
  }

  /**
   * get: participants
   *
   * @returns {Array<import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').Participant>}
   */
  get participants () {
    return this.competitionParticipantsCapsule.participants
  }

  /**
   * get: participantsLimit
   *
   * @returns {number | null}
   */
  get participantsLimit () {
    return this.competitionParticipantsCapsule.limit
  }

  /**
   * get: participantsTotalCount
   *
   * @returns {number | null}
   */
  get participantsTotalCount () {
    return this.competitionParticipantsCapsule.totalCount
  }

  /**
   * Generate participants pagination.
   *
   * @returns {{
   *   limit: number
   *   totalRecords: number
   * }}
   */
  generateParticipantsPagination () {
    const limit = this.participantsLimit
      ?? 0
    const totalRecords = this.participantsTotalCount
      ?? 0

    return {
      limit,
      totalRecords,
    }
  }

  /**
   * Fetch `participantsCurrentEquities`.
   *
   * @param {{
   *   competitionParticipantIds: Array<number>
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchParticipantsCurrentEquities ({
    competitionParticipantIds,
  }) {
    await this.fetcherHash
      .participantsCurrentEquities
      .fetchParticipantsCurrentEquitiesOnEvent({
        competitionParticipantIds,
      })
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
   * get: status
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Status | null}
   */
  get status () {
    return this.extractCompetition()
      ?.status
      ?? null
  }

  /**
   * get: statusId
   *
   * @returns {number | null}
   */
  get statusId () {
    return this.status
      ?.statusId
      ?? null
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
   * Generate badge severity.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateBadgeSeverity () {
    const badgeContext = CompetitionBadgeContext.create({
      statusId: this.statusId,
    })

    return badgeContext.generateSeverity()
  }

  /**
   * Generate badge description.
   *
   * @returns {string} Badge description.
   */
  generateBadgeDescription () {
    const badgeContext = CompetitionBadgeContext.create({
      statusId: this.statusId,
    })

    return badgeContext.generateDescription()
  }

  /**
   * Generate icon name for badge.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateBadgeIconName () {
    const badgeContext = CompetitionBadgeContext.create({
      statusId: this.statusId,
    })

    return badgeContext.generateIconName()
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
 *   route: ReturnType<import('vue-router').useRoute>
 *   fetcherHash: {
 *     competitionParticipants: import('./CompetitionParticipantsFetcher').default
 *     hostedCompetitionDetails: import('./HostedCompetitionDetailsFetcher').default
 *     participantsCurrentEquities: import('./ParticipantsCurrentEquitiesFetcher').default
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
