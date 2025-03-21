import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

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

  /**
   * get: schedules
   *
   * @returns {CompetitionEntity['schedules']} Schedules as an array.
   */
  get schedules () {
    return this.extractCompetition()
      ?.schedules
      ?? []
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
 *     phasedAt: string
 *   }
 *   prizeRules: Array<{
 *     rankFrom: number
 *     rankTo: number
 *     amount: string
 *   }>
 * }} CompetitionEntity
 */
