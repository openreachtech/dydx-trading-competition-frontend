import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * Context class for AppBadge component.
 *
 * @extends {BaseAppContext<null>} - Base class.
 */
export default class AppBadgeContext extends BaseAppContext {
  /**
   * get: sharedProps
   * Shared props for sibling components.
   *
   * @returns {Record<string, *>} Shared Props.
   */
  static get sharedProps () {
    return {
      severity: {
        type: /** @type {SeverityPropType} */ (String),
        default: 'success',
        required: false,
        /** @type {(value: string) => boolean} */
        validator: value => [
          'info',
          'success',
          'warn',
          'neutral',
          'completed',
          'canceled',
        ]
          .includes(value),
      },
    }
  }
}

/**
 * @typedef {import('vue').PropType<
 *   'info'
 *   | 'success'
 *   | 'warn'
 *   | 'neutral'
 *   | 'completed'
 *   | 'canceled'
 * >} SeverityPropType
 */
