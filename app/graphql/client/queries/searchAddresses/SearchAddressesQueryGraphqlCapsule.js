import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * SearchAddresses query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<SearchAddressesQueryResponseContent>}
 */
export default class SearchAddressesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `searchAddresses`.
   *
   * @returns {schema.graphql.SearchAddressesResult | null}
   */
  extractSearchAddresses () {
    return this.extractContent()
      ?.searchAddresses
      ?? null
  }

  /**
   * get: addresses
   *
   * @returns {Array<schema.graphql.AddressSummary>}
   */
  get addresses () {
    return this.extractSearchAddresses()
      ?.addresses
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {schema.graphql.Pagination | null}
   */
  get pagination () {
    return this.extractSearchAddresses()
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

  /**
   * get: limit
   *
   * @returns {number | null}
   */
  get limit () {
    return this.pagination
      ?.limit
      ?? null
  }

  /**
   * get: offset
   *
   * @returns {number | null}
   */
  get offset () {
    return this.pagination
      ?.offset
      ?? null
  }
}

/**
 * @typedef {{
 *   searchAddresses: schema.graphql.SearchAddressesResult
 * }} SearchAddressesQueryResponseContent
 */
