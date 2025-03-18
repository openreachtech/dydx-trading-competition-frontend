import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionMutationResponseContent>}
 */
export default class UpdateCompetitionMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `updateCompetition` value hash.
   *
   * @returns {UpdateCompetitionMutationResponseContent['updateCompetition'] | null}
   */
  extractUpdateCompetitionValueHash () {
    return this.extractContent()
      ?.updateCompetition
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {UpdateCompetitionMutationResponseContent['updateCompetition']['competitionId'] | null}
   */
  get competitionId () {
    return this.extractUpdateCompetitionValueHash()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   updateCompetition: {
 *     competitionId: number
 *   }
 * }} UpdateCompetitionMutationResponseContent
 */
