export default class RevokeXaccountOauthSubmitterContext {
  /**
   * Constructor of this class.
   *
   * @param {RevokeXaccountOauthSubmitterContextParams} params - Parameters.
   */
  constructor ({
    statusReactive,
    graphqlClientHash,
  }) {
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof RevokeXaccountOauthSubmitterContext ? X : never} T, X
   * @param {RevokeXaccountOauthSubmitterContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    statusReactive,
    graphqlClientHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * get: revokeXaccountOauthCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/revokeXaccountOauth/RevokeXaccountOauthMutationGraphqlCapsule').default}
   */
  get revokeXaccountOauthCapsule () {
    return this.graphqlClientHash
      .revokeXaccountOauth
      .capsuleRef
      .value
  }

  /**
   * get: revokeXaccountOauthLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get revokeXaccountOauthLauncherHooks () {
    return {
      /**
       * @type {(payload: import(
       *   '~/app/graphql/client/mutations/revokeXaccountOauth/RevokeXaccountOauthMutationGraphqlPayload'
       * ).default) => Promise<boolean>}
       */
      beforeRequest: async payload => {
        this.statusReactive.isRevokingXaccountOauth = true

        return false
      },
      /**
       * @type {(payload: import(
       *   '~/app/graphql/client/mutations/revokeXaccountOauth/RevokeXaccountOauthMutationGraphqlCapsule'
       * ).default) => Promise<void>}
       */
      // @ts-expect-error: Upstream type mismatch. Should be resolved in newer furo-nuxt versions.
      afterRequest: async capsule => {
        this.statusReactive.isRevokingXaccountOauth = false
      },
    }
  }

  /**
   * Revoke X account OAuth tokens on event.
   *
   * @returns {Promise<void>}
   */
  async revokeXaccountOauthOnEvent () {
    await this.graphqlClientHash
      .revokeXaccountOauth
      .invokeRequestOnEvent({
        hooks: this.revokeXaccountOauthLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   statusReactive: import('vue').Reactive<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').StatusReactive>
 *   graphqlClientHash: {
 *     revokeXaccountOauth: GraphqlClient
 *   }
 * }} RevokeXaccountOauthSubmitterContextParams
 */

/**
 * @typedef {RevokeXaccountOauthSubmitterContextParams} RevokeXaccountOauthSubmitterContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
