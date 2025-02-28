import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * SearchAddressByNameQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<typeof SearchAddressByNameQueryGraphqlPayload, SearchAddressByNameQueryRequestVariables>}
 */
export default class SearchAddressByNameQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query SearchAddressByNameQuery ($input: SearchAddressesByNameInput!) {
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
 *   input: {
 *     query: string
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} SearchAddressByNameQueryRequestVariables
 */
