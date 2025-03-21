import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

import {
  PAGINATION,
} from '~/app/constants'

/**
 * SectionLeaderboardContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class SectionLeaderboardContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {SectionLeaderboardContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
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
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * get: tableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>} Header entries.
   */
  get tableHeaderEntries () {
    return [
      {
        key: 'rank',
        label: 'Rank',
      },
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'address',
        label: 'Address',
      },
      {
        key: 'pnl',
        label: 'PnL',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'baseline',
        label: 'Performance Baseline',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'roi',
        label: 'ROI',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /** @override */
  setupComponent () {
    this.watch(
      () => this.extractCurrentPage(),
      async () => {
        await this.graphqlClientHash
          .competitionLeaderboard
          .invokeRequestOnEvent({
            variables: {
              input: {
                competitionId: this.extractCompetitionId(),
                pagination: {
                  limit: PAGINATION.LIMIT,
                  offset: (this.extractCurrentPage() - 1) * PAGINATION.LIMIT,
                },
              },
            },
            hooks: this.competitionLeaderboardLauncherHooks,
          })
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * Extract current page.
   *
   * @returns {number} Current page.
   */
  extractCurrentPage () {
    const currentPageQuery = Array.isArray(this.route.query.leaderboardPage)
      ? this.route.query.leaderboardPage[0]
      : this.route.query.leaderboardPage
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
  }

  /**
   * Extract competition ID.
   *
   * @returns {number | null} Competition ID.
   */
  extractCompetitionId () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }

  /**
   * get: competitionLeaderboardLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionLeaderboardLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: competitionCapsuleRef
   *
   * @returns {SectionLeaderboardContext['graphqlClientHash']['competitionLeaderboard']['capsuleRef']}
   */
  get competitionLeaderboardCapsuleRef () {
    return this.graphqlClientHash.competitionLeaderboard.capsuleRef
  }

  /**
   * get: rankings
   *
   * @returns {import('~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule')
   *   .ResponseContent['competitionLeaderboard']['rankings']
   * }
   */
  get rankings () {
    return this.competitionLeaderboardCapsuleRef.value.rankings
  }

  /**
   * Generate last calculated date.
   *
   * @returns {string} Last calculated date.
   */
  generateLastCalculatedAt () {
    const lastCalculatedAt = this.rankings
      .at(0)
      ?.calculatedAt
      ?? null

    if (!lastCalculatedAt) {
      return 'Last updated: Unknown'
    }

    const date = new Date(lastCalculatedAt)
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
   * Generate pagination result
   *
   * @returns {PaginationResult} Pagination result.
   */
  generatePaginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.competitionLeaderboardCapsuleRef.value.pagination
        ?.totalCount
        ?? 0,
    }
  }

  /**
   * Normalize rankings.
   *
   * @returns {Array<RankingTableEntry>} Normalized rankings.
   */
  normalizeRankings () {
    return this.rankings.map(it => ({
      rank: it.ranking,
      name: it.address.name || '----',
      address: it.address.address,
      baseline: it.performanceBaseline,
      roi: it.roi,
      pnl: it.pnl,
    }))
  }

  /**
   * Extract top three rankers.
   *
   * @returns {Array<RankingTableEntry>} Top three rankers.
   */
  generateTopThree () {
    const fallbackValue = {
      rank: '--',
      name: '------',
      address: '----',
      roi: '--',
      pnl: '--',
    }
    const firstThreeRankers = this.normalizeRankings()
      .slice(0, 3)

    // TODO: Value of ROI would be changed to number later.
    return Array.from(
      { length: 3 },
      (it, index) => firstThreeRankers.at(index) || fallbackValue
    )
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
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
 *   rank: number
 *   address: string
 *   baseline: number | null
 *   name: string
 *   roi: number | null
 *   pnl: number | null
 * }} RankingTableEntry
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */
