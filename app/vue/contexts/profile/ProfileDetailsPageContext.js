import {
  onMounted,
} from 'vue'
import {
  useHead,
} from '@unhead/vue'
import {
  useRoute,
} from 'vue-router'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

import {
  BASE_INDEXER_URL,
  BASE_PAGE_TITLE,
} from '~/app/constants'

/**
 * ProfileDetailsContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class ProfileDetailsContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ProfileDetailsContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    graphqlClientHash,
    profileOverviewRef,
    profileOrdersRef,
    errorMessageRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.graphqlClientHash = graphqlClientHash
    this.profileOverviewRef = profileOverviewRef
    this.profileOrdersRef = profileOrdersRef
    this.errorMessageRef = errorMessageRef
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ProfileDetailsContext ? X : never} T, X
   * @override
   * @param {ProfileDetailsContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClientHash,
    profileOverviewRef,
    profileOrdersRef,
    errorMessageRef,
    statusReactive,
  }) {
    const route = useRoute()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        graphqlClientHash,
        profileOverviewRef,
        profileOrdersRef,
        errorMessageRef,
        statusReactive,
      })
    )
  }

  /**
   * get: profileTabs.
   *
   * @returns {Array<{
   *   tabKey: string
   *   label: string
   * }>} Tabs.
   */
  get profileTabs () {
    return [
      {
        tabKey: 'overview',
        label: 'Overview',
      },
      {
        tabKey: 'transfers',
        label: 'Transfer History',
      },
      {
        tabKey: 'past-competitions',
        label: 'League History',
      },
      {
        tabKey: 'orders',
        label: 'Orders',
      },
    ]
  }

  /**
   * get: isLoadingProfileOrders
   *
   * @returns {boolean}
   */
  get isLoadingProfileOrders () {
    return this.statusReactive.isLoadingProfileOrders
  }

  /**
   * Setup component context.
   *
   * @template {X extends ProfileDetailsContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    onMounted(async () => {
      await this.graphqlClientHash.addressCurrentCompetition
        .invokeRequestOnEvent({
          variables: {
            input: {
              address: this.route.params.address,
            },
          },
        })

      if (this.currentCompetitionId === null) {
        return
      }

      await this.graphqlClientHash.competitionParticipant
        .invokeRequestOnEvent({
          variables: {
            input: {
              competitionId: this.currentCompetitionId,
              address: this.route.params.address,
            },
          },
        })
    })

    this.graphqlClientHash.addressName
      .invokeRequestOnMounted({
        variables: {
          input: {
            address: this.route.params.address,
          },
          hooks: this.addressNameLauncherHooks,
        },
      })

    this.watch(
      () => this.route.params.address,
      async newLocalAddress => {
        const address = Array.isArray(newLocalAddress)
          ? newLocalAddress.at(0)
          : newLocalAddress

        if (!address) {
          return
        }

        await Promise.allSettled([
          this.fetchProfileOverview({
            address,
          }),
          this.fetchProfileOrders({
            address,
          }),
        ])
      },
      {
        immediate: true,
      }
    )

    this.watch(
      () => this.addressName,
      () => {
        if (this.addressName === null) {
          return
        }

        useHead({
          title: `${this.addressName} (Profile) - ${BASE_PAGE_TITLE}`,
        })
      }
    )

    return this
  }

  /**
   * Refetch address name.
   *
   * @returns {Promise<void>}
   */
  async refetchAddressName () {
    await this.graphqlClientHash
      .addressName
      .invokeRequestOnEvent({
        variables: {
          input: {
            address: this.route.params.address,
          },
          hooks: this.addressNameLauncherHooks,
        },
      })
  }

  /**
   * Fetch profile overview.
   *
   * @param {{
   *   address: string | null
   * }} params - Parameters
   * @returns {Promise<void>}
   */
  async fetchProfileOverview ({
    address,
  }) {
    if (!address) {
      return
    }

    try {
      this.statusReactive.isLoadingProfileOverview = true

      const headers = {
        accept: 'application/json',
      }
      // Currently only parent subaccount 0 is exposed via the front end.
      const response = await fetch(`${BASE_INDEXER_URL}/addresses/${address}/parentSubaccountNumber/0`, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('Oops! Something went wrong. Reloading the page might help.')
      }

      const profileOverview = await response.json()

      this.profileOverviewRef.value = profileOverview
    } catch (error) {
      this.errorMessageRef.value = this.resolveErrorMessage({
        error,
      })
    } finally {
      this.statusReactive.isLoadingProfileOverview = false
    }
  }

  /**
   * Fetch profile orders.
   *
   * @param {{
   *   address: string | null
   * }} params - Parameters
   * @returns {Promise<void>}
   */
  async fetchProfileOrders ({
    address,
  }) {
    if (!address) {
      return
    }

    this.statusReactive.isLoadingProfileOrders = true

    const headers = {
      accept: 'application/json',
    }
    const searchParams = new URLSearchParams({
      address,
      parentSubaccountNumber: '0',
      status: 'OPEN,UNTRIGGERED',
    })
    const resourceUrl = `${BASE_INDEXER_URL}/orders/parentSubaccountNumber?${searchParams.toString()}`

    try {
      const response = await fetch(resourceUrl, {
        method: 'GET',
        headers,
      })

      if (!response.ok) {
        throw new Error('Oops! Something went wrong. Reloading the page might help.')
      }

      const profileOrders = await response.json()

      this.profileOrdersRef.value = profileOrders
    } catch (error) {
      // TODO: Error for this API should be displayed independently.
      this.errorMessageRef.value = this.resolveErrorMessage({
        error,
      })
    } finally {
      this.statusReactive.isLoadingProfileOrders = false
    }
  }

  /**
   * Resolve error message.
   *
   * @param {{
   *   error: unknown
   * }} params - Parameters.
   * @returns {string}
   */
  resolveErrorMessage ({
    error,
  }) {
    if (error instanceof Error) {
      return error.message
    }

    if (typeof error !== 'string') {
      return 'Unknown error'
    }

    return error
  }

  /**
   * get: addressCurrentCompetitionLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addressCurrentCompetitionLauncherHooks () {
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
   * get: addressNameLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addressNameLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isFetchingName = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isFetchingName = false
      },
    }
  }

  /**
   * get: competitionParticipantCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipant/CompetitionParticipantQueryGraphqlCapsule').default}
   */
  get competitionParticipantCapsule () {
    return this.graphqlClientHash
      .competitionParticipant
      .capsuleRef
      .value
  }

  /**
   * get: competitionParticipantStatusId
   *
   * @returns {number | null}
   */
  get competitionParticipantStatusId () {
    return this.competitionParticipantCapsule.statusId
  }

  /**
   * get: addressNameCapsuleRef
   *
   * @returns {AddressNameCapsuleRef} Capsule ref.
   */
  get addressNameCapsuleRef () {
    return this.graphqlClientHash.addressName.capsuleRef
  }

  /**
   * get: addressCurrentCompetitionCapsuleRef
   *
   * @returns {AddressCurrentCompetitionCapsuleRef} Capsule ref.
   */
  get addressCurrentCompetitionCapsuleRef () {
    return this.graphqlClientHash.addressCurrentCompetition.capsuleRef
  }

  /**
   * get: profileOverview
   *
   * @returns {ProfileOverview | null}
   */
  get profileOverview () {
    return this.profileOverviewRef.value
  }

  /**
   * get: profileOrders
   *
   * @returns {Array<ProfileOrder>}
   */
  get profileOrders () {
    return this.profileOrdersRef.value
  }

  /**
   * get: subaccount
   *
   * @returns {ProfileOverview['subaccount'] | null}
   */
  get subaccount () {
    return this.profileOverview
      ?.subaccount
      ?? null
  }

  /**
   * get: equity
   *
   * @returns {ProfileOverview['subaccount']['equity'] | null}
   */
  get equity () {
    return this.subaccount
      ?.equity
      ?? null
  }

  /**
   * get: freeCollateral
   *
   * @returns {ProfileOverview['subaccount']['freeCollateral'] | null}
   */
  get freeCollateral () {
    return this.subaccount
      ?.freeCollateral
      ?? null
  }

  /**
   * Normalize address name.
   *
   * @returns {string}
   */
  normalizeAddressName () {
    return this.addressName
      ?? '----'
  }

  /**
   * get: addressName
   *
   * @returns {string | null}
   */
  get addressName () {
    return this.addressNameCapsuleRef.value
      ?.name
      ?? null
  }

  /**
   * get: currentCompetition
   *
   * @returns {import('~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule').Competition} Current competition.
   */
  get currentCompetition () {
    return this.addressCurrentCompetitionCapsuleRef.value
      ?.competition
      ?? null
  }

  /**
   * get: currentCompetitionId
   *
   * @returns {number | null}
   */
  get currentCompetitionId () {
    return this.addressCurrentCompetitionCapsuleRef.value
      .competitionId
  }

  /**
   * get: currentRanking
   *
   * @returns {import('~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule').Ranking} Current ranking.
   */
  get currentRanking () {
    return this.addressCurrentCompetitionCapsuleRef.value
      ?.ranking
      ?? null
  }

  /**
   * get: roi
   *
   * @returns {number | null}
   */
  get roi () {
    return this.currentRanking
      ?.roi
      ?? null
  }

  /**
   * get: pnl
   *
   * @returns {number | null}
   */
  get pnl () {
    return this.currentRanking
      ?.pnl
      ?? null
  }

  /**
   * Generate financial metrics.
   *
   * @returns {import('~/app/vue/contexts/profile/SectionProfileFinancialMetricsContext').Metrics}
   */
  generateFinancialMetrics () {
    const normalizedPnl = FinancialMetricNormalizer.create({
      figure: this.pnl,
    })
      .normalizeAsPnl()
    const normalizedRoi = FinancialMetricNormalizer.create({
      figure: this.roi,
    })
      .normalizeAsRoi()

    return [
      {
        label: 'Total Equity',
        value: this.equity,
      },
      {
        label: 'Collateral',
        value: this.freeCollateral,
      },
      {
        label: 'Total ROI',
        value: normalizedRoi,
      },
      {
        label: 'Total PnL',
        value: normalizedPnl,
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   profileOverviewRef: import('vue').Ref<ProfileOverview | null>
 *   profileOrdersRef: import('vue').Ref<Array<ProfileOrder>>
 *   errorMessageRef: import('vue').Ref<string | null>
 *   statusReactive: StatusReactive
 *   route: ReturnType<typeof useRoute>
 * }} ProfileDetailsContextParams
 */

/**
 * @typedef {Omit<ProfileDetailsContextParams, FactoryOmittedKeys>} ProfileDetailsContextFactoryParams
 */

/**
 * @typedef {'addressCurrentCompetition'
 *   | 'addressName'
 *   | 'competitionParticipant'
 * } GraphqlClientHashKeys
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
 *   isFetchingName: boolean
 *   isLoadingProfileOverview: boolean
 *   isLoadingProfileOrders: boolean
 * }} StatusReactive
 */

/**
 * @typedef {import('vue').Ref<
 *   import('~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule').default
 * >} AddressCurrentCompetitionCapsuleRef
 */

/**
 * @typedef {import('vue').Ref<
 *   import('~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlCapsule').default
 * >} AddressNameCapsuleRef
 */

/**
 * {@link https://docs.dydx.exchange/api_integration-indexer/indexer_api#schemaparentsubaccountresponse}
 *
 * @typedef {{
 *   subaccount: {
 *     address: string
 *     parentSubaccountNumber: number
 *     equity: string
 *     freeCollateral: string
 *     childSubaccounts: Array<{
 *       address: string
 *       subaccountNumber: number
 *       equity: string
 *       freeCollateral: string
 *       openPerpetualPositions: {
 *         [key: string]: {
 *           market: string
 *           status: string
 *           side: string
 *           size: string
 *           maxSize: string
 *           entryPrice: string
 *           realizedPnl: string
 *           createdAt: string | null
 *           createdAtHeight: string
 *           sumOpen: string
 *           sumClose: string
 *           netFunding: string
 *           unrealizedPnl: string
 *           closedAt: string | null
 *           exitPrice: string
 *           subaccountNumber: number
 *         }
 *       }
 *       assetPositions: {
 *         [key: string]: {
 *           symbol: string
 *           side: string
 *           size: string
 *           assetId: string
 *           subaccountNumber: number
 *         }
 *       }
 *       marginEnabled: boolean
 *       updatedAtHeight: string
 *     }>
 *   }
 * }} ProfileOverview - Result gotten from the indexer.
 */

/**
 * {@link https://docs.dydx.exchange/api_integration-indexer/indexer_api#listordersforparentsubaccount}
 *
 * @typedef {{
 *   id: string
 *   subaccountId: string
 *   clientId: string
 *   clobPairId: string
 *   side: 'BUY' | 'SELL'
 *   size: string
 *   totalFilled: string
 *   price: string
 *   type: 'LIMIT' | 'MARKET' | 'STOP_LIMIT' | 'STOP_MARKET' | 'TRAILING_STOP' | 'TAKE_PROFIT' | 'TAKE_PROFIT_MARKET'
 *   reduceOnly: boolean
 *   orderFlags: string
 *   goodTilBlock?: string
 *   goodTilBlockTime?: string
 *   createdAtHeight?: string
 *   clientMetadata: string
 *   triggerPrice?: string
 *   timeInForce: 'GTT' | 'FOK' | 'IOC'
 *   status: 'OPEN' | 'UNTRIGGERED' // We only filter for these statuses.
 *   postOnly: boolean
 *   ticker: string
 *   updatedAt: string
 *   updatedAtHeight: string
 *   subaccountNumber: number
 * }} ProfileOrder - ListOrdersForParentSubaccount from the indexer.
 */
