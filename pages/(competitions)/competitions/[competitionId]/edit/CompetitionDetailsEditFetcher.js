export default class CompetitionDetailsEditFetcher {
  /**
   * Constructor.
   *
   * @param {CompetitionDetailsEditFetcherParams} params - Parameters.
   */
  constructor ({
    route,
    toastStore,
    graphqlClientHash,
    statusReactive,
  }) {
    this.route = route
    this.toastStore = toastStore
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CompetitionDetailsEditFetcher ? X : never} T, X
   * @param {CompetitionDetailsEditFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    route,
    toastStore,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        route,
        toastStore,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * Fetch `competition` on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionOnEvent () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return
    }

    await this.graphqlClientHash
      .competition
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId,
          },
        },
        hooks: this.competitionLauncherHooks,
      })
  }

  /**
   * Fetch `competition` on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionOnMounted () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return
    }

    this.graphqlClientHash
      .competition
      .invokeRequestOnMounted({
        variables: {
          input: {
            competitionId,
          },
        },
        hooks: this.competitionLauncherHooks,
      })
  }

  /**
   * Extract competition id from route params.
   *
   * @returns {number | null}
   */
  extractCompetitionIdFromRoute () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }

  /**
   * get: competitionLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingInitialValue = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingInitialValue = false

        if (capsule.hasError()) {
          this.toastStore.add({
            message: capsule.getResolvedErrorMessage(),
            color: 'error',
          })
        }
      },
    }
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
}

/**
 * @typedef {{
 *   route: ReturnType<import('vue-router').useRoute>
 *   toastStore: import('~/stores/toast').ToastStore
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *   }
 *   statusReactive: import('vue').Reactive<{
 *     isLoadingInitialValue: boolean
 *   }>
 * }} CompetitionDetailsEditFetcherParams
 */

/**
 * @typedef {CompetitionDetailsEditFetcherParams} CompetitionDetailsEditFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
