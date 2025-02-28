import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * SearchAddressByNameQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class SearchAddressByNameQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract searchAddressByName from the response content.
   *
   * @returns {ResponseContent['searchAddressByName'] | null}
   */
  extractSearchAddressByNameValueHash () {
    const content = this.extractContent()

    return content
      ?.searchAddressByName
      ?? null
  }

  /**
   * get: addresses.
   *
   * @returns {ResponseContent['searchAddressByName']['addresses']}
   */
  get addresses () {
    return this.extractSearchAddressByNameValueHash()
      ?.addresses
      ?? []
  }

  /**
   * get: pagination.
   *
   * @returns {ResponseContent['searchAddressByName']['pagination'] | null}
   */
  get pagination () {
    return this.extractSearchAddressByNameValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   searchAddressByName: {
 *     addresses: Array<{
 *       address: string
 *       name?: string
 *     }>
 *     pagination: {
 *       totalCount: number
 *       limit: number
 *       offset: number
 *     }
 *   }
 * }} ResponseContent
 */
