import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  COMPETITION_STATUS,
} from '~/app/constants'

const BADGE_CAPTION_HASH = {
  [COMPETITION_STATUS.CREATED.ID]: 'Scheduled',
  [COMPETITION_STATUS.IN_PROGRESS.ID]: 'Competing',
  [COMPETITION_STATUS.CANCELED.ID]: 'Canceled',
  [COMPETITION_STATUS.COMPLETED.ID]: 'Completed',
}

const BADGE_SEVERITY_HASH = {
  [COMPETITION_STATUS.CREATED.ID]: 'info',
  [COMPETITION_STATUS.IN_PROGRESS.ID]: 'success',
  [COMPETITION_STATUS.CANCELED.ID]: 'canceled',
  [COMPETITION_STATUS.COMPLETED.ID]: 'completed',
}

const BADGE_ICON_NAME_HASH = {
  [COMPETITION_STATUS.CANCELED.ID]: 'heroicons:x-mark-16-solid',
  [COMPETITION_STATUS.COMPLETED.ID]: 'heroicons:check-16-solid',
}

/**
 * CompetitionStatusBadgeContext
 *
 * @extends {BaseAppContext<null, ComponentProps, null>}
 */
export default class CompetitionStatusBadgeContext extends BaseAppContext {
  /**
   * get: statusId
   *
   * @returns {number | null}
   */
  get statusId () {
    return this.props.statusId
  }

  /**
   * Generate badge icon name.
   *
   * @returns {string}
   */
  generateBadgeIconName () {
    if (this.statusId === null) {
      return ''
    }

    return BADGE_ICON_NAME_HASH[this.statusId]
      ?? ''
  }

  /**
   * Generate badge severity.
   *
   * @returns {string}
   */
  generateBadgeSeverity () {
    if (this.statusId === null) {
      return 'neutral'
    }

    return BADGE_SEVERITY_HASH[this.statusId]
      ?? 'neutral'
  }

  /**
   * Generate badge caption.
   *
   * @returns {string}
   */
  generateBadgeCaption () {
    if (this.statusId === null) {
      return '--'
    }

    return BADGE_CAPTION_HASH[this.statusId]
      ?? '--'
  }
}

/**
 * @typedef {{
 *   statusId: number | null
 * }} ComponentProps
 */
