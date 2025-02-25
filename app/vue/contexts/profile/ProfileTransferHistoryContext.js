import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  TRANSFER_CATEGORY,
} from '~/app/constants'

/**
 * ProfileTransferHistoryContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class ProfileTransferHistoryContext extends BaseFuroContext {
  /**
   * get: tableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>} Header entries.
   */
  get tableHeaderEntries () {
    return [
      {
        label: 'Block Time',
        key: 'time',
      },
      {
        label: 'Sender/Receiver',
        key: 'participant',
      },
      {
        label: 'Amount',
        key: 'amount',
      },
      {
        label: 'Transaction Hash',
        key: 'hash',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: tableEntries
   *
   * @returns {Array<Record<string, any>>} Entries.
   */
  get tableEntries () {
    return [
      {
        time: '2021-09-01T00:00:00Z',
        senderAddress: '0x1234567890abcdef',
        recipientAddress: '0xabcdef1234567890',
        amount: '100',
        hash: '0x1234567890abcdef',
        category: {
          categoryId: 1,
        },
      },
      {
        time: '2021-09-01T00:00:00Z',
        senderAddress: '0x1234567890abcdef',
        recipientAddress: '0xabcdef1234567890',
        amount: '100',
        hash: '0x1234567890abcdef',
        category: {
          categoryId: 2,
        },
      },
    ]
  }

  /**
   * Generate participant classes.
   *
   * @param {{
   *   categoryId: number
   * }} params - Parameters
   * @returns {Array<string | Record<string, boolean>>} Participant classes.
   */
  generateParticipantClasses ({
    categoryId,
  }) {
    const classHash = {
      [TRANSFER_CATEGORY.TRANSFER_IN.ID]: 'in',
      [TRANSFER_CATEGORY.TRANSFER_OUT.ID]: 'out',
      [TRANSFER_CATEGORY.DEPOSIT.ID]: 'in',
      [TRANSFER_CATEGORY.WITHDRAWAL.ID]: 'out',
    }

    return [
      classHash[categoryId] ?? 'in',
    ]
  }

  /**
   * Generate participant icon name.
   *
   * @param {{
   *   categoryId: number
   * }} params - Parameters
   * @returns {string} Icon name.
   */
  generateParticipantIconName ({
    categoryId,
  }) {
    const iconNameHash = {
      [TRANSFER_CATEGORY.TRANSFER_IN.ID]: 'heroicons-outline:arrow-down-left',
      [TRANSFER_CATEGORY.TRANSFER_OUT.ID]: 'heroicons-outline:arrow-up-right',
      [TRANSFER_CATEGORY.DEPOSIT.ID]: 'heroicons-outline:arrow-down-left',
      [TRANSFER_CATEGORY.WITHDRAWAL.ID]: 'heroicons-outline:arrow-up-right',
    }

    return iconNameHash[categoryId]
      ?? 'heroicons-outline:arrow-down-left'
  }

  /**
   * Generate participant address.
   *
   * @param {{
   *   categoryId: number
   *   address: Record<string, string>
   * }} params - Parameters.
   * @returns {string} Participant address.
   */
  generateParticipantAddress ({
    categoryId,
    address,
  }) {
    const addressTypeHash = /** @type {const} */ ({
      [TRANSFER_CATEGORY.TRANSFER_IN.ID]: 'senderAddress',
      [TRANSFER_CATEGORY.TRANSFER_OUT.ID]: 'recipientAddress',
      [TRANSFER_CATEGORY.DEPOSIT.ID]: 'senderAddress',
      [TRANSFER_CATEGORY.WITHDRAWAL.ID]: 'recipientAddress',
    })
    const addressType = addressTypeHash[categoryId] ?? 'senderAddress'

    return this.shortenAddress({
      address: address[addressType] ?? '----',
    })
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address: string
   * }} params - Parameters
   * @returns {string} Shortened address.
   */
  shortenAddress ({
    address,
  }) {
    if (address.length <= 12) {
      return address
    }

    const firstSevenCharacters = address.slice(0, 7)
    const lastFiveCharacters = address.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Generate hour.
   *
   * @param {{
   *   dateString: string
   * }} params - An object containing an ISO string.
   * @returns {string} Hour string.
   */
  generateHour ({
    dateString,
  }) {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    return formatter.format(date)
  }

  /**
   * Generate date.
   *
   * @param {{
   *   dateString: string
   * }} params - An object containing an ISO string.
   * @returns {string} Date string.
   */
  generateDate ({
    dateString,
  }) {
    const date = new Date(dateString)
    const formatter = new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    })

    return formatter.format(date)
  }
}
