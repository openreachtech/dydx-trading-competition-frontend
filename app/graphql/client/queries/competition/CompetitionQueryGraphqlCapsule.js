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
   * get: competitionStatus
   *
   * @returns {CompetitionEntity['status'] | null}
   */
  get competitionStatus () {
    return this.extractCompetition()
      ?.status
      ?? null
  }

  /**
   * Generate badge severity.
   *
   * @returns {string} Badge severity.
   */
  generateBadgeSeverity () {
    const fallbackValue = 'neutral'
    const { statusId } = this.competitionStatus ?? {}

    if (!statusId) {
      return fallbackValue
    }

    return SEVERITY_HASH[statusId] ?? fallbackValue
  }

  /**
   * Generate badge description.
   *
   * @returns {string} Badge description.
   */
  generateBadgeDescription () {
    const { statusId } = this.competitionStatus ?? {}

    return Object.values(COMPETITION_STATUS)
      .find(it => it.ID === statusId)
      ?.DESCRIPTION
      ?? '--'
  }

  /**
   * Generate icon name for badge.
   *
   * @returns {string} Icon name.
   */
  generateBadgeIconName () {
    const fallbackValue = ''
    const { statusId } = this.competitionStatus ?? {}

    if (!statusId) {
      return fallbackValue
    }

    return ICON_NAME_HASH[statusId] ?? fallbackValue
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
