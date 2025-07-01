import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AppSkeletonContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class AppSkeletonContext extends BaseAppContext {
  /**
   * get: isRounded
   *
   * @returns {boolean} Whether is rounded or not.
   */
  get isRounded () {
    return this.props.isRounded
  }

  /**
   * get: width
   *
   * @returns {string} Width.
   */
  get width () {
    return this.props.width
  }

  /**
   * get: height
   *
   * @returns {string} Height.
   */
  get height () {
    return this.props.height
  }

  /**
   * get: borderRadius
   *
   * @returns {string} Border radius.
   */
  get borderRadius () {
    return this.props.borderRadius
  }

  /**
   * Generate skeleton styles.
   *
   * @returns {Record<string, string>} Styles for AppSkeleton.
   */
  generateSkeletonStyles () {
    return {
      width: this.width,
      height: this.height,
      borderRadius: this.isRounded
        ? '100vh'
        : this.borderRadius,
    }
  }
}
