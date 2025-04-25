import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  REMOVED_QUERY_VALUE,
} from '~/app/constants'

export const EMIT_EVENT_NAME = /** @type {const} */ ({
  SEARCH: 'search',
})

/**
 * @typedef {(typeof EMIT_EVENT_NAME)[keyof typeof EMIT_EVENT_NAME]} hey
 */

/**
 * AppSearchBarContext
 *
 * @extends {BaseFuroContext<(typeof EMIT_EVENT_NAME)[keyof typeof EMIT_EVENT_NAME]>}
 */
export default class AppSearchBarContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppSearchBarContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    route,
    router,
    isOpenResultRef,
    isOpenFilterRef,
    debouncedSearch,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
    this.isOpenResultRef = isOpenResultRef
    this.isOpenFilterRef = isOpenFilterRef
    this.debouncedSearch = debouncedSearch
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppSearchBarContext ? X : never} T, X
   * @override
   * @param {AppSearchBarContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    router,
    isOpenResultRef,
    isOpenFilterRef,
    debouncedSearch,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
        isOpenResultRef,
        isOpenFilterRef,
        debouncedSearch,
      })
    )
  }

  /**
   * @override
   * @returns {Record<keyof typeof EMIT_EVENT_NAME, (typeof EMIT_EVENT_NAME)[keyof typeof EMIT_EVENT_NAME]>} CSS classes.
   */
  static get EMIT_EVENT_NAME () {
    return {
      SEARCH: 'search',
    }
  }

  /**
   * get: placeholder
   *
   * @returns {string} Placeholder.
   */
  get placeholder () {
    return this.props.placeholder
  }

  /**
   * get: hasFilter
   *
   * @returns {boolean} `true` if has filter.
   */
  get hasFilter () {
    return this.props.hasFilter
  }

  /**
   * get: filters
   *
   * @returns {Array<Filter>} Filters.
   */
  get filters () {
    return this.props.filters
  }

  /**
   * get: results
   *
   * @returns {Array<*>} Result.
   */
  get results () {
    return this.props.results
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
   * get: size
   *
   * @returns {SizeProp} Size.
   */
  get size () {
    return this.props.size
  }

  /**
   * get: variant
   *
   * @returns {VariantProp} Variant.
   */
  get variant () {
    return this.props.variant
  }

  /**
   * Toggle filter option state.
   *
   * @param {{
   *   name: string
   *   value: string | number
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async toggleFilterOptionState ({
    name,
    value,
  }) {
    const isActive = this.isFilterOptionActive({
      name,
      value,
    })
    const newValue = isActive
      ? REMOVED_QUERY_VALUE
      : value

    await this.router.replace({
      query: {
        ...this.route.query,
        [name]: newValue,
      },
    })
  }

  /**
   * Clear filters.
   *
   * @returns {Promise<void>}
   */
  async clearFilters () {
    const filters = this.generateFiltersForRemoval()

    await this.router.replace({
      query: {
        ...this.route.query,
        ...filters,
      },
    })
  }

  /**
   * Generate filters for removal.
   *
   * @returns {Record<string, REMOVED_QUERY_VALUE>}
   */
  generateFiltersForRemoval () {
    const activeFilters = this.extractActiveFilters()

    return Object.fromEntries(
      activeFilters.map(filter => [filter, REMOVED_QUERY_VALUE])
    )
  }

  /**
   * Extract active filters.
   *
   * @returns {Array<string>}
   */
  extractActiveFilters () {
    return this.filters
      .map(filter => filter.name)
      .filter(filter => this.route.query[filter])
  }

  /**
   * Generate classes for the search bar element.
   *
   * @returns {Array<string | Record<string, boolean>>} CSS classes.
   */
  generateSearchBarClasses () {
    return [
      this.size,
      this.variant,
      {
        open: this.isOpenResultRef.value,
        'show-results': this.shouldShowResults(),
        'no-results': this.results.length === 0,
        loading: this.isLoading,
      },
    ]
  }

  /**
   * Generate classes for the filter element.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateFilterClasses () {
    return {
      open: this.isOpenFilterRef.value,
      selected: this.isOpenFilterRef.value,
      hidden: !this.hasFilter,
    }
  }

  /**
   * Generate CSS classes for filter options.
   *
   * @param {{
   *   name: string
   *   value: string | number
   * }} params - Parameters.
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generateFilterOptionClasses ({
    name,
    value,
  }) {
    const isActive = this.isFilterOptionActive({
      name,
      value,
    })

    return {
      active: isActive,
    }
  }

  /**
   * Check if a filter is being active.
   *
   * @param {{
   *   name: string
   *   value: string | number
   * }} params - Parameters.
   * @returns {boolean}
   */
  isFilterOptionActive ({
    name,
    value,
  }) {
    const queryFilter = this.route.query[name]
    if (!queryFilter) {
      return false
    }

    const expectedValue = typeof value === 'string'
      ? value
      : value.toString()

    return queryFilter === expectedValue
  }

  /**
   * Open result.
   *
   * @returns {void}
   */
  openResult () {
    this.isOpenResultRef.value = true
  }

  /**
   * Close result.
   *
   * @returns {void}
   */
  closeResult () {
    if (!this.isOpenResultRef.value) {
      return
    }

    this.isOpenResultRef.value = false
  }

  /**
   * Toggle filter.
   *
   * @returns {void}
   */
  toggleFilter () {
    this.isOpenFilterRef.value = !this.isOpenFilterRef.value
  }

  /**
   * Close filter.
   *
   * @returns {void}
   */
  closeFilter () {
    if (!this.isOpenFilterRef.value) {
      return
    }

    this.isOpenFilterRef.value = false
  }

  /**
   * Whether to show the results or not.
   *
   * @returns {boolean} `true` if should show results.
   */
  shouldShowResults () {
    return Boolean(this.slots.results)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   isOpenResultRef: import('vue').Ref<boolean>
 *   isOpenFilterRef: import('vue').Ref<boolean>
 *   debouncedSearch: (...args: Array<any>) => void
 * }} AppSearchBarContextParams
 */

/**
 * @typedef {AppSearchBarContextParams} AppSearchBarContextFactoryParams
 */

/**
 * @typedef {'small'
 *   | 'base'
 *   | 'large'
 * } SizeProp
 */

/**
 * @typedef {'base'
 *   | 'transparent'
 * } VariantProp
 */

/**
 * @typedef {{
 *   name: string
 *   caption?: string
 *   options: Array<{
 *     value: string | number
 *     label: string
 *   }>
 * }} Filter
 */
