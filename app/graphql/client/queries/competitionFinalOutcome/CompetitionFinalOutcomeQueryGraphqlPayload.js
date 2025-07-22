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
          myOutcome {
            address {
              address
              name
            }
            ranking
            performanceBaseline
            prizeUsdAmount
            pnl
            roi
          }
          outcomes {
            address {
              address
              name
            }
            ranking
            performanceBaseline
            prizeUsdAmount
            pnl
            roi
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
 *     address?: string
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
