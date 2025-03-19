import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * CompetitionDetailsPageMutationContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class CompetitionDetailsPageMutationContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {CompetitionDetailsPageMutationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    formClerkHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionDetailsPageMutationContext ? X : never} T, X
   * @override
   * @param {CompetitionDetailsPageMutationContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClientHash,
    formClerkHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        formClerkHash,
        statusReactive,
      })
    )
  }

  /**
   * get: isJoining
   *
   * @returns {boolean} `true` if is joining.
   */
  get isJoining () {
    return this.statusReactive.isJoining
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   statusReactive: StatusReactive
 * }} CompetitionDetailsPageMutationContextParams
 */

/**
 * @typedef {CompetitionDetailsPageMutationContextParams} CompetitionDetailsPageMutationContextFactoryParams
 */

/**
 * @typedef {'joinCompetition'} GraphqlClientHashKeys
 */

/**
 * @typedef {'joinCompetition'} FormClerkHashKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} FormClerk
 */

/**
 * @typedef {{
 *   isJoining: boolean
 * }} StatusReactive
 */
