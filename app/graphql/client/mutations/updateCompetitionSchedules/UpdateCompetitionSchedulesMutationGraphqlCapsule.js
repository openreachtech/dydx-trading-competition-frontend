import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionSchedulesMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionSchedulesMutationResponseContent>}
 */
export default class UpdateCompetitionSchedulesMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `updateCompetitionSchedules` value hash.
   *
   * @returns {UpdateCompetitionSchedulesMutationResponseContent['updateCompetitionSchedules'] | null}
   */
  extractUpdateCompetitionSchedulesValueHash () {
    return this.extractContent()
      ?.updateCompetitionSchedules
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {UpdateCompetitionSchedulesMutationResponseContent['updateCompetitionSchedules']['competitionId'] | null}
   */
  get competitionId () {
    return this.extractUpdateCompetitionSchedulesValueHash()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   updateCompetitionSchedules: {
 *     competitionId: number
 *   }
 * }} UpdateCompetitionSchedulesMutationResponseContent
 */
