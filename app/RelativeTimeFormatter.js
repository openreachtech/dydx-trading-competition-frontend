/**
 * @type {Array<{
 *   TIME_SPAN: number
 *   UNIT: Intl.RelativeTimeFormatUnit
 * }>}
 */
const MILLISECOND_TIME_UNIT_CONVERSIONS = [
  {
    TIME_SPAN: 31536000000, // 1000 * 60 * 60 * 24 * 365
    UNIT: 'year',
  },
  {
    TIME_SPAN: 2628000000, // 1000 * 60 * 60 * 24 * (365 / 12)
    UNIT: 'month',
  },
  {
    TIME_SPAN: 604800000, // 1000 * 60 * 60 * 24 * 7
    UNIT: 'week',
  },
  {
    TIME_SPAN: 86400000, // 1000 * 60 * 60 * 24
    UNIT: 'day',
  },
  {
    TIME_SPAN: 3600000, // 1000 * 60 * 60
    UNIT: 'hour',
  },
  {
    TIME_SPAN: 60000, // 1000 * 60
    UNIT: 'minute',
  },
  {
    TIME_SPAN: 1000,
    UNIT: 'second',
  },
]

export default class RelativeTimeFormatter {
  /**
   * Constructor.
   *
   * @param {RelativeTimeFormatterParams} params - Parameters.
   */
  constructor ({
    referenceDate,
    targetDate,
    formatter,
  }) {
    this.referenceDate = referenceDate
    this.targetDate = targetDate
    this.formatter = formatter
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RelativeTimeFormatter ? X : never} T, X
   * @param {RelativeTimeFormatterFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} Instance of this class.
   * @this {T}
   */
  static create ({
    referenceTime = Date.now(),
    targetTime,
    locale = 'en-US',
    formatOptions = {},
  }) {
    const referenceDate = this.createDate({
      time: referenceTime,
    })
    const targetDate = this.createDate({
      time: targetTime,
    })

    const formatter = this.createFormatter({
      locale,
      formatOptions,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        referenceDate,
        targetDate,
        formatter,
      })
    )
  }

  /**
   * Create `Intl.RelativeTimeFormat` formatter.
   *
   * @param {{
   *   locale: string
   *   formatOptions: Intl.RelativeTimeFormatOptions
   * }} params - Parameters.
   * @returns {InstanceType<typeof Intl.RelativeTimeFormat>}
   */
  static createFormatter ({
    locale,
    formatOptions,
  }) {
    const formatter = new Intl.RelativeTimeFormat(
      locale,
      formatOptions
    )

    return formatter
  }

  /**
   * Create a date object.
   *
   * @param {{
   *   time: Date | string | number
   * }} params - Parameters.
   * @returns {Date}
   */
  static createDate ({
    time,
  }) {
    return new Date(time)
  }

  /**
   * Generate formatted relative time string.
   *
   * @returns {string}
   */
  formatRelativeTime () {
    const {
      timeDifference,
      unit,
    } = this.generateRelativeTimeHash()

    return this.formatter.format(
      timeDifference,
      unit
    )
  }

  /**
   * Generate formatted relative time in parts.
   *
   * @returns {Array<Intl.RelativeTimeFormatPart>}
   */
  formatRelativeTimeToParts () {
    const {
      timeDifference,
      unit,
    } = this.generateRelativeTimeHash()

    return this.formatter.formatToParts(
      timeDifference,
      unit
    )
  }

  /**
   * Generate relative time hash.
   *
   * @returns {{
   *   timeDifference: number
   *   unit: Intl.RelativeTimeFormatUnit
   * }}
   */
  generateRelativeTimeHash () {
    const fallbackValue = MILLISECOND_TIME_UNIT_CONVERSIONS.at(-1)
      ?? {
        TIME_SPAN: 1000,
        UNIT: 'second',
      }

    const timeDifferenceInMilliseconds = this.calculateTimeDifferenceInMilliseconds()
    const matchedConversionEntity = MILLISECOND_TIME_UNIT_CONVERSIONS
      .find(it => Math.abs(timeDifferenceInMilliseconds) >= it.TIME_SPAN)
      ?? fallbackValue

    const convertedTimeDifference = Math.floor(
      timeDifferenceInMilliseconds / matchedConversionEntity.TIME_SPAN
    )

    return {
      timeDifference: convertedTimeDifference,
      unit: matchedConversionEntity.UNIT,
    }
  }

  /**
   * Calculate time difference in milliseconds.
   *
   * @returns {number}
   */
  calculateTimeDifferenceInMilliseconds () {
    return this.targetDate.getTime() - this.referenceDate.getTime()
  }
}

/**
 * @typedef {{
 *   referenceDate: Date
 *   targetDate: Date
 *   formatter: InstanceType<typeof Intl.RelativeTimeFormat>
 * }} RelativeTimeFormatterParams
 */

/**
 * @typedef {{
 *   referenceTime?: Date | string | number
 *   targetTime: Date | string | number
 *   locale?: string
 *   formatOptions?: Intl.RelativeTimeFormatOptions
 * }} RelativeTimeFormatterFactoryParams
 */
