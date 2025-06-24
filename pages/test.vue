<script setup>
import CosmosConnector from '~/app/wallets/CosmosConnector'
import useWalletStore from '~/stores/wallet'
import AppButton from '~/components/units/AppButton.vue'

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
import {
  Secp256k1,
  Secp256k1Signature,
  sha256,
} from '@cosmjs/crypto'
import Long from 'long'
import { TxBody } from 'cosmjs-types/cosmos/tx/v1beta1/tx'

const walletStore = useWalletStore()

const cosmosConnector = CosmosConnector.createCdcCosmosConnector({
  walletStore,
})

/**
 * Connect
 *
 * @returns {void}
 */
async function connect () {
  try {
    const walletName = 'keplr-extension'
    const mockChainId = 'dydxprotocol-testnet'
    const chainWallet = cosmosConnector.walletClerk.getChainWallet(
      'dydx',
      walletName
    )

    await chainWallet.connect()
    console.log('username', chainWallet.username)
    console.log('address', chainWallet.address)

    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: chainWallet.address,
    }
    /** @type {Array<import('cosmjs-types/cosmos/base/v1beta1/coin').Coin>} */
    const fee = []
    const gasLimit = 0
    const feeGranter = undefined
    const feePayer = undefined
    const chainId = mockChainId
    const accountNumber = 0
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

    console.log('signDoc', signDoc)
    const signDocBytes = makeSignBytes(signDoc)
    console.log('signDocBytes', signDocBytes)
    const base64SignDocBytes = toBase64(signDocBytes)

    if (!chainWallet.address) {
      throw new Error('No address found!')
    }

    chainWallet.initOfflineSigner()
    console.log('Offline signer', chainWallet.offlineSigner)

    // const signResult = await chainWallet.client.signArbitrary?.(
    //   mockChainId,
    //   chainWallet.address,
    //   signDocBytes
    // )

    const signResult = await chainWallet.offlineSigner.signAmino(chainWallet.address, signDocBytes)

    console.log(
      'signResult',
      signResult
    )

    const resultSignature = signResult.signature
    const resultPubKey = signResult.pub_key.value

    const messageHash = sha256(fromBase64(base64SignDocBytes))
    console.log('messageHash', messageHash)
    const isValid = await Secp256k1.verifySignature(
      Secp256k1Signature.fromFixedLength(fromBase64(resultSignature)),
      messageHash,
      fromBase64(resultPubKey)
    )
    console.log('isValid', isValid)
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message)
    }

    console.error(error)
  }
}
</script>

<template>
  <div class="unit-page">
    <AppButton
      class="button"
      @click="connect"
    >
      Connect Cosmos
    </AppButton>
  </div>
</template>
