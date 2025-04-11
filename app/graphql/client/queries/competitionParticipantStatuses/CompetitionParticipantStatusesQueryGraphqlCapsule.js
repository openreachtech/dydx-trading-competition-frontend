import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Competition participant statuses query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class CompetitionParticipantStatusesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `competitionParticipantStatuses`.
   *
   * @returns {ResponseContent['competitionParticipantStatuses'] | null}
   */
  extractCompetitionParticipantStatuses () {
    return this.extractContent()
      ?.competitionParticipantStatuses
      ?? null
  }

  /**
   * get: statuses
   *
   * @returns {Array<Status>}
   */
  get statuses () {
    return this.extractCompetitionParticipantStatuses()
      ?.statuses
      ?? []
  }
}

/**
 * @typedef {{
 *   competitionParticipantStatuses: {
 *     statuses: Array<Status>
 *   }
 * }} ResponseContent
 */

/**
 * @typedef {{
 *   description: string
 *   name: string
 *   statusId: number
 * }} Status
 */
