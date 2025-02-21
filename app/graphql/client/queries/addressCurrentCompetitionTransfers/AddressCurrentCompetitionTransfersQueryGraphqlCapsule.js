import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressCurrentCompetitionTransfersQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class AddressCurrentCompetitionTransfersQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressCurrentCompetitionTransfers value hash.
   *
   * @returns {ResponseContent['addressCurrentCompetitionTransfers'] | null}
   */
  extractAddressCurrentCompetitionTransfersValueHash () {
    const content = this.extractContent()

    return content?.addressCurrentCompetitionTransfers
      ?? null
  }

  /**
   * get: transfers
   *
   * @returns {ResponseContent['addressCurrentCompetitionTransfers']['transfers']}
   */
  get transfers () {
    return this.extractAddressCurrentCompetitionTransfersValueHash()
      ?.transfers
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {ResponseContent['addressCurrentCompetitionTransfers']['pagination'] | null}
   */
  get pagination () {
    return this.extractAddressCurrentCompetitionTransfersValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   addressCurrentCompetitionTransfers: {
 *     transfers: Array<{
 *       blockHeight: number
 *       blockTime: string // ISO String
 *       category: {
 *         categoryId: number
 *         name: string
 *         description: string
 *       }
 *       amount: string
 *       senderAddress: string
 *       recipientAddress: string
 *       transactionHash: string
 *     }>
 *     pagination: {
 *       totalCount: number
 *       limit: number
 *       offset: number
 *     }
 *   }
 * }} ResponseContent
 */
