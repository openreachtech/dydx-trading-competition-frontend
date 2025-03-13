import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionLeaderboardQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<typeof CompetitionLeaderboardQueryGraphqlPayload, CompetitionLeaderboardQueryRequestVariables>}
 */
export default class CompetitionLeaderboardQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionLeaderboardQuery ($input: CompetitionLeaderboardInput!) {
        competitionLeaderboard (input: $input) {
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
