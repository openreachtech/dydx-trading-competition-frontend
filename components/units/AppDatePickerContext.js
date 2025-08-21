import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

const MAX_DISPLAYED_DAYS_PER_MONTH = 42

/**
 * AppDatePickerContext
 *
 * @extends {BaseAppContext<null, AppDatePickerProps, 'changeDate'>}
 */
export default class AppDatePickerContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AppDatePickerContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    displayedInputValueRef,
    isDropdownOpenRef,
    currentViewDateReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.displayedInputValueRef = displayedInputValueRef
    this.isDropdownOpenRef = isDropdownOpenRef
    this.currentViewDateReactive = currentViewDateReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppDatePickerContext ? X : never} T, X
   * @override
   * @param {AppDatePickerContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    displayedInputValueRef,
    isDropdownOpenRef,
    currentViewDateReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        displayedInputValueRef,
        isDropdownOpenRef,
        currentViewDateReactive,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CHANGE_DATE: 'changeDate',
    }
  }

  /**
   * Generate initial value for `currentViewDateReactive`.
   *
   * @returns {CurrentViewDate}
   */
  static generateInitialCurrentViewDate () {
    const today = new Date()

    return {
      year: today.getFullYear(),
      month: today.getMonth(),
    }
  }

  /**
   * Setup component.
   *
   * @template {X extends AppDatePickerContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.initialDate,
      () => {
        this.syncInitialInputValue()
      },
      {
        once: true,
      }
    )

    return this
  }

  /**
   * get: initialDate
   *
   * @returns {Date | string | null}
   */
  get initialDate () {
    return this.props.initialDate
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
   * get: shouldStayOnSelect
   *
   * @returns {boolean} `true` if the dropdown should stay on select.
   */
  get shouldStayOnSelect () {
    return this.props.shouldStayOnSelect
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
  get displayedInputValue () {
    return this.displayedInputValueRef.value
  }

  /**
   * Sync the initial value of date picker.
   *
   * @returns {void}
   */
  syncInitialInputValue () {
    if (this.initialDate === null) {
      return
    }

    const dateString = new Date(this.initialDate)
      .toISOString()
      .split('T')
      .at(0)
      ?? null

    if (!dateString) {
      return
    }

    this.displayedInputValueRef.value = dateString
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
      year: this.currentViewDateReactive.year,
      month: this.currentViewDateReactive.month,
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
      year: this.currentViewDateReactive.year,
      month: this.currentViewDateReactive.month,
    })

    this.currentViewDateReactive.year = year
    this.currentViewDateReactive.month = month
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
      year: this.currentViewDateReactive.year,
      month: this.currentViewDateReactive.month,
    })

    this.currentViewDateReactive.year = year
    this.currentViewDateReactive.month = month
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
    this.currentViewDateReactive.year = date.year
    this.currentViewDateReactive.month = date.month

    const selectedDate = new Date()

    selectedDate.setUTCFullYear(date.year)
    selectedDate.setUTCMonth(date.month)
    selectedDate.setUTCDate(date.day)

    this.displayedInputValueRef.value = selectedDate.toISOString()
      .split('T')
      .at(0)
      ?? ''

    this.emit(
      this.EMIT_EVENT_NAME.CHANGE_DATE,
      {
        date: this.displayedInputValueRef.value,
      }
    )

    if (this.shouldStayOnSelect) {
      return
    }

    this.closeDropdown()
  }

  /**
   * Generate current month and year to display.
   *
   * @returns {string}
   */
  generateDisplayedCurrentMonthYear () {
    const date = new Date(
      this.currentViewDateReactive.year,
      this.currentViewDateReactive.month
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
    ] = this.displayedInputValue
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
    return date.year === this.currentViewDateReactive.year
      && date.month === this.currentViewDateReactive.month
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<AppDatePickerProps> & {
 *   displayedInputValueRef: import('vue').Ref<string>
 *   isDropdownOpenRef: import('vue').Ref<boolean>
 *   currentViewDateReactive: CurrentViewDate
 * }} AppDatePickerContextParams
 */

/**
 * @typedef {AppDatePickerContextParams} AppDatePickerContextFactoryParams
 */

/**
 * @typedef {{
 *   year: number
 *   month: number
 * }} CurrentViewDate
 */

/**
 * @typedef {{
 *   day: number
 *   month: number
 *   year: number
 * }} DisplayedDay
 */

/**
 * @typedef {{
 *   initialDate: Date | string | null
 *   shouldDisablePastDates: boolean
 *   shouldStayOnSelect: boolean
 *   rootClass: string
 * }} AppDatePickerProps
 */
