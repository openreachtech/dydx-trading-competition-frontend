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

    graphqlClientHash,
    formClerkHash,
    refetchFunctionHash,
    profileRenameDialogRef,
    errorMessageRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.refetchFunctionHash = refetchFunctionHash
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
    graphqlClientHash,
    formClerkHash,
    refetchFunctionHash,
    profileRenameDialogRef,
    errorMessageRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        formClerkHash,
        refetchFunctionHash,
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

    await this.refetchFunctionHash
      .addressName()
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
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<FormClerkHashKeys, FormClerk>
 *   refetchFunctionHash: Record<RefetchFunctionHashKeys, () => Promise<void>>
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
 * @typedef {'addressName'} RefetchFunctionHashKeys
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
