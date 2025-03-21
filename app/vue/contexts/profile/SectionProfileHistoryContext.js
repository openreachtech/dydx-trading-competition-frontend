import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * SectionProfileHistory
 *
 * @extends {BaseFuroContext<null>}
 */
export default class SectionProfileHistory extends BaseFuroContext {
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
