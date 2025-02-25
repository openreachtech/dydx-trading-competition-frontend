import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  TRANSFER_CATEGORY,
  PAGINATION,
} from '~/app/constants'

/**
 * ProfileTransferHistoryContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class ProfileTransferHistoryContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ProfileTransferHistoryContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    statusReactive,
    graphqlClientHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ProfileTransferHistoryContext ? X : never} T, X
   * @override
   * @param {ProfileTransferHistoryContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusReactive,
    graphqlClientHash,
  }) {
    const route = this.generateRoute()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * Generate route.
   *
   * @returns {ReturnType<typeof useRoute>} Route object.
   */
  static generateRoute () {
    return useRoute()
  }

  /**
   * get: addressCurrentCompetitionTransfersCapsuleRef
   *
   * @returns {import('vue').Ref<ProfileTransferHistoryContext['graphqlClientHash']['addressCurrentCompetitionTransfers']['capsuleRef']>}
   */
  get addressCurrentCompetitionTransfersCapsuleRef () {
    return this.graphqlClientHash.addressCurrentCompetitionTransfers.capsuleRef
  }

  /** @override */
  setupComponent () {
    this.watch(
      () => this.route.query.transferPage,
      async () => {
        await this.graphqlClientHash
          .addressCurrentCompetitionTransfers
          .invokeRequestOnEvent(this.addressCurrentCompetitionTransfersDefaultVariables)
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * get: addressCurrentCompetitionTransfersDefaultVariables
   *
   * @returns {{
   *   variables: import(
   *     '~/app/graphql/client/queries/addressCurrentCompetitionTransfers/AddressCurrentCompetitionTransfersQueryGraphqlPayload'
   *   ).AddressCurrentCompetitionTransfersQueryRequestVariables
   * }}
   */
  get addressCurrentCompetitionTransfersDefaultVariables () {
    const address = Array.isArray(this.route.params.address)
      ? this.route.params.address[0]
      : this.route.params.address
    const normalizedTransferPage = Number(this.route.query.transferPage)
    const currentPage = isNaN(normalizedTransferPage)
      ? 1
      : normalizedTransferPage

    return {
      variables: {
        input: {
          address,
          pagination: {
            limit: PAGINATION.LIMIT,
            offset: (currentPage - 1) * PAGINATION.LIMIT,
          },
        },
      },
    }
  }

  /**
   * get: addressCurrentCompetitionTransfersLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addressCurrentCompetitionTransfersLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: paginationResult
   *
   * @returns {PaginationResult} Pagination object.
   */
  get paginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.addressCurrentCompetitionTransfersCapsuleRef.value
        .totalCount
        ?? 0,
    }
  }

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

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   statusReactive: StatusReactive
 *   route: ReturnType<typeof useRoute>
 * }} ProfileTransferHistoryContextParams
 */

/**
 * @typedef {'addressCurrentCompetitionTransfers'} GraphqlClientHashKeys
 */

/**
 * @typedef {Omit<ProfileTransferHistoryContextParams, FactoryOmittedKeys>} ProfileTransferHistoryContextFactoryParams
 */

/**
 * @typedef {'route'} FactoryOmittedKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */
