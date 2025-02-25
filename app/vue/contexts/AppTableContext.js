import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppTableContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppTableContext extends BaseFuroContext {
  /**
   * get: entries
   *
   * @returns {Array<Record<string, any>>} Entries.
   */
  get entries () {
    return this.props.entries
  }

  /**
   * get: headerEntries
   *
   * @returns {Array<HeaderEntry>} Header entries.
   */
  get headerEntries () {
    return this.props.headerEntries
  }

  /**
   * get: minWidth
   *
   * @returns {string} Min width.
   */
  get minWidth () {
    return this.props.minWidth
  }

  /**
   * Generate table cell classes.
   *
   * @param {{
   *   columnOptions: HeaderEntry['columnOptions']
   * }} params - Parameters.
   * @returns {Record<string, boolean>} Cell classes.
   */
  generateCellClasses ({
    columnOptions,
  }) {
    if (!columnOptions) {
      return {}
    }

    return {
      'text-start': columnOptions.textAlign === 'start',
      'text-end': columnOptions.textAlign === 'end',
      'text-center': columnOptions.textAlign === 'center',
    }
  }
}

/**
 * @typedef {{
 *   key: string
 *   label: string
 *   columnOptions?: {
 *     textAlign: 'start' | 'end' | 'center'
 *   }
 * }} HeaderEntry
 */
