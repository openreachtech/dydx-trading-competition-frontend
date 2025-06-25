import {
  WalletManager as WalletClerk,
  Logger,
} from '@cosmos-kit/core'

import {
  wallets as cdcWallets,
} from '@cosmos-kit/cdcwallet'

import {
  wallets as keplrWallets,
} from '@cosmos-kit/keplr'

import {
  wallets as leapWallets,
} from '@cosmos-kit/leap'

import {
  assetLists as chainAssets,
  chains as cosmosChains,
} from 'chain-registry'

import {
  WALLET_NETWORK_TYPE,
} from '~/app/constants'

export default class CosmosConnector {
  /**
   * Constructor.
   *
   * @param {CosmosConnectorParams} params - Parameters.
   */
  constructor ({
    walletClerk,
    walletStore,
  }) {
    this.walletClerk = walletClerk
    this.walletStore = walletStore
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CosmosConnector ? X : never} T, X
   * @param {CosmosConnectorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    chains,
    wallets,
    walletStore,
  }) {
    const walletClerk = this.createWalletClerk({
      chains,
      wallets,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        walletClerk,
        walletStore,
      })
    )
  }

  /**
   * Create CosmosConnector dedicated to CDC (crypto dot com) wallet.
   *
   * @template {X extends typeof CosmosConnector ? X : never} T, X
   * @param {{
   *   walletStore: import('~/stores/wallet').WalletStore
   * }} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static createCdcCosmosConnector ({
    walletStore,
  }) {
    const supportedChains = [
      'cosmoshub',
      'juno',
      'stargaze',
      'dydx',
    ]

    return this.create({
      chains: supportedChains,
      wallets: [...cdcWallets, ...keplrWallets, ...leapWallets],
      walletStore,
    })
  }

  /**
   * Create wallet clerk.
   *
   * @param {{
   *   chains: Array<import('@chain-registry/types').Chain | import('@cosmos-kit/core').ChainName>
   *   wallets: Array<import('@cosmos-kit/core').MainWalletBase>
   * }} params - Parameters.
   * @returns {InstanceType<typeof WalletClerk>}
   */
  static createWalletClerk ({
    chains,
    wallets,
  }) {
    const logger = this.createLogger()

    return new WalletClerk(
      chains,
      wallets,
      logger,
      false,
      false,
      [],
      // @ts-expect-error: Upstream type mismatch.
      chainAssets
    )
  }

  /**
   * Create logger for wallet clerk.
   *
   * @returns {InstanceType<typeof Logger>}
   */
  static createLogger () {
    const logger = new Logger('NONE')

    return logger
  }

  /**
   * Connect
   *
   * @param {{
   *   chainName: import('@cosmos-kit/core').ChainName
   *   walletName: import('@cosmos-kit/core').WalletName
   * }} params - Parameters.
   * @returns {Promise<boolean>}
   */
  async connect ({
    walletName,
    chainName,
  }) {
    const chainWallet = this.walletClerk.getChainWallet(
      chainName,
      walletName
    )

    try {
      console.log('chainWallet.address before connection: ', chainWallet.address)
      await chainWallet.connect()
      console.log('chainWallet.address after connection: ', chainWallet.address)

      if (!chainWallet.address) {
        return false
      }

      this.walletStore.setSourceAddress({
        address: chainWallet.address,
        chain: WALLET_NETWORK_TYPE.COSMOS,
      })

      const pubkey = {
        typeUrl: '/dydx.crypto.secp256k1.PubKey',
      }

      return true
    } catch (error) {
      return false
    }
  }
}

/**
 * @typedef {{
 *   chains: Array<import('@chain-registry/types').Chain | import('@cosmos-kit/core').ChainName>
 *   wallets: Array<import('@cosmos-kit/core').MainWalletBase>
 *   walletStore: import('~/stores/wallet').WalletStore
 * }} CosmosConnectorFactoryParams
 */

/**
 * @typedef {{
 *   walletClerk: InstanceType<typeof import('@cosmos-kit/core').WalletManager>
 *   walletStore: import('~/stores/wallet').WalletStore
 * }} CosmosConnectorParams
 */
