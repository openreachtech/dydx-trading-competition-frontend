export default class CompetitionParticipantStatusesFetcher {
  /**
   * Constructor of this class.
   *
   * @param {CompetitionParticipantStatusesFetcherParams} params - Parameters.
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
   * @template {X extends typeof CompetitionParticipantStatusesFetcher ? X : never} T, X
   * @param {CompetitionParticipantStatusesFetcherFactoryParams} params - Parameters.
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
   * get: competitionParticipantStatusesCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipantStatuses/CompetitionParticipantStatusesQueryGraphqlCapsule').default}
   */
  get competitionParticipantStatusesCapsule () {
    return this.graphqlClientHash
      .competitionParticipantStatuses
      .capsuleRef
      .value
  }

  /**
   * Fetch `competitionParticipantStatuses` on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionParticipantStatusesOnEvent () {
    await this.graphqlClientHash
      .competitionParticipantStatuses
      .invokeRequestOnEvent()
  }

  /**
   * Fetch `competitionParticipantStatuses` on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionParticipantStatusesOnMounted () {
    this.graphqlClientHash
      .competitionParticipantStatuses
      .invokeRequestOnMounted()
  }

  /**
   * get: competitionParticipantStatusesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionParticipantStatusesLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionParticipantStatuses = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionParticipantStatuses = false
      },
    }
  }
}

/**
 * @typedef {{
 *   graphqlClientHash: {
 *     competitionParticipantStatuses: GraphqlClient
 *   }
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} CompetitionParticipantStatusesFetcherParams
 */

/**
 * @typedef {CompetitionParticipantStatusesFetcherParams} CompetitionParticipantStatusesFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
