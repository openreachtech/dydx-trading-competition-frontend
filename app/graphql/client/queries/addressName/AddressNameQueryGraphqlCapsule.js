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
   * @returns {schema.graphql.AddressNameResult | null}
   */
  extractAddressNameValueHash () {
    return this.extractContent()
      ?.addressName
      ?? null
  }

  /**
   * get: name
   *
   * @returns {string | null}
   */
  get name () {
    return this.extractAddressNameValueHash()
      ?.name
      ?? null
  }
}

/**
 * @typedef {{
 *   addressName: schema.graphql.AddressNameResult
 * }} AddressNameQueryResponseContent
 */
