import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppLeagueCountdownContext
 *
 * @extends {BaseFuroContext<null, AppLeagueCountdownProps, null>}
 */
export default class AppLeagueCountdownContext extends BaseFuroContext {
  /**
   * get: shouldHideIcon
   *
   * @returns {AppLeagueCountdownProps['shouldHideIcon']}
   */
  get shouldHideIcon () {
    return this.props.shouldHideIcon
  }

  /**
   * get: iconName
   *
   * @returns {AppLeagueCountdownProps['iconName']}
   */
  get iconName () {
    return this.props.iconName
  }

  /**
   * get: iconSize
   *
   * @returns {AppLeagueCountdownProps['iconSize']}
   */
  get iconSize () {
    return this.props.iconSize
  }
}

/**
 * @typedef {{
 *   shouldHideIcon: boolean
 *   iconName: string
 *   iconSize: string
 * }} AppLeagueCountdownProps
 */
