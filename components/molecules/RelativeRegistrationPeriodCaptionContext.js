import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import RelativeTimeFormatter from '~/app/RelativeTimeFormatter'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * RelativeRegistrationPeriodCaptionContext
 *
 * @extends {BaseAppContext<null, ComponentProps, null>}
 */
export default class RelativeRegistrationPeriodCaptionContext extends BaseAppContext {
  /**
   * get: schedules
   *
   * @returns {Array<schema.graphql.CompetitionSchedule>}
   */
  get schedules () {
    return this.props.schedules
  }

  /**
   * Create a Date instance of current time.
   *
   * @returns {Date}
   */
  createCurrentDatetime () {
    return new Date()
  }

  /**
   * Generate caption.
   *
   * @returns {string}
   */
  generateCaption () {
    if (!this.hasRegistrationStarted()) {
      return this.generateTimeTillStartDateCaption()
    }

    return this.generateTimeTillLateEndDateCaption()
  }

  /**
   * Generate caption for relative time till late registration end date.
   *
   * @returns {string}
   */
  generateTimeTillLateEndDateCaption () {
    const endDate = this.extractLateRegistrationEndDate()

    if (!endDate) {
      return ''
    }

    const now = this.createCurrentDatetime()
    const formatter = RelativeTimeFormatter.create({
      referenceTime: now,
      targetTime: endDate,
    })

    const actionText = now > endDate
      ? 'ended'
      : 'ends'

    return `Registration ${actionText} ${formatter.formatRelativeTime()}`
  }

  /**
   * Generate caption for relative time till registration start date.
   *
   * @returns {string}
   */
  generateTimeTillStartDateCaption () {
    const startDate = this.extractRegistrationStartDate()

    if (!startDate) {
      return ''
    }

    const now = this.createCurrentDatetime()
    const formatter = RelativeTimeFormatter.create({
      referenceTime: now,
      targetTime: startDate,
    })

    const actionText = now > startDate
      ? 'started'
      : 'starts'

    return `Registration ${actionText} ${formatter.formatRelativeTime()}`
  }

  /**
   * Check if registration has started.
   *
   * @returns {boolean}
   */
  hasRegistrationStarted () {
    const startDate = this.extractRegistrationStartDate()

    if (!startDate) {
      return false
    }

    const now = this.createCurrentDatetime()

    return now > startDate
  }

  /**
   * Extract registration start date.
   *
   * @returns {Date | null}
   */
  extractRegistrationStartDate () {
    return this.extractScheduleByCategoryId({
      categoryId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
    })
  }

  /**
   * Extract late registration end date.
   *
   * @returns {Date | null}
   */
  extractLateRegistrationEndDate () {
    return this.extractScheduleByCategoryId({
      categoryId: SCHEDULE_CATEGORY.LATE_REGISTRATION_END.ID,
    })
  }

  /**
   * Extract schedule timestamp based on category id.
   *
   * @param {{
   *   categoryId: number
   * }} params - Parameters.
   * @returns {Date | null}
   */
  extractScheduleByCategoryId ({
    categoryId,
  }) {
    const dateString = this.schedules
      .find(it => it.category.categoryId === categoryId)
      ?.scheduledDatetime
      ?? null

    if (!dateString) {
      return null
    }

    return new Date(dateString)
  }
}

/**
 * @typedef {{
 *   schedules: Array<schema.graphql.CompetitionSchedule>
 * }} ComponentProps
 */
