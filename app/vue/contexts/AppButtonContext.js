import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Props context class for AppButton component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppButtonContext extends BaseFuroContext {
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
