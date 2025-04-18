import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
    isOpenResultRef,
    isOpenFilterRef,
    debouncedSearch,
  }) {
    super({
      props,
      componentContext,
    })

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
    isOpenResultRef,
    isOpenFilterRef,
    debouncedSearch,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
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
