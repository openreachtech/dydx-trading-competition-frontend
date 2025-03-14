import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

const COUNTDOWN_PREFIX_MESSAGE_HASH = {
  [SCHEDULE_CATEGORY.REGISTRATION_START.ID]: 'Registration starts',
  [SCHEDULE_CATEGORY.REGISTRATION_END.ID]: 'Registration ends',
  [SCHEDULE_CATEGORY.COMPETITION_START.ID]: 'Competition starts',
  [SCHEDULE_CATEGORY.COMPETITION_END.ID]: 'Competition ends',
  [SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID]: 'Prize distribution starts',
}

/**
 * AppLeagueCountdownContext
 *
 * @extends {BaseFuroContext<null, AppLeagueCountdownProps, null>}
 */
export default class AppLeagueCountdownContext extends BaseFuroContext {
  /**
   * get: shouldHideIcon
   *
   * @returns {AppLeagueCountdownProps['shouldHideIcon']}
   */
  get shouldHideIcon () {
    return this.props.shouldHideIcon
  }

  /**
   * get: iconName
   *
   * @returns {AppLeagueCountdownProps['iconName']}
   */
  get iconName () {
    return this.props.iconName
  }

  /**
   * get: iconSize
   *
   * @returns {AppLeagueCountdownProps['iconSize']}
   */
  get iconSize () {
    return this.props.iconSize
  }

  /**
   * get: schedules
   *
   * @returns {AppLeagueCountdownProps['schedules']}
   */
  get schedules () {
    return this.props.schedules
  }

  /**
   * Generate countdown text.
   *
   * @returns {string} Countdown text.
   */
  generateCountdownText () {
    const currentPhase = this.extractCurrentPhase()

    if (
      currentPhase.currentDate === null
      && currentPhase.nextDate === null
    ) {
      return 'Unknown schedules'
    }

    if (currentPhase.nextDate === null) {
      return 'No upcoming schedules'
    }

    const remainingTimeText = this.generateRemainingTimeText()
    const prefix = COUNTDOWN_PREFIX_MESSAGE_HASH[currentPhase.nextDate.categoryId]

    return `${prefix} ${remainingTimeText}`
  }

  /**
   * Generate remaining time text.
   *
   * @returns {string}
   */
  generateRemainingTimeText () {
    const currentPhase = this.extractCurrentPhase()

    if (currentPhase.nextDate === null) {
      return '...'
    }

    const today = new Date()
    const endTimestamp = currentPhase.nextDate.schedulesDatetime.getTime()
    const remainingTime = endTimestamp - today.getTime()
    const remainingTimeInDays = Math.round(remainingTime / (1000 * 60 * 60 * 24))

    const formatter = new Intl.RelativeTimeFormat('en-US', {
      style: 'long',
      numeric: 'auto',
    })

    return formatter.format(remainingTimeInDays, 'day')
  }

  /**
   * Extract current phase.
   *
   * @returns {CurrentPhase} Current phase.
   */
  extractCurrentPhase () {
    const today = new Date()
    const dates = this.normalizeDates()

    if (dates.length === 0) {
      return {
        currentDate: null,
        nextDate: null,
      }
    }

    const todayIndex = [
      ...dates.map(it => it.schedulesDatetime),
      today,
    ]
      .sort((earlierDate, laterDate) => earlierDate.getTime() - laterDate.getTime())
      .indexOf(today)

    return {
      currentDate: dates[todayIndex - 1],
      nextDate: todayIndex === dates.length
        ? null
        : dates[todayIndex],
    }
  }

  /**
   * Normalize dates.
   *
   * @returns {Array<NormalizedDate>} End dates.
   */
  normalizeDates () {
    return this.schedules
      .map(it => ({
        categoryId: it.category.categoryId,
        schedulesDatetime: new Date(it.scheduledDatetime),
      }))
  }

  /**
   * Generate CSS classes for countdown.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateCountdownClasses () {
    return {
      'hide-icon': this.shouldHideIcon,
    }
  }
}

/**
 * @typedef {{
 *   shouldHideIcon: boolean
 *   iconName: string
 *   iconSize: string
 *   schedules: import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').CompetitionEntity['schedules']
 * }} AppLeagueCountdownProps
 */

/**
 * @typedef {{
 *   categoryId: number
 *   schedulesDatetime: Date
 * }} NormalizedDate
 */

/**
 * @typedef {{
 *   currentDate: NormalizedDate | null
 *   nextDate: NormalizedDate | null
 * }} CurrentPhase
 */
