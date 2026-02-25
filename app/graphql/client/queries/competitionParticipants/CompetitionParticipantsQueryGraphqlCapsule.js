import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionParticipants query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class CompetitionParticipantsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `competitionParticipants`.
   *
   * @returns {schema.graphql.CompetitionParticipantsResult | null}
   */
  extractCompetitionParticipants () {
    return this.extractContent()
      ?.competitionParticipants
      ?? null
  }

  /**
   * get: myParticipation
   *
   * @returns {schema.graphql.CompetitionParticipant | null}
   */
  get myParticipation () {
    return this.extractCompetitionParticipants()
      ?.myParticipation
      ?? null
  }

  /**
   * get: participants
   *
   * @returns {Array<schema.graphql.CompetitionParticipant>} List of participants
   */
  get participants () {
    return this.extractCompetitionParticipants()
      ?.participants
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {schema.graphql.Pagination | null} Pagination information
   */
  get pagination () {
    return this.extractCompetitionParticipants()
      ?.pagination
      ?? null
  }

  /**
   * get: totalCount
   *
   * @returns {number | null} Total count of participants
   */
  get totalCount () {
    return this.pagination
      ?.totalCount
      ?? null
  }

  /**
   * get: limit
   *
   * @returns {number | null} Limit of participants per page
   */
  get limit () {
    return this.pagination
      ?.limit
      ?? null
  }

  /**
   * get: offset
   *
   * @returns {number | null} Offset of participants
   */
  get offset () {
    return this.pagination
      ?.offset
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionParticipants: schema.graphql.CompetitionParticipantsResult
 * }} ResponseContent
 */
