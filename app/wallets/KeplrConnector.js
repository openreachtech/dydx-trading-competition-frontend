import {
  COSMOS_CHAIN_ID_HASH,
  WALLET_NETWORK_TYPE,
} from '~/app/constants'
import {
  CURRENT_MODE,
} from '~/app/import.meta.constants'

export default class KeplrConnector {
  /**
   * Constructor of this class.
   *
   * @param {KeplrConnectorParams} params - Parameters of this constructor.
   */
  constructor ({
    provider,
    walletStore,
    accountStore,
  }) {
    this.provider = provider
    this.walletStore = walletStore
    this.accountStore = accountStore
  }

  /**
   * Factory method of this class.
   *
   * @template {X extends typeof KeplrConnector ? X : never} T, X
   * @param {KeplrConnectorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    provider = this.getKeplrProvider(),
    walletStore,
    accountStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        provider,
        walletStore,
        accountStore,
      })
    )
  }

  /**
   * Get Keplr wallet provider.
   *
   * @returns {import('@keplr-wallet/types').Keplr | null}
   */
  static getKeplrProvider () {
    return window.keplr
      ?? null
  }

  /**
   * Connect Keplr wallet.
   *
   * @returns {Promise<void>}
   * @throw {Error} When the connection fails.
   */
  async connectKeplr () {
    // Use `this.provider` directly instead of `#hasKeplrWallet()` to narrow type.
    if (!this.provider) {
      throw new Error('Keplr wallet not found.')
    }

    const chainIds = this.generateSupportedCosmosChainIds()
    await this.provider.enable(chainIds)

    // NOTE: We connected to multiple chains but only get the account on dYdX, which aligns with the
    // logic in v4-web. Though that would leave other chains redundant? Would need further investigation.
    const key = await this.provider.getKey(chainIds[0])

    this.walletStore.setSourceAddress({
      address: key.bech32Address,
      chain: WALLET_NETWORK_TYPE.COSMOS,
    })
    this.walletStore.setLocalWallet({
      address: key.bech32Address,
    })
  }

  /**
   * Has Keplr wallet or not.
   *
   * @returns {boolean} `true` if has Keplr wallet.
   */
  hasKeplrWallet () {
    return Boolean(this.provider)
  }

  /**
   * Generate supported Cosmos chain ids.
   *
   * @returns {Array<string>}
   */
  generateSupportedCosmosChainIds () {
    return [
      this.getDydxChainId(),
      this.getNobleChainId(),
      this.getOsmosisChainId(),
      this.getNeutronChainId(),
    ]
  }

  /**
   * Get dYdX chain id.
   *
   * @returns {string}
   */
  getDydxChainId () {
    return this.accountStore.selectedDydxChainIdComputed.value
  }

  /**
   * Get Noble chain id.
   *
   * @returns {string}
   */
  getNobleChainId () {
    return this.isMainnet()
      ? COSMOS_CHAIN_ID_HASH.NOBLE
      : COSMOS_CHAIN_ID_HASH.NOBLE_TESTNET
  }

  /**
   * Get Osmosis chain id.
   *
   * @returns {string}
   */
  getOsmosisChainId () {
    return this.isMainnet()
      ? COSMOS_CHAIN_ID_HASH.OSMOSIS
      : COSMOS_CHAIN_ID_HASH.OSMOSIS_TESTNET
  }

  /**
   * Get Neutron chain id.
   *
   * @returns {string}
   */
  getNeutronChainId () {
    return this.isMainnet()
      ? COSMOS_CHAIN_ID_HASH.NEUTRON
      : COSMOS_CHAIN_ID_HASH.NEUTRON_TESTNET
  }

  /**
   * Check if is mainnet or not.
   *
   * @returns {boolean}
   */
  isMainnet () {
    return CURRENT_MODE === 'MAINNET'
  }
}

/**
 * @typedef {{
 *   provider: import('@keplr-wallet/types').Keplr | null
 *   walletStore: import('~/stores/wallet').WalletStore
 *   accountStore: import('~/stores/account').AccountStore
 * }} KeplrConnectorParams
 */

/**
 * @typedef {Pick<KeplrConnectorParams, 'walletStore' | 'accountStore'> & {
 *   provider?: import('@keplr-wallet/types').Keplr | null
 * }} KeplrConnectorFactoryParams
 */
