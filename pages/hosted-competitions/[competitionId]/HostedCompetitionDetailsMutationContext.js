import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * HostedCompetitionDetailsMutationContext
 *
 * @extends {BaseAppContext<null, {}, null>}
 */
export default class HostedCompetitionDetailsMutationContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {HostedCompetitionDetailsMutationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    fetcherHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.fetcherHash = fetcherHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HostedCompetitionDetailsMutationContext ? X : never} T, X
   * @override
   * @param {HostedCompetitionDetailsMutationContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClientHash,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        fetcherHash,
        statusReactive,
      })
    )
  }

  /**
   * get: bulkUpdateParticipantStatusCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/bulkUpdateParticipantStatus/BulkUpdateParticipantStatusMutationGraphqlCapsule').default}
   */
  get bulkUpdateParticipantStatusCapsule () {
    return this.graphqlClientHash
      .bulkUpdateParticipantStatus
      .capsuleRef
      .value
  }

  /**
   * Execute `bulkUpdateCompetitionStatus` on event.
   *
   * @param {{
   *   competitionParticipantIds: Array<number>
   *   statusId: number
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async executeBulkUpdateCompetitionStatusOnEvent ({
    competitionParticipantIds,
    statusId,
  }) {
    await this.graphqlClientHash
      .bulkUpdateParticipantStatus
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionParticipantIds,
            statusId,
          },
        },
        hooks: this.bulkUpdateCompetitionStatusLauncherHooks,
      })
  }

  /**
   * get: bulkUpdateCompetitionStatusLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get bulkUpdateCompetitionStatusLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isBulkUpdatingCompetitionStatus = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isBulkUpdatingCompetitionStatus = false

        await this.fetcherHash
          .competitionParticipants
          .fetchCompetitionParticipantsOnEvent()
      },
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: {
 *     bulkUpdateParticipantStatus: GraphqlClient
 *   }
 *   fetcherHash: {
 *     competitionParticipants: import('./CompetitionParticipantsFetcher').default
 *   }
 *   statusReactive: StatusReactive
 * }} HostedCompetitionDetailsMutationContextParams
 */

/**
 * @typedef {HostedCompetitionDetailsMutationContextParams} HostedCompetitionDetailsMutationContextFactoryParams
 */

/**
 * @typedef {import('vue').Reactive<Record<string, boolean>>} StatusReactive
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
