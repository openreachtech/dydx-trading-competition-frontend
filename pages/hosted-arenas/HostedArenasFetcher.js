import {
  PAGINATION,
} from '~/app/constants'

export default class HostedArenasFetcher {
  /**
   * Constructor of this class.
   *
   * @param {HostedArenasFetcherParams} params - Parameters.
   */
  constructor ({
    route,
    walletStore,
    graphqlClientHash,
    statusReactive,
  }) {
    this.route = route
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof HostedArenasFetcher ? X : never} T, X
   * @param {HostedArenasFetcherFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    route,
    walletStore,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        route,
        walletStore,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * get: competitionsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').default}
   */
  get competitionsCapsule () {
    return this.graphqlClientHash
      .competitions
      .capsuleRef
      .value
  }

  /**
   * get: localWalletAddress
   *
   * @returns {string | null}
   */
  get localWalletAddress () {
    return this.walletStore
      .walletStoreRef
      .value
      .localWallet
      .address
  }

  /**
   * Fetch `competitions` on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionsOnEvent () {
    const title = this.extractTitleFromRoute()
    const statusId = this.extractStatusIdFromRoute()
    const pagination = this.generatePagination()

    await this.graphqlClientHash
      .competitions
      .invokeRequestOnEvent({
        variables: {
          input: {
            title,
            statusId,
            hostAddress: this.localWalletAddress,
            pagination,
          },
        },
        hooks: this.competitionsLauncherHooks,
      })
  }

  /**
   * Fetch `competitions` on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionsOnMounted () {
    const title = this.extractTitleFromRoute()
    const statusId = this.extractStatusIdFromRoute()
    const pagination = this.generatePagination()

    this.graphqlClientHash
      .competitions
      .invokeRequestOnMounted({
        variables: {
          input: {
            title,
            statusId,
            hostAddress: this.localWalletAddress,
            pagination,
          },
        },
        hooks: this.competitionsLauncherHooks,
      })
  }

  /**
   * get: competitionsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitions = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitions = false
      },
    }
  }

  /**
   * Extract title from route.
   *
   * @returns {string | null}
   */
  extractTitleFromRoute () {
    const queryTitle = Array.isArray(this.route.query.title)
      ? this.route.query.title[0]
      : this.route.query.title

    return queryTitle
      ?? null
  }

  /**
   * Extract status id from route.
   *
   * @returns {number | null}
   */
  extractStatusIdFromRoute () {
    const queryStatusId = Array.isArray(this.route.query.statusId)
      ? this.route.query.statusId[0]
      : this.route.query.statusId

    const statusId = Number(queryStatusId)
    if (isNaN(statusId)) {
      return null
    }

    return statusId
  }

  /**
   * Generate pagination.
   *
   * @returns {Pagination}
   */
  generatePagination () {
    const currentPage = this.extractCurrentPageFromRoute()

    return {
      limit: PAGINATION.LIMIT,
      offset: (currentPage - 1) * PAGINATION.LIMIT,
    }
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
 *   walletStore: ReturnType<import('~/stores/wallet').default>
 *   graphqlClientHash: {
 *     competitions: GraphqlClient
 *   }
 *   statusReactive: import('vue').Reactive<{
 *     isLoadingCompetitions: boolean
 *   }>
 * }} HostedArenasFetcherParams
 */

/**
 * @typedef {HostedArenasFetcherParams} HostedArenasFetcherFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   limit: number
 *   offset: number
 *   sort?: {
 *     targetColumn: string
 *     orderBy: string
 *   }
 * }} Pagination
 */
