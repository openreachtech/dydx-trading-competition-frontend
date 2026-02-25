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
   * @returns {schema.graphql.CompetitionFinalOutcome | null}
   */
  get myOutcome () {
    return this.extractCompetitionFinalOutcome()
      ?.myOutcome
      ?? null
  }

  /**
   * get: outcomes
   *
   * @returns {Array<schema.graphql.CompetitionFinalOutcome>} List of outcomes
   */
  get outcomes () {
    return this.extractCompetitionFinalOutcome()
      ?.outcomes
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {schema.graphql.Pagination | null} Pagination information
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
 *   competitionFinalOutcome: schema.graphql.CompetitionFinalOutcomeResult
 * }} CompetitionFinalOutcomeResponseContent
 */
