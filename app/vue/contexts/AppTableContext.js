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
}

/**
 * @typedef {{
 *   key: string
 *   label: string
 * }} HeaderEntry
 */
