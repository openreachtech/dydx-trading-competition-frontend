import {
  fromHex,
  toBase64,
  fromBase64,
} from '@cosmjs/encoding'
import {
  makeSignDoc,
  makeSignBytes,
  makeAuthInfoBytes,
} from '@cosmjs/proto-signing'

/**
 * Credential generator.
 */
export default class CredentialGenerator {
  /**
   * Constructor.
   *
   * @param {CredentialGeneratorParams} params - Parameters.
   */
  constructor ({
    signer,
    signerAddress,
  }) {
    this.signer = signer
    this.signerAddress = signerAddress
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof CredentialGenerator ? X : never} T, X
   * @param {CredentialGeneratorFactoryParams} params - Parameters.
   * @returns {InstanceType<T>}
   * @this {T}
   */
  static create ({
    signer,
    signerAddress,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        signer,
        signerAddress,
      })
    )
  }

  /**
   * Generate credential.
   *
   * @returns {Promise<import('~/stores/wallet').WalletState['credential']>}
   */
  async generateCredential () {
    const signedResult = await this.signDirect()
    const base64SignDocBytes = this.generateBase64SignDocBytes()

    return {
      signDoc: base64SignDocBytes,
      signature: signedResult.signature.signature,
      publicKey: signedResult.signature.pub_key.value,
      address: this.signerAddress,
    }
  }

  /**
   * Sign direct.
   *
   * @returns {Promise<import('@cosmjs/proto-signing').DirectSignResponse>}
   */
  signDirect () {
    const signDoc = this.generateSignDoc()

    return this.signer.signDirect(
      this.signerAddress,
      signDoc
    )
  }

  /**
   * Generate base64SignDocBytes.
   *
   * @returns {string}
   */
  generateBase64SignDocBytes () {
    const signDoc = this.generateSignDoc()
    const signDocBytes = makeSignBytes(signDoc)

    return toBase64(signDocBytes)
  }

  /**
   * Generate signDoc.
   *
   * @returns {SignDoc}
   */
  generateSignDoc () {
    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: fromBase64('4444'),
    }
    /** @type {Array<import('cosmjs-types/cosmos/base/v1beta1/coin').Coin>} */
    const fee = []
    const gasLimit = 0
    const feeGranter = undefined
    const feePayer = undefined
    const chainId = ''
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

    return makeSignDoc(
      bodyBytes,
      authInfoBytes,
      chainId,
      accountNumber
    )
  }
}

/**
 * @typedef {{
 *   signer: import('@cosmjs/proto-signing').DirectSecp256k1HdWallet | import('@cosmjs/proto-signing').OfflineDirectSigner
 *   signerAddress: string
 * }} CredentialGeneratorParams
 */

/**
 * @typedef {CredentialGeneratorParams} CredentialGeneratorFactoryParams
 */

/**
 * @typedef {ReturnType<import('@cosmjs/proto-signing').makeSignDoc>} SignDoc
 */
