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

    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

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
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
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
    const route = useRoute()
    const currentPageComputed = computed(() => (
      isNaN(Number(route.query.page))
        ? 1
        : Number(route.query.page)
    ))

    this.graphqlClientHash
      .competitionStatistics
      .invokeRequestOnMounted({
        hooks: this.competitionStatisticsLauncherHooks,
      })

    this.watch(
      () => route.query.page,
      () => this.graphqlClientHash
        .competitions
        .invokeRequestOnEvent({
          variables: {
            ...this.defaultCompetitionsVariables,
            input: {
              pagination: {
                ...this.defaultCompetitionsVariables.input.pagination,
                offset: (currentPageComputed.value - 1) * PAGINATION.LIMIT,
              },
            },
          },
          hooks: this.graphqlRequestHooks,
        }),
      {
        immediate: true,
      }
    )

    return this
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
