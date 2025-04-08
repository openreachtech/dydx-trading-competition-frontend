import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionParticipant query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionParticipantQueryResponseContent>}
 */
export default class CompetitionParticipantQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competition participant response content.
   *
   * @returns {CompetitionParticipantQueryResponseContent['competitionParticipant'] | null} Competition participant response content
   */
  extractCompetitionParticipantValueHash () {
    return this.extractContent()
      ?.competitionParticipant
      ?? null
  }

  /**
   * get: participant
   *
   * @returns {Participant | null} Participant info
   */
  get participant () {
    return this.extractCompetitionParticipantValueHash()
      ?.participant
      ?? null
  }

  /**
   * get: addressValueHash
   *
   * @returns {Address | null} Participant address value hash
   */
  get addressValueHash () {
    return this.participant
      ?.address
      ?? null
  }

  /**
   * get: address
   *
   * @returns {string | null} Address value
   */
  get address () {
    return this.addressValueHash
      ?.address
      ?? null
  }

  /**
   * get: addressName
   *
   * @returns {string | null} Address name
   */
  get addressName () {
    return this.addressValueHash
      ?.name
      ?? null
  }

  /**
   * get: statusValueHash
   *
   * @returns {StatusPhase | null} Participant status value hash
   */
  get statusValueHash () {
    return this.participant
      ?.status
      ?? null
  }

  /**
   * get: statusId
   *
   * @returns {number | null} Status ID
   */
  get statusId () {
    return this.statusValueHash
      ?.statusId
      ?? null
  }

  /**
   * get: statusName
   *
   * @returns {string | null} Status name
   */
  get statusName () {
    return this.statusValueHash
      ?.name
      ?? null
  }

  /**
   * get: phasedAt
   *
   * @returns {string | null} Status phased at date
   */
  get phasedAt () {
    return this.statusValueHash
      ?.phasedAt
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionParticipant: {
 *     participant: Participant
 *   }
 * }} CompetitionParticipantQueryResponseContent
 */

/**
 * @typedef {{
 *   address: Address
 *   status: StatusPhase
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
 *   phasedAt: string // ISO String
 * }} StatusPhase
 */
