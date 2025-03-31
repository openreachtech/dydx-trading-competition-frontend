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
  }) {
    const provider = window.phantom
      ?.solana
      ?? null

    return /** @type {InstanceType<T>} */ (
      new this({
        provider,
        walletStore,
      })
    )
  }

  /**
   * Connect Phantom Solana wallet.
   *
   * @returns {Promise<void>}
   */
  async connectPhantom () {
    if (!this.hasPhantomWallet()) {
      return
    }

    const response = await this.provider.connect()
    const publicKey = response.publicKey.toBase58()

    this.walletStore.setSourceAddress({
      address: publicKey,
      chain: WALLET_NETWORK_TYPE.SOLANA,
    })
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
 * @typedef {Omit<PhantomConnectorParams, FactoryOmittedKeys>} PhantomConnectorFactoryParams
 */

/**
 * @typedef {'provider'} FactoryOmittedKeys
 */
