import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SearchAddresses query payload.
 *
 * @extends {BaseAppGraphqlPayload<SearchAddressesQueryRequestVariables>}
 */
export default class SearchAddressesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query SearchAddressesQuery ($input: SearchAddressesInput!) {
        searchAddresses (input: $input) {
          addresses {
            address
            name
          }
          pagination {
            totalCount
            limit
            offset
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.SearchAddressesInput
 * }} SearchAddressesQueryRequestVariables
 */
