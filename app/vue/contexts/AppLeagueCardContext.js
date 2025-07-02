import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule'
 */

/**
 * Context class for AppLeagueCard component.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class AppLeagueCardContext extends BaseAppContext {
  /**
   * Extract competition.
   *
   * @returns {CompetitionEntity | null}
   */
  extractCompetition () {
    return this.props
      .competition
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
   * get: title
   *
   * @returns {CompetitionEntity['title'] | null}
   */
  get title () {
    return this.extractCompetition()
      ?.title
      ?? null
  }

  /**
   * get: description
   *
   * @returns {CompetitionEntity['description'] | null}
   */
  get description () {
    return this.extractCompetition()
      ?.description
      ?? null
  }

  /**
   * get: host
   *
   * @returns {CompetitionEntity['host'] | null}
   */
  get host () {
    return this.extractCompetition()
      ?.host
      ?? null
  }

  /**
   * get: imageUrl
   *
   * @returns {CompetitionEntity['imageUrl'] | null}
   */
  get imageUrl () {
    return this.extractCompetition()
      ?.imageUrl
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {CompetitionEntity['competitionId'] | null}
   */
  get competitionId () {
    return this.extractCompetition()
      ?.competitionId
      ?? null
  }

  /**
   * get: minimumDeposit
   *
   * @returns {CompetitionEntity['minimumDeposit'] | null}
   */
  get minimumDeposit () {
    return this.extractCompetition()
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: totalPrize
   *
   * @returns {CompetitionEntity['totalPrize'] | null}
   */
  get totalPrize () {
    return this.extractCompetition()
      ?.totalPrize
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {CompetitionEntity['participantUpperLimit'] | null}
   */
  get participantUpperLimit () {
    return this.extractCompetition()
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: schedules
   *
   * @returns {CompetitionEntity['schedules']}
   */
  get schedules () {
    return this.extractCompetition()
      ?.schedules
      ?? []
  }

  /**
   * Generate badge severity.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateBadgeSeverity () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateSeverity()
  }

  /**
   * Generate badge description.
   *
   * @returns {string} Badge description.
   */
  generateBadgeDescription () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateDescription()
  }

  /**
   * Generate icon name for badge.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateBadgeIconName () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateIconName()
  }

  /**
   * Generate image url
   *
   * @returns {string} Image URL
   */
  generateImageUrl () {
    return this.imageUrl
      ?? '/img/badges/league-badge-placeholder.png'
  }

  /**
   * Generate destination.
   *
   * @returns {string} Route string.
   */
  generateDestination () {
    return `/competitions/${this.competitionId}`
  }

  /**
   * Normalize minimum deposit.
   *
   * @returns {string} Normalized minimum deposit.
   */
  normalizeMinimumDeposit () {
    const normalizedFigure = this.formatNumber({
      value: this.minimumDeposit,
      options: {
        trailingZeroDisplay: 'stripIfInteger',
      },
    })

    return `${normalizedFigure} USDC`
  }

  /**
   * Normalize currency.
   *
   * @param {{
   *   value: number | null
   *   options?: Intl.NumberFormatOptions
   * }} params - Parameters.
   * @returns {string} Normalized currency string.
   */
  normalizeCurrency ({
    value,
    options = {},
  }) {
    return this.formatNumber({
      value,
      options: {
        style: 'currency',
        currency: 'USD',
        trailingZeroDisplay: 'stripIfInteger',
        ...options,
      },
    })
  }
}
