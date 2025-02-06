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

  /**
   * Generate image url
   *
   * @returns {string} Image URL
   */
  genenrateImageUrl () {
    return this.imageUrl ?? ''
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
