import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionStatusMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionStatusMutationResponseContent>}
 */
export default class UpdateCompetitionStatusMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `updateCompetitionStatus` value hash.
   *
   * @returns {UpdateCompetitionStatusMutationResponseContent['updateCompetitionStatus'] | null}
   */
  extractUpdateCompetitionStatusValueHash () {
    return this.extractContent()
      ?.updateCompetitionStatus
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {UpdateCompetitionStatusMutationResponseContent['updateCompetitionStatus']['competitionId'] | null}
   */
  get competitionId () {
    return this.extractUpdateCompetitionStatusValueHash()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   updateCompetitionStatus: {
 *     competitionId: number
 *   }
 * }} UpdateCompetitionStatusMutationResponseContent
 */
