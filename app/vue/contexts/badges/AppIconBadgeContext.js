import AppBadgeContext from '~/app/vue/contexts/badges/AppBadgeContext'

/**
 * Context class for AppIconBadge component.
 */
export default class AppIconBadgeContext extends AppBadgeContext {
  /**
   * Whether to display icon or dot.
   *
   * @returns {boolean} `true` to display icon, `false` otherwise.
   */
  shouldShowIcon () {
    return this.props.iconName
  }
}
