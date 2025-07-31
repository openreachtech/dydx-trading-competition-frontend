export default class RevokeXaccountOauthSubmitterContext {
  /**
   * Constructor of this class.
   *
   * @param {RevokeXaccountOauthSubmitterContextParams} params - Parameters.
   */
  constructor ({
    route,
    toastStore,
    statusReactive,
    graphqlClientHash,
    fetcherHash,
  }) {
    this.route = route
    this.toastStore = toastStore
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
    this.fetcherHash = fetcherHash
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
    route,
    toastStore,
    statusReactive,
    graphqlClientHash,
    fetcherHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        route,
        toastStore,
        statusReactive,
        graphqlClientHash,
        fetcherHash,
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

        if (capsule.hasError()) {
          this.toastStore.add({
            title: 'Failed to Disconnect X Account',
            message: capsule.getResolvedErrorMessage(),
            color: 'error',
          })

          return
        }

        if (!capsule.success) {
          this.toastStore.add({
            title: 'Failed to Disconnect X Account',
            message: 'Unable to process request. Please try again later.',
            color: 'error',
          })
        }

        await this.onSuccessRevocation()
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

  /**
   * Handle logic after a successful revocation.
   *
   * @returns {Promise<void>}
   */
  async onSuccessRevocation () {
    const address = this.extractAddressFromRoute()
    if (address === null) {
      return
    }

    await this.fetcherHash
      .addressProfile
      .fetchAddressProfileOnEvent({
        valueHash: {
          address,
        },
      })
  }

  /**
   * Extract `address` from route.
   *
   * @returns {string | null}
   */
  extractAddressFromRoute () {
    const {
      address,
    } = this.route.params

    const addressFromRoute = Array.isArray(address)
      ? address.at(0)
      : address

    if (!addressFromRoute) {
      return null
    }

    return addressFromRoute
  }
}

/**
 * @typedef {{
 *   route: ReturnType<import('vue-router').useRoute>
 *   toastStore: import('~/stores/toast').ToastStore
 *   statusReactive: import('vue').Reactive<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').StatusReactive>
 *   graphqlClientHash: {
 *     revokeXaccountOauth: GraphqlClient
 *   }
 *   fetcherHash: {
 *     addressProfile: import('./AddressProfileFetcher').default
 *   }
 * }} RevokeXaccountOauthSubmitterContextParams
 */

/**
 * @typedef {RevokeXaccountOauthSubmitterContextParams} RevokeXaccountOauthSubmitterContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
