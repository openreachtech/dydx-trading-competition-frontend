/**
 * Timer Clerk
 *
 * @property {NodeJS.Timeout | number | null} lastTimer - Last timer
 */
export default class TimerClerk {
  /**
   * Constructor.
   *
   * @param {{
   *   callback: Function
   *   timeInMilliseconds: number
   * }} params - Parameters
   */
  constructor ({
    callback,
    timeInMilliseconds,
  }) {
    this.callback = callback
    this.timeInMilliseconds = timeInMilliseconds

    this.lastTimer = null
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof TimerClerk ? X : never} T, X
   * @param {{
   *   callback: Function
   *   timeInMilliseconds: number
   * }} params - Parameters
   * @returns {InstanceType<T>} - New instance of this class
   * @this {T}
   */
  static create ({
    callback,
    timeInMilliseconds,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        callback,
        timeInMilliseconds,
      })
    )
  }

  /**
   * Start the timer.
   *
   * @param {Array<*>} args - Arguments
   * @returns {void}
   */
  startTimer (...args) {
    this.stopTimer()

    this.lastTimer = setTimeout(
      () => this.callback(...args),
      this.timeInMilliseconds
    )
  }

  /**
   * Stop the timer.
   *
   * @returns {void}
   */
  stopTimer () {
    if (!this.lastTimer) {
      return
    }

    clearTimeout(this.lastTimer)
  }
}
