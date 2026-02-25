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
   * @returns {Array<schema.graphql.Status>}
   */
  get statuses () {
    return this.extractCompetitionParticipantStatuses()
      ?.statuses
      ?? []
  }
}

/**
 * @typedef {{
 *   competitionParticipantStatuses: schema.graphql.CompetitionParticipantStatusesResult
 * }} ResponseContent
 */
