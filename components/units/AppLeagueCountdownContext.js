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

  /**
   * get: schedules
   *
   * @returns {AppLeagueCountdownProps['schedules']}
   */
  get schedules () {
    return this.props.schedules
  }

  /**
   * Generate CSS classes for countdown.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateCountdownClasses () {
    return {
      'hide-icon': this.shouldHideIcon,
    }
  }
}

/**
 * @typedef {{
 *   shouldHideIcon: boolean
 *   iconName: string
 *   iconSize: string
 *   schedules: import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').CompetitionEntity['schedules']
 * }} AppLeagueCountdownProps
 */
