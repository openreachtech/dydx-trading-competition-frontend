import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * Props context class for AppTextarea component.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class AppTextareaContext extends BaseAppContext {
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
