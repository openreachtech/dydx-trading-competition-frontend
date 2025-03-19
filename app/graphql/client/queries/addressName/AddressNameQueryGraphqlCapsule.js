import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressNameQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddressNameQueryResponseContent>}
 */
export default class AddressNameQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `addressName` value hash.
   *
   * @returns {AddressNameQueryResponseContent['addressName'] | null}
   */
  extractAddressNameValueHash () {
    return this.extractContent()
      ?.addressName
      ?? null
  }

  /**
   * get: name
   *
   * @returns {AddressNameQueryResponseContent['addressName']['name']}
   */
  get name () {
    return this.extractAddressNameValueHash()
      ?.name
      ?? null
  }
}

/**
 * @typedef {{
 *   addressName: {
 *     name: string | null
 *   }
 * }} AddressNameQueryResponseContent
 */
