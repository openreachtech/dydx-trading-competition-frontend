import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * GenerateXaccountOauthUrl mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<GenerateXaccountOauthUrlMutationResponseContent>}
 */
export default class GenerateXaccountOauthUrlMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `generateXaccountOauthUrl` response content.
   *
   * @returns {GenerateXaccountOauthUrlMutationResponseContent['generateXaccountOauthUrl'] | null}
   */
  extractGenerateXaccountOauthUrlValueHash () {
    return this.extractContent()
      ?.generateXaccountOauthUrl
      ?? null
  }

  /**
   * get: url
   *
   * @returns {string | null} Oauth URL
   */
  get url () {
    return this.extractGenerateXaccountOauthUrlValueHash()
      ?.url
      ?? null
  }
}

/**
 * @typedef {{
 *   generateXaccountOauthUrl: {
 *     url: string
 *   }
 * }} GenerateXaccountOauthUrlMutationResponseContent
 */
