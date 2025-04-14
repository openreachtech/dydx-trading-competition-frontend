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
   * @returns {string | null} Resolved error message.
   */
  getResolvedErrorMessage () {
    const errorCode = this.getErrorMessage()

    if (errorCode === null) {
      return null
    }

    const errorCodeHashEntries = Object.entries(ERROR_CODE_HASH)
    const errorCodeIndex = errorCodeHashEntries
      .findIndex(([key, value]) => (Array.isArray(value)
        ? value.includes(errorCode)
        : value === errorCode
      ))
    const [errorCodeHashKey] = errorCodeHashEntries[errorCodeIndex]

    if (!errorCodeHashKey) {
      return errorCode
    }

    return ERROR_MESSAGE_HASH[errorCodeHashKey]
      ?? errorCode
  }
}
