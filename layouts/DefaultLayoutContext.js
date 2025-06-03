import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  DYDX_TRADE_CTA_URL,
} from '~/app/constants'

/**
 * DefaultLayoutContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class DefaultLayoutContext extends BaseFuroContext {
  /**
   * get: dydxTradeCtaUrl
   *
   * @returns {string}
   */
  static get dydxTradeCtaUrl () {
    return DYDX_TRADE_CTA_URL
  }

  /**
   * get: socialPlatforms
   *
   * @returns {Array<SocialPlatform>}
   */
  get socialPlatforms () {
    return [
      {
        iconName: 'ph:x-logo-duotone',
        href: 'https://x.com/dydxarena',
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
      {
        name: 'tokensender.dydxarena.com',
        imageUrl: '/img/dydx/dydx-tokensender.svg',
        href: 'https://tokensender.dydxarena.com',
      },
    ]
  }

  /**
   * get: dydxTradeCtaUrl
   *
   * @returns {string}
   */
  get dydxTradeCtaUrl () {
    return /** @type {string} */ (
      this.Ctor.dydxTradeCtaUrl
    )
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
