import {
  connect as connectWagmi,
  reconnect as reconnectWagmi,
  disconnect as disconnectWagmi,
  getAccount as getAccountWagmi,
} from '@wagmi/core'
import {
  injected,
  coinbaseWallet as coinbaseWalletConnector,
} from '@wagmi/connectors'
import wagmiConfig from '~/wagmi.config'

import {
  CONNECTOR_TYPE,
  WALLET_NETWORK_TYPE,
} from '~/app/constants'

export default class WagmiConnector {
  /**
   * Constructor of this class.
   *
   * @param {WagmiConnectorParams} params - Parameters of this constructor.
   */
  constructor ({
    mipdStore,
    walletStore,
  }) {
    this.mipdStore = mipdStore
    this.walletStore = walletStore
  }

  /**
   * Factory method of this class.
   *
   * @template {X extends typeof WagmiConnector ? X : never} T, X
   * @param {WagmiConnectorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    mipdStore,
    walletStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        mipdStore,
        walletStore,
      })
    )
  }

  /**
   * Connect to EVM network.
   *
   * @param {{
   *   wallet: import('~/stores/wallet').WalletDetail
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async connectToEvmNetwork ({
    wallet,
  }) {
    const connector = this.resolveWagmiConnector({
      wallet,
    })

    if (!connector) {
      return
    }
    const connectionResult = await connectWagmi(wagmiConfig, {
      connector,
    })

    const [firstAccountAddress] = connectionResult.accounts

    this.walletStore.setSourceAddress({
      address: firstAccountAddress,
      chain: WALLET_NETWORK_TYPE.EVM,
    })
  }

  /**
   * Reconnect to EVM network.
   *
   * @returns {Promise<boolean>}
   */
  async reconnectToEvmNetwork () {
    const account = getAccountWagmi(wagmiConfig)
    if (account.isConnected) {
      return false
    }

    const wallet = this.walletStore.walletStoreRef.value.sourceAccount.walletDetail
    if (!wallet) {
      return false
    }

    const connector = this.resolveWagmiConnector({
      wallet,
    })
    if (!connector) {
      return false
    }

    try {
      const reconnectionResult = await reconnectWagmi(wagmiConfig, {
        connectors: [connector],
      })
      const firstReconnectionResult = reconnectionResult
        .at(0)
        ?? null
      if (!firstReconnectionResult) {
        return false
      }

      const [firstAccountAddress] = firstReconnectionResult.accounts

      this.walletStore.setSourceAddress({
        address: firstAccountAddress,
        chain: WALLET_NETWORK_TYPE.EVM,
      })

      return true
    } catch (error) {
      // TODO: Handle error.
      return false
    }
  }

  /**
   * Disconnect from EVM network.
   *
   * @returns {Promise<boolean>}
   */
  async disconnectFromEvmNetwork () {
    const account = getAccountWagmi(wagmiConfig)
    if (!account.isConnected) {
      return false
    }

    try {
      await disconnectWagmi(wagmiConfig)

      return true
    } catch (error) {
      // TODO: Handle error.
      return false
    }
  }

  /**
   * Resolve wagmi connector.
   *
   * @param {{
   *   wallet: import('~/stores/wallet').WalletDetail
   * }} params - Parameters.
   * @returns {ReturnType<import('@wagmi/connectors').injected> | ReturnType<coinbaseWalletConnector> | null}
   */
  resolveWagmiConnector ({
    wallet,
  }) {
    const handlerMap = this.connectorHandlerMap

    return handlerMap[wallet.connectorType]?.(wallet)
      ?? null
  }

  /**
   * get: connectorHandlerMap
   *
   * @returns {Record<string, ConnectorResolver>}
   */
  get connectorHandlerMap () {
    /** @type {Record<string, ConnectorResolver>} */
    return {
      [CONNECTOR_TYPE.INJECTED]: wallet => this.extractMipdConnectorFromRdns({
        rdns: wallet.rdns,
      }),
      [CONNECTOR_TYPE.COINBASE]: wallet => this.generateCoinbaseConnector(),
    }
  }

  /**
   * Extract MIPD connector from rdns.
   *
   * @param {{
   *   rdns: string
   * }} params - Parameters.
   * @returns {ReturnType<import('@wagmi/connectors').injected> | null}
   */
  extractMipdConnectorFromRdns ({
    rdns,
  }) {
    const providerDetails = this.mipdStore.findProvider({
      rdns,
    })

    if (!providerDetails) {
      return null
    }

    return this.generateConnectorFromProvider({
      providerDetails,
    })
  }

  /**
   * Generate connector from provider.
   *
   * @param {{
   *   providerDetails: import('mipd').EIP6963ProviderDetail
   * }} params - Parameters.
   * @returns {ReturnType<import('@wagmi/connectors').injected>}
   */
  generateConnectorFromProvider ({
    providerDetails,
  }) {
    return injected({
      target: {
        ...providerDetails.info,
        id: providerDetails.info.rdns,
        provider: providerDetails.provider,
      },
    })
  }

  /**
   * Generate Coinbase connector.
   *
   * @returns {ReturnType<coinbaseWalletConnector>}
   */
  generateCoinbaseConnector () {
    return coinbaseWalletConnector({
      appName: 'dYdX',
      reloadOnDisconnect: false,
      // disable Coinbase Smart Wallet because dydx-client currently doesn't handle EIP-6492 signatures
      preference: 'eoaOnly',
    })
  }
}

/**
 * @typedef {{
 *   mipdStore: ReturnType<import('mipd').createStore>
 *   walletStore: import('~/stores/wallet').WalletStore
 * }} WagmiConnectorParams
 */

/**
 * @typedef {WagmiConnectorParams} WagmiConnectorFactoryParams
 */

/**
 * @typedef {(
 *   wallet: import('~/stores/wallet').WalletDetail
 * ) => ReturnType<import('@wagmi/connectors').injected> | ReturnType<coinbaseWalletConnector> | null} ConnectorResolver
 */
