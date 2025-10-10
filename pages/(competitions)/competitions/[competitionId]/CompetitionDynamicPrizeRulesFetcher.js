export default class CompetitionDynamicPrizeRulesFetcher {
  /**
   * Constructor
   *
   * @param {CompetitionDynamicPrizeRulesFetcherParams} params - Parameters.
   */
  constructor ({
    statusReactive,
    graphqlClientHash,
  }) {
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CompetitionDynamicPrizeRulesFetcher ? X : never} T, X
   * @param {CompetitionDynamicPrizeRulesFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    statusReactive,
    graphqlClientHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * get: competitionDynamicPrizeRulesCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionDynamicPrizeRules/CompetitionDynamicPrizeRulesQueryGraphqlCapsule').default}
   */
  get competitionDynamicPrizeRulesCapsule () {
    return this.graphqlClientHash
      .competitionDynamicPrizeRules
      .capsuleRef
      .value
  }

  /**
   * get: competitionDynamicPrizeRulesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionDynamicPrizeRulesLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionDynamicPrizeRules = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionDynamicPrizeRules = false
      },
    }
  }

  /**
   * Fetch `competitionDynamicPrizeRules` on event.
   *
   * @param {{
   *   valueHash: schema.graphql.CompetitionDynamicPrizeRulesInput
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchCompetitionDynamicPrizeRulesOnEvent ({
    valueHash,
  }) {
    await this.graphqlClientHash
      .competitionDynamicPrizeRules
      .invokeRequestOnEvent({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionDynamicPrizeRulesLauncherHooks,
      })
  }

  /**
   * Fetch `competitionDynamicPrizeRules` on mounted.
   *
   * @param {{
   *   valueHash: schema.graphql.CompetitionDynamicPrizeRulesInput
   * }} params - Parameters.
   * @returns {void}
   */
  fetchCompetitionDynamicPrizeRulesOnMounted ({
    valueHash,
  }) {
    this.graphqlClientHash
      .competitionDynamicPrizeRules
      .invokeRequestOnMounted({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionDynamicPrizeRulesLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   statusReactive: import('vue').Reactive<import('~/app/vue/contexts/CompetitionDetailsPageContext').StatusReactive>
 *   graphqlClientHash: {
 *     competitionDynamicPrizeRules: GraphqlClient
 *   }
 * }} CompetitionDynamicPrizeRulesFetcherParams
 */

/**
 * @typedef {CompetitionDynamicPrizeRulesFetcherParams} CompetitionDynamicPrizeRulesFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
