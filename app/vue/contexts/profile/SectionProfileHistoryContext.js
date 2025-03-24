import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * SectionProfileHistory
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class SectionProfileHistory extends BaseFuroContext {
  /**
   * get: profileOverview
   *
   * @returns {PropsType['profileOverview']}
   */
  get profileOverview () {
    return this.props.profileOverview
  }

  /**
   * get: tabs.
   *
   * @returns {Array<{
   *   tabKey: string
   *   label: string
   * }>} Tabs.
   */
  get tabs () {
    return [
      {
        tabKey: 'overview',
        label: 'Overview',
      },
      {
        tabKey: 'transfers',
        label: 'Transfer History',
      },
      {
        tabKey: 'past-competitions',
        label: 'League History',
      },
    ]
  }
}

/**
 * @typedef {{
 *   profileOverview: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview | null
 * }} PropsType
 */
