import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppTooltipContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppTooltipContext extends BaseFuroContext {
  /**
   * get: message
   *
   * @returns {string} Tooltip's message.
   */
  get message () {
    return this.props.message
  }

  /**
   * get: position
   *
   * @returns {TooltipPosition} Tooltip's position.
   */
  get position () {
    return this.props.position
  }

  /**
   * get: isHiddenOnHover
   *
   * @returns {boolean} `true` if tooltip should not be displayed on hover.
   */
  get isHiddenOnHover () {
    return this.props.isHiddenOnHover
  }

  /**
   * Generate tooltip's classes.
   *
   * @returns {Array<string | Record<string, boolean>>} Tooltip's classes.
   */
  generateTooltipClasses () {
    return [
      this.position,
      {
        'no-hover': this.isHiddenOnHover,
      },
    ]
  }
}

/**
 * @typedef {'top'
 *   | 'right'
 *   | 'bottom'
 *   | 'left'
 * } TooltipPosition
 */
