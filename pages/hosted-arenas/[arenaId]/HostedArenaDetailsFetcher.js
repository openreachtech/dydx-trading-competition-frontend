export default class HostedArenaDetailsFetcher {
  /**
   * Constructor of this class.
   *
   * @param {HostedArenaDetailsFetcherParams} params - Parameters.
   */
  constructor ({
    route,
    graphqlClientHash,
    statusReactive,
  }) {
    this.route = route
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof HostedArenaDetailsFetcher ? X : never} T, X
   * @param {HostedArenaDetailsFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    route,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        route,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * get: competitionCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').default}
   */
  get competitionCapsule () {
    return this.graphqlClientHash
      .competition
      .capsuleRef
      .value
  }

  /**
   * Fetch competition on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionOnEvent () {
    const variables = this.generateCompetitionVariables()
    if (variables === null) {
      return
    }

    await this.graphqlClientHash
      .competition
      .invokeRequestOnEvent({
        variables,
        hooks: this.competitionLauncherHooks,
      })
  }

  /**
   * Fetch competition on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionOnMounted () {
    const variables = this.generateCompetitionVariables()
    if (variables === null) {
      return
    }

    this.graphqlClientHash
      .competition
      .invokeRequestOnMounted({
        variables,
        hooks: this.competitionLauncherHooks,
      })
  }

  /**
   * Generate variables for `competition`.
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlPayload').CompetitionQueryRequestVariables | null}
   */
  generateCompetitionVariables () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return null
    }

    return {
      input: {
        competitionId,
      },
    }
  }

  /**
   * get: competitionLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetition = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetition = false
      },
    }
  }

  /**
   * Extract competition id from route params.
   *
   * @returns {number | null}
   */
  extractCompetitionIdFromRoute () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.arenaId[0]
      : this.route.params.arenaId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }
}

/**
 * @typedef {{
 *   route: ReturnType<import('vue-router').useRoute>
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *   }
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} HostedArenaDetailsFetcherParams
 */

/**
 * @typedef {HostedArenaDetailsFetcherParams} HostedArenaDetailsFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
