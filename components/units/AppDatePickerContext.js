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
   * get: shouldDisablePastDates
   *
   * @returns {boolean} `true` if past dates should be disabled.
   */
  get shouldDisablePastDates () {
    return this.props.shouldDisablePastDates
  }

  /**
   * get: rootClass
   *
   * @returns {string} Class of root element for layout styling.
   */
  get rootClass () {
    return this.props.rootClass
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
   * @returns {Array<string | Record<string, boolean>>} CSS classes
   */
  generateDatePickerClasses () {
    return [
      this.rootClass,
      {
        open: this.isDropdownOpenRef.value,
      },
    ]
  }

  /**
   * Generate CSS classes for date button.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {Record<string, boolean>} CSS classes
   */
  generateDateButtonClasses ({
    date,
  }) {
    return {
      selected: this.isSelectedDate({
        date,
      }),
      today: this.isToday({
        date,
      }),
      'off-month': !this.isInThisMonth({
        date,
      }),
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
        month: currentMonthYear.month,
        year: currentMonthYear.year,
      })
    )

    // If current month starts on Sunday, don't show previous month.
    const displayedDaysInPreviousMonth = firstDayOfMonthIndex === 0
      ? []
      : Array.from(
        {
          length: daysCountInPreviousMonth,
        },
        (_, index) => index + 1
      )
        .slice(-1 * firstDayOfMonthIndex)
        .map(it => ({
          day: it,
          month: previousMonthYear.month,
          year: previousMonthYear.year,
        }))

    const displayedDaysInNextMonth = Array.from(
      {
        length: MAX_DISPLAYED_DAYS_PER_MONTH - (firstDayOfMonthIndex + daysCountInCurrentMonth),
      },
      (_, index) => ({
        day: index + 1,
        month: nextMonthYear.month,
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
   * Select date.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {void}
   */
  selectDate ({
    date,
  }) {
    const selectedDate = new Date()

    selectedDate.setUTCFullYear(date.year)
    selectedDate.setUTCMonth(date.month)
    selectedDate.setUTCDate(date.day)

    this.inputValueRef.value = selectedDate.toISOString()
      .split('T')
      .at(0)
      ?? ''
  }

  /**
   * Generate current month and year to display.
   *
   * @returns {string}
   */
  generateDisplayedCurrentMonthYear () {
    const date = new Date(
      this.dateReactive.currentYear,
      this.dateReactive.currentMonth
    )
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'long',
      year: 'numeric',
    })

    return formatter.format(date)
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

  /**
   * Normalize displayed day.
   *
   * @param {{
   *   day: number
   * }} params - Parameters.
   * @returns {string}
   */
  normalizeDisplayedDay ({
    day,
  }) {
    return day.toString()
      .padStart(2, '0')
  }

  /**
   * Check if a date is currently selected.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {boolean} `true` if being selected.
   */
  isSelectedDate ({
    date,
  }) {
    const [
      selectedYear,
      selectedMonth,
      selectedDate,
    ] = this.inputValue
      .split('-')
      .map(it => Number(it))

    return date.day === selectedDate
      && date.month === selectedMonth - 1
      && date.year === selectedYear
  }

  /**
   * Check if a date is today.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {boolean} `true` if is today.
   */
  isToday ({
    date,
  }) {
    const today = new Date()

    return date.day === today.getDate()
      && date.month === today.getMonth()
      && date.year === today.getFullYear()
  }

  /**
   * Check if a date is in this month.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {boolean} `true` if is today.
   */
  isInThisMonth ({
    date,
  }) {
    return date.month === this.dateReactive.currentMonth
      && date.year === this.dateReactive.currentYear
  }

  /**
   * Check if a date should be disabled.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {boolean} `true` if being selected.
   */
  isDisabledDate ({
    date,
  }) {
    if (
      this.shouldDisablePastDates
      && this.isPastDate({
        date,
      })
    ) {
      return true
    }

    return false
  }

  /**
   * Check if a date is in the past.
   *
   * @param {{
   *   date: DisplayedDay
   * }} params - Parameters.
   * @returns {boolean} `true` if being selected.
   */
  isPastDate ({
    date,
  }) {
    const today = new Date()
    // Before the end of the day (23:59:59).
    const targetDate = new Date(
      date.year,
      date.month,
      date.day,
      23,
      59,
      59
    )

    return targetDate < today
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
