import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
    fetcherHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
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
    fetcherHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
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

    return this
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   fetcherHash: {
 *     hostedArenas: import('./HostedArenasFetcher').default
 *   }
 * }} HostedArenasPageContextParams
 */

/**
 * @typedef {HostedArenasPageContextParams} HostedArenasPageContextFactoryParams
 */
