export default class DatePickerTimeItemContext {
  /**
   * Constructor
   *
   * @param {DatePickerTimeItemContextParams} params - Parameters.
   */
  constructor ({
    selectedDateRef,
    key,
    maxClockTime,
    minClockTime,
  }) {
    this.selectedDateRef = selectedDateRef
    this.key = key
    this.maxClockTime = maxClockTime
    this.minClockTime = minClockTime
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof DatePickerTimeItemContext ? X : never} T, X
   * @param {DatePickerTimeItemContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    selectedDateRef,
    key,
    maxClockTime,
    minClockTime,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        selectedDateRef,
        key,
        maxClockTime,
        minClockTime,
      })
    )
  }

  /**
   * Extract clock time.
   *
   * @returns {number}
   */
  extractCurrentClockTime () {
    return this.selectedDateRef.value
      ?.[this.key]
      ?? 0
  }

  /**
   * Increment clock time.
   *
   * @returns {void}
   */
  incrementClockTime () {
    const currentClockTime = this.extractCurrentClockTime()

    if (currentClockTime === this.maxClockTime) {
      this.updateClockTime({
        clockTime: this.minClockTime,
      })

      return
    }

    this.updateClockTime({
      clockTime: currentClockTime + 1,
    })
  }

  /**
   * Decrement clock time.
   */
  decrementClockTime () {
    const currentClockTime = this.extractCurrentClockTime()

    if (currentClockTime === this.minClockTime) {
      this.updateClockTime({
        clockTime: this.maxClockTime,
      })

      return
    }

    this.updateClockTime({
      clockTime: currentClockTime - 1,
    })
  }

  /**
   * Handle event on input change.
   *
   * @param {{
   *   inputEvent: Event
   * }} params - Parameters.
   * @returns {void}
   */
  onInputChange ({
    inputEvent,
  }) {
    if (!(inputEvent.target instanceof HTMLInputElement)) {
      return
    }

    const numericNewValue = parseFloat(inputEvent.target.value)

    if (isNaN(numericNewValue)) {
      this.updateClockTime({
        clockTime: this.minClockTime,
      })

      return
    }

    this.updateClockTime({
      clockTime: numericNewValue,
    })
  }

  /**
   * Update clock time.
   *
   * @param {{
   *   clockTime: number
   * }} params - Parameters.
   * @returns {void}
   */
  updateClockTime ({
    clockTime,
  }) {
    const lastSelectedDate = this.extractLastSelectedDate()
    const clampedTime = Math.max(
      this.minClockTime,
      Math.min(clockTime, this.maxClockTime)
    )

    this.selectedDateRef.value = {
      ...lastSelectedDate,
      [this.key]: clampedTime,
    }
  }

  /**
   * Extract last selected date.
   *
   * @returns {import('./AppDatePickerContext').SelectedDate}
   */
  extractLastSelectedDate () {
    if (!this.selectedDateRef.value) {
      return this.generateSelectedDateAsToday()
    }

    return this.selectedDateRef.value
  }

  /**
   * Generate selected date with the value of today.
   *
   * @returns {import('./AppDatePickerContext').SelectedDate}
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
   * Format clock time.
   *
   * @returns {string}
   */
  formatClockTime () {
    return this.extractCurrentClockTime()
      .toString()
      .padStart(2, '0')
  }
}

/**
 * @typedef {{
 *   selectedDateRef: import('vue').Ref<import('./AppDatePickerContext').SelectedDate | null>
 *   key: 'hour' | 'minute'
 *   maxClockTime: number
 *   minClockTime: number
 * }} DatePickerTimeItemContextParams
 */

/**
 * @typedef {DatePickerTimeItemContextParams} DatePickerTimeItemContextFactoryParams
 */
