import {
  fromHex,
} from '@cosmjs/encoding'
import {
  makeAuthInfoBytes,
  makeSignBytes,
  makeSignDoc,
} from '@cosmjs/proto-signing'

import {
  Logger,
  WalletManager as WalletClerk,
} from '@cosmos-kit/core'

import {
  assetLists as chainRegistryAssets,
} from 'chain-registry'

export default class BaseCosmosConnector {
  /**
   * Constructor.
   *
   * @param {BaseCosmosConnectorParams} params - Parameters.
   */
  constructor ({
    walletClerk,
    chainWallet,
    mainWallet,
    chainName,
    walletName,
  }) {
    this.walletClerk = walletClerk
    this.chainWallet = chainWallet
    this.mainWallet = mainWallet
    this.chainName = chainName
    this.walletName = walletName
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof BaseCosmosConnector ? X : never} T, X
   * @param {BaseCosmosConnectorFactoryParams} [params] - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    wallets = this.wallets,
    chainName = this.chainName,
    walletName = this.walletName,
  } = {}) {
    const walletClerk = this.createWalletClerk({
      wallets,
    })
    const chainWallet = walletClerk.getChainWallet(
      chainName,
      walletName
    )
    const mainWallet = walletClerk.getMainWallet(walletName)

    return /** @type {InstanceType<T>} */ (
      new this({
        walletClerk,
        chainWallet,
        mainWallet,
        chainName,
        walletName,
      })
    )
  }

  /**
   * Create WalletClerk instance.
   *
   * @param {{
   *   wallets: Array<import('@cosmos-kit/core').MainWalletBase>
   * }} params - Parameters.
   * @returns {InstanceType<typeof WalletClerk>}
   */
  static createWalletClerk ({
    wallets,
  }) {
    const logger = this.createLogger()

    return new WalletClerk(
      this.supportedChains,
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
   * get: wallets
   *
   * @abstract
   * @returns {Array<import('@cosmos-kit/core').MainWalletBase>} Array of MainWalletBase from cosmos-kit.
   * @throws {Error} This function must be inherited.
   */
  static get wallets () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: walletName
   *
   * @abstract
   * @returns {string} Wallet name.
   * @throws {Error} This function must be inherited.
   */
  static get walletName () {
    throw new Error('this function must be inherited')
  }

  /**
   * get: chainName
   *
   * @returns {string} Chain name.
   */
  static get chainName () {
    return 'dydx'
  }

  /**
   * get: supportedChains
   *
   * @returns {Array<import('@chain-registry/types').Chain | import('@cosmos-kit/core').ChainName>}
   */
  static get supportedChains () {
    return [
      'dydx',
    ]
  }

  /**
   * get: chainId
   *
   * @returns {string}
   */
  get chainId () {
    return this.chainWallet.chainId
  }

  /**
   * get: address
   *
   * @returns {string | null}
   */
  get address () {
    return this.chainWallet.address
      ?? null
  }

  /**
   * Connect.
   *
   * @returns {Promise<void>}
   */
  async connect () {
    await this.chainWallet.connect()
  }

  /**
   * Sign arbitrary message.
   *
   * @returns {Promise<any>}
   */
  async signArbitrary () {
    if (!this.address) {
      return null
    }

    await this.mainWallet.initClient()

    const signDoc = this.createSignDoc()

    if (
      !this.mainWallet
        .client
        .signArbitrary
    ) {
      return null
    }

    return this.mainWallet
      .client
      .signArbitrary(
        this.chainId,
        this.address,
        signDoc
      )
  }

  /**
   * Create signDoc for signArbitrary.
   *
   * @returns {Uint8Array}
   */
  createSignDoc () {
    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: fromHex('01'),
    }

    /** @type {Array<import('cosmjs-types/cosmos/base/v1beta1/coin').Coin>} */
    const fee = []
    const gasLimit = 0
    const feeGranter = undefined
    const feePayer = undefined
    const accountNumber = 0
    const bodyBytes = fromHex('01')
    const authInfoBytes = makeAuthInfoBytes(
      [{
        pubkey,
        sequence: 0,
      }],
      fee,
      gasLimit,
      feeGranter,
      feePayer
    )

    const signDoc = makeSignDoc(
      bodyBytes,
      authInfoBytes,
      this.chainId,
      accountNumber
    )

    return makeSignBytes(signDoc)
  }
}

/**
 * @typedef {{
 *   walletClerk: InstanceType<typeof WalletClerk>
 *   chainWallet: import('@cosmos-kit/core').ChainWalletBase
 *   mainWallet: import('@cosmos-kit/core').MainWalletBase
 *   chainName: string
 *   walletName: string
 * }} BaseCosmosConnectorParams
 */

/**
 * @typedef {{
 *   wallets?: Array<import('@cosmos-kit/core').MainWalletBase>
 *   chainName?: string
 *   walletName?: string
 * }} BaseCosmosConnectorFactoryParams
 */
