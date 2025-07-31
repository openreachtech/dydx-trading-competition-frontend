import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * GenerateXaccountOauthUrl mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<GenerateXaccountOauthUrlMutationRequestVariables>}
 */
export default class GenerateXaccountOauthUrlMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation GenerateXaccountOauthUrlMutation ($input: GenerateXaccountOauthUrlInput!) {
        generateXaccountOauthUrl (input: $input) {
          url
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} GenerateXaccountOauthUrlMutationRequestVariables
 */
