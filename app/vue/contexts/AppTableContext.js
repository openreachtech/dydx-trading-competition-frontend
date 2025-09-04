import {
  SORT_DIRECTION_OPTION,
} from '~/app/constants'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AppTableContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class AppTableContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AppTableContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    router,
    filterStateReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
    this.filterStateReactive = filterStateReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppTableContext ? X : never} T, X
   * @override
   * @param {AppTableContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    router,
    filterStateReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
        filterStateReactive,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      SORT_COLUMN: 'sortColumn',
    }
  }

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
   * get: sortQueryKey
   *
   * @returns {string}
   */
  get sortQueryKey () {
    return this.props.sortQueryKey
  }

  /**
   * Setup component.
   *
   * @template {X extends AppTableContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.extractSortOptionFromRoute(),
      newSortOption => {
        if (!newSortOption) {
          return
        }

        this.filterStateReactive.sortOption.targetColumn = newSortOption.targetColumn
        this.filterStateReactive.sortOption.orderBy = newSortOption.orderBy
      },
      {
        deep: true,
        immediate: true,
      }
    )

    return this
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

  /**
   * Generate slot name for filter element in header cell.
   *
   * @param {{
   *   key: string
   * }} params - Parameters
   * @returns {string}
   */
  generateHeaderFilterSlotName ({
    key,
  }) {
    return `head-${key}-filter`
  }

  /**
   * Sort column.
   *
   * @param {{
   *   key: string
   * }} params - Parameters.
   * @returns {void}
   */
  sortColumn ({
    key,
  }) {
    const newSortDirection = this.generateNextSortDirection({
      columnName: key,
    })

    this.filterStateReactive.sortOption.targetColumn = key
    this.filterStateReactive.sortOption.orderBy = newSortDirection

    this.emitSortColumn({
      sortOption: {
        targetColumn: key,
        orderBy: newSortDirection,
      },
    })

    this.router.push({
      query: {
        ...this.route.query,
        [this.sortQueryKey]: encodeURIComponent(`${key}:${newSortDirection}`),
      },
    })
  }

  /**
   * Emit 'sortColumn' event.
   *
   * @param {{
   *   sortOption: SortOption
   * }} params - Parameters.
   * @returns {void}
   */
  emitSortColumn ({
    sortOption,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME.SORT_COLUMN,
      sortOption
    )
  }

  /**
   * Generate value of what the next sort direction is going to be.
   *
   * @param {{
   *   columnName: string
   * }} params - Parameters.
   * @returns {string}
   */
  generateNextSortDirection ({
    columnName,
  }) {
    const {
      targetColumn,
      orderBy,
    } = this.filterStateReactive.sortOption

    if (columnName !== targetColumn) {
      return SORT_DIRECTION_OPTION.DESC
    }

    return orderBy === SORT_DIRECTION_OPTION.ASC
      ? SORT_DIRECTION_OPTION.DESC
      : SORT_DIRECTION_OPTION.ASC
  }

  /**
   * Extract sort option from route.
   *
   * @returns {SortOption | null}
   */
  extractSortOptionFromRoute () {
    const {
      [this.sortQueryKey]: sortOptionFromRoute,
    } = this.route.query

    const sortOption = Array.isArray(sortOptionFromRoute)
      ? sortOptionFromRoute.at(0)
      : sortOptionFromRoute

    if (!sortOption) {
      return null
    }

    const decodedSortOption = decodeURIComponent(sortOption)
    const [targetColumn, orderBy] = decodedSortOption.split(':')

    return {
      targetColumn,
      orderBy,
    }
  }

  /**
   * Check if the table is being sorted in ascending direction.
   *
   * @param {{
   *   key: string
   * }} params - Parameters.
   * @returns {boolean}
   */
  isAscendinglySorted ({
    key,
  }) {
    const {
      targetColumn,
      orderBy,
    } = this.filterStateReactive.sortOption

    return targetColumn === key
      && orderBy === SORT_DIRECTION_OPTION.ASC
  }

  /**
   * Check if the table is being sorted in descending direction.
   *
   * @param {{
   *   key: string
   * }} params - Parameters.
   * @returns {boolean}
   */
  isDescendinglySorted ({
    key,
  }) {
    const {
      targetColumn,
      orderBy,
    } = this.filterStateReactive.sortOption

    return targetColumn === key
      && orderBy === SORT_DIRECTION_OPTION.DESC
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   filterStateReactive: import('vue').Reactive<FilterState>
 * }} AppTableContextParams
 */

/**
 * @typedef {AppTableContextParams} AppTableContextFactoryParams
 */

/**
 * @typedef {{
 *   sortOption: SortOption
 * }} FilterState
 */

/**
 * @typedef {{
 *   key: string
 *   label: string
 *   columnOptions?: {
 *     textAlign: 'start' | 'end' | 'center'
 *   }
 *   isSortable?: boolean
 * }} HeaderEntry
 */

/**
 * @typedef {{
 *   targetColumn: string | null
 *   orderBy: string
 * }} SortOption
 */
