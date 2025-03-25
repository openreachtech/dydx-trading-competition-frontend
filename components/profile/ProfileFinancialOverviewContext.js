import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const TRADE_SIDE_SYMBOL_HASH = {
  LONG: 'B',
  SHORT: 'S',
}

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

  /**
   * get: subaccount
   *
   * @returns {import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview['subaccount'] | null}
   */
  get subaccount () {
    return this.profileOverview
      ?.subaccount
      ?? null
  }

  /**
   * get: childSubaccounts
   *
   * @returns {import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview['subaccount']['childSubaccounts']}
   */
  get childSubaccounts () {
    return this.subaccount
      ?.childSubaccounts
      ?? []
  }

  /**
   * get: subaccountTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get subaccountTableHeaderEntries () {
    return [
      {
        key: 'side',
        label: '',
      },
      {
        key: 'market',
        label: 'Market',
      },
      {
        key: 'size',
        label: 'Size',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'entryPrice',
        label: 'Entry Price ($)',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'realizedPnl',
        label: 'Realized PnL($)',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'unrealizedPnl',
        label: 'Unrealized PnL ($)',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'netFunding',
        label: 'Net Funding ($)',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Normalize open perpetual positions to render with AppTable.
   *
   * @param {{
   *   openPerpetualPositions: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview['subaccount']['childSubaccounts'][0]['openPerpetualPositions']
   * }} params - Parameters.
   * @returns {Array<NormalizedOpenPerpetualPosition>}
   */
  normalizeOpenPerpetualPositions ({
    openPerpetualPositions,
  }) {
    return Object.values(openPerpetualPositions)
      .map(it => ({
        ...it,
        entryPrice: this.normalizeNumber({
          numberString: it.entryPrice,
        }),
        size: this.normalizeNumber({
          numberString: it.size,
        }),
        realizedPnl: this.normalizeNumber({
          numberString: it.realizedPnl,
        }),
        unrealizedPnl: this.normalizeNumber({
          numberString: it.unrealizedPnl,
        }),
        netFunding: this.normalizeNumber({
          numberString: it.netFunding,
        }),
      }))
  }

  /**
   * Normalize number.
   *
   * @param {{
   *   numberString: string | null
   * }} params - Parameters.
   * @returns {string} Normalized number string.
   */
  normalizeNumber ({
    numberString,
  }) {
    if (!numberString) {
      return '--'
    }

    const figure = parseFloat(numberString)
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 2,
    })

    return formatter.format(figure)
  }

  /**
   * Extract asset position size.
   *
   * @param {{
   *   childSubaccount: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview['subaccount']['childSubaccounts'][0]
   * }} params - Parameters.
   * @returns {string}
   */
  extractAssetPositionSize ({
    childSubaccount,
  }) {
    if (!childSubaccount.assetPositions.USDC) {
      return '--'
    }

    return childSubaccount.assetPositions.USDC.size
  }

  /**
   * Generate side position symbol. 'S' for Sell/Short, 'B' for Buy/Long.
   *
   * @param {{
   *   side: keyof typeof TRADE_SIDE_SYMBOL_HASH
   * }} params - Parameters
   * @returns {(typeof TRADE_SIDE_SYMBOL_HASH)[keyof typeof TRADE_SIDE_SYMBOL_HASH] | '-'}
   */
  generateTradeSideSymbol ({
    side,
  }) {
    return TRADE_SIDE_SYMBOL_HASH[side]
      ?? '-'
  }

  /**
   * Generate side position CSS classes.
   *
   * @param {{
   *   side: string
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateTradeSideClasses ({
    side,
  }) {
    return {
      long: side === 'LONG',
      short: side === 'SHORT',
    }
  }

  /**
   * Generate profit CSS classes.
   *
   * @param {{
   *   figure: number | string
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateProfitClasses ({
    figure,
  }) {
    const normalizedFigure = Number(figure)

    return {
      increased: normalizedFigure > 0,
      decreased: normalizedFigure < 0,
    }
  }
}

/**
 * @typedef {{
 *   profileOverview: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview | null
 * }} PropsType
 */

/**
 * @typedef {{
 *   market: string
 *   size: string
 *   netFunding: string
 *   realizedPnl: string
 *   unrealizedPnl: string
 * }} NormalizedOpenPerpetualPosition
 */
