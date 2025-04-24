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
   * get: activeMessage
   *
   * @returns {string} Tooltip's activeMessage.
   */
  get activeMessage () {
    return this.props.activeMessage
  }

  /**
   * get: isActive
   *
   * @returns {boolean} `true` if tooltip is active.
   */
  get isActive () {
    return this.props.isActive
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
   * Generate tooltip message.
   *
   * @returns {string} Tooltip's normalized message.
   */
  generateTooltipMessage () {
    if (this.activeMessage === null) {
      return this.message
    }

    return this.isActive
      ? this.activeMessage
      : this.message
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
        active: this.isActive,
        'no-hover': this.isHiddenOnHover,
      },
    ]
  }
}

/**
 * @typedef {'top'
 *   | 'top-start'
 *   | 'top-end'
 *   | 'right'
 *   | 'bottom'
 *   | 'bottom-start'
 *   | 'bottom-end'
 *   | 'left'
 * } TooltipPosition
 */
