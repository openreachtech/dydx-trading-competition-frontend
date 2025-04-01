import {
  connect as connectWagmi,
} from '@wagmi/core'
import {
  injected,
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
   * Resolve wagmi connector.
   *
   * @param {{
   *   wallet: import('~/stores/wallet').WalletDetail
   * }} params - Parameters.
   * @returns {ReturnType<import('@wagmi/connectors').injected> | null}
   */
  resolveWagmiConnector ({
    wallet,
  }) {
    const handlerMap = this.generateConnectorHandlerMap()

    return handlerMap[wallet.connectorType]?.(wallet)
      ?? null
  }

  /**
   * Generate handler map for connectors.
   *
   * @returns {Record<string, ConnectorResolver>}
   */
  generateConnectorHandlerMap () {
    /** @type {Record<string, ConnectorResolver>} */
    return {
      [CONNECTOR_TYPE.INJECTED]: wallet => this.extractMipdConnectorFromRdns({
        rdns: wallet.rdns,
      }),
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
 * ) => ReturnType<import('@wagmi/connectors').injected> | null} ConnectorResolver
 */
