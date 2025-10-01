import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const NUMBER_ABBREVIATION_TIERS = [
  { VALUE: 1e9, SYMBOL: 'b' },
  { VALUE: 1e6, SYMBOL: 'm' },
  { VALUE: 1e3, SYMBOL: 'k' },
]

/**
 * BaseAppContext
 *
 * @template {typeof import('@openreachtech/furo-nuxt').BaseFuroContextAccessor<*> | null} [A = null] - ContextAccessor class.
 * @template {import('vue').ComponentCustomProps} [P = {}] - Props.
 * @template {string | null} [EE = null] - emit() event names.
 * @extends {BaseFuroContext<A, P, EE>}
 */
export default class BaseAppContext extends BaseFuroContext {
  /**
   * Format number.
   *
   * @param {{
   *   value: string | number | null
   *   fallbackValue?: string
   *   locale?: string
   *   options?: Intl.NumberFormatOptions
   * }} params - Parameters.
   * @returns {string}
   */
  formatNumber ({
    value,
    fallbackValue = '--',
    locale = 'en-US',
    options = {},
  }) {
    if (value === null) {
      return fallbackValue
    }

    const parsedValue = typeof value === 'string'
      ? parseFloat(value)
      : value

    if (isNaN(parsedValue)) {
      return fallbackValue
    }

    const formatter = new Intl.NumberFormat(
      locale,
      options
    )

    return formatter.format(parsedValue)
  }

  /**
   * Format number with abbreviated suffix.
   *
   * @param {{
   *   value: string | number | null
   *   fallbackValue?: string
   * }} params - Parameters.
   * @returns {string}
   */
  abbreviateNumber ({
    value,
    fallbackValue = '--',
  }) {
    if (value === null) {
      return fallbackValue
    }

    const parsedValue = typeof value === 'string'
      ? parseFloat(value)
      : value

    if (isNaN(parsedValue)) {
      return fallbackValue
    }

    const matchedTier = NUMBER_ABBREVIATION_TIERS.find(tier =>
      Math.abs(parsedValue) >= tier.VALUE
    )

    if (!matchedTier) {
      return parsedValue.toString()
    }

    const abbreviatedValue = parseFloat(
      (parsedValue / matchedTier.VALUE).toFixed(1)
    )

    return `${abbreviatedValue}${matchedTier.SYMBOL}`
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address?: string | null
   *   delimiter?: string
   *   truncationThreshold?: number
   *   firstHalfLength?: number
   *   secondHalfLength?: number
   *   fallbackValue?: string
   * }} params - Parameters.
   * @returns {string}
   */
  shortenWalletAddress ({
    address,
    delimiter = '...',
    truncationThreshold = 12,
    firstHalfLength = 7,
    secondHalfLength = 5,
    fallbackValue = '--',
  }) {
    const isNotString = typeof address !== 'string'

    if (!address || isNotString) {
      return fallbackValue
    }

    if (address.length <= truncationThreshold) {
      return address
    }

    const normalizedFirstHalfLength = Math.min(firstHalfLength, address.length)

    const remainingCharacters = address.length - normalizedFirstHalfLength
    const normalizedSecondHalfLength = Math.min(secondHalfLength, remainingCharacters)

    const firstHalf = address.slice(0, normalizedFirstHalfLength)
    const secondHalf = address.slice(-1 * normalizedSecondHalfLength)

    return `${firstHalf}${delimiter}${secondHalf}`
  }
}
