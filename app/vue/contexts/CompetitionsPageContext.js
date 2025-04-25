import {
  computed,
} from 'vue'

import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  PAGINATION,
} from '~/app/constants'

/**
 * Context class for `pages/competitions/index` page.
 *
 * @extends {BaseFuroContext<null>}
 */
export default class CompetitionsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompetitionsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionsPageContext ? X : never} T, X
   * @override
   * @param {CompetitionsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * Setup component context.
   *
   * @template {X extends CompetitionsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.graphqlClientHash
      .competitionStatistics
      .invokeRequestOnMounted({
        hooks: this.competitionStatisticsLauncherHooks,
      })

    this.watch(
      () => this.extractCurrentPage(),
      async () => {
        await this.fetchCompetitions()
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * Fetch competitions
   *
   * @param {{
   *   title?: string
   *   statusId?: number
   * }} [params] - Parameters.
   * @returns {Promise<void>}
   */
  async fetchCompetitions ({
    title,
    statusId,
  } = {}) {
    const currentPage = this.extractCurrentPage()

    await this.graphqlClientHash
      .competitions
      .invokeRequestOnEvent({
        variables: {
          ...this.defaultCompetitionsVariables,
          input: {
            title,
            statusId,
            pagination: {
              ...this.defaultCompetitionsVariables.input.pagination,
              offset: (currentPage - 1) * PAGINATION.LIMIT,
            },
          },
        },
        hooks: this.graphqlRequestHooks,
      })
  }

  /**
   * Extract current page.
   *
   * @returns {number} Current page.
   */
  extractCurrentPage () {
    const currentPageQuery = Array.isArray(this.route.query.page)
      ? this.route.query.page[0]
      : this.route.query.page
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
  }

  /**
   * get: defaultCompetitionsVariables
   *
   * @returns {import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlPayload').CompetitionsQueryRequestVariables}
   */
  get defaultCompetitionsVariables () {
    return {
      input: {
        pagination: {
          limit: PAGINATION.LIMIT,
          offset: 0,
        },
      },
    }
  }

  /**
   * get: competitions
   *
   * @returns {Array<import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').CompetitionEntity>}
   */
  get competitions () {
    return this.competitionsCapsuleRef.value
      .extractCompetitions()
  }

  /**
   * get: competitionsCapsuleRef
   *
   * @returns {CompetitionsPageContextParams['graphqlClientHash']['competitions']['capsuleRef']}
   */
  get competitionsCapsuleRef () {
    return this.graphqlClientHash.competitions.capsuleRef
  }

  /**
   * get: competitionStatisticsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionStatistics/CompetitionStatisticsQueryGraphqlCapsule').default}
   */
  get competitionStatisticsCapsule () {
    return this.graphqlClientHash.competitionStatistics.capsuleRef.value
  }

  /**
   * get: graphqlRequestHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get graphqlRequestHooks () {
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
   * get: competitionStatisticsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionStatisticsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingCompetitionStatistics = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingCompetitionStatistics = false
      },
    }
  }

  /**
   * get: isLoadingCompetitions
   *
   * @returns {boolean} `true` if competitions is loading.
   */
  get isLoadingCompetitions () {
    return this.statusReactive.isLoadingCompetitions
  }

  /**
   * Generate pagination.
   *
   * @returns {Pagination} Pagination object.
   */
  generatePaginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.competitionsCapsuleRef.value.totalCount ?? 0,
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   graphqlClientHash: {
 *     competitions: GraphqlClient
 *     competitionStatistics: GraphqlClient
 *   }
 *   statusReactive: StatusReactive
 * }} CompetitionsPageContextParams
 */

/**
 * @typedef {CompetitionsPageContextParams} CompetitionsPageContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoadingCompetitions: boolean
 *   isLoadingCompetitionStatistics: boolean
 * }} StatusReactive
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} Pagination
 */
