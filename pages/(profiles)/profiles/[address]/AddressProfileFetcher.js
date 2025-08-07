export default class AddressProfileFetcher {
  /**
   * @param {AddressProfileFetcherParams} params - Parameters.
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
   * @template {X extends typeof AddressProfileFetcher ? X : never} T, X
   * @param {AddressProfileFetcherFactoryParams} params - Parameters.
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
   * get: addressProfileCapsule
   *
   * @returns {import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlCapsule').default}
   */
  get addressProfileCapsule () {
    return this.graphqlClientHash
      .addressProfile
      .capsuleRef
      .value
  }

  /**
   * get: addressProfileLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addressProfileLauncherHooks () {
    return {
      /**
       * @type {(payload: import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlPayload').default) => Promise<boolean>}
       */
      beforeRequest: async payload => {
        this.statusReactive.isFetchingAddressProfile = true

        return false
      },
      /**
       * @type {(capsule: import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlCapsule').default) => Promise<void>}
       */
      // @ts-expect-error
      afterRequest: async capsule => {
        this.statusReactive.isFetchingAddressProfile = false
      },
    }
  }

  /**
   * Fetch address profile.
   *
   * @param {{
   *   valueHash: import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlPayload')
   *     .AddressProfileQueryRequestVariables['input']
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async fetchAddressProfileOnEvent ({
    valueHash,
  }) {
    await this.graphqlClientHash
      .addressProfile
      .invokeRequestOnEvent({
        variables: {
          input: valueHash,
        },
        hooks: this.addressProfileLauncherHooks,
      })
  }

  /**
   * Fetch `addressProfile` on mounted.
   *
   * @param {{
   *   valueHash: import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlPayload')
   *     .AddressProfileQueryRequestVariables['input']
   * }} params - Parameters.
   * @returns {void}
   */
  fetchAddressProfileOnMounted ({
    valueHash,
  }) {
    this.graphqlClientHash
      .addressProfile
      .invokeRequestOnMounted({
        variables: {
          input: valueHash,
        },
        hooks: this.addressProfileLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   statusReactive: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').StatusReactive
 *   graphqlClientHash: {
 *     addressProfile: ReturnType<typeof import('@openreachtech/furo-nuxt').useGraphqlClient>
 *   }
 * }} AddressProfileFetcherParams
 */

/**
 * @typedef {AddressProfileFetcherParams} AddressProfileFetcherFactoryParams
 */
