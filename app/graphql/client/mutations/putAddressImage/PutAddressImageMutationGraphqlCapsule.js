import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * PutAddressImage mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<PutAddressImageMutationResponseContent>}
 */
export default class PutAddressImageMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `putAddressImage` response content as value hash.
   *
   * @returns {PutAddressImage | null}
   */
  extractPutAddressImageValueHash () {
    return this.extractContent()
      ?.putAddressImage
      ?? null
  }

  /**
   * get: addressImageUrl
   *
   * @returns {string | null}
   */
  get addressImageUrl () {
    return this.extractPutAddressImageValueHash()
      ?.addressImageUrl
      ?? null
  }
}

/**
 * @typedef {{
 *   putAddressImage: PutAddressImage
 * }} PutAddressImageMutationResponseContent
 */

/**
 * @typedef {{
 *   addressImageUrl: string
 * }} PutAddressImage
 */
