import {
  COMPETITION_STATUS,
} from '~/app/constants'

const SEVERITY_HASH = /** @type {const} */ ({
  [COMPETITION_STATUS.CREATED.ID]: 'success',
  [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: 'warn',
  [COMPETITION_STATUS.IN_PROGRESS.ID]: 'info',
  [COMPETITION_STATUS.COMPLETED.ID]: 'completed',
  [COMPETITION_STATUS.CANCELED.ID]: 'canceled',
})

const ICON_NAME_HASH = /** @type {const} */ ({
  [COMPETITION_STATUS.COMPLETED.ID]: 'heroicons:check-16-solid',
  [COMPETITION_STATUS.CANCELED.ID]: 'heroicons:x-mark-16-solid',
})

/**
 * Utility class for badge severity operations.
 */
export default class CompetitionBadgeContext {
  /**
   * Constructor.
   *
   * @param {CompetitionBadgeContextParams} params - Parameters.
   */
  constructor ({
    statusId,
  }) {
    this.statusId = statusId
  }

  /**
   * Factory method.
   *
   * @param {CompetitionBadgeContextFactoryParams} params - Parameters.
   * @returns {CompetitionBadgeContext} Instance of this class.
   */
  static create ({
    statusId = null,
  }) {
    return new this({
      statusId,
    })
  }

  /**
   * Generate badge severity based on status.
   *
   * @returns {GenerateSeverityReturnType} Badge severity.
   */
  generateSeverity () {
    const fallbackValue = 'neutral'

    if (!this.statusId) {
      return fallbackValue
    }

    return SEVERITY_HASH[this.statusId] ?? fallbackValue
  }

  /**
   * Generate badge description based on status.
   *
   * @returns {string} Badge description.
   */
  generateDescription () {
    if (!this.statusId) {
      return '--'
    }

    return Object.values(COMPETITION_STATUS)
      .find(it => it.ID === this.statusId)
      ?.DESCRIPTION
      ?? '--'
  }

  /**
   * Generate icon name for badge based on status.
   *
   * @returns {GenerateIconNameReturnType} Icon name.
   */
  generateIconName () {
    const fallbackValue = ''

    if (!this.statusId) {
      return fallbackValue
    }

    return ICON_NAME_HASH[this.statusId] ?? fallbackValue
  }
}

/**
 * @typedef {{
 *   statusId?: number | null
 * }} CompetitionBadgeContextParams
 */

/**
 * @typedef {IconNameValue | ''} GenerateIconNameReturnType
 */

/**
 * @typedef {SeverityValue | 'neutral'} GenerateSeverityReturnType
 */

/**
 * @typedef {CompetitionBadgeContextParams} CompetitionBadgeContextFactoryParams
 */

/**
 * @typedef {keyof typeof SEVERITY_HASH} SeverityKey
 */

/**
 * @typedef {(typeof SEVERITY_HASH)[SeverityKey]} SeverityValue
 */

/**
 * @typedef {keyof typeof ICON_NAME_HASH} IconNameKey
 */

/**
 * @typedef {(typeof ICON_NAME_HASH)[IconNameKey]} IconNameValue
 */
