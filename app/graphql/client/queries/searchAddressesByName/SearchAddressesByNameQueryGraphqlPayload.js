import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SearchAddressesByNameQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<SearchAddressesByNameQueryRequestVariables>}
 */
export default class SearchAddressesByNameQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query SearchAddressesByNameQuery ($input: SearchAddressesByNameInput!) {
        searchAddressesByName (input: $input) {
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
 *   input: schema.graphql.SearchAddressesByNameInput
 * }} SearchAddressesByNameQueryRequestVariables
 */
