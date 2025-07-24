import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressProfile query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<AddressProfileQueryResponseContent>}
 */
export default class AddressProfileQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `addressProfile` response content as value hash.
   *
   * @returns {AddressProfile | null} `addressProfile` value hash.
   */
  extractAddressProfileValueHash () {
    return this.extractContent()
      ?.addressProfile
      ?? null
  }

  /**
   * get: address
   *
   * @returns {string | null} Address.
   */
  get address () {
    return this.extractAddressProfileValueHash()
      ?.address
      ?? null
  }

  /**
   * get: name
   *
   * @returns {string | null} Name.
   */
  get name () {
    return this.extractAddressProfileValueHash()
      ?.name
      ?? null
  }

  /**
   * get: addressImageUrl
   *
   * @returns {string | null} Address image URL.
   */
  get addressImageUrl () {
    return this.extractAddressProfileValueHash()
      ?.addressImageUrl
      ?? null
  }

  /**
   * get: xAccountUserName
   *
   * @returns {string | null} X account user's name.
   */
  get xAccountUserName () {
    return this.extractAddressProfileValueHash()
      ?.xAccountUserName
      ?? null
  }
}

/**
 * @typedef {{
 *   addressProfile: AddressProfile
 * }} AddressProfileQueryResponseContent
 */

/**
 * @typedef {{
 *   address: string
 *   name?: string
 *   addressImageUrl?: string
 *   xAccountUserName?: string
 * }} AddressProfile
 */
