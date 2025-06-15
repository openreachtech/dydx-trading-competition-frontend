import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * `competitionTradingMetrics` query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionTradingMetricsQueryRequestVariables>}
 */
export default class CompetitionTradingMetricsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionTradingMetricsQuery ($input: CompetitionTradingMetricsInput!) {
        competitionTradingMetrics (input: $input) {
          metrics {
            address {
              address
              name
            }
            makerFees
            takerFees
            totalFees
            makeVolume
            takerVolume
            totalVolume
            calculatedAt
          }
          pagination {
            totalCount
            limit
            offset
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} CompetitionTradingMetricsQueryRequestVariables
 */
