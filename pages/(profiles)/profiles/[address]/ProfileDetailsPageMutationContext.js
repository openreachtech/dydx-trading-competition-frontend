import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ProfileDetailsPageMutationContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class ProfileDetailsPageMutationContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ProfileDetailsPageMutationContextParams} params - Parameters of this constructor.
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
   * @template {X extends typeof ProfileDetailsPageMutationContext ? X : never} T, X
   * @override
   * @param {ProfileDetailsPageMutationContextFactoryParams} params - Parameters of this factory method.
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
   * get: isRenaming
   *
   * @returns {boolean}
   */
  get isRenaming () {
    return this.statusReactive.isRenaming
  }

  /**
   * Update username.
   *
   * @param {{
   *   formElement: HTMLFormElement | null
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async updateUsername ({
    formElement,
  }) {
    if (!formElement) {
      return
    }

    await this.formClerkHash
      .putAddressName
      .submitForm({
        formElement,
        hooks: this.putAddressNameLauncherHooks,
      })
  }

  /**
   * get: putAddressNameLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get putAddressNameLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isRenaming = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isRenaming = false
      },
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   statusReactive: StatusReactive
 * }} ProfileDetailsPageMutationContextParams
 */

/**
 * @typedef {ProfileDetailsPageMutationContextParams} ProfileDetailsPageMutationContextFactoryParams
 */

/**
 * @typedef {'putAddressName'} GraphqlClientHashKeys
 */

/**
 * @typedef {'putAddressName'} FormClerkHashKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} FormClerk
 */

/**
 * @typedef {{
 *   isRenaming: boolean
 * }} StatusReactive
 */
