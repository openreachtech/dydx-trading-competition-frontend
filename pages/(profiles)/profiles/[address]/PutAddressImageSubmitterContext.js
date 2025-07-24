export default class PutAddressImageSubmitterContext {
  /**
   * Constructor of this class.
   *
   * @param {PutAddressImageSubmitterContextParams} params - Parameters.
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
   * @template {X extends typeof PutAddressImageSubmitterContext ? X : never} T, X
   * @param {PutAddressImageSubmitterContextFactoryParams} params - Parameters.
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
   * get: putAddressImageLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks}
   */
  get putAddressImageLauncherHooks () {
    return {
      /**
       * @type {(payload: import('~/app/graphql/client/mutations/putAddressImage/PutAddressImageMutationGraphqlPayload').default) => Promise<boolean>}
       */
      beforeRequest: async payload => {
        this.statusReactive.isUploadingAvatar = true

        return false
      },
      /**
       * @type {(payload: import('~/app/graphql/client/mutations/putAddressImage/PutAddressImageMutationGraphqlCapsule').default) => Promise<void>}
       */
      // @ts-expect-error: Upstream type mismatch. Should be resolved in newer furo-nuxt versions.
      afterRequest: async capsule => {
        this.statusReactive.isUploadingAvatar = false

        if (capsule.hasError()) {
          this.toastStore.add({
            title: 'Failed to update image',
            message: 'Something went wrong while updating the image. Please try again.',
            color: 'error',
          })
        }
      },
    }
  }

  /**
   * Invoke `putAddressImage` mutation on event.
   *
   * @param {{
   *   valueHash: {
   *     file: File
   *   }
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async putAddressImageOnEvent ({
    valueHash,
  }) {
    this.graphqlClientHash
      .putAddressImage
      .invokeRequestOnEvent({
        variables: {
          input: valueHash,
        },
        hooks: this.putAddressImageLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   toastStore: import('~/stores/toast').ToastStore
 *   statusReactive: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').StatusReactive
 *   graphqlClientHash: {
 *     putAddressImage: GraphqlClient
 *   }
 * }} PutAddressImageSubmitterContextParams
 */

/**
 * @typedef {PutAddressImageSubmitterContextParams} PutAddressImageSubmitterContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */
