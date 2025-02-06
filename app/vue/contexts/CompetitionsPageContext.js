import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Context class for `pages/competitions/index` page.
 *
 * @extends {BaseFuroContext<null>}
 */
export default class CompetitionsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompetitionsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClient,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClient = graphqlClient
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionsPageContext ? X : never} T, X
   * @override
   * @param {CompetitionsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClient,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClient,
        statusReactive,
      })
    )
  }

  /** @override */
  // @ts-expect-error - Type error is resolved in furo 1.4.0
  setupComponent () {
    this.graphqlClient
      .invokeRequestOnMounted({
        variables: this.defaultCompetitionsVariables,
        hooks: this.graphqlRequestHooks,
      })

    return this
  }

  /**
   * get: defaultCompetitionsVariables
   *
   * @returns {import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlPayload').CompetitionsQueryRequestVariables}
   */
  get defaultCompetitionsVariables () {
    return {
      input: {
        // NOTE: Maybe create a constant value for pagination.
        pagination: {
          limit: 16,
          offset: 0,
        },
      },
    }
  }

  /**
   * get: capsuleRef
   *
   * @returns {CompetitionsPageContextParams['graphqlClient']['capsuleRef']}
   */
  get capsuleRef () {
    return this.graphqlClient.capsuleRef
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get graphqlRequestHooks () {
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClient: GraphqlClient
 *   statusReactive: StatusReactive
 * }} CompetitionsPageContextParams
 */

/**
 * @typedef {CompetitionsPageContextParams} CompetitionsPageContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */
