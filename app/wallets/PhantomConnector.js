import {
  WALLET_NETWORK_TYPE,
} from '~/app/constants'

export default class PhantomConnector {
  /**
   * Constructor of this class.
   *
   * @param {PhantomConnectorParams} params - Parameters of this constructor.
   */
  constructor ({
    walletStore,
    provider,
  }) {
    this.walletStore = walletStore
    this.provider = provider
  }

  /**
   * Factory method of this class.
   *
   * @template {X extends typeof PhantomConnector ? X : never} T, X
   * @param {PhantomConnectorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    walletStore,
    provider = this.getPhantomSolanaProvider(),
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        provider,
        walletStore,
      })
    )
  }

  /**
   * Get Phantom Solana wallet provider.
   *
   * @returns {any}
   */
  static getPhantomSolanaProvider () {
    return window.phantom
      ?.solana
      ?? null
  }

  /**
   * Connect Phantom Solana wallet.
   *
   * @returns {Promise<boolean>}
   */
  async connectPhantom () {
    if (!this.hasPhantomWallet()) {
      return false
    }

    try {
      const response = await this.provider.connect()
      const publicKey = response.publicKey.toBase58()

      this.walletStore.setSourceAddress({
        address: publicKey,
        chain: WALLET_NETWORK_TYPE.SOLANA,
      })

      return true
    } catch (error) {
      // TODO: Handle error
      return false
    }
  }

  /**
   * Has phantom wallet or not.
   *
   * @returns {boolean} `true` if has phantom wallet.
   */
  hasPhantomWallet () {
    return Boolean(this.provider?.isPhantom)
  }
}

/**
 * @typedef {{
 *   provider: any // Type of `window.phantom.solana`. Don't know the exact type right now.
 *   walletStore: import('~/stores/wallet').WalletStore
 * }} PhantomConnectorParams
 */

/**
 * @typedef {Pick<PhantomConnectorParams, 'walletStore'> & {
 *   provider?: any // Type of `window.phantom.solana`. Don't know the exact type right now.
 * }} PhantomConnectorFactoryParams
 */
