import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressCurrentCompetitionQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddressCurrentCompetitionQueryResponseContent>}
 */
export default class AddressCurrentCompetitionQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressCurrentCompetition value hash.
   *
   * @returns {schema.graphql.AddressCurrentCompetitionResult | null}
   */
  extractAddressCurrentCompetitionValueHash () {
    const content = this.extractContent()

    return content?.addressCurrentCompetition
      ?? null
  }

  /**
   * get: competition
   *
   * @returns {schema.graphql.CompetitionSummary | null}
   */
  get competition () {
    return this.extractAddressCurrentCompetitionValueHash()
      ?.competition
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {number | null}
   */
  get competitionId () {
    return this.competition
      ?.competitionId
      ?? null
  }

  /**
   * get: ranking
   *
   * @returns {schema.graphql.CompetitionRanking | null}
   */
  get ranking () {
    return this.extractAddressCurrentCompetitionValueHash()
      ?.ranking
      ?? null
  }
}

/**
 * @typedef {{
 *   addressCurrentCompetition: schema.graphql.AddressCurrentCompetitionResult
 * }} AddressCurrentCompetitionQueryResponseContent
 */
