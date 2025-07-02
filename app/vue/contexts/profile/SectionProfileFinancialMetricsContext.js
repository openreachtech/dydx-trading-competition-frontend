import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * SectionProfileFinancialMetricsContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class SectionProfileFinancialMetricsContext extends BaseAppContext {
  /**
   * get: metrics
   *
   * @returns {Array<MetricEntry>}
   */
  get metrics () {
    return this.props.metrics
  }

  /**
   * Normalize metric.
   *
   * @param {{
   *   value: string | null
   * }} params - Parameters.
   * @returns {string} Normalized metric.
   */
  normalizeMetric ({
    value,
  }) {
    if (!value) {
      return '----'
    }

    return value
  }
}

/**
 * @typedef {Array<MetricEntry>} Metrics
 */

/**
 * @typedef {{
 *   label: string
 *   value: string | null
 * }} MetricEntry
 */
