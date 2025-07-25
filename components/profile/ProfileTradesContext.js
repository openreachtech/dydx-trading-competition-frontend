import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import RelativeTimeFormatter from '~/app/RelativeTimeFormatter'

const ORDER_SIDE = {
  BUY: 'BUY',
  SELL: 'SELL',
}

/**
 * ProfileTradesContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class ProfileTradesContext extends BaseAppContext {
  /**
   * get: profileTrades
   *
   * @returns {PropsType['profileTrades']}
   */
  get profileTrades () {
    return this.props.profileTrades
  }

  /**
   * get: isLoading
   *
   * @returns {PropsType['isLoading']}
   */
  get isLoading () {
    return this.props.isLoading
  }

  /**
   * get: tradeTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get tradeTableHeaderEntries () {
    return [
      {
        key: 'market',
        label: 'Market',
      },
      {
        key: 'createdAt',
        label: 'Time',
      },
      {
        key: 'type',
        label: 'Type',
      },
      {
        key: 'side',
        label: 'Side',
      },
      {
        key: 'size',
        label: 'Amount',
      },
      {
        key: 'price',
        label: 'Price',
      },
      {
        key: 'total',
        label: 'Total',
      },
      {
        key: 'fee',
        label: 'Fee',
      },
      {
        key: 'liquidity',
        label: 'Liquidity',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: tradeTableMobileHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get tradeTableMobileHeaderEntries () {
    return [
      {
        key: 'createdAt',
        label: 'Time',
      },
      {
        key: 'typeSize',
        label: 'Type | Amount',
      },
      {
        key: 'priceFee',
        label: 'Price | Fee',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Generate body entries for trade table.
   *
   * @returns {Array<Partial<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileTradeFill>>}
   */
  generateTradeTableEntries () {
    return this.profileTrades.map(it => ({
      market: it.market,
      createdAt: it.createdAt,
      type: it.type,
      side: it.side,
      size: it.size,
      price: it.price,
      total: this.calculateTotalValue({
        size: it.size,
        price: it.price,
      }),
      fee: it.fee,
      liquidity: it.liquidity,
    }))
  }

  /**
   * Calculate total value.
   *
   * @param {{
   *   size: string | number
   *   price: string | number
   * }} params - Parameters.
   * @returns {number}
   */
  calculateTotalValue ({
    size,
    price,
  }) {
    const normalizedSize = typeof size === 'string'
      ? parseFloat(size)
      : size
    const normalizedPrice = typeof price === 'string'
      ? parseFloat(price)
      : price

    if (
      isNaN(normalizedSize)
      || isNaN(normalizedPrice)
    ) {
      return 0
    }

    return normalizedSize * normalizedPrice
  }

  /**
   * Generate market URL.
   *
   * @param {{
   *   market: string
   * }} params - Parameters.
   * @returns {string}
   */
  generateMarketUrl ({
    market,
  }) {
    return `https://dydx.trade/trade/${market}`
  }

  /**
   * Format currency.
   *
   * @param {{
   *   figure: string | number
   * }} params - Parameters.
   * @returns {string}
   */
  formatCurrency ({
    figure,
  }) {
    if (this.isNullish({
      value: figure,
    })) {
      return '--'
    }

    const normalizedFigure = typeof figure === 'string'
      ? parseFloat(figure)
      : figure

    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })

    return formatter.format(normalizedFigure)
  }

  /**
   * Format relative time.
   *
   * @param {{
   *   timestamp: Date | string | number
   * }} params - Parameters.
   * @returns {string}
   */
  formatRelativeTime ({
    timestamp,
  }) {
    if (this.isNullish({
      value: timestamp,
    })) {
      return '--'
    }

    const relativeTimeFormatter = RelativeTimeFormatter.create({
      targetTime: timestamp,
      formatOptions: {
        style: 'narrow',
        numeric: 'auto',
      },
    })

    return relativeTimeFormatter.formatRelativeTime()
  }

  /**
   * Check if is "BUY" side order.
   *
   * @param {{
   *   side: string
   * }} params - Parameters.
   * @returns {boolean}
   */
  isBuySide ({
    side,
  }) {
    return side === ORDER_SIDE.BUY
  }

  /**
   * Check if is "SELL" side order.
   *
   * @param {{
   *   side: string
   * }} params - Parameters.
   * @returns {boolean}
   */
  isSellSide ({
    side,
  }) {
    return side === ORDER_SIDE.SELL
  }

  /**
   * Check if a value is null or undefined.
   *
   * @param {{
   *   value: *
   * }} params - Parameters.
   * @returns {boolean}
   */
  isNullish ({
    value,
  }) {
    return value === null
      || value === undefined
  }
}

/**
 * @typedef {{
 *   profileTrades: Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileTradeFill>
 *   isLoading: boolean
 * }} PropsType
 */
