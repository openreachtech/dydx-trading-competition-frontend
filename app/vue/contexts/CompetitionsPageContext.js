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

  /** @override */
  setupComponent () {
    const route = useRoute()
    const currentPageComputed = computed(() => (
      isNaN(Number(route.query.page))
        ? 1
        : Number(route.query.page)
    ))

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
   * get: graphqlRequestHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get graphqlRequestHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
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
 *   isLoading: boolean
 * }} StatusReactive
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} Pagination
 */
