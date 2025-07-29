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
   * get: myRanking
   *
   * @returns {ResponseContent['competitionLeaderboard']['myRanking'] | null}
   */
  get myRanking () {
    return this.extractCompetitionLeaderboardValueHash()
      ?.myRanking
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
}

/**
 * @typedef {{
 *   competitionLeaderboard: {
 *     myRanking: CompetitionRanking
 *     rankings: Array<CompetitionRanking>
 *     pagination: {
 *       totalCount: number
 *       limit: number
 *       offset: number
 *     }
 *   }
 * }} ResponseContent
 */

/**
 * @typedef {{
 *   address: {
 *     address: string
 *     name?: string
 *   }
 *   performanceBaseline: number
 *   ranking: number
 *   roi: number
 *   pnl: number
 *   calculatedAt: string // ISO string
 * }} CompetitionRanking
 */
