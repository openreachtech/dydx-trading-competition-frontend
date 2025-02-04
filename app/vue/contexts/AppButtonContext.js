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
   * Generate target component.
   *
   * @returns {string} Component name
   */
  generateTargetElement () {
    return this.props.isLink
      ? 'NuxtLink'
      : 'button'
  }

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
