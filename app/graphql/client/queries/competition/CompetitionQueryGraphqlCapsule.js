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
   * get: title
   *
   * @returns {string | null}
   */
  get title () {
    return this.extractCompetition()
      ?.title
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

  /**
   * get: prizeRules
   *
   * @returns {CompetitionEntity['prizeRules']} Prize rules as an array.
   */
  get prizeRules () {
    return this.extractCompetition()
      ?.prizeRules
      ?? []
  }

  /**
   * get: statusId
   *
   * @returns {number | null}
   */
  get statusId () {
    return this.extractCompetition()
      ?.status
      ?.statusId
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {number | null}
   */
  get participantUpperLimit () {
    return this.extractCompetition()
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: participantLowerLimit
   *
   * @returns {number | null}
   */
  get participantLowerLimit () {
    return this.extractCompetition()
      ?.participantLowerLimit
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
