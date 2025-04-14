import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressCurrentCompetitionQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddressCurrentCompetitionQueryResponseContent>}
 */
export default class AddressCurrentCompetitionQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressCurrentCompetition value hash.
   *
   * @returns {AddressCurrentCompetitionQueryResponseContent['addressCurrentCompetition'] | null}
   */
  extractAddressCurrentCompetitionValueHash () {
    const content = this.extractContent()

    return content?.addressCurrentCompetition
      ?? null
  }

  /**
   * get: competition
   *
   * @returns {Competition}
   */
  get competition () {
    return this.extractAddressCurrentCompetitionValueHash()
      ?.competition
      ?? null
  }

  /**
   * get: ranking
   *
   * @returns {Ranking}
   */
  get ranking () {
    return this.extractAddressCurrentCompetitionValueHash()
      ?.ranking
      ?? null
  }
}

/**
 * @typedef {{
 *   addressCurrentCompetition: {
 *     competition?: Competition
 *     ranking?: Ranking
 *   }
 * }} AddressCurrentCompetitionQueryResponseContent
 */

/**
 * @typedef {{
 *   competitionId: string
 *   title: string
 *   description: string
 *   participantUpperLimit: number
 *   participantLowerLimit: number
 *   host: {
 *     address: string
 *     name?: string
 *   }
 *   totalPrize: string
 *   minimumDeposit: string
 *   image?: string
 *   schedules: Array<{
 *     category: {
 *       categoryId: number
 *       name: string
 *       description: string
 *     }
 *     scheduledDatetime: string
 *   }>
 *   status: {
 *     statusId: number
 *     name: string
 *     phasedAt: string // ISO String
 *   }
 * } | null} Competition
 */

/**
 * @typedef {{
 *   address: Array<{
 *     address: string
 *     name: string
 *   }>
 *   performanceBaseline: number
 *   ranking: number
 *   roi: number
 *   pnl: number
 *   calculatedAt: string // ISO String
 * } | null} Ranking
 */
