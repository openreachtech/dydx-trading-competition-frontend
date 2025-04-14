import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * SearchAddressesByNameQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class SearchAddressesByNameQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract searchAddressesByName from the response content.
   *
   * @returns {ResponseContent['searchAddressesByName'] | null}
   */
  extractSearchAddressesByNameValueHash () {
    const content = this.extractContent()

    return content
      ?.searchAddressesByName
      ?? null
  }

  /**
   * get: addresses.
   *
   * @returns {ResponseContent['searchAddressesByName']['addresses']}
   */
  get addresses () {
    return this.extractSearchAddressesByNameValueHash()
      ?.addresses
      ?? []
  }

  /**
   * get: pagination.
   *
   * @returns {ResponseContent['searchAddressesByName']['pagination'] | null}
   */
  get pagination () {
    return this.extractSearchAddressesByNameValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   searchAddressesByName: {
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
