export default class CompetitionCurrentDynamicPrizeRuleFetcher {
  /**
   * Constructor
   *
   * @param {CompetitionCurrentDynamicPrizeRuleFetcherParams} params - Parameters.
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
   * @template {X extends typeof CompetitionCurrentDynamicPrizeRuleFetcher ? X : never} T, X
   * @param {CompetitionCurrentDynamicPrizeRuleFetcherFactoryParams} params - Parameters.
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
   * get: competitionCurrentDynamicPrizeRuleCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionCurrentDynamicPrizeRule/CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule').default}
   */
  get competitionCurrentDynamicPrizeRuleCapsule () {
    return this.graphqlClientHash
      .competitionCurrentDynamicPrizeRule
      .capsuleRef
      .value
  }

  /**
   * get: competitionCurrentDynamicPrizeRuleLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionCurrentDynamicPrizeRuleLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionCurrentDynamicPrizeRule = true

        return false
      },
      /**
       * @type {(capsule: CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule) => Promise<void>}
       */
      // @ts-expect-error: Upstream type error. Should be resolve in newer furo-nuxt versions.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionCurrentDynamicPrizeRule = false
      },
    }
  }

  /**
   * Fetch `competitionCurrentDynamicPrizeRule` on event.
   *
   * @param {{
   *   valueHash: RequestInput
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchCompetitionCurrentDynamicPrizeRuleOnEvent ({
    valueHash,
  }) {
    await this.graphqlClientHash
      .competitionCurrentDynamicPrizeRule
      .invokeRequestOnEvent({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionCurrentDynamicPrizeRuleLauncherHooks,
      })
  }

  /**
   * Fetch `competitionCurrentDynamicPrizeRule` on mounted.
   *
   * @param {{
   *   valueHash: RequestInput
   * }} params - Parameters.
   * @returns {void}
   */
  fetchCompetitionCurrentDynamicPrizeRuleOnMounted ({
    valueHash,
  }) {
    this.graphqlClientHash
      .competitionCurrentDynamicPrizeRule
      .invokeRequestOnMounted({
        variables: {
          input: valueHash,
        },
        hooks: this.competitionCurrentDynamicPrizeRuleLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   statusReactive: import('vue').Reactive<import('~/app/vue/contexts/CompetitionDetailsPageContext').StatusReactive>
 *   graphqlClientHash: {
 *     competitionCurrentDynamicPrizeRule: GraphqlClient
 *   }
 * }} CompetitionCurrentDynamicPrizeRuleFetcherParams
 */

/**
 * @typedef {CompetitionCurrentDynamicPrizeRuleFetcherParams} CompetitionCurrentDynamicPrizeRuleFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/queries/competitionCurrentDynamicPrizeRule/CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule'
 * ).default} CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule
 */

/**
 * @typedef {import('~/app/graphql/client/queries/competitionCurrentDynamicPrizeRule/CompetitionCurrentDynamicPrizeRuleQueryGraphqlPayload').CompetitionCurrentDynamicPrizeRuleQueryRequestVariables['input']} RequestInput
 */
