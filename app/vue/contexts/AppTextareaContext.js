import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Props context class for AppTextarea component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppTextareaContext extends BaseFuroContext {
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
}
