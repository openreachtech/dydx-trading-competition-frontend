export default class FinancialMetricNormalizer {
  /**
   * Constructor.
   *
   * @param {FinancialMetricNormalizerParams} params - Parameters of this constructor.
   */
  constructor ({
    figure,
    fallbackValue,
  }) {
    this.figure = figure
    this.fallbackValue = fallbackValue
  }

  /**
   * Factory method.
   *
   * @template {typeof FinancialMetricNormalizer} T
   * @param {FinancialMetricNormalizerFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    figure,
    fallbackValue = '--',
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        figure,
        fallbackValue,
      })
    )
  }

  /**
   * Normalize as PnL.
   *
   * @returns {string}
   */
  normalizeAsPnl () {
    if (this.figure === null) {
      return this.fallbackValue
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      trailingZeroDisplay: 'stripIfInteger',
      maximumFractionDigits: 2,
    })

    return formatter.format(this.figure)
  }

  /**
   * Normalize as ROI.
   *
   * @returns {string}
   */
  normalizeAsRoi () {
    if (this.figure === null) {
      return this.fallbackValue
    }

    // ROI is a decimal representation of percentage, must multiply it by 100 first.
    const roi = this.figure * 100
    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
      maximumFractionDigits: 2,
    })
    const normalizedRoi = formatter.format(roi)

    return `${normalizedRoi}%`
  }

  /**
   * Normalize as performance baseline.
   *
   * @returns {string} Normalized performance baseline.
   */
  normalizeAsPerformanceBaseline () {
    if (this.figure === null) {
      return this.fallbackValue
    }

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      trailingZeroDisplay: 'stripIfInteger',
      maximumFractionDigits: 2,
    })

    return formatter.format(this.figure)
  }
}

/**
 * @typedef {{
 *   figure: number | null
 *   fallbackValue: string
 * }} FinancialMetricNormalizerParams
 */

/**
 * @typedef {Pick<FinancialMetricNormalizerParams, 'figure'> & {
 *   fallbackValue?: string
 * }} FinancialMetricNormalizerFactoryParams
 */
