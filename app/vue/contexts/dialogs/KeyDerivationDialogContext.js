import {
  switchChain,
  signTypedData as signTypedMessage,
} from '@wagmi/core'
import wagmiConfig from '~/wagmi.config'

import {
  WALLETS_CONFIG_HASH,
} from '~/app/constants'

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

  /**
   * Attempt to sign a typed message with wagmi.
   *
   * @returns {Promise<void>}
   */
  async signWagmiTypedMessage () {
    const networkMatchingResult = await this.matchNetwork()

    if (!networkMatchingResult) {
      return
    }

    const typedMessage = this.generateTypedMessage({
      selectedDydxChainId: this.accountStore.selectedDydxChainIdComputed.value,
    })

    const firstSignature = await signTypedMessage(wagmiConfig, {
      ...typedMessage,
      domain: {
        ...typedMessage.domain,
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      },
    })
  }

  /**
   * Generate a typed message to sign for dYdX Chain.
   *
   * @param {{
   *   selectedDydxChainId: keyof typeof WALLETS_CONFIG_HASH
   * }} params - Parameters.
   * @returns {TypedMessage} A typed message for signing.
   */
  generateTypedMessage ({
    selectedDydxChainId,
  }) {
    return /** @type {const} */ ({
      primaryType: 'dYdX',
      domain: {
        name: WALLETS_CONFIG_HASH[selectedDydxChainId].signTypedDataDomainName,
      },
      types: {
        dYdX: [
          {
            name: 'action',
            type: 'string',
          },
        ],
      },
      message: {
        action: WALLETS_CONFIG_HASH[selectedDydxChainId].signTypedDataAction,
      },
    })
  }

  /**
   * Match network.
   *
   * @returns {Promise<boolean>} `true` if the network is matched, `false` otherwise.
   */
  async matchNetwork () {
    try {
      await switchChain(wagmiConfig, {
        chainId: this.accountStore.selectedEthereumChainIdComputed.value,
      })

      return true
    } catch (error) {
      return false
    }
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

/**
 * @typedef {{
 *   primaryType: 'dYdX'
 *   domain: {
 *     name: string
 *   }
 *   types: {
 *     dYdX: Array<{
 *       name: string
 *       type: string
 *     }>
 *   }
 *   message: {
 *     action: string
 *   }
 * }} TypedMessage
 */
