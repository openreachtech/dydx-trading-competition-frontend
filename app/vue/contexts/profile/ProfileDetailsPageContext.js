import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.graphqlClientHash = graphqlClientHash
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
    statusReactive,
  }) {
    const route = useRoute()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        graphqlClientHash,
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

    return this
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
