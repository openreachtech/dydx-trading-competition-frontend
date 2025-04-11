import {
  WALLET_NETWORK_TYPE,
} from '~/app/constants'

import {
  makeSignDoc,
  makeAuthInfoBytes,
  makeSignBytes,
} from '@cosmjs/proto-signing'
import {
  fromHex,
  toBase64,
  fromBase64,
} from '@cosmjs/encoding'

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

    const dydxChainId = this.getDydxChainId()
    await this.provider.enable(dydxChainId)

    const key = await this.provider.getKey(dydxChainId)

    this.walletStore.setSourceAddress({
      address: key.bech32Address,
      chain: WALLET_NETWORK_TYPE.COSMOS,
    })
    this.walletStore.setLocalWallet({
      address: key.bech32Address,
    })

    /**
     * Generate signDoc.
     *
     * @returns {ReturnType<typeof makeSignDoc>}
     */
    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: key.pubKey,
    }
    /** @type {Array<import('cosmjs-types/cosmos/base/v1beta1/coin').Coin>} */
    const fee = []
    const gasLimit = 0
    const feeGranter = undefined
    const feePayer = undefined
    const chainId = dydxChainId
    const accountNumber = 1
    const bodyBytes = fromHex('4444')
    const authInfoBytes = makeAuthInfoBytes(
      [{
        pubkey,
        sequence: 1,
      }],
      fee,
      gasLimit,
      feeGranter,
      feePayer
    )

    const signDoc = makeSignDoc(
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    )
    const signDocBytes = makeSignBytes(signDoc)
    const base64SignDocBytes = toBase64(signDocBytes)

    const result = await this.provider.signArbitrary(dydxChainId, key.bech32Address, 'Verify account ownership')
    console.log('result', result)

    const credential = {
      signDoc: base64SignDocBytes,
      signature: result.signature,
      publicKey: result.pub_key.value,
      address: key.bech32Address,
    }
    console.log('credential', credential)
    this.walletStore.setCredential({
      credential,
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
   * Get dYdX chain id.
   *
   * @returns {string}
   */
  getDydxChainId () {
    return this.accountStore.selectedDydxChainIdComputed.value
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
