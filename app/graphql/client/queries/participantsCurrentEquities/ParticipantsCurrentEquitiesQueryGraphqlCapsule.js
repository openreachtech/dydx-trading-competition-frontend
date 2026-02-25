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
   * @returns {Array<schema.graphql.ParticipantEquity>} List of equities
   */
  get equities () {
    return this.extractParticipantsCurrentEquities()
      ?.equities
      ?? []
  }
}

/**
 * @typedef {{
 *   participantsCurrentEquities: schema.graphql.ParticipantsCurrentEquitiesResult
 * }} ResponseContent
 */
