import BaseAppContext from '~/app/vue/contexts/BaseAppContext'
import DatePickerTimeItemContext from './DatePickerTimeItemContext'

const MAX_DISPLAYED_DAYS_PER_MONTH = 42

/** @type {Array<ClockTimeMeta>} */
const CLOCK_TIMES = [
  {
    KEY: 'hour',
    MAX_CLOCK_TIME: 23,
    MIN_CLOCK_TIME: 0,
  },
  {
    KEY: 'minute',
    MAX_CLOCK_TIME: 59,
    MIN_CLOCK_TIME: 0,
  },
]

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

    isDropdownOpenRef,
    selectedDateRef,
    currentViewDateReactive,
    displayedDateFormatter,
  }) {
    super({
      props,
      componentContext,
    })

    this.isDropdownOpenRef = isDropdownOpenRef
    this.selectedDateRef = selectedDateRef
    this.currentViewDateReactive = currentViewDateReactive
    this.displayedDateFormatter = displayedDateFormatter
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
    isDropdownOpenRef,
    selectedDateRef,
    currentViewDateReactive,
  }) {
    const displayedDateFormatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        isDropdownOpenRef,
        selectedDateRef,
        currentViewDateReactive,
        displayedDateFormatter,
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
        this.syncInitialSelectedDate()
        this.syncInitialCurrentViewDate()
      },
      {
        once: true,
      }
    )

    return this
  }

  /**
   * get: canPickTime
   *
   * @returns {boolean}
   */
  get canPickTime () {
    return this.props.canPickTime
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
   * Create an array of `DatePickerTimeItemContext` instances.
   *
   * @returns {Array<InstanceType<typeof DatePickerTimeItemContext>>}
   */
  createDatePickerTimeItemContexts () {
    return CLOCK_TIMES.map(it =>
      DatePickerTimeItemContext.create({
        selectedDateRef: this.selectedDateRef,
        key: it.KEY,
        maxClockTime: it.MAX_CLOCK_TIME,
        minClockTime: it.MIN_CLOCK_TIME,
      })
    )
  }

  /**
   * Sync the initial value of `selectedDateRef`.
   *
   * @returns {void}
   */
  syncInitialSelectedDate () {
    if (this.initialDate === null) {
      return
    }

    const normalizedDate = new Date(this.initialDate)

    this.selectedDateRef.value = {
      year: normalizedDate.getFullYear(),
      month: normalizedDate.getMonth(),
      day: normalizedDate.getDate(),
      hour: normalizedDate.getHours(),
      minute: normalizedDate.getHours(),
    }
  }

  /**
   * Sync the initial value of `currentViewDateReactive`.
   *
   * @returns {void}
   */
  syncInitialCurrentViewDate () {
    if (this.initialDate === null) {
      return
    }

    const normalizedDate = new Date(this.initialDate)

    this.currentViewDateReactive.year = normalizedDate.getFullYear()
    this.currentViewDateReactive.month = normalizedDate.getMonth()
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
   * Normalize the value of underlying hidden input.
   *
   * @returns {string | null} ISO string or null if unset.
   */
  normalizeInputValue () {
    const selectedDate = this.generateSelectedDateInstance()

    if (!selectedDate) {
      return null
    }

    return selectedDate.toISOString()
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
    const lastSelectedDate = this.selectedDateRef.value
      ? this.selectedDateRef.value
      : this.generateSelectedDateAsToday()

    this.selectedDateRef.value = {
      ...lastSelectedDate,
      year: date.year,
      month: date.month,
      day: date.day,
    }

    this.emit(
      this.EMIT_EVENT_NAME.CHANGE_DATE,
      {
        date: this.normalizeInputValue(),
      }
    )

    if (this.shouldStayOnSelect) {
      return
    }

    this.closeDropdown()
  }

  /**
   * Generate selected date with the value of today.
   *
   * @returns {SelectedDate}
   */
  generateSelectedDateAsToday () {
    const today = new Date()

    return {
      year: today.getFullYear(),
      month: today.getMonth(),
      day: today.getDate(),
      hour: 0,
      minute: 0,
    }
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
   * Format date to display.
   *
   * @returns {string}
   */
  formatDisplayedDate () {
    const selectedDate = this.generateSelectedDateInstance()

    if (!selectedDate) {
      return '__/__/____'
    }

    return this.displayedDateFormatter.format(selectedDate)
  }

  /**
   * Generate a date instance from selected date.
   *
   * @returns {Date | null} A 'Date' instance, or null if unset.
   */
  generateSelectedDateInstance () {
    if (!this.selectedDateRef.value) {
      return null
    }

    const {
      year,
      month,
      day,
      hour,
      minute,
    } = this.selectedDateRef.value

    return new Date(
      year,
      month,
      day,
      hour,
      minute
    )
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
    if (!this.selectedDateRef.value) {
      return false
    }

    const {
      year,
      month,
      day,
    } = this.selectedDateRef.value

    return date.year === year
      && date.month === month
      && date.day === day
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

  /**
   * Check if a date has been selected.
   *
   * @returns {boolean}
   */
  hasSelectedDate () {
    return Boolean(this.selectedDateRef.value)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<AppDatePickerProps> & {
 *   isDropdownOpenRef: import('vue').Ref<boolean>
 *   selectedDateRef: import('vue').Ref<SelectedDate | null>
 *   currentViewDateReactive: CurrentViewDate
 *   displayedDateFormatter: InstanceType<typeof Intl.DateTimeFormat>
 * }} AppDatePickerContextParams
 */

/**
 * @typedef {Omit<AppDatePickerContextParams, 'displayedDateFormatter'>} AppDatePickerContextFactoryParams
 */

/**
 * @typedef {{
 *   year: number
 *   month: number
 * }} CurrentViewDate
 */

/**
 * @typedef {{
 *   year: number
 *   month: number
 *   day: number
 *   hour: number
 *   minute: number
 * }} SelectedDate
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
 *   canPickTime: boolean
 *   initialDate: Date | string | null
 *   shouldDisablePastDates: boolean
 *   shouldStayOnSelect: boolean
 *   rootClass: string
 * }} AppDatePickerProps
 */

/**
 * @typedef {{
 *   KEY: 'hour' | 'minute'
 *   MAX_CLOCK_TIME: number
 *   MIN_CLOCK_TIME: number
 * }} ClockTimeMeta
 */
