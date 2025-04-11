import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionFinalOutcome query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionFinalOutcomeRequestVariables>}
 */
export default class CompetitionFinalOutcomeQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionFinalOutcome ($input: CompetitionFinalOutcomeInput!) {
        competitionFinalOutcome (input: $input) {
          outcomes {
            address {
              address
              name
            }
            ranking
            performanceBaseline
            prizeUsdAmount
            pnl
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
 * }} CompetitionFinalOutcomeRequestVariables
 */
