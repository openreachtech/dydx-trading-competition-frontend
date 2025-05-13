import {
  PAGINATION,
} from '~/app/constants'

export default class CompetitionParticipantsFetcher {
  /**
   * Constructor of this class.
   *
   * @param {CompetitionParticipantsFetcherParams} params - Parameters.
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
   * @template {X extends typeof CompetitionParticipantsFetcher ? X : never} T, X
   * @param {CompetitionParticipantsFetcherFactoryParams} params - Parameters.
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
   * get: competitionParticipantsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').default}
   */
  get competitionParticipantsCapsule () {
    return this.graphqlClientHash
      .competitionParticipants
      .capsuleRef
      .value
  }

  /**
   * Fetch `competitionParticipants` on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionParticipantsOnEvent () {
    const variables = this.generateCompetitionParticipantsVariables()
    if (variables === null) {
      return
    }

    await this.graphqlClientHash
      .competitionParticipants
      .invokeRequestOnEvent({
        variables,
        hooks: this.competitionParticipantsLauncherHooks,
      })
  }

  /**
   * Fetch `competitionParticipants` on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionParticipantsOnMounted () {
    const variables = this.generateCompetitionParticipantsVariables()
    if (variables === null) {
      return
    }

    this.graphqlClientHash
      .competitionParticipants
      .invokeRequestOnMounted({
        variables,
        hooks: this.competitionParticipantsLauncherHooks,
      })
  }

  /**
   * Generate variables for `competitionParticipants`.
   *
   * @returns {import(
   *   '~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlPayload'
   * ).CompetitionParticipantsQueryRequestVariables | null}
   */
  generateCompetitionParticipantsVariables () {
    const competitionId = this.extractCompetitionIdFromRoute()
    if (competitionId === null) {
      return null
    }

    const currentPage = this.extractCurrentPageFromRoute()
    const statusId = this.extractStatusIdFromRoute()

    const baseInput = {
      competitionId,
      pagination: {
        limit: PAGINATION.LIMIT,
        offset: (currentPage - 1) * PAGINATION.LIMIT,
      },
    }

    return statusId === null
      ? {
        input: baseInput,
      }
      : {
        input: {
          ...baseInput,
          statusId,
        },
      }
  }

  /**
   * get: competitionParticipantsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionParticipantsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionParticipants = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionParticipants = false
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
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }

  /**
   * Extract statusId from route.
   *
   * @returns {number | null}.
   */
  extractStatusIdFromRoute () {
    const statusIdQuery = Array.isArray(this.route.query.statusId)
      ? this.route.query.statusId[0]
      : this.route.query.statusId
    const statusId = Number(statusIdQuery)

    return isNaN(statusId)
      ? null
      : statusId
  }

  /**
   * Extract current page from route.
   *
   * @returns {number}.
   */
  extractCurrentPageFromRoute () {
    const currentPageQuery = Array.isArray(this.route.query.page)
      ? this.route.query.page[0]
      : this.route.query.page
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
  }
}

/**
 * @typedef {{
 *   route: ReturnType<import('vue-router').useRoute>
 *   graphqlClientHash: {
 *     competitionParticipants: GraphqlClient
 *   }
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 * }} CompetitionParticipantsFetcherParams
 */

/**
 * @typedef {CompetitionParticipantsFetcherParams} CompetitionParticipantsFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
