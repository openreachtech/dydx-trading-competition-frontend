import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

/**
 * Competition query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionQueryResponseContent>}
 */
export default class CompetitionQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competition.
   *
   * @returns {CompetitionEntity | null} Competition object.
   */
  extractCompetition () {
    const content = this.extractContent()

    return content
      ?.competition
      ?.competition
      ?? null
  }
}

/**
 * @typedef {{
 *   competition: {
 *     competition: CompetitionEntity
 *   }
 * }} CompetitionQueryResponseContent
 */

/**
 * @typedef {{
 *   competitionId: number
 *   title: string
 *   description: string
 *   participantUpperLimit: number
 *   participantLowerLimit: number
 *   host: {
 *     address: string
 *     name: string
 *   }
 *   totalPrize: number
 *   minimumDeposit: number
 *   image?: string
 *   schedules: Array<{
 *     categogry: {
 *       categoryId: number
 *       name: string
 *       description: string
 *     }
 *     scheduledDatetime: string
 *   }>
 *   status: {
 *     statusId: number
 *     name: string
 *     phasedAt: string
 *   }
 *   prizeRuls: Array<{
 *     rankFrom: number
 *     rankTo: number
 *     amount: string
 *   }>
 * }} CompetitionEntity
 */
