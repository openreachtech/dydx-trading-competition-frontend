import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Context class for AppBadge component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class AppBadgeContext extends BaseFuroContext {
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
