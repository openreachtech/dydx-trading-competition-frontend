import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * DefaultLayoutContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class DefaultLayoutContext extends BaseFuroContext {
  /**
   * get: socialPlatforms
   *
   * @returns {Array<SocialPlatform>}
   */
  get socialPlatforms () {
    return [
      {
        iconName: 'ph:x-logo-duotone',
        href: 'https://x.com/clc_validator',
      },
      {
        iconName: 'ph:github-logo-duotone',
        href: 'https://github.com/openreachtech/dydx-trading-competition-frontend',
      },
    ]
  }

  /**
   * get: dydxPlatforms
   *
   * @returns {Array<DydxPlatform>}
   */
  get dydxPlatforms () {
    return [
      {
        name: 'dydx.xyz',
        imageUrl: '/img/dydx/dydx-xyz.png',
        href: 'https://www.dydx.xyz',
      },
      {
        name: 'dydx.trade',
        imageUrl: '/img/dydx/dydx-trade.svg',
        href: 'https://dydx.trade',
      },
    ]
  }
}

/**
 * @typedef {{
 *   iconName: string
 *   href: string
 * }} SocialPlatform
 */

/**
 * @typedef {{
 *   name: string
 *   imageUrl: string
 *   href: string
 * }} DydxPlatform
 */
