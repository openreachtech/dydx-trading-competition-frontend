import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppWalletAccountContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppWalletAccountContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppWalletAccountContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    isShowingDropdownRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.isShowingDropdownRef = isShowingDropdownRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppWalletAccountContext ? X : never} T, X
   * @override
   * @param {AppWalletAccountContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    isShowingDropdownRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        isShowingDropdownRef,
      })
    )
  }

  /**
   * Toggle dropdown.
   *
   * @returns {void}
   */
  toggleDropdown () {
    this.isShowingDropdownRef.value = !this.isShowingDropdownRef.value
  }

  /**
   * Close dropdown.
   *
   * @returns {void}
   */
  closeDropdown () {
    this.isShowingDropdownRef.value = false
  }

  /**
   * Generate dropdown classes.
   *
   * @returns {Record<string, boolean>} Dropdown classes.
   */
  generateDropdownClasses () {
    return {
      'show-dropdown': this.isShowingDropdownRef.value,
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   isShowingDropdownRef: import('vue').Ref<boolean>
 * }} AppWalletAccountContextParams
 */

/**
 * @typedef {AppWalletAccountContextParams} AppWalletAccountContextFactoryParams
 */
