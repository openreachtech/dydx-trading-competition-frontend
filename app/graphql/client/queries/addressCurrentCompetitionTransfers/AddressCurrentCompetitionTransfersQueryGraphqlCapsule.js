import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressCurrentCompetitionTransfersQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class AddressCurrentCompetitionTransfersQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressCurrentCompetitionTransfers value hash.
   *
   * @returns {schema.graphql.AddressCurrentCompetitionTransfersResult | null}
   */
  extractAddressCurrentCompetitionTransfersValueHash () {
    const content = this.extractContent()

    return content?.addressCurrentCompetitionTransfers
      ?? null
  }

  /**
   * get: transfers
   *
   * @returns {Array<schema.graphql.CompetitionTransfer>}
   */
  get transfers () {
    return this.extractAddressCurrentCompetitionTransfersValueHash()
      ?.transfers
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {schema.graphql.Pagination | null}
   */
  get pagination () {
    return this.extractAddressCurrentCompetitionTransfersValueHash()
      ?.pagination
      ?? null
  }

  /**
   * get: totalCount
   *
   * @returns {number | null}
   */
  get totalCount () {
    return this.pagination
      ?.totalCount
      ?? null
  }
}

/**
 * @typedef {{
 *   addressCurrentCompetitionTransfers: schema.graphql.AddressCurrentCompetitionTransfersResult
 * }} ResponseContent
 */
