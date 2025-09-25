export default class UpdateCompetitionOptionsSubmitterContext {
  /**
   * Constructor
   *
   * @param {UpdateCompetitionOptionsSubmitterContextParams} params - Parameters.
   */
  constructor ({
    toastStore,
    statusReactive,
    updateCompetitionOptionsFormShallowRef,
    graphqlClientHash,
    formClerkHash,
  }) {
    this.toastStore = toastStore
    this.statusReactive = statusReactive
    this.updateCompetitionOptionsFormShallowRef = updateCompetitionOptionsFormShallowRef
    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof UpdateCompetitionOptionsSubmitterContext ? X : never} T, X
   * @param {UpdateCompetitionOptionsSubmitterContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    toastStore,
    statusReactive,
    updateCompetitionOptionsFormShallowRef,
    graphqlClientHash,
    formClerkHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        toastStore,
        statusReactive,
        updateCompetitionOptionsFormShallowRef,
        graphqlClientHash,
        formClerkHash,
      })
    )
  }

  /**
   * get: updateCompetitionOptionsFormElement
   *
   * @returns {HTMLFormElement | null}
   */
  get updateCompetitionOptionsFormElement () {
    return this.updateCompetitionOptionsFormShallowRef.value
  }

  /**
   * get: updateCompetitionOptionsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get updateCompetitionOptionsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUpdatingCompetitionOptions = true

        return false
      },
      /**
       * @type {(capsule: import('~/app/graphql/client/mutations/updateCompetitionOptions/UpdateCompetitionOptionsMutationGraphqlCapsule').default) => Promise<void>}
       */
      // @ts-expect-error: Upstream type mismatch.
      afterRequest: async capsule => {
        this.statusReactive.isUpdatingCompetitionOptions = false

        if (capsule.hasError()) {
          const errorMessage = capsule.getResolvedErrorMessage()

          this.toastStore.add({
            message: errorMessage,
            color: 'error',
          })
        }
      },
    }
  }

  /**
   * get: updateCompetitionOptionsCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/updateCompetitionOptions/UpdateCompetitionOptionsMutationGraphqlCapsule').default}
   */
  get updateCompetitionOptionsCapsule () {
    return this.graphqlClientHash
      .updateCompetitionOptions
      .capsuleRef
      .value
  }

  /**
   * Submit form to update competition options.
   *
   * @returns {Promise<void>}
   */
  async submitUpdateCompetitionOptionsForm () {
    if (!this.updateCompetitionOptionsFormElement) {
      return
    }

    await this.formClerkHash
      .updateCompetitionOptions
      .submitForm({
        formElement: this.updateCompetitionOptionsFormElement,
        hooks: this.updateCompetitionOptionsLauncherHooks,
      })
  }
}

/**
 * @typedef {{
 *   toastStore: import('~/stores/toast').ToastStore
 *   statusReactive: import('vue').Reactive<Record<string, boolean>>
 *   updateCompetitionOptionsFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 *   graphqlClientHash: {
 *     updateCompetitionOptions: GraphqlClient
 *   }
 *   formClerkHash: {
 *     updateCompetitionOptions: FormClerk
 *   }
 * }} UpdateCompetitionOptionsSubmitterContextParams
 */

/**
 * @typedef {UpdateCompetitionOptionsSubmitterContextParams} UpdateCompetitionOptionsSubmitterContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} FormClerk
 */
