import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddressNameQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<AddressNameQueryRequestVariables>}
 */
export default class AddressNameQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query AddressName ($input: AddressNameInput!) {
        addressName (input: $input) {
          name
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
 * }} AddressNameQueryRequestVariables
 */
