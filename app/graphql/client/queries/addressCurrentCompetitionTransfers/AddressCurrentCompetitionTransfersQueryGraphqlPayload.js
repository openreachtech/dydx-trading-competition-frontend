import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddressCurrentCompetitionTransfersQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<AddressCurrentCompetitionTransfersQueryRequestVariables>}
 */
export default class AddressCurrentCompetitionTransfersQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query AddressCurrentCompetitionTransfersQuery ($input: AddressCurrentCompetitionTransfersInput!) {
        addressCurrentCompetitionTransfers (input: $input) {
          transfers {
            blockHeight
            blockTime
            category {
              categoryId
              name
              description
            }
            amount
            senderAddress
            recipientAddress
            transactionHash
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
 *     address: string
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} AddressCurrentCompetitionTransfersQueryRequestVariables
 */
