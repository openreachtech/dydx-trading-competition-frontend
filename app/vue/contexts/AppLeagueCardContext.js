import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  COMPETITION_STATUS,
} from '~/app/constants'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule'
 */

const SEVERITY_HASH = {
  [COMPETITION_STATUS.CREATED.ID]: 'success',
  [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: 'warn',
  [COMPETITION_STATUS.IN_PROGRESS.ID]: 'info',
  [COMPETITION_STATUS.COMPLETED.ID]: 'completed',
  [COMPETITION_STATUS.CANCELED.ID]: 'canceled',
}

const ICON_NAME_HASH = {
  [COMPETITION_STATUS.COMPLETED.ID]: 'heroicons:check-16-solid',
  [COMPETITION_STATUS.CANCELED.ID]: 'heroicons:x-mark-16-solid',
}

/**
 * Context class for AppLeagueCard component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppLeagueCardContext extends BaseFuroContext {
  /**
   * Extracts a specific competition value.
   *
   * @template {keyof CompetitionEntity} T
   * @param {T} key - A property of competition.
   * @returns {CompetitionEntity[T] | null} Coresponding property's value, or `null` if not found.
   */
  extractCompetitionByKey (key) {
    return this.props
      .competition[key]
      ?? null
  }

  /**
   * Generate badge severity.
   *
   * @returns {string} Badge severity.
   */
  generateBadgeSeverity () {
    const fallbackValue = 'neutral'
    const { statusId } = this.extractCompetitionByKey('status') ?? {}

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
    const { statusId } = this.extractCompetitionByKey('status') ?? {}

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
    const { statusId } = this.extractCompetitionByKey('status') ?? {}

    if (!statusId) {
      return fallbackValue
    }

    return ICON_NAME_HASH[statusId] ?? fallbackValue
  }

  /**
   * Generate image url
   *
   * @returns {string} Image URL
   */
  genenrateImageUrl () {
    return this.extractCompetitionByKey('imageUrl') ?? ''
  }

  /**
   * Generate destination.
   *
   * @returns {string} Route string.
   */
  generateDestination () {
    const competitionId = this.extractCompetitionByKey('competitionId')

    return `/competitions/${competitionId}`
  }

  /**
   * Normalize minimum deposit.
   *
   * @returns {string} Normalized minimum deposit.
   */
  normalizeMinimumDeposit () {
    const normalizedFigure = this.normalizeNumber({
      value: this.extractCompetitionByKey('minimumDeposit'),
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
