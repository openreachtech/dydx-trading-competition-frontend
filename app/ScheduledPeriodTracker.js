import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * ScheduledPeriodTracker
 */
export default class ScheduledPeriodTracker {
  /**
   * Constructor.
   *
   * @param {ScheduledPeriodTrackerParams} params - Parameters.
   */
  constructor ({
    schedules,
  }) {
    this.schedules = schedules
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ScheduledPeriodTracker ? X : never} T, X
   * @param {ScheduledPeriodTrackerFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    schedules,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        schedules,
      })
    )
  }

  /**
   * Extract schedule by id.
   *
   * @param {{
   *   scheduleId: number | null
   * }} params - Parameters.
   * @returns {Date | null}
   */
  extractScheduleById ({
    scheduleId,
  }) {
    if (scheduleId === null) {
      return null
    }

    const datetime = this.schedules
      .find(schedule => schedule.category.categoryId === scheduleId)
      ?.scheduledDatetime
      ?? null

    return datetime
      ? new Date(datetime)
      : null
  }

  /**
   * Check if today is before the registration period.
   *
   * @returns {boolean} `true` if today is before the registration period.
   */
  isBeforeRegistrationPeriod () {
    return this.isActivePeriod({
      endDateId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
    })
  }

  /**
   * Check if is registration period.
   *
   * @returns {boolean} `true` if today is within the registration period.
   */
  isRegistrationPeriod () {
    return this.isActivePeriod({
      startDateId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
      endDateId: SCHEDULE_CATEGORY.REGISTRATION_END.ID,
    })
  }

  /**
   * Check if is competition period.
   *
   * @returns {boolean} `true` if today is within the competition period.
   */
  isCompetitionPeriod () {
    return this.isActivePeriod({
      startDateId: SCHEDULE_CATEGORY.COMPETITION_START.ID,
      endDateId: SCHEDULE_CATEGORY.COMPETITION_END.ID,
    })
  }

  /**
   * Check if is prize-distribute period.
   *
   * @returns {boolean} `true` if today is within the prize-distribute period.
   */
  isPrizeDistributePeriod () {
    return this.isActivePeriod({
      startDateId: SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
    })
  }

  /**
   * Check if a period is active.
   *
   * @param {{
   *   startDateId?: number | null
   *   endDateId?: number | null
   *   now?: Date
   * }} params - Parameters.
   * @returns {boolean} `true` if today is within the active period.
   */
  isActivePeriod ({
    startDateId = null,
    endDateId = null,
    now = new Date(),
  }) {
    const startDate = this.extractScheduleById({
      scheduleId: startDateId,
    })
    const endDate = this.extractScheduleById({
      scheduleId: endDateId,
    })

    if (
      startDate !== null
      && endDate !== null
    ) {
      return now >= startDate
        && now <= endDate
    }

    if (startDate !== null) {
      return now >= startDate
    }

    if (endDate !== null) {
      return now <= endDate
    }

    return false
  }
}

/**
 * @typedef {{
 *   schedules: Array<Schedule>
 * }} ScheduledPeriodTrackerParams
 */

/**
 * @typedef {ScheduledPeriodTrackerParams} ScheduledPeriodTrackerFactoryParams
 */

/**
 * @typedef {{
 *   category: {
 *     categoryId: number
 *     name: string
 *     description: string
 *   }
 *   scheduledDatetime: string
 * }} Schedule
 */
