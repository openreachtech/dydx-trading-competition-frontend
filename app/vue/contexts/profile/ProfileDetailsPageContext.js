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
   * get: addressCurrentCompetitionCapsuleRef
   *
   * @returns {AddressCurrentCompetitionCapsuleRef} Capsule ref.
   */
  get addressCurrentCompetitionCapsuleRef () {
    return this.graphqlClientHash.addressCurrentCompetition.capsuleRef
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
 * @typedef {'addressCurrentCompetition'} GraphqlClientHashKeys
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
 * @typedef {import('vue').Ref<
 *   import('~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule').default
 * >} AddressCurrentCompetitionCapsuleRef
 */

/**
 * @type
 */
