import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ProfileFinancialOverviewContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class ProfileFinancialOverviewContext extends BaseFuroContext {
  /**
   * get: profileOverview
   *
   * @returns {PropsType['profileOverview']}
   */
  get profileOverview () {
    return this.props.profileOverview
  }
}

/**
 * @typedef {{
 *   profileOverview: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview | null
 * }} PropsType
 */
