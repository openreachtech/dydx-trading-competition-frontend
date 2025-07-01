import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * Props context class for AppButton component.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class AppButtonContext extends BaseAppContext {
  /**
   * Is disabled or not.
   *
   * @returns {boolean} `true` if is disabled.
   */
  isDisabled () {
    return this.props.disabled
      || this.props.isLoading
  }
}
