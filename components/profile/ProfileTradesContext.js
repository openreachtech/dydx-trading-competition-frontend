import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const ORDER_SIDE = {
  BUY: 'BUY',
  SELL: 'SELL',
}

/**
 * ProfileTradesContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class ProfileTradesContext extends BaseFuroContext {
  /**
   * get: profileTrades
   *
   * @returns {PropsType['profileTrades']}
   */
  get profileTrades () {
    return this.props.profileTrades
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

    const date = new Date(timestamp)
    const remainingTime = date.getTime() - Date.now()
    const remainingDayCount = Math.floor(remainingTime / (1000 * 60 * 60 * 24))

    const formatter = new Intl.RelativeTimeFormat('en-US', {
      numeric: 'always',
      style: 'narrow',
    })
    const unit = this.generateRelativeTimeUnit({
      remainingDayCount,
    })

    return formatter.format(
      remainingDayCount,
      unit
    )
  }

  /**
   * Generate relative time unit.
   *
   * @param {{
   *   remainingDayCount: number
   * }} params - Parameters.
   * @returns {Intl.RelativeTimeFormatUnit}
   */
  generateRelativeTimeUnit ({
    remainingDayCount,
  }) {
    if (remainingDayCount >= 30) {
      return 'month'
    }

    if (remainingDayCount >= 7) {
      return 'week'
    }

    return 'day'
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
 * }} PropsType
 */
