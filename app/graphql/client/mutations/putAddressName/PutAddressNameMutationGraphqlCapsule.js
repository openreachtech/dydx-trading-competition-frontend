import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * PutAddressNameMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<PutAddressNameMutationResponseContent>}
 */
export default class PutAddressNameMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `putAddressName` value hash.
   *
   * @returns {PutAddressNameMutationResponseContent['putAddressName'] | null}
   */
  extractPutAddressNameValueHash () {
    return this.extractContent()
      ?.putAddressName
      ?? null
  }

  /**
   * get: addressId
   *
   * @returns {PutAddressNameMutationResponseContent['putAddressName']['addressId'] | null}
   */
  get addressId () {
    return this.extractPutAddressNameValueHash()
      ?.addressId
      ?? null
  }
}

/**
 * @typedef {{
 *   putAddressName: {
 *     addressId: number
 *   }
 * }} PutAddressNameMutationResponseContent
 */
