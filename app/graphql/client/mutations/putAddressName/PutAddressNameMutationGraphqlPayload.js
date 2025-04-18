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
      mutation PutAddressName ($input: putAddressNameInput!) {
        putAddressName (input: $input) {
          addressId
        }
      }
    `
  }

  /**
   * Extract filtered variables.
   *
   * @override
   */
  extractFilteredVariables () {
    const variables = super.extractFilteredVariables()

    return /** @type {*} */ ({
      ...variables,
      input: {
        ...variables.input,
        name: variables.input
          .name
          .trim(),
      },
    })
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
