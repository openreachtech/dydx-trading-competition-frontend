export default class CompetitionTradingMetricsFetcher {
  /**
   * Constructor.
   *
   * @param {CompetitionTradingMetricsFetcherParams} params - Parameters.
   */
  constructor ({
    graphqlClientHash,
    statusReactive,
  }) {
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CompetitionTradingMetricsFetcher ? X : never} T, X
   * @param {CompetitionTradingMetricsFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * get: competitionTradingMetricsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionTradingMetrics/CompetitionTradingMetricsQueryGraphqlCapsule').default}
   */
  get competitionTradingMetricsCapsule () {
    return this.graphqlClientHash
      .competitionTradingMetrics
      .capsuleRef
      .value
  }

  /**
   * Fetch `competitionTradingMetrics` on event.
   *
   * @param {{
   *   valueHash: import('~/app/graphql/client/queries/competitionTradingMetrics/CompetitionTradingMetricsQueryGraphqlPayload').CompetitionTradingMetricsQueryRequestVariables['input']
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchCompetitionTradingMetricsOnEvent ({
    valueHash,
  }) {
    await this.graphqlClientHash
      .competitionTradingMetrics
      .invokeRequestOnEvent({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionTradingMetricsLauncherHooks,
      })
  }

  /**
   * Fetch `competitionTradingMetrics` on mounted.
   *
   * @param {{
   *   valueHash: import('~/app/graphql/client/queries/competitionTradingMetrics/CompetitionTradingMetricsQueryGraphqlPayload').CompetitionTradingMetricsQueryRequestVariables['input']
   * }} params - Parameters.
   * @returns {void}
   */
  fetchCompetitionTradingMetricsOnMounted ({
    valueHash,
  }) {
    this.graphqlClientHash
      .competitionTradingMetrics
      .invokeRequestOnMounted({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionTradingMetricsLauncherHooks,
      })
  }

  /**
   * get: competitionTradingMetricsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionTradingMetricsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionTradingMetrics = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionTradingMetrics = false
      },
    }
  }
}

/**
 * @typedef {{
 *   graphqlClientHash: {
 *     competitionTradingMetrics: GraphqlClient
 *   }
 *   statusReactive: import('~/app/vue/contexts/CompetitionDetailsPageContext').StatusReactive
 * }} CompetitionTradingMetricsFetcherParams
 */

/**
 * @typedef {CompetitionTradingMetricsFetcherParams} CompetitionTradingMetricsFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
