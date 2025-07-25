import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import RelativeTimeFormatter from '~/app/RelativeTimeFormatter'

const ORDER_SIDE = {
  BUY: 'BUY',
  SELL: 'SELL',
}

/**
 * ProfileOrdersContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class ProfileOrdersContext extends BaseAppContext {
  /**
   * get: profileOrders
   *
   * @returns {Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>}
   */
  get profileOrders () {
    return this.props.profileOrders
  }

  /**
   * get: isLoading
   *
   * @returns {boolean}
   */
  get isLoading () {
    return this.props.isLoading
  }

  /**
   * get: orderTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get orderTableHeaderEntries () {
    return [
      {
        key: 'ticker',
        label: 'Market',
      },
      {
        key: 'type',
        label: 'Status',
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
        key: 'totalFilled',
        label: 'Filled',
      },
      {
        key: 'orderValue',
        label: 'Order Value',
      },
      {
        key: 'price',
        label: 'Price',
      },
      {
        key: 'triggerPrice',
        label: 'Trigger',
      },
      {
        key: 'marginMode',
        label: 'Margin Mode',
      },
      {
        key: 'goodTilBlockTime',
        label: 'Good Til',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: orderTableMobileHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get orderTableMobileHeaderEntries () {
    return [
      {
        key: 'status',
        label: 'Status | Fill',
      },
      {
        key: 'price',
        label: 'Price | Type',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Generate order table entries.
   *
   * @returns {Array<Partial<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>>}
   */
  generateOrderTableEntries () {
    return this.profileOrders.map(it => ({
      ticker: it.ticker,
      type: it.type,
      status: it.status,
      side: it.side,
      size: it.size,
      totalFilled: it.totalFilled,
      orderValue: this.calculateOrderValue({
        size: it.size,
        price: it.price,
      }),
      price: it.price,
      triggerPrice: it.triggerPrice,
      marginMode: this.generateDisplayedMarginMode({
        subaccountNumber: it.subaccountNumber,
      }),
      goodTilBlockTime: it.goodTilBlockTime,
    }))
  }

  /**
   * Generate ticker URL.
   *
   * @param {{
   *   ticker: string
   * }} params - Parameters.
   * @returns {string}
   */
  generateTickerUrl ({
    ticker,
  }) {
    return `https://dydx.trade/trade/${ticker}`
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
   * Calculate order value.
   *
   * @param {{
   *   size: string | number
   *   price: string | number
   * }} params - Parameters.
   * @returns {number}
   */
  calculateOrderValue ({
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
   * Generate displayed margin mode.
   *
   * @param {{
   *   subaccountNumber: number
   * }} params - Parameters.
   * @returns {'cross' | 'isolated'}
   */
  generateDisplayedMarginMode ({
    subaccountNumber,
  }) {
    if (subaccountNumber >= 128) {
      return 'isolated'
    }

    return 'cross'
  }

  /**
   * Generate displayed fill size.
   *
   * @param {{
   *   totalFilled: string | number
   *   size: string | number
   * }} params - Parameters.
   * @returns {string}
   */
  generateDisplayedFillSize ({
    totalFilled,
    size,
  }) {
    const normalizedTotalFilled = typeof totalFilled === 'string'
      ? parseFloat(totalFilled)
      : totalFilled
    const normalizedSize = typeof size === 'string'
      ? parseFloat(size)
      : size

    return `${normalizedTotalFilled.toFixed(4)} / ${normalizedSize.toFixed(4)}`
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
      .replace('in ', '')
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
 *   profileOrders: Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>
 *   isLoading: boolean
 * }} PropsType
 */
