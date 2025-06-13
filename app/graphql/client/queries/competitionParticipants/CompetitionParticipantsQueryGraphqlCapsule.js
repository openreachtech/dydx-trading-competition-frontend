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
   * @returns {CompetitionParticipants | null}
   */
  extractCompetitionParticipants () {
    return this.extractContent()
      ?.competitionParticipants
      ?? null
  }

  /**
   * get: participants
   *
   * @returns {Array<Participant>} List of participants
   */
  get participants () {
    return this.extractCompetitionParticipants()
      ?.participants
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {Pagination | null} Pagination information
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
 *   competitionParticipants: CompetitionParticipants
 * }} ResponseContent
 */

/**
 * @typedef {{
 *   participants: Array<Participant>
 *   pagination: Pagination
 * }} CompetitionParticipants
 */

/**
 * @typedef {{
 *   competitionParticipantId: number
 *   address: Address
 *   status: Status
 *   equity: number
 * }} Participant
 */

/**
 * @typedef {{
 *   address: string
 *   name: string
 * }} Address
 */

/**
 * @typedef {{
 *   statusId: number
 *   name: string
 *   phasedAt: string
 * }} Status
 */

/**
 * @typedef {{
 *   totalCount: number
 *   limit: number
 *   offset: number
 * }} Pagination
 */
