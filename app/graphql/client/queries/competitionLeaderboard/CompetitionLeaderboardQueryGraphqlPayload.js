import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionLeaderboardQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<CompetitionLeaderboardQueryRequestVariables>}
 */
export default class CompetitionLeaderboardQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionLeaderboardQuery ($input: CompetitionLeaderboardInput!) {
        competitionLeaderboard (input: $input) {
          myRanking {
            address {
              address
              name
            }
            performanceBaseline
            ranking
            roi
            pnl
            calculatedAt
          }
          rankings {
            address {
              address
              name
            }
            ranking
            performanceBaseline
            roi
            pnl
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
 * }} CompetitionLeaderboardQueryRequestVariables
 */
