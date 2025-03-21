import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionLeaderboardQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class CompetitionLeaderboardQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extracts the competition leaderboard value hash from the response content
   *
   * @returns {ResponseContent['competitionLeaderboard'] | null}
   */
  extractCompetitionLeaderboardValueHash () {
    const content = this.extractContent()

    return content
      ?.competitionLeaderboard
      ?? null
  }

  /**
   * get: rankings
   *
   * @returns {ResponseContent['competitionLeaderboard']['rankings']}
   */
  get rankings () {
    return this.extractCompetitionLeaderboardValueHash()
      ?.rankings
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {ResponseContent['competitionLeaderboard']['pagination'] | null}
   */
  get pagination () {
    return this.extractCompetitionLeaderboardValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionLeaderboard: {
 *     rankings: Array<{
 *       address: {
 *         address: string
 *         name?: string
 *       }
 *       performanceBaseline: number
 *       ranking: number
 *       roi: number
 *       pnl: number
 *       calculatedAt: string // ISO string
 *     }>
 *     pagination: {
 *       totalCount: number
 *       limit: number
 *       offset: number
 *     }
 *   }
 * }} ResponseContent
 */
