import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddressProfile query GraphQL payload.
 *
 * @extends {BaseAppGraphqlPayload<AddressProfileQueryRequestVariables>}
 */
export default class AddressProfileQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query AddressProfileQuery ($input: AddressProfileInput!) {
        addressProfile (input: $input) {
          address
          name
          addressImageUrl
          xAccountUserName
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     address: string
 *   }
 * }} AddressProfileQueryRequestVariables
 */
