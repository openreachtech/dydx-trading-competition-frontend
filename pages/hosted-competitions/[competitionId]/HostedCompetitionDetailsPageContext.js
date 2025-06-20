import {
  useHead,
} from '@unhead/vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  BASE_PAGE_TITLE,
} from '~/app/constants'

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
    router,
    fetcherHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
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
    router,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
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
      .competitionParticipantStatuses
      .fetchCompetitionParticipantStatusesOnMounted()

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

    this.watch(
      () => this.competitionTitle,
      () => {
        if (this.competitionTitle === null) {
          return
        }

        useHead({
          title: `${this.competitionTitle} - ${BASE_PAGE_TITLE}`,
        })
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
   * get: competitionTitle
   *
   * @returns {string | null}
   */
  get competitionTitle () {
    return this.competitionCapsule.title
  }

  /**
   * Generate title.
   *
   * @returns {string}
   */
  generateTitle () {
    return this.competitionTitle
      ?? '----'
  }

  /**
   * Generate image URL.
   *
   * @returns {string}
   */
  generateImageUrl () {
    return this.competitionCapsule
      .imageUrl
      ?? '/img/badges/league-badge-placeholder.png'
  }

  /**
   * Generate URL to competition edit page.
   *
   * @returns {string}
   */
  generateCompetitionEditUrl () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return ''
    }

    return `/competitions/${competitionId}/edit`
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

  /**
   * Extract active tab key from route.
   *
   * @returns {import('vue-router').LocationQueryValue}
   */
  extractActiveTabKeyFromRoute () {
    const activeTabKey = Array.isArray(this.route.query.tab)
      ? this.route.query.tab.at(0)
      : this.route.query.tab

    if (!activeTabKey) {
      return this.tabs
        .at(0)
        ?.tabKey
        ?? null
    }

    return activeTabKey
  }

  /**
   * Change tab.
   *
   * @param {{
   *   fromTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default
   *   toTab: import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroTabItemContext').default
   *   tabKey?: string
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async changeTab ({
    fromTab,
    toTab,
    tabKey = 'tab',
  }) {
    await this.router.replace({
      query: {
        ...this.route.query,
        [tabKey]: toTab.tabKey,
      },
    })
  }

  /**
   * get: competitionParticipantStatuses
   *
   * @returns {Array<import('~/app/graphql/client/queries/competitionParticipantStatuses/CompetitionParticipantStatusesQueryGraphqlCapsule').Status>}
   */
  get competitionParticipantStatuses () {
    return this.fetcherHash
      .competitionParticipantStatuses
      .competitionParticipantStatusesCapsule
      .statuses
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   fetcherHash: {
 *     competitionParticipants: import('./CompetitionParticipantsFetcher').default
 *     competitionParticipantStatuses: import('./CompetitionParticipantStatusesFetcher').default
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
