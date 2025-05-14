import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class SectionLeaderboardContext extends BaseFuroContext {
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
   * get: leaderboardPaginationResult
   *
   * @returns {PropsType['leaderboardPaginationResult']} Pagination result.
   */
  get leaderboardPaginationResult () {
    return this.props.leaderboardPaginationResult
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
   * Download outcome CSV.
   *
   * @returns {Promise<void>}
   */
  async downloadOutcomeCsv () {
    if (this.outcomeCsvUrl === null) {
      return
    }

    const response = await fetch(this.outcomeCsvUrl)
    const pdfBlob = await response.blob()
    const blobURL = URL.createObjectURL(pdfBlob)

    const link = document.createElement('a')

    link.href = blobURL
    link.download = 'outcome.csv'

    link.click()

    URL.revokeObjectURL(blobURL)
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   route: ReturnType<import('#imports').useRoute>
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   statusReactive: StatusReactive
 * }} SectionLeaderboardContextParams
 */

/**
 * @typedef {SectionLeaderboardContextParams} SectionLeaderboardContextFactoryParams
 */

/**
 * @typedef {'competitionLeaderboard'} GraphqlClientHashKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
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
 *   leaderboardTableHeaderEntries: Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>
 *   leaderboardTableEntries: import('~/app/vue/contexts/CompetitionDetailsPageContext').LeaderboardEntries
 *   topThreeLeaderboardEntries: import('~/app/vue/contexts/CompetitionDetailsPageContext').TopThreeLeaderboardEntries
 *   leaderboardPaginationResult: PaginationResult
 *   lastLeaderboardUpdateTimestamp: string | null
 *   outcomeCsvUrl: string | null
 * }} PropsType
 */
