import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule'
 */

/**
 * Context class for AppLeagueCard component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppLeagueCardContext extends BaseFuroContext {
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
   * get: image
   *
   * @returns {CompetitionEntity['image'] | null}
   */
  get image () {
    return this.extractCompetition()
      ?.image
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
   * Generate badge severity.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateBadgeSeverity () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeStatusDetails = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeStatusDetails.generateSeverity()
  }

  /**
   * Generate badge description.
   *
   * @returns {string} Badge description.
   */
  generateBadgeDescription () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeStatusDetails = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeStatusDetails.generateDescription()
  }

  /**
   * Generate icon name for badge.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateBadgeIconName () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeStatusDetails = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeStatusDetails.generateIconName()
  }

  /**
   * Generate image url
   *
   * @returns {string} Image URL
   */
  generateImageUrl () {
    return this.image ?? ''
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
    const normalizedFigure = this.normalizeNumber({
      value: this.minimumDeposit,
    })

    return `${normalizedFigure} USDC`
  }

  /**
   * Normalize number.
   *
   * @param {{
   *   value: number | null
   *   options?: Intl.NumberFormatOptions
   * }} params - Parameters.
   * @returns {string} Normalized number string.
   */
  normalizeNumber ({
    value,
    options = {},
  }) {
    if (!value) {
      return '--'
    }

    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
      ...options,
    })

    return formatter.format(value)
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
    return this.normalizeNumber({
      value,
      options: {
        style: 'currency',
        currency: 'USD',
        ...options,
      },
    })
  }
}
