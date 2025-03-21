import {
  navigateTo,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * LeagueHeroSectionContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class LeagueHeroSectionContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {LeagueHeroSectionContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    walletStore,
    onboardingDialogsComponentRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.walletStore = walletStore
    this.onboardingDialogsComponentRef = onboardingDialogsComponentRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof LeagueHeroSectionContext ? X : never} T, X
   * @override
   * @param {LeagueHeroSectionContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    walletStore,
    onboardingDialogsComponentRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        onboardingDialogsComponentRef,
      })
    )
  }

  /**
   * Host a new league.
   *
   * @returns {Promise<void>}
   */
  async hostLeague () {
    if (!this.onboardingDialogsComponentRef.value) {
      navigateTo('/competitions/add')

      return
    }

    if (!this.walletStore.walletStoreRef.value.sourceAccount.address) {
      this.onboardingDialogsComponentRef.value.showWalletSelectionDialog()

      return
    }

    if (!this.walletStore.walletStoreRef.value.localWallet.address) {
      this.onboardingDialogsComponentRef.value.showKeyDerivationDialog()

      return
    }

    await navigateTo('/competitions/add')
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   onboardingDialogsComponentRef: import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>
 * }} LeagueHeroSectionContextParams
 */

/**
 * @typedef {LeagueHeroSectionContextParams} LeagueHeroSectionContextFactoryParams
 */
