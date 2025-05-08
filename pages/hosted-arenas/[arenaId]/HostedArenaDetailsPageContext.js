import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * HostedArenaDetailsPageContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class HostedArenaDetailsPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {HostedArenaDetailsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    fetcherHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.fetcherHash = fetcherHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HostedArenaDetailsPageContext ? X : never} T, X
   * @override
   * @param {HostedArenaDetailsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    fetcherHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        fetcherHash,
        statusReactive,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends HostedArenaDetailsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.fetcherHash
      .hostedArenaDetails
      .fetchCompetitionOnMounted()

    return this
  }

  /**
   * get: competitionCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').default}
   */
  get competitionCapsule () {
    return this.fetcherHash
      .hostedArenaDetails
      .competitionCapsule
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   fetcherHash: {
 *     hostedArenaDetails: import('./HostedArenaDetailsFetcher').default
 *   }
 *   statusReactive: StatusReactive
 * }} HostedArenaDetailsPageContextParams
 */

/**
 * @typedef {HostedArenaDetailsPageContextParams} HostedArenaDetailsPageContextFactoryParams
 */

/**
 * @typedef {import('vue').Reactive<Record<string, boolean>>} StatusReactive
 */
