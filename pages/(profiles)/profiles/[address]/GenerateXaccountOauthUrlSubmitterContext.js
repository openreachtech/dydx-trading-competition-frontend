export default class GenerateXaccountOauthUrlSubmitterContext {
  /**
   * Constructor of this class.
   *
   * @param {GenerateXaccountOauthUrlSubmitterContextParams} params - Parameters.
   */
  constructor ({
    toastStore,
    statusReactive,
    graphqlClientHash,
  }) {
    this.toastStore = toastStore
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof GenerateXaccountOauthUrlSubmitterContext ? X : never} T, X
   * @param {GenerateXaccountOauthUrlSubmitterContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    toastStore,
    statusReactive,
    graphqlClientHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        toastStore,
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * get: generateXaccountOauthUrlCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/generateXaccountOauthUrl/GenerateXaccountOauthUrlMutationGraphqlCapsule').default}
   */
  get generateXaccountOauthUrlCapsule () {
    return this.graphqlClientHash
      .generateXaccountOauthUrl
      .capsuleRef
      .value
  }

  /**
   * get: generateXaccountOauthUrlLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get generateXaccountOauthUrlLauncherHooks () {
    return {
      /**
       * @type {(payload: import(
       *   '~/app/graphql/client/mutations/generateXaccountOauthUrl/GenerateXaccountOauthUrlMutationGraphqlPayload'
       * ).default) => Promise<boolean>}
       */
      beforeRequest: async payload => {
        this.statusReactive.isGeneratingXaccountOauthUrl = true

        return false
      },
      /**
       * @type {(payload: import(
       *   '~/app/graphql/client/mutations/generateXaccountOauthUrl/GenerateXaccountOauthUrlMutationGraphqlCapsule'
       * ).default) => Promise<void>}
       */
      // @ts-expect-error
      afterRequest: async capsule => {
        if (capsule.hasError()) {
          this.toastStore.add({
            title: 'X Account Connection Failed',
            message: capsule.getResolvedErrorMessage(),
            color: 'error',
          })

          this.statusReactive.isGeneratingXaccountOauthUrl = false

          return
        }

        if (capsule.url === null) {
          this.toastStore.add({
            message: 'Failed to initiate the connection with X. Please try again or come back later.',
            color: 'error',
          })

          this.statusReactive.isGeneratingXaccountOauthUrl = false
        }
      },
    }
  }

  /**
   * Generate Xaccount Oauth URL on event.
   *
   * @returns {Promise<void>}
   */
  async generateXaccountOauthUrlOnEvent () {
    this.graphqlClientHash
      .generateXaccountOauthUrl
      .invokeRequestOnEvent({
        hooks: this.generateXaccountOauthUrlLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   toastStore: import('~/stores/toast').ToastStore
 *   statusReactive: import('vue').Reactive<{
 *     isGeneratingXaccountOauthUrl: boolean
 *   }>
 *   graphqlClientHash: {
 *     generateXaccountOauthUrl: GraphqlClient
 *   }
 * }} GenerateXaccountOauthUrlSubmitterContextParams
 */

/**
 * @typedef {GenerateXaccountOauthUrlSubmitterContextParams} GenerateXaccountOauthUrlSubmitterContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
