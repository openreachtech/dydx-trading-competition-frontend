import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * ParticipantsCurrentEquities query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class ParticipantsCurrentEquitiesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `participantsCurrentEquities`.
   *
   * @returns {ResponseContent['participantsCurrentEquities'] | null} ParticipantsCurrentEquities response content
   */
  extractParticipantsCurrentEquities () {
    return this.extractContent()
      ?.participantsCurrentEquities
      ?? null
  }

  /**
   * get: equities
   *
   * @returns {Array<Equity>} List of equities
   */
  get equities () {
    return this.extractParticipantsCurrentEquities()
      ?.equities
      ?? []
  }
}

/**
 * @typedef {{
 *   participantsCurrentEquities: {
 *     equities: Array<Equity>
 *   }
 * }} ResponseContent
 */

/**
 * @typedef {{
 *   competitionParticipantId: number
 *   equity: string
 * }} Equity
 */
