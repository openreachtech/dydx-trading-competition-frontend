import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * LinkTooltipButton
 *
 * @extends {BaseAppContext<null>}
 */
export default class LinkTooltipButton extends BaseAppContext {
  /**
   * get: tooltipMessage
   *
   * @returns {string}
   */
  get tooltipMessage () {
    return this.props.tooltipMessage
  }

  /**
   * get: tooltipPosition
   *
   * @returns {import('~/app/vue/contexts/AppTooltipContext').TooltipPosition}
   */
  get tooltipPosition () {
    return this.props.tooltipPosition
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
