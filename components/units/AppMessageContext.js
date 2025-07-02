import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AppErrorMessageContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class AppErrorMessageContext extends BaseAppContext {
  /**
   * get: variant
   *
   * @returns {PropsType['variant']}
   */
  get variant () {
    return this.props.variant
  }

  /**
   * get: severity
   *
   * @returns {PropsType['severity']}
   */
  get severity () {
    return this.props.severity
  }

  /**
   * get: isHidden
   *
   * @returns {PropsType['isHidden']}
   */
  get isHidden () {
    return this.props.isHidden
  }

  /**
   * Generate error message classes.
   *
   * @returns {Array<string | Record<string, boolean>>} CSS classes.
   */
  generateErrorMessageClasses () {
    return [
      this.variant,
      this.severity,
      {
        hidden: this.isHidden,
      },
    ]
  }
}

/**
 * @typedef {{
 *   variant: 'text' | 'box'
 *   severity: 'info' | 'success' | 'error' | 'warn'
 *   isHidden: boolean
 * }} PropsType
 */
