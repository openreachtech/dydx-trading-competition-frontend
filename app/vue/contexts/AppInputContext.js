import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Props context class for AppInput component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppInputContext extends BaseFuroContext {
  /**
   * get: hasError
   *
   * @returns {boolean} `true` if has error.
   */
  get hasError () {
    return this.props.hasError
  }

  /**
   * get: errorMessage
   *
   * @returns {string} Error message.
   */
  get errorMessage () {
    return this.props.errorMessage
  }

  /**
   * get: rootClass
   *
   * @returns {string} Root CSS class
   */
  get rootClass () {
    return this.props.rootClass
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      VALUE_UPDATE: 'value-update',
    }
  }

  /**
   * Handle event on input.
   *
   * @param {{
   *   inputEvent: Event
   * }} params - Parameters.
   * @returns {void}
   */
  onInput ({
    inputEvent,
  }) {
    if (!(inputEvent.target instanceof HTMLInputElement)) {
      return
    }

    this.emit(
      this.EMIT_EVENT_NAME.VALUE_UPDATE,
      {
        newValue: inputEvent.target.value,
      }
    )
  }

  /**
   * Generate input classes.
   *
   * @returns {Array<string | Record<string, boolean>>} CSS classes
   */
  generateInputClasses () {
    return [
      this.rootClass,
      {
        error: this.hasError,
      },
    ]
  }
}
