import {
  BaseGraphqlCapsule,
} from '@openreachtech/furo'

import {
  ERROR_CODE_HASH,
  ERROR_MESSAGE_HASH,
} from '~/app/constants'

/**
 * Company sponsors query graphql launcher.
 *
 * @template D - Type of content (data).
 * @extends {BaseGraphqlCapsule<D>}
 */
export default class BaseAppGraphqlCapsule extends BaseGraphqlCapsule {
  /**
   * Get error message after resolving its error code.
   *
   * @returns {string} Resolved error message.
   */
  getResolvedErrorMessage () {
    const errorCode = this.getErrorMessage()

    if (errorCode === null) {
      return ERROR_MESSAGE_HASH.Unknown
    }

    const errorCodeHashEntries = Object.entries(ERROR_CODE_HASH)
    const errorCodeIndex = errorCodeHashEntries
      .findIndex(([key, value]) => (Array.isArray(value)
        ? value.includes(errorCode)
        : value === errorCode
      ))
    const matchedErrorCodeHashEntry = errorCodeHashEntries[errorCodeIndex]

    if (!matchedErrorCodeHashEntry) {
      return errorCode
    }

    const [errorCodeHashKey] = matchedErrorCodeHashEntry

    return ERROR_MESSAGE_HASH[errorCodeHashKey]
      ?? errorCode
  }
}
