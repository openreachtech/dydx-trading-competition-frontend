import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppDatePikcerContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppDatePikcerContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppDatePickerContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    isDropdownOpenRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.isDropdownOpenRef = isDropdownOpenRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppDatePikcerContext ? X : never} T, X
   * @override
   * @param {AppDatePickerContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    isDropdownOpenRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        isDropdownOpenRef,
      })
    )
  }

  /**
   * Generate CSS classes for AppDatePicker.
   *
   * @returns {Record<string, boolean>} CSS classes
   */
  generateDatePickerClasses () {
    return {
      open: this.isDropdownOpenRef.value,
    }
  }

  /**
   * get: daysOfWeek
   *
   * @returns {Array<string>}
   */
  get daysOfWeek () {
    return [
      'Su',
      'Mo',
      'Tu',
      'We',
      'Th',
      'Fr',
      'Sa',
    ]
  }

  /**
   * Toggle dropdown.
   *
   * @returns {void}
   */
  toggleDropdown () {
    this.isDropdownOpenRef.value = !this.isDropdownOpenRef.value
  }

  /**
   * Close dropdown.
   *
   * @returns {void}
   */
  closeDropdown () {
    this.isDropdownOpenRef.value = false
  }

  /**
   * Open dropdown.
   *
   * @returns {void}
   */
  openDropdown () {
    this.isDropdownOpenRef.value = true
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   isDropdownOpenRef: import('vue').Ref<boolean>
 * }} AppDatePickerContextParams
 */

/**
 * @typedef {AppDatePickerContextParams} AppDatePickerContextFactoryParams
 */
