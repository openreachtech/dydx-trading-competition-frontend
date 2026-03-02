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
   * get: myMetric
   *
   * @returns {schema.graphql.CompetitionTradingMetric | null}
   */
  get myMetric () {
    return this.extractCompetitionTradingMetricsValueHash()
      ?.myMetric
      ?? null
  }

  /**
   * get: metrics
   *
   * @returns {Array<schema.graphql.CompetitionTradingMetric>}
   */
  get metrics () {
    return this.extractCompetitionTradingMetricsValueHash()
      ?.metrics
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {schema.graphql.Pagination | null}
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
 *   competitionTradingMetrics: schema.graphql.CompetitionTradingMetricsResult
 * }} CompetitionTradingMetricsQueryResponseContent
 */
