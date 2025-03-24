import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  BASE_INDEXER_URL,
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
        errorMessageRef,
        statusReactive,
      })
    )
  }

  /** @override */
  setupComponent () {
    this.graphqlClientHash.addressCurrentCompetition
      .invokeRequestOnMounted({
        variables: {
          input: {
            address: this.route.params.address,
          },
        },
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

        await this.fetchProfileOverview({
          address,
        })
      },
      {
        immediate: true,
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
      if (error instanceof Error) {
        this.errorMessageRef.value = error.message

        return
      }

      if (typeof error !== 'string') {
        return
      }

      this.errorMessageRef.value = error
    } finally {
      this.statusReactive.isLoadingProfileOverview = false
    }
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
   * get: financialMetrics
   *
   * @returns {import('~/app/vue/contexts/profile/SectionProfileFinancialMetricsContext').Metrics}
   */
  get financialMetrics () {
    // TODO: Fulfill metrics data.
    return [
      {
        label: 'Total Equity',
        value: null,
      },
      {
        label: 'Collateral',
        value: null,
      },
      {
        label: 'Total ROI',
        value: null,
      },
      {
        label: 'Total PnL',
        value: null,
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   profileOverviewRef: import('vue').Ref<ProfileOverview | null>
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
