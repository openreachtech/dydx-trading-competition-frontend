import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * RevokeXaccountOauth mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<RevokeXaccountOauthMutationRequestVariables>}
 */
export default class RevokeXaccountOauthMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation RevokeXaccountOauthMutation ($input: RevokeXaccountOauthInput!) {
        revokeXaccountOauth (input: $input) {
          success
          revokedTokens
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.RevokeXaccountOauthInput
 * }} RevokeXaccountOauthMutationRequestVariables
 */
