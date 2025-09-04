import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
