import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AppTimelineContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class AppTimelineContext extends BaseAppContext {
  /**
   * get: timeline
   *
   * @returns {import('~/components/units/AppTimeline.vue').Timeline} Timeline.
   */
  get timeline () {
    return this.props.timeline
  }

  /**
   * Whether to hide fallback value.
   *
   * @returns {boolean}
   */
  shouldHideFallback () {
    return this.timeline.length > 0
  }

  /**
   * Check if has elapsed.
   *
   * @param {{
   *   timestamp: Date | string
   * }} params - Parameters.
   * @returns {boolean} `true` if has elapsed.
   */
  hasElapsed ({
    timestamp,
  }) {
    const currentDate = new Date()
    const timestampDate = new Date(timestamp)

    return timestampDate < currentDate
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
    })

    return formatter.format(date)
  }
}
