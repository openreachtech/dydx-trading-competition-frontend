import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const MAX_DISPLAYED_DAYS_PER_MONTH = 42

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

    inputValueRef,
    isDropdownOpenRef,
    dateReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.inputValueRef = inputValueRef
    this.isDropdownOpenRef = isDropdownOpenRef
    this.dateReactive = dateReactive
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
    inputValueRef,
    isDropdownOpenRef,
    dateReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        inputValueRef,
        isDropdownOpenRef,
        dateReactive,
      })
    )
  }

  /**
   * get: inputValue
   *
   * @returns {string} Input value.
   */
  get inputValue () {
    return this.inputValueRef.value
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
   * Generate displayed days.
   *
   * @returns {Array<*>}
   */
  generateDisplayedDays () {
    const currentMonthYear = {
      month: this.dateReactive.currentMonth,
      year: this.dateReactive.currentYear,
    }
    const previousMonthYear = this.calculatePreviousMonthYear(currentMonthYear)
    const nextMonthYear = this.calculateNextMonthYear(currentMonthYear)

    const daysCountInCurrentMonth = this.calculateDaysCountInMonth(currentMonthYear)
    const daysCountInPreviousMonth = this.calculateDaysCountInMonth(previousMonthYear)

    const firstDayOfMonthIndex = this.calculateFirstDayOfMonthIndex(currentMonthYear)

    const displayedDaysInCurrentMonth = Array.from(
      {
        length: daysCountInCurrentMonth,
      },
      (_, index) => ({
        day: index + 1,
        month: currentMonthYear.month + 1,
        year: currentMonthYear.year,
      })
    )

    const displayedDaysInPreviousMonth = Array.from(
      {
        length: daysCountInPreviousMonth,
      },
      (_, index) => index + 1
    )
      .slice(-1 * firstDayOfMonthIndex)
      .map(it => ({
        day: it,
        month: previousMonthYear.month + 1,
        year: previousMonthYear.year,
      }))

    const displayedDaysInNextMonth = Array.from(
      {
        length: MAX_DISPLAYED_DAYS_PER_MONTH - (firstDayOfMonthIndex + daysCountInCurrentMonth),
      },
      (_, index) => ({
        day: index + 1,
        month: nextMonthYear.month + 1,
        year: nextMonthYear.year,
      })
    )

    return [
      ...displayedDaysInPreviousMonth,
      ...displayedDaysInCurrentMonth,
      ...displayedDaysInNextMonth,
    ]
  }

  /**
   * Calculate the index of the first day of a month.
   *
   * @param {{
   *   month: number
   *   year: number
   * }} params - Parameters.
   * @returns {number} Sunday - Saturday (0 - 6).
   */
  calculateFirstDayOfMonthIndex ({
    month,
    year,
  }) {
    return new Date(year, month, 1)
      .getDay()
  }

  /**
   * Calculate the amount of days in a month.
   *
   * @param {{
   *   month: number
   *   year: number
   * }} params - Parameters.
   * @returns {number}
   */
  calculateDaysCountInMonth ({
    month,
    year,
  }) {
    return 32 - new Date(year, month, 32)
      .getDate()
  }

  /**
   * Calculate previous month and year.
   *
   * @param {{
   *   month: number
   *   year: number
   * }} params - Parameters.
   * @returns {{
   *   month: number
   *   year: number
   * }}
   */
  calculatePreviousMonthYear ({
    month,
    year,
  }) {
    if (month === 0) {
      return {
        month: 11,
        year: year - 1,
      }
    }

    return {
      month: month - 1,
      year,
    }
  }

  /**
   * Calculate next month and year.
   *
   * @param {{
   *   month: number
   *   year: number
   * }} params - Parameters.
   * @returns {{
   *   month: number
   *   year: number
   * }}
   */
  calculateNextMonthYear ({
    month,
    year,
  }) {
    if (month === 11) {
      return {
        month: 0,
        year: year + 1,
      }
    }

    return {
      month: month + 1,
      year,
    }
  }

  /**
   * Go to previous month.
   *
   * @returns {void}
   */
  goToPreviousMonth () {
    const {
      month,
      year,
    } = this.calculatePreviousMonthYear({
      month: this.dateReactive.currentMonth,
      year: this.dateReactive.currentYear,
    })

    this.dateReactive.currentMonth = month
    this.dateReactive.currentYear = year
  }

  /**
   * Go to next month.
   *
   * @returns {void}
   */
  goToNextMonth () {
    const {
      month,
      year,
    } = this.calculateNextMonthYear({
      month: this.dateReactive.currentMonth,
      year: this.dateReactive.currentYear,
    })

    this.dateReactive.currentMonth = month
    this.dateReactive.currentYear = year
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
 *   inputValueRef: import('vue').Ref<string>
 *   isDropdownOpenRef: import('vue').Ref<boolean>
 *   dateReactive: DateReactive
 * }} AppDatePickerContextParams
 */

/**
 * @typedef {AppDatePickerContextParams} AppDatePickerContextFactoryParams
 */

/**
 * @typedef {{
 *   currentMonth: number
 *   currentYear: number
 * }} DateReactive
 */

/**
 * @typedef {{
 *   day: number
 *   month: number
 *   year: number
 * }} DisplayedDay
 */
