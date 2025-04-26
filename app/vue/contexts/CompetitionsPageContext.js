import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  PAGINATION,
  COMPETITION_STATUS,
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
    router,
    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
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
    router,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
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

    const queryTitle = this.extractQueryTitle()
    const queryStatusId = this.extractQueryStatusId()
    const currentPage = this.extractCurrentPage()

    this.graphqlClientHash
      .competitions
      .invokeRequestOnMounted({
        variables: {
          ...this.defaultCompetitionsVariables,
          input: {
            title: queryTitle,
            statusId: queryStatusId,
            pagination: {
              ...this.defaultCompetitionsVariables.input.pagination,
              offset: (currentPage - 1) * PAGINATION.LIMIT,
            },
          },
        },
        hooks: this.graphqlRequestHooks,
      })

    this.watch(
      [
        () => this.extractCurrentPage(),
        () => this.extractActiveCompetitionsFilters(),
      ],
      async () => {
        await this.fetchCompetitions()
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
    const replacementQuery = this.buileTitleReplacementQuery({
      title,
    })

    await this.router.replace({
      query: replacementQuery,
    })

    const queryTitle = this.extractQueryTitle()
    const queryStatusId = this.extractQueryStatusId()
    const currentPage = this.extractCurrentPage()

    await this.graphqlClientHash
      .competitions
      .invokeRequestOnEvent({
        variables: {
          ...this.defaultCompetitionsVariables,
          input: {
            title: queryTitle,
            statusId: queryStatusId,
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
   * Build replacement query for `title`.
   *
   * @param {{
   *   title?: string
   * }} params - Parameters.
   * @returns {import('vue-router').LocationQuery}
   */
  buileTitleReplacementQuery ({
    title,
  }) {
    const {
      title: _,
      ...restQuery
    } = this.route.query

    return title
      ? {
        ...restQuery,
        title,
      }
      : restQuery
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
   * Extract title from route query.
   *
   * @returns {string | null}
   */
  extractQueryTitle () {
    const queryTitle = Array.isArray(this.route.query.title)
      ? this.route.query.title[0]
      : this.route.query.title

    return queryTitle
      ?? null
  }

  /**
   * Extract query status id.
   *
   * @returns {number | null}
   */
  extractQueryStatusId () {
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
   * get: competitionsFilters.
   *
   * @returns {Array<import('~/app/vue/contexts/AppSearchBarContext').Filter>}
   */
  get competitionsFilters () {
    return [
      {
        name: 'statusId',
        caption: 'Status',
        options: [
          {
            label: 'Created',
            value: COMPETITION_STATUS.CREATED.ID,
          },
          {
            label: 'Registration Ended',
            value: COMPETITION_STATUS.REGISTRATION_ENDED.ID,
          },
          {
            label: 'In Progress',
            value: COMPETITION_STATUS.IN_PROGRESS.ID,
          },
          {
            label: 'Completed',
            value: COMPETITION_STATUS.COMPLETED.ID,
          },
          {
            label: 'Canceled',
            value: COMPETITION_STATUS.CANCELED.ID,
          },
        ],
      },
    ]
  }

  /**
   * Extract active filters.
   *
   * @returns {Array<string>}
   */
  extractActiveCompetitionsFilters () {
    return this.competitionsFilters
      .map(filter => filter.name)
      .filter(filter => this.route.query[filter])
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
   * Check if the competitions list is empty.
   *
   * @returns {boolean}
   */
  hasEmptyCompetitions () {
    return this.competitions.length === 0
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

  /**
   * Generate CSS classes for empty placeholder of competitions.
   *
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generateEmptyCompetitionsClasses () {
    return {
      hidden: !this.hasEmptyCompetitions(),
    }
  }

  /**
   * Generate CSS classes for pagination.
   *
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generatePaginationClasses () {
    return {
      hidden: this.hasEmptyCompetitions(),
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
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
