import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionFinalOutcome query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionFinalOutcomeResponseContent>}
 */
export default class CompetitionFinalOutcomeQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competition final outcome content.
   *
   * @returns {CompetitionFinalOutcomeResponseContent['competitionFinalOutcome'] | null} Competition final outcome content
   */
  extractCompetitionFinalOutcome () {
    return this.extractContent()
      ?.competitionFinalOutcome
      ?? null
  }

  /**
   * get: myOutcome
   *
   * @returns {Outcome | null}
   */
  get myOutcome () {
    return this.extractCompetitionFinalOutcome()
      ?.myOutcome
      ?? null
  }

  /**
   * get: outcomes
   *
   * @returns {Array<Outcome>} List of outcomes
   */
  get outcomes () {
    return this.extractCompetitionFinalOutcome()
      ?.outcomes
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {Pagination | null} Pagination information
   */
  get pagination () {
    return this.extractCompetitionFinalOutcome()
      ?.pagination
      ?? null
  }

  /**
   * get: totalCount
   *
   * @returns {number | null} Total count of outcomes
   */
  get totalCount () {
    return this.pagination
      ?.totalCount
      ?? null
  }

  /**
   * get: limit
   *
   * @returns {number | null} Limit of outcomes per page
   */
  get limit () {
    return this.pagination
      ?.limit
      ?? null
  }

  /**
   * get: offset
   *
   * @returns {number | null} Offset of outcomes
   */
  get offset () {
    return this.pagination
      ?.offset
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionFinalOutcome: {
 *     myOutcome: Outcome | null
 *     outcomes: Array<Outcome>
 *     pagination: Pagination
 *   }
 * }} CompetitionFinalOutcomeResponseContent
 */

/**
 * @typedef {{
 *   address: {
 *     address: string
 *     name: string
 *   }
 *   ranking: number
 *   performanceBaseline: number
 *   prizeUsdAmount: string
 *   pnl: number
 *   roi: number
 * }} Outcome
 */

/**
 * @typedef {{
 *   totalCount: number
 *   limit: number
 *   offset: number
 * }} Pagination
 */
