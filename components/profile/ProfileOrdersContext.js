import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ProfileOrdersContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class ProfileOrdersContext extends BaseFuroContext {
  /**
   * get: profileOrders
   *
   * @returns {Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>}
   */
  get profileOrders () {
    return this.props.profileOrders
  }

  /**
   * get: orderTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get orderTableHeaderEntries () {
    return [
      {
        key: 'market',
        label: 'Market',
      },
      {
        key: 'status',
        label: 'Status',
      },
      {
        key: 'side',
        label: 'Side',
      },
      {
        key: 'amount',
        label: 'Amount',
      },
      {
        key: 'filled',
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
        key: 'trigger',
        label: 'Trigger',
      },
      {
        key: 'marginMode',
        label: 'Margin Mode',
      },
    ]
  }
}

/**
 * @typedef {{
 *   profileOrders: Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>
 * }} PropsType
 */
