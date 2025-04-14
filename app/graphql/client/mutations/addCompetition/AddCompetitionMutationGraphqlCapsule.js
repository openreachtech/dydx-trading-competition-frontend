import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddCompetitionMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddCompetitionMutationResponseContent>}
 */
export default class AddCompetitionMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract add competition.
   *
   * @returns {AddCompetitionMutationResponseContent['addCompetition'] | null} Add competition object.
   */
  extractAddCompetition () {
    return this.extractContent()
      ?.addCompetition
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {number | null} Competition ID.
   */
  get competitionId () {
    return this.extractAddCompetition()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   addCompetition: {
 *     competitionId: number
 *   }
 * }} AddCompetitionMutationResponseContent
 */
