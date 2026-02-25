import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressPastCompetitionsQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddressPastCompetitionsQueryResponseContent>}
 */
export default class AddressPastCompetitionsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressPastCompetitions value hash.
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions'] | null}
   */
  extractAddressPastCompetitionsValueHash () {
    const content = this.extractContent()

    return content?.addressPastCompetitions
      ?? null
  }

  /**
   * get: competitions
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions']['competitions']}
   */
  get competitions () {
    return this.extractAddressPastCompetitionsValueHash()
      ?.competitions
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions']['pagination'] | null}
   */
  get pagination () {
    return this.extractAddressPastCompetitionsValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   addressPastCompetitions: schema.graphql.AddressPastCompetitionsResult
 * }} AddressPastCompetitionsQueryResponseContent
 */
