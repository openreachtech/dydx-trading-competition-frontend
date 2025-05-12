export default class ParticipantsCurrentEquitiesFetcher {
  /**
   * Constructor of this class.
   *
   * @param {ParticipantsCurrentEquitiesFetcherParams} params - Parameters.
   */
  constructor ({
    graphqlClientHash,
    fetcherHash,
    statusReactive,
  }) {
    this.graphqlClientHash = graphqlClientHash
    this.fetcherHash = fetcherHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof ParticipantsCurrentEquitiesFetcher ? X : never} T, X
   * @param {ParticipantsCurrentEquitiesFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    graphqlClientHash,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        graphqlClientHash,
        fetcherHash,
        statusReactive,
      })
    )
  }

  /**
   * get: participantsCurrentEquitiesCapsule
   *
   * @returns {import('~/app/graphql/client/queries/participantsCurrentEquities/ParticipantsCurrentEquitiesQueryGraphqlCapsule').default}
   */
  get participantsCurrentEquitiesCapsule () {
    return this.graphqlClientHash
      .participantsCurrentEquities
      .capsuleRef
      .value
  }

  /**
   * Fetch `participantsCurrentEquities` on event.
   *
   * @param {{
   *   competitionParticipantIds: Array<number>
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchParticipantsCurrentEquitiesOnEvent ({
    competitionParticipantIds,
  }) {
    const now = new Date()

    await this.graphqlClientHash
      .participantsCurrentEquities
      .invokeRequestOnEvent({
        variables: {
          input: {
            timestamp: now.toISOString(),
            competitionParticipantIds,
          },
        },
        hooks: this.participantsCurrentEquitiesLauncherHooks,
      })
  }

  /**
   * Fetch `participantsCurrentEquities` on mounted.
   *
   * @param {{
   *   competitionParticipantIds: Array<number>
   * }} params - Parameters.
   * @returns {void}
   */
  fetchParticipantsCurrentEquitiesOnMounted ({
    competitionParticipantIds,
  }) {
    const now = new Date()

    this.graphqlClientHash
      .participantsCurrentEquities
      .invokeRequestOnMounted({
        variables: {
          input: {
            timestamp: now.toISOString(),
            competitionParticipantIds,
          },
        },
        hooks: this.participantsCurrentEquitiesLauncherHooks,
      })
  }

  /**
   * get: participantsCurrentEquitiesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get participantsCurrentEquitiesLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingParticipantsCurrentEquities = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingParticipantsCurrentEquities = false

        await this.fetcherHash
          .competitionParticipants
          .fetchCompetitionParticipantsOnEvent()
      },
    }
  }
}

/**
 * @typedef {{
 *   graphqlClientHash: {
 *     participantsCurrentEquities: GraphqlClient
 *   }
 *   fetcherHash: {
 *     competitionParticipants: import('./CompetitionParticipantsFetcher').default
 *   }
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} ParticipantsCurrentEquitiesFetcherParams
 */

/**
 * @typedef {ParticipantsCurrentEquitiesFetcherParams} ParticipantsCurrentEquitiesFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
