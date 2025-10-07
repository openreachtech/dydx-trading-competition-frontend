import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  DEFAULT_COMPETITION_STATUS_FILTERS,
  PAGINATION,
  SCHEDULE_CATEGORY,
} from '~/app/constants'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

const ACTION_HASH = /** @type {const} */ ({
  VIEW_DETAILS: 'viewDetails',
  EDIT_LEAGUE: 'editLeague',
})

/**
 * HostedCompetitionsPageContext
 *
 * @extends {BaseAppContext<null, {}, null>}
 */
export default class HostedCompetitionsPageContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {HostedCompetitionsPageContextParams} params - Parameters of this constructor.
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
   * @template {X extends typeof HostedCompetitionsPageContext ? X : never} T, X
   * @override
   * @param {HostedCompetitionsPageContextFactoryParams} params - Parameters of this factory method.
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
   * get: isLoadingCompetitions
   *
   * @returns {boolean}
   */
  get isLoadingCompetitions () {
    return this.statusReactive.isLoadingCompetitions
  }

  /**
   * get: hostedCompetitionsFetcher
   *
   * @returns {import('./HostedCompetitionsFetcher').default}
   */
  get hostedCompetitionsFetcher () {
    return this.fetcherHash.hostedCompetitions
  }

  /**
   * Setup component.
   *
   * @template {X extends HostedCompetitionsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.hostedCompetitionsFetcher.fetchCompetitionsOnMounted()

    this.watch(
      [
        () => this.extractTitleFromRoute(),
        () => this.extractStatusIdsFromRoute(),
        () => this.extractCurrentPageFromRoute(),
      ],
      async () => {
        await this.hostedCompetitionsFetcher.fetchCompetitionsOnEvent()
      }
    )

    return this
  }

  /**
   * Extract title from route.
   *
   * @returns {string | null}
   */
  extractTitleFromRoute () {
    const queryTitle = Array.isArray(this.route.query.title)
      ? this.route.query.title[0]
      : this.route.query.title

    return queryTitle
      ?? null
  }

  /**
   * Extract `statusIds` from route.
   *
   * @returns {Array<number>}
   */
  extractStatusIdsFromRoute () {
    const {
      statusId,
    } = this.route.query

    if (!statusId) {
      return DEFAULT_COMPETITION_STATUS_FILTERS
    }

    const statusIds = Array.isArray(statusId)
      ? statusId
      : [statusId]
    const normalizedStatusIds = statusIds.map(it => Number(it))
      .filter(it => !isNaN(it))

    if (normalizedStatusIds.length === 0) {
      return DEFAULT_COMPETITION_STATUS_FILTERS
    }

    return normalizedStatusIds
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
   * Update `title` query.
   *
   * @param {{
   *   title?: string
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async updateTitleQuery ({
    title,
  }) {
    const replacementQuery = this.buildTitleReplacementQuery({
      title,
    })

    await this.router.replace({
      query: replacementQuery,
    })
  }

  /**
   * Build replacement query for `title`.
   *
   * @param {{
   *   title?: string
   * }} params - Parameters.
   * @returns {import('vue-router').LocationQuery}
   */
  buildTitleReplacementQuery ({
    title,
  }) {
    const {
      title: _,
      ...restQuery
    } = this.route.query

    return title
      ? {
        ...restQuery,
        title,
      }
      : restQuery
  }

  /**
   * get: competitionsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').default}
   */
  get competitionsCapsule () {
    return this.fetcherHash
      .hostedCompetitions
      .competitionsCapsule
  }

  /**
   * Extract `totalCount`.
   *
   * @returns {number}
   */
  extractTotalCount () {
    const {
      totalCount,
    } = this.competitionsCapsule

    return totalCount
      ?? 0
  }

  /**
   * Generate `competitions` pagination result.
   *
   * @returns {PaginationResult}
   */
  generateCompetitionsPaginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.extractTotalCount(),
    }
  }

  /**
   * get: competitionsTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get competitionsTableHeaderEntries () {
    return [
      {
        key: 'title',
        label: 'Title',
      },
      {
        key: 'actions',
        label: '',
      },
      {
        key: 'startDate',
        label: 'Start (MM/DD/YYYY)',
      },
      {
        key: 'endDate',
        label: 'End (MM/DD/YYYY)',
      },
      {
        key: 'status',
        label: 'Status',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Extract `competitions`
   *
   * @returns {Array<import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').CompetitionEntity>}
   */
  extractCompetitions () {
    return this.competitionsCapsule.extractCompetitions()
  }

  /**
   * Generate table entries for `competitions`.
   *
   * @returns {Array<*>}
   */
  generateCompetitionsTableEntries () {
    const competitions = this.extractCompetitions()

    return competitions.map(competition => ({
      competitionId: competition.competitionId,
      title: competition.title,
      imageUrl: this.generateCompetitionImageUrl({
        imageUrl: competition.imageUrl,
      }),
      startDate: this.extractRegistrationStartDate({
        schedules: competition.schedules,
      }),
      endDate: this.extractCompetitionEndDate({
        schedules: competition.schedules,
      }),
      status: competition.status.statusId,
    }))
  }

  /**
   * get: actionOptions
   *
   * @returns {Array<import('~/components/units/AppSelectContext').SelectOption>}
   */
  get actionOptions () {
    return [
      {
        label: 'View Details',
        value: ACTION_HASH.VIEW_DETAILS,
        iconName: 'heroicons-outline:eye',
      },
      {
        label: 'Edit Arena',
        value: ACTION_HASH.EDIT_LEAGUE,
        iconName: 'heroicons:pencil-square',
      },
    ]
  }

  /**
   * Select competition action.
   *
   * @param {{
   *   action: (typeof ACTION_HASH)[keyof typeof ACTION_HASH]
   *   competitionId: number
   * }} params - Parameters.
   * @returns {Promise<void>}
   * @throws {Error} Will throw if action is unknown.
   */
  async selectCompetitionAction ({
    action,
    competitionId,
  }) {
    const actionHash = {
      [ACTION_HASH.VIEW_DETAILS]: () => this.navigateToCompetitionDetails({
        competitionId,
      }),
      [ACTION_HASH.EDIT_LEAGUE]: () => this.navigateToCompetitionEdit({
        competitionId,
      }),
    }

    if (!actionHash[action]) {
      throw new Error(`Unknown action: ${action}`)
    }

    await actionHash[action]()
  }

  /**
   * Navigate to competition details page.
   *
   * @param {{
   *   competitionId: number
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async navigateToCompetitionDetails ({
    competitionId,
  }) {
    const competitionDetailsUrl = this.generateCompetitionDetailsUrl({
      competitionId,
    })

    await this.router.push(competitionDetailsUrl)
  }

  /**
   * Navigate to competition edit page.
   *
   * @param {{
   *   competitionId: number
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async navigateToCompetitionEdit ({
    competitionId,
  }) {
    const competitionDetailsUrl = this.generateCompetitionEditUrl({
      competitionId,
    })

    await this.router.push(competitionDetailsUrl)
  }

  /**
   * Generate URL to competition details page.
   *
   * @param {{
   *   competitionId: number
   * }} params - Parameters.
   * @returns {string}
   */
  generateCompetitionDetailsUrl ({
    competitionId,
  }) {
    return `/hosted-competitions/${competitionId}`
  }

  /**
   * Generate URL to competition edit page.
   *
   * @param {{
   *   competitionId: number
   * }} params - Parameters.
   * @returns {string}
   */
  generateCompetitionEditUrl ({
    competitionId,
  }) {
    return `/competitions/${competitionId}/edit`
  }

  /**
   * Generate competition image url.
   *
   * @param {{
   *   imageUrl?: string
   * }} params - Parameters.
   * @returns {string}
   */
  generateCompetitionImageUrl ({
    imageUrl,
  }) {
    if (!imageUrl) {
      return '/img/badges/league-badge-placeholder.png'
    }

    return imageUrl
  }

  /**
   * Extract registration start date of competition.
   *
   * @param {{
   *   schedules: Array<Schedule>
   * }} params - Parameters.
   * @returns {string | null}
   */
  extractRegistrationStartDate ({
    schedules,
  }) {
    return this.extractCompetitionDatetimeById({
      schedules,
      categoryId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
    })
  }

  /**
   * Extract end date of competition.
   *
   * @param {{
   *   schedules: Array<Schedule>
   * }} params - Parameters.
   * @returns {string | null}
   */
  extractCompetitionEndDate ({
    schedules,
  }) {
    return this.extractCompetitionDatetimeById({
      schedules,
      categoryId: SCHEDULE_CATEGORY.COMPETITION_END.ID,
    })
  }

  /**
   * Extract competition datetime by id.
   *
   * @param {{
   *   schedules: Array<Schedule>
   *   categoryId: number
   * }} params - Parameters.
   * @returns {string | null}
   */
  extractCompetitionDatetimeById ({
    schedules,
    categoryId,
  }) {
    return schedules.find(schedule => schedule.category.categoryId === categoryId)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Format date.
   *
   * @param {{
   *   datetime: string | null
   * }} params - Parameters.
   * @returns {string}
   */
  formatDate ({
    datetime,
  }) {
    if (!datetime) {
      return '--/--/--'
    }

    const date = new Date(datetime)
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })

    return formatter.format(date)
  }

  /**
   * Format time.
   *
   * @param {{
   *   datetime: string | null
   * }} params - Parameters.
   * @returns {string}
   */
  formatTime ({
    datetime,
  }) {
    if (!datetime) {
      return '-- UTC'
    }

    const date = new Date(datetime)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
      hour12: false,
    })

    return `${formatter.format(date)} UTC`
  }

  /**
   * Generate badge severity.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateBadgeSeverity ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateSeverity()
  }

  /**
   * Generate badge description.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {string} Badge description.
   */
  generateBadgeDescription ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateDescription()
  }

  /**
   * Generate icon name for badge.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateBadgeIconName ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateIconName()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   fetcherHash: {
 *     hostedCompetitions: import('./HostedCompetitionsFetcher').default
 *   }
 *   statusReactive: import('vue').Reactive<{
 *     isLoadingCompetitions: boolean
 *   }>
 * }} HostedCompetitionsPageContextParams
 */

/**
 * @typedef {HostedCompetitionsPageContextParams} HostedCompetitionsPageContextFactoryParams
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */

/**
 * @typedef {{
 *   category: {
 *     categoryId: number
 *     name: string
 *     description: string
 *   }
 *   scheduledDatetime: string
 * }} Schedule
 */
