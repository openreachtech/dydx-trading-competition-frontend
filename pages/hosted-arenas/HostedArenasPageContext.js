import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  PAGINATION,
} from '~/app/constants'

/**
 * HostedArenasPageContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class HostedArenasPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {HostedArenasPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    router,
    fetcherHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
    this.fetcherHash = fetcherHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HostedArenasPageContext ? X : never} T, X
   * @override
   * @param {HostedArenasPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    router,
    fetcherHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
        fetcherHash,
      })
    )
  }

  /**
   * get: hostedArenasFetcher
   *
   * @returns {import('./HostedArenasFetcher').default}
   */
  get hostedArenasFetcher () {
    return this.fetcherHash.hostedArenas
  }

  /**
   * Setup component.
   *
   * @template {X extends HostedArenasPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.hostedArenasFetcher.fetchCompetitionsOnMounted()

    this.watch(
      [
        () => this.extractTitleFromRoute(),
        () => this.extractStatusIdFromRoute(),
        () => this.extractCurrentPageFromRoute(),
      ],
      async () => {
        await this.hostedArenasFetcher.fetchCompetitionsOnEvent()
      }
    )

    return this
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

  /**
   * Update `title` query.
   *
   * @param {{
   *   title?: string
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async updateTitleQuery ({
    title,
  }) {
    const replacementQuery = this.buildTitleReplacementQuery({
      title,
    })

    await this.router.replace({
      query: replacementQuery,
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
  buildTitleReplacementQuery ({
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
   * get: competitionsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule').default}
   */
  get competitionsCapsule () {
    return this.fetcherHash
      .hostedArenas
      .competitionsCapsule
  }

  /**
   * Extract `totalCount`.
   *
   * @returns {number}
   */
  extractTotalCount () {
    const {
      totalCount,
    } = this.competitionsCapsule

    return totalCount
      ?? 0
  }

  /**
   * Generate `competitions` pagination result.
   *
   * @returns {PaginationResult}
   */
  generateCompetitionsPaginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.extractTotalCount(),
    }
  }

  /**
   * get: competitionsTableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get competitionsTableHeaderEntries () {
    return [
      {
        key: 'title',
        label: 'Title',
      },
      {
        key: 'startDate',
        label: 'Start (MM/DD/YYYY)',
      },
      {
        key: 'endDate',
        label: 'End (MM/DD/YYYY)',
      },
      {
        key: 'status',
        label: 'Status',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   fetcherHash: {
 *     hostedArenas: import('./HostedArenasFetcher').default
 *   }
 * }} HostedArenasPageContextParams
 */

/**
 * @typedef {HostedArenasPageContextParams} HostedArenasPageContextFactoryParams
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */
