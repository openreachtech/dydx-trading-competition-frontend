import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

import {
  COMPETITION_STATUS,
  COMPETITION_PARTICIPANT_STATUS,
} from '~/app/constants'

const HEADING_LABEL = {
  REGISTRATION: 'Participants List',
  OUTCOME: 'Final Outcome',
}

const SECTION_HEADING_HASH = {
  [COMPETITION_STATUS.CANCELED.ID]: null,
  [COMPETITION_STATUS.CREATED.ID]: HEADING_LABEL.REGISTRATION,
  [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: HEADING_LABEL.REGISTRATION,
  [COMPETITION_STATUS.IN_PROGRESS.ID]: null,
  [COMPETITION_STATUS.COMPLETED.ID]: HEADING_LABEL.OUTCOME,
}

/**
 * SectionLeaderboardContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class SectionLeaderboardContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {SectionLeaderboardContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    router,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SectionLeaderboardContext ? X : never} T, X
   * @override
   * @param {SectionLeaderboardContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    router,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
      })
    )
  }

  /**
   * get: competitionStatusId
   *
   * @returns {number | null}
   */
  get competitionStatusId () {
    return this.props.competitionStatusId
  }

  /**
   * get: isLoadingLeaderboard
   *
   * @returns {PropsType['isLoadingLeaderboard']}
   */
  get isLoadingLeaderboard () {
    return this.props.isLoadingLeaderboard
  }

  /**
   * get: isLoadingMetricLeaderboard
   *
   * @returns {PropsType['isLoadingMetricLeaderboard']}
   */
  get isLoadingMetricLeaderboard () {
    return this.props.isLoadingMetricLeaderboard
  }

  /**
   * get: leaderboardTableHeaderEntries
   *
   * @returns {PropsType['leaderboardTableHeaderEntries']} Header entries.
   */
  get leaderboardTableHeaderEntries () {
    return this.props.leaderboardTableHeaderEntries
  }

  /**
   * get: leaderboardTableEntries
   *
   * @returns {PropsType['leaderboardTableEntries']} Body entries.
   */
  get leaderboardTableEntries () {
    return this.props.leaderboardTableEntries
  }

  /**
   * get: topThreeLeaderboardEntries
   *
   * @returns {PropsType['topThreeLeaderboardEntries']} Top three leaderboard entries.
   */
  get topThreeLeaderboardEntries () {
    return this.props.topThreeLeaderboardEntries
  }

  /**
   * get: metricLeaderboardTableHeaderEntries
   *
   * @returns {PropsType['metricLeaderboardTableHeaderEntries']}
   */
  get metricLeaderboardTableHeaderEntries () {
    return this.props.metricLeaderboardTableHeaderEntries
  }

  /**
   * get: metricLeaderboardTableEntries
   *
   * @returns {PropsType['metricLeaderboardTableEntries']}
   */
  get metricLeaderboardTableEntries () {
    return this.props.metricLeaderboardTableEntries
  }

  /**
   * get: leaderboardPaginationResult
   *
   * @returns {PropsType['leaderboardPaginationResult']} Pagination result.
   */
  get leaderboardPaginationResult () {
    return this.props.leaderboardPaginationResult
  }

  /**
   * get: metricLeaderboardPaginationResult
   *
   * @returns {PropsType['metricLeaderboardPaginationResult']} Pagination result.
   */
  get metricLeaderboardPaginationResult () {
    return this.props.metricLeaderboardPaginationResult
  }

  /**
   * get: lastLeaderboardUpdateTimestamp
   *
   * @returns {PropsType['lastLeaderboardUpdateTimestamp']} ISO String or `null` if unknown.
   */
  get lastLeaderboardUpdateTimestamp () {
    return this.props.lastLeaderboardUpdateTimestamp
  }

  /**
   * get: outcomeCsvUrl
   *
   * @returns {PropsType['outcomeCsvUrl']}
   */
  get outcomeCsvUrl () {
    return this.props.outcomeCsvUrl
  }

  /**
   * get: leaderboardTabs.
   *
   * @returns {Array<{
   *   tabKey: string
   *   label: string
   * }>} Tabs.
   */
  get leaderboardTabs () {
    return [
      {
        tabKey: 'pnl',
        label: 'PnL Ranking',
      },
      {
        tabKey: 'metrics',
        label: 'Volume Ranking',
      },
    ]
  }

  /**
   * Extract active tab key from route.
   *
   * @returns {import('vue-router').LocationQueryValue}
   */
  extractActiveTabKeyFromRoute () {
    const activeTabKey = Array.isArray(this.route.query.leaderboardTab)
      ? this.route.query.leaderboardTab.at(0)
      : this.route.query.leaderboardTab

    if (!activeTabKey) {
      return this.leaderboardTabs
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
   * Download outcome CSV.
   *
   * @returns {Promise<void>}
   */
  async downloadOutcomeCsv () {
    if (this.outcomeCsvUrl === null) {
      return
    }

    const response = await fetch(this.outcomeCsvUrl)
    const fileBlob = await response.blob()
    const blobURL = URL.createObjectURL(fileBlob)

    const link = document.createElement('a')

    const filename = this.extractOutcomeCsvFilename({
      response,
    })

    link.href = blobURL
    link.download = filename

    link.click()

    URL.revokeObjectURL(blobURL)
  }

  /**
   * Extract outcome CSV filename.
   *
   * @param {{
   *   response: Response
   * }} params - Parameters.
   * @returns {string} Filename.
   */
  extractOutcomeCsvFilename ({
    response,
  }) {
    const fallbackFilename = 'outcome.csv'

    const contentDisposition = response.headers.get('Content-Disposition')
    if (!contentDisposition) {
      return fallbackFilename
    }

    // Extract filename from Content-Disposition header
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/ui
    const matchedFilenames = contentDisposition.match(filenameRegex)

    if (!matchedFilenames) {
      return fallbackFilename
    }

    // Index 0 is the full match, index 1 is the filename.
    const firstMatchedFilename = matchedFilenames.at(1)

    return firstMatchedFilename
      ? firstMatchedFilename.replace(/['"]/ug, '')
      : fallbackFilename
  }

  /**
   * Normalize status name.
   *
   * @param {{
   *   statusName: string
   * }} params - Parameters.
   * @returns {string}
   */
  normalizeStatusName ({
    statusName,
  }) {
    return statusName.replaceAll('_', ' ')
  }

  /**
   * Generate section heading.
   *
   * @returns {string | null}
   */
  generateSectionHeading () {
    if (this.competitionStatusId === null) {
      return null
    }

    return SECTION_HEADING_HASH[this.competitionStatusId]
      ?? null
  }

  /**
   * Format `lastLeaderboardUpdateTimestamp`.
   *
   * @returns {string} Human-readable formatted timestamp.
   */
  formatLastLeaderboardUpdateTimestamp () {
    if (!this.lastLeaderboardUpdateTimestamp) {
      return 'Last updated: Unknown'
    }

    const date = new Date(this.lastLeaderboardUpdateTimestamp)
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    return `Last Updated: ${formatter.format(date)}`
  }

  /**
   * Extract top three rankers.
   *
   * @returns {Array<import('~/app/vue/contexts/CompetitionDetailsPageContext').NormalizedTopThreeLeaderboardEntry | null>} Top three rankers.
   */
  generateTopThree () {
    if (this.shouldHideTopRankers()) {
      return []
    }

    return Array.from(
      { length: 3 },
      (it, index) => this.topThreeLeaderboardEntries
        .at(index)
        ?? null
    )
  }

  /**
   * Whether to hide top rankers or not.
   *
   * @returns {boolean}
   */
  shouldHideTopRankers () {
    if (this.competitionStatusId === null) {
      return false
    }

    return [
      COMPETITION_STATUS.CANCELED.ID,
      COMPETITION_STATUS.CREATED.ID,
      COMPETITION_STATUS.REGISTRATION_ENDED.ID,
    ]
      .includes(this.competitionStatusId)
  }

  /**
   * Check if the competition has finished.
   *
   * @returns {boolean}
   */
  hasFinishedCompetition () {
    return this.competitionStatusId === COMPETITION_STATUS.COMPLETED.ID
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address: string
   * }} params - Parameters
   * @returns {string} Shortened address.
   */
  shortenAddress ({
    address,
  }) {
    if (address.length <= 12) {
      return address
    }

    const firstSevenCharacters = address.slice(0, 7)
    const lastFiveCharacters = address.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Generate profile's url.
   *
   * @param {{
   *   address: string
   * }} params - Parameters.
   * @returns {string} Profile's URL.
   */
  generateProfileUrl ({
    address,
  }) {
    return `/profiles/${address}`
  }

  /**
   * Generate host's address url.
   *
   * @param {{
   *   address: string
   * }} params - Parameters.
   * @returns {string} The host's wallet address URL on Mintscan.
   */
  generateAddressUrl ({
    address,
  }) {
    return `https://www.mintscan.io/dydx/address/${address}`
  }

  /**
   * Normalize performance baseline.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string} Normalized performance baseline.
   */
  normalizePerformanceBaseline ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsPerformanceBaseline()
  }

  /**
   * Normalize PnL.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string}
   */
  normalizePnl ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsPnl()
  }

  /**
   * Normalize ROI.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string}
   */
  normalizeRoi ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsRoi()
  }

  /**
   * Check if ROI is negative.
   *
   * @param {{
   *   value: number | null
   * }} params - Parameters.
   * @returns {boolean}
   */
  isPositiveRoi ({
    value,
  }) {
    if (value === null) {
      return false
    }

    return value > 0
  }

  /**
   * Check if ROI is negative.
   *
   * @param {{
   *   value: number | null
   * }} params - Parameters.
   * @returns {boolean}
   */
  isNegativeRoi ({
    value,
  }) {
    if (value === null) {
      return false
    }

    return value < 0
  }

  /**
   * Generate section heading CSS classes.
   *
   * @returns {Record<string, boolean>}
   */
  generateSectionHeadingClasses () {
    const sectionHeading = this.generateSectionHeading()

    return {
      hidden: sectionHeading === null,
      outcome: sectionHeading === HEADING_LABEL.OUTCOME,
    }
  }

  /**
   * Generate CSS classes for last-update note.
   *
   * @returns {Record<string, boolean>}
   */
  generateLastUpdateNoteClasses () {
    return {
      hidden: this.lastLeaderboardUpdateTimestamp === null,
    }
  }

  /**
   * Generate CSS classes for top rankers.
   *
   * @returns {Record<string, boolean>}
   */
  generateTopRankerClasses () {
    return {
      hidden: this.shouldHideTopRankers(),
    }
  }

  /**
   * Generate CSS classes for participant status.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateParticipantStatusClasses ({
    statusId,
  }) {
    return {
      registered: statusId === COMPETITION_PARTICIPANT_STATUS.REGISTERED.ID,
      active: statusId === COMPETITION_PARTICIPANT_STATUS.ACTIVE.ID,
      disqualified: statusId === COMPETITION_PARTICIPANT_STATUS.DISQUALIFIED.ID,
      completed: statusId === COMPETITION_PARTICIPANT_STATUS.COMPLETED.ID,
      canceled: statusId === COMPETITION_PARTICIPANT_STATUS.CANCELED.ID,
    }
  }

  /**
   * Format currency.
   *
   * @param {{
   *   figure: string | number
   * }} params - Parameters.
   * @returns {string}
   * @todo Please put this method in `BaseAppFuroContext`.
   */
  formatCurrency ({
    figure,
  }) {
    if (this.isNullish({
      value: figure,
    })) {
      return '--'
    }

    const normalizedFigure = typeof figure === 'string'
      ? parseFloat(figure)
      : figure

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return formatter.format(normalizedFigure)
  }

  /**
   * Check if a value is null or undefined.
   *
   * @param {{
   *   value: *
   * }} params - Parameters.
   * @returns {boolean}
   */
  isNullish ({
    value,
  }) {
    return value === null
      || value === undefined
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 * }} SectionLeaderboardContextParams
 */

/**
 * @typedef {SectionLeaderboardContextParams} SectionLeaderboardContextFactoryParams
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */

/**
 * @typedef {{
 *   competitionStatusId: number | null
 *   isLoadingLeaderboard: boolean
 *   isLoadingMetricLeaderboard: boolean
 *   leaderboardTableHeaderEntries: Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>
 *   leaderboardTableEntries: import('~/app/vue/contexts/CompetitionDetailsPageContext').LeaderboardEntries
 *   metricLeaderboardTableHeaderEntries: Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>
 *   metricLeaderboardTableEntries: Array<import('~/app/vue/contexts/CompetitionDetailsPageContext').MetricLeaderboardEntry>
 *   topThreeLeaderboardEntries: import('~/app/vue/contexts/CompetitionDetailsPageContext').TopThreeLeaderboardEntries
 *   leaderboardPaginationResult: PaginationResult
 *   metricLeaderboardPaginationResult: PaginationResult
 *   lastLeaderboardUpdateTimestamp: string | null
 *   outcomeCsvUrl: string | null
 * }} PropsType
 */
