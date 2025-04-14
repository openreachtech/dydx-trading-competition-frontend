import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UnregisterFromCompetition mutation GraphQL capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class UnregisterFromCompetitionMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `unregisterFromCompetition`.
   *
   * @returns {ResponseContent['unregisterFromCompetition'] | null} Unregister response content
   */
  extractUnregisterFromCompetition () {
    return this.extractContent()
      ?.unregisterFromCompetition
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {number | null} Competition ID
   */
  get competitionId () {
    return this.extractUnregisterFromCompetition()
      ?.competitionId
      ?? null
  }

  /**
   * Check if the participant has unregistered successfully.
   *
   * @returns {boolean}
   */
  hasSuccessfullyUnregistered () {
    return this.competitionId !== null
  }
}

/**
 * @typedef {{
 *   unregisterFromCompetition: {
 *     competitionId: number
 *   }
 * }} ResponseContent
 */
