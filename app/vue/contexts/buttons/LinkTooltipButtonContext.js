import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * LinkTooltipButton
 *
 * @extends {BaseFuroContext<null>}
 */
export default class LinkTooltipButton extends BaseFuroContext {
  /**
   * get: tooltipMessage
   *
   * @returns {string}
   */
  get tooltipMessage () {
    return this.props.tooltipMessage
  }

  /**
   * get: href
   *
   * @returns {string}
   */
  get href () {
    return this.props.href
  }

  /**
   * get: iconName
   *
   * @returns {string}
   */
  get iconName () {
    return this.props.iconName
  }

  /**
   * get: iconSize
   *
   * @returns {string}
   */
  get iconSize () {
    return this.props.iconSize
  }
}
