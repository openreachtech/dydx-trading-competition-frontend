import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * PutAddressNameMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<PutAddressNameMutationRequestVariables>}
 */
export default class PutAddressNameMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation PutAddressName ($input: PutAddressNameInput!) {
        putAddressName (input: $input) {
          addressId
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     name: string
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} PutAddressNameMutationRequestVariables
 */
