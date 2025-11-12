import * as ChannelService from '@channel.io/channel-web-sdk-loader'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * ProfileDetailsPageMutationContext
 *
 * @extends {BaseAppContext<null, {}, null>}
 */
export default class ProfileDetailsPageMutationContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {ProfileDetailsPageMutationContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    walletStore,
    graphqlClientHash,
    formClerkHash,
    fetcherHash,
    profileRenameDialogRef,
    errorMessageRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.fetcherHash = fetcherHash
    this.profileRenameDialogRef = profileRenameDialogRef
    this.errorMessageRef = errorMessageRef
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
    route,
    walletStore,
    graphqlClientHash,
    formClerkHash,
    fetcherHash,
    profileRenameDialogRef,
    errorMessageRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        walletStore,
        graphqlClientHash,
        formClerkHash,
        fetcherHash,
        profileRenameDialogRef,
        errorMessageRef,
        statusReactive,
      })
    )
  }

  /**
   * get: errorMessage
   *
   * @returns {string | null}
   */
  get errorMessage () {
    return this.errorMessageRef.value
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
   * get: profileRenameDialog
   *
   * @returns {import('~/components/units/AppDialog.vue').default | null}
   */
  get profileRenameDialog () {
    return this.profileRenameDialogRef.value
  }

  /**
   * get: sourceAddress
   *
   * @returns {string | null}
   */
  get sourceAddress () {
    return this.walletStore.sourceAddressComputed
      .value
  }

  /**
   * get: localAddress
   *
   * @returns {string | null}
   */
  get localAddress () {
    return this.walletStore.localAddressComputed
      .value
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

    const address = this.extractAddressFromRoute()

    if (!address) {
      return
    }

    await this.fetcherHash
      .addressProfile
      .fetchAddressProfileOnEvent({
        valueHash: {
          address,
        },
        onSuccessCallback: ({
          capsule,
        }) => {
          ChannelService.updateUser({
            profile: {
              address: this.sourceAddress,
              name: capsule.name,
            },
          })
        },
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

        if (capsule.hasError()) {
          this.errorMessageRef.value = capsule.getResolvedErrorMessage()

          return
        }

        this.errorMessageRef.value = null
        this.dismissDialog({
          dialogElement: this.profileRenameDialog,
        })
      },
    }
  }

  /**
   * Extract profile address from route.
   *
   * @returns {string | null}
   */
  extractAddressFromRoute () {
    const {
      address,
    } = this.route.params

    const normalizedAddress = Array.isArray(address)
      ? address.at(0)
      : address

    return normalizedAddress ?? null
  }

  /**
   * Show dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  showDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.showDialog()
  }

  /**
   * Dismiss dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  dismissDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.dismissDialog()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   fetcherHash: {
 *     addressProfile: import('./AddressProfileFetcher').default
 *   }
 *   profileRenameDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   errorMessageRef: import('vue').Ref<string | null>
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
