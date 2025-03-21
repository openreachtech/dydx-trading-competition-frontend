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
   * get: isLoading
   *
   * @returns {boolean} `true` if is loading.
   */
  get isLoading () {
    return this.props.isLoading
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
   * get: shouldHideHeaderCells
   *
   * @returns {boolean} `true` if should hide header cells.
   */
  get shouldHideHeaderCells () {
    return this.props.shouldHideHeaderCells
  }

  /**
   * Check if table is empty.
   *
   * @returns {boolean} `true` if is empty.
   */
  isEmpty () {
    return this.entries.length === 0
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
    const columnOptionClasses = this.generateColumnOptionClasses({
      columnOptions,
    })

    return {
      ...columnOptionClasses,
      'hide-head': this.shouldHideHeaderCells,
    }
  }

  /**
   * Generate column option classes.
   *
   * @param {{
   *   columnOptions: HeaderEntry['columnOptions']
   * }} params - Parameters.
   * @returns {Record<string, boolean>} CSS classes from column options.
   */
  generateColumnOptionClasses ({
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
