import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Context class for `pages/competitions/[competitionId]` page.
 *
 * @extends {BaseFuroContext<null>}
 */
export default class CompetitionDetailsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompetitionDetailsPageContextParams} params - Parameters of this constructor.
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
   * @template {X extends typeof CompetitionDetailsPageContext ? X : never} T, X
   * @override
   * @param {CompetitionDetailsPageContextFactoryParams} params - Parameters of this factory method.
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
    const { competitionId } = route.params

    this.graphqlClientHash
      .competition
      .invokeRequestOnMounted({
        variables: {
          input: {
            competitionId: Number(competitionId),
          },
        },
        hooks: this.competitionLauncherHooks,
      })

    return this
  }

  /**
   * get: competitionLauncherHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get competitionLauncherHooks () {
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
   * get: competition
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity>}
   */
  get competition () {
    return this.competitionCapsuleRef.value
      .extractCompetition()
  }

  /**
   * get: schedules
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['schedules']}
   */
  get schedules () {
    return this.competitionCapsuleRef.value
      .schedules
  }

  /**
   * get: competitionCapsuleRef
   *
   * @returns {CompetitionDetailsPageContextParams['graphqlClientHash']['competition']['capsuleRef']}
   */
  get competitionCapsuleRef () {
    return this.graphqlClientHash.competition.capsuleRef
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *   }
 *   statusReactive: StatusReactive
 * }} CompetitionDetailsPageContextParams
 */

/**
 * @typedef {CompetitionDetailsPageContextParams} CompetitionDetailsPageContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */
