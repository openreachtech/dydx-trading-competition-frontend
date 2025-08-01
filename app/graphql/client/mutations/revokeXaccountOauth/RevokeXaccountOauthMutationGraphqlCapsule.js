import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * RevokeXaccountOauth mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<RevokeXaccountOauthMutationResponseContent>}
 */
export default class RevokeXaccountOauthMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract revokeXaccountOauth response content value hash.
   *
   * @returns {RevokeXaccountOauthMutationResponseContent['revokeXaccountOauth'] | null}
   */
  extractRevokeXaccountOauthValueHash () {
    return this.extractContent()
      ?.revokeXaccountOauth
      ?? null
  }

  /**
   * get: success
   *
   * @returns {boolean}
   */
  get success () {
    return this.extractRevokeXaccountOauthValueHash()
      ?.success
      ?? false
  }

  /**
   * get: revokedTokens
   *
   * @returns {Array<string>}
   */
  get revokedTokens () {
    return this.extractRevokeXaccountOauthValueHash()
      ?.revokedTokens
      ?? []
  }
}

/**
 * @typedef {{
 *   revokeXaccountOauth: {
 *     success: boolean
 *     revokedTokens: Array<string>
 *   }
 * }} RevokeXaccountOauthMutationResponseContent
 */
