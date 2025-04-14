import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * JoinCompetitionMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<JoinCompetitionMutationResponseContent>}
 */
export default class JoinCompetitionMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `joinCompetition` value hash.
   *
   * @returns {JoinCompetitionMutationResponseContent['joinCompetition'] | null}
   */
  extractJoinCompetitionValueHash () {
    return this.extractContent()
      ?.joinCompetition
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {JoinCompetitionMutationResponseContent['joinCompetition']['competitionId'] | null}
   */
  get competitionId () {
    return this.extractJoinCompetitionValueHash()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   joinCompetition: {
 *     competitionId: number
 *   }
 * }} JoinCompetitionMutationResponseContent
 */
