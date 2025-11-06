import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  SCHEDULE_ID_GROUP,
} from '~/app/constants'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'
 */

/**
 * SectionSchedulesContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class SectionSchedulesContext extends BaseAppContext {
  /**
   * get: schedules
   *
   * @returns {CompetitionEntity['schedules']} Schedules as an array.
   */
  get schedules () {
    return this.props.schedules
  }

  /**
   * Generate schedule groups.
   *
   * @returns {ScheduleGroups} Schedule groups.
   */
  generateScheduleGroups () {
    const competitionSchedules = this.generateCompetitionSchedules()
    const prizeDistributeSchedules = this.generatePrizeDistributeSchedules()

    return [
      {
        title: 'Competition Period',
        timeline: this.extractTimeline({
          schedules: competitionSchedules,
        }),
      },
      {
        title: 'Reward Distribution',
        timeline: this.extractTimeline({
          schedules: prizeDistributeSchedules,
        }),
      },

    ]
  }

  /**
   * @param {{
   *   schedules: CompetitionEntity['schedules']
   * }} params - Parameters.
   * @returns {import('~/components/units/AppTimeline.vue').Timeline}
   */
  extractTimeline ({
    schedules,
  }) {
    return schedules.map(it => ({
      timestamp: it.scheduledDatetime,
    }))
  }

  /**
   * Generate competition schedules.
   *
   * @returns {CompetitionEntity['schedules']} Competition schedules.
   */
  generateCompetitionSchedules () {
    return this.schedules.filter(
      it => SCHEDULE_ID_GROUP.COMPETITION.includes(it.category?.categoryId)
    )
  }

  /**
   * Generate prize distribution schedules.
   *
   * @returns {CompetitionEntity['schedules']} Prize distribution schedules.
   */
  generatePrizeDistributeSchedules () {
    return this.schedules.filter(
      it => SCHEDULE_ID_GROUP.PRIZE_DISTRIBUTE.includes(it.category?.categoryId)
    )
  }

  /**
   * Check if the schedule is active.
   *
   * @param {{
   *   timeline: import('~/components/units/AppTimeline.vue').Timeline
   * }} params - Parameters.
   * @returns {boolean} `true` if the schedule is active.
   */
  isActiveTimeline ({
    timeline,
  }) {
    const currentDate = new Date()
    const lastDate = new Date(timeline[timeline.length - 1]?.timestamp)

    return timeline.some(it => new Date(it?.timestamp) <= currentDate)
      && currentDate <= lastDate
  }

  /**
   * Normalize timestamp.
   *
   * @param {{
   *   timestamp: string
   * }} params - Parameters.
   * @returns {string} Normalized timestamp.
   */
  normalizeTimestamp ({
    timestamp,
  }) {
    if (!timestamp) {
      return '----'
    }

    const date = new Date(timestamp)
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    })

    return formatter.format(date)
  }
}

/**
 * @typedef {Array<{
 *   title: string
 *   timeline: import('~/components/units/AppTimeline.vue').Timeline
 * }>} ScheduleGroups
 */
