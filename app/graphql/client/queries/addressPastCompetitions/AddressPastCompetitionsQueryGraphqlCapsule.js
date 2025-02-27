import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * AddressPastCompetitionsQuery graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<AddressPastCompetitionsQueryResponseContent>}
 */
export default class AddressPastCompetitionsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract addressPastCompetitions value hash.
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions'] | null}
   */
  extractAddressPastCompetitionsValueHash () {
    const content = this.extractContent()

    return content?.addressPastCompetitions
      ?? null
  }

  /**
   * get: competitions
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions']['competitions']}
   */
  get competitions () {
    return this.extractAddressPastCompetitionsValueHash()
      ?.competitions
      ?? []
  }

  /**
   * get: pagination
   *
   * @returns {AddressPastCompetitionsQueryResponseContent['addressPastCompetitions']['pagination'] | null}
   */
  get pagination () {
    return this.extractAddressPastCompetitionsValueHash()
      ?.pagination
      ?? null
  }
}

/**
 * @typedef {{
 *   addressPastCompetitions: {
 *     competitions: Array<{
 *       competition: {
 *         competitionId: string
 *         title: string
 *         description: string
 *         participantUpperLimit: number
 *         participantLowerLimit: number
 *         host: {
 *           address: string
 *           name?: string
 *         }
 *         totalPrize: string
 *         minimumDeposit: string
 *         image?: string
 *         schedules: Array<{
 *           category: {
 *             categoryId: string
 *             name: string
 *             description: string
 *           }
 *           scheduledDatetime: string
 *         }>
 *         status: {
 *           statusId: number
 *           name: string
 *           phasedAt: string // ISO String
 *         }
 *       }
 *       rank: number
 *       prize: string
 *       roi: string
 *       pnl: string
 *     }>
 *     pagination: {
 *       totalCount: number
 *       limit: number
 *       offset: number
 *     }
 *   }
 * }} AddressPastCompetitionsQueryResponseContent
 */
