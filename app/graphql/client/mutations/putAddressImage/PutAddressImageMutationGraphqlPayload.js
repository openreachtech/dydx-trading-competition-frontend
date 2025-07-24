import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * PutAddressImage mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<PutAddressImageMutationRequestVariables>}
 */
export default class PutAddressImageMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation PutAddressImageMutation ($input: PutAddressImageInput!) {
        putAddressImage (input: $input) {
          addressImageUrl
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     addressImageUrl: string
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} PutAddressImageMutationRequestVariables
 */
