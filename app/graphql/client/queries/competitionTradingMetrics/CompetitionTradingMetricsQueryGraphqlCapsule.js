import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * `competitionTradingMetrics` query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionTradingMetricsQueryResponseContent>}
 */
export default class CompetitionTradingMetricsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `competitionTradingMetrics` value hash.
   *
   * @returns {CompetitionTradingMetricsQueryResponseContent['competitionTradingMetrics'] | null}
   */
  extractCompetitionTradingMetricsValueHash () {
    return this.extractContent()
      ?.competitionTradingMetrics
      ?? null
  }

  /**
   * get: metrics
   *
   * @returns {Array<TradingMetric>}
   */
  get metrics () {
    return this.extractCompetitionTradingMetricsValueHash()
      ?.metrics
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {Pagination | null}
   */
  get pagination () {
    return this.extractCompetitionTradingMetricsValueHash()
      ?.pagination
      ?? null
  }

  /**
   * get: limit
   *
   * @returns {number | null}
   */
  get limit () {
    return this.pagination
      ?.limit
      ?? null
  }

  /**
   * get: totalCount
   *
   * @returns {number | null}
   */
  get totalCount () {
    return this.pagination
      ?.totalCount
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionTradingMetrics: {
 *     metrics: Array<TradingMetric>
 *     pagination: Pagination
 *   }
 * }} CompetitionTradingMetricsQueryResponseContent
 */

/**
 * @typedef {{
 *   address: {
 *     address: string
 *     name: string
 *   }
 *   makerFees: number
 *   takerFees: number
 *   totalFees: number
 *   makeVolume: number
 *   takerVolume: number
 *   totalVolume: number
 *   calculatedAt: string // ISO string
 * }} TradingMetric
 */

/**
 * @typedef {{
 *   totalCount: number
 *   limit: number
 *   offset: number
 * }} Pagination
 */
