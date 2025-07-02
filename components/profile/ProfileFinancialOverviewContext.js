import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

const TRADE_SIDE_SYMBOL_HASH = {
  LONG: 'B',
  SHORT: 'S',
}

/**
 * ProfileFinancialOverviewContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class ProfileFinancialOverviewContext extends BaseAppContext {
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
        entryPrice: this.formatNumber({
          value: it.entryPrice,
          options: {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          },
        }),
        size: this.formatNumber({
          value: it.size,
          options: {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          },
        }),
        realizedPnl: this.formatNumber({
          value: it.realizedPnl,
          options: {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          },
        }),
        unrealizedPnl: this.formatNumber({
          value: it.unrealizedPnl,
          options: {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          },
        }),
        netFunding: this.formatNumber({
          value: it.netFunding,
          options: {
            minimumFractionDigits: 1,
            maximumFractionDigits: 2,
          },
        }),
      }))
  }

  /**
   * Calculate open perpetual position count.
   *
   * @param {{
   *   openPerpetualPositions: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview['subaccount']['childSubaccounts'][0]['openPerpetualPositions']
   * }} params - Parameters.
   * @returns {number}
   */
  calculateOpenPerpetualPositionCount ({
    openPerpetualPositions,
  }) {
    return Object.keys(openPerpetualPositions)
      .length
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
   * Should hide overview.
   *
   * @returns {boolean}
   */
  shouldHideOverview () {
    return this.profileOverview === null
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
