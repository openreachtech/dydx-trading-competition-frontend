import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Competitions query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<typeof CompetitionsQueryGraphqlCapsule, CompetitionsQueryResponseContent>}
 */
export default class CompetitionsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competitions.
   *
   * @returns {CompetitionsQueryResponseContent['competitions']['competitions']} An array of competition.
   */
  extractCompetitions () {
    const content = this.extractContent()

    return content
      ?.competitions
      ?.competitions
      ?? []
  }
}

/**
 * @typedef {{
 *   competitions: {
 *     competitions: Array<CompetitionEntity>
 *   }
 * }} CompetitionsQueryResponseContent
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
 * }} CompetitionEntity
 */
