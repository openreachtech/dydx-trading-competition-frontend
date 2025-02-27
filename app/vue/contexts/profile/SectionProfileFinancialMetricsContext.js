import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * SectionProfileFinancialMetricsContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class SectionProfileFinancialMetricsContext extends BaseFuroContext {
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
   *   value: string
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
