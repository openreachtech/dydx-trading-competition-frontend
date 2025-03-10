import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

/**
 * KeyDerivationDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class KeyDerivationDialogContext extends AppDialogContext {
  /**
   * Constructor
   *
   * @param {KeyDerivationDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    dialogComponentRef,
    walletStore,
    accountStore,
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.walletStore = walletStore
    this.accountStore = accountStore
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof KeyDerivationDialogContext ? X : never} T, X
   * @override
   * @param {KeyDerivationDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentRef,
    walletStore,
    accountStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        walletStore,
        accountStore,
      })
    )
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentRef: import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 * }} KeyDerivationDialogContextParams
 */

/**
 * @typedef {KeyDerivationDialogContextParams} KeyDerivationDialogContextFactoryParams
 */
