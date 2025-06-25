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

import {
  verifyADR36Amino,
} from '@keplr-wallet/cosmos'

const walletStore = useWalletStore()

const cosmosConnector = CosmosConnector.createCdcCosmosConnector({
  walletStore,
})

/* eslint-disable no-console */

/**
 * Connect
 *
 * @param {string} walletName
 * @returns {Promise<void>}
 */
async function connect (walletName) {
  try {
    const chainWallet = cosmosConnector.walletClerk.getChainWallet(
      'dydx',
      walletName
    )
    const mockChainId = chainWallet.chainId

    await chainWallet.connect()
    console.log('address: ', chainWallet.address)

    await chainWallet.initOfflineSigner()

    if (!chainWallet.offlineSigner) {
      return
    }

    const accounts = await chainWallet.offlineSigner.getAccounts()
    const firstAccountPubkey = accounts.at(0)?.pubkey

    if (!firstAccountPubkey) {
      return
    }

    const pubkey = {
      typeUrl: '/dydx.crypto.secp256k1.PubKey',
      value: firstAccountPubkey,
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
      chainId,
      accountNumber
    )

    console.log('signDoc', signDoc)
    const signDocBytes = makeSignBytes(signDoc)
    console.log('signDocBytes', signDocBytes)
    const base64SignDocBytes = toBase64(signDocBytes)
    console.log('base64SignDocBytes', base64SignDocBytes)

    if (!chainWallet.address) {
      throw new Error('No address found!')
    }

    const mainWallet = cosmosConnector.walletClerk.getMainWallet(walletName)
    await mainWallet.initClient()

    const signResult = await mainWallet.client.signArbitrary?.(
      chainId,
      chainWallet.address,
      signDocBytes
    )

    if (!signResult) {
      throw new Error('Cannot generate signature.')
    }

    console.log('signResult', signResult)

    const resultSignature = signResult.signature
    const resultPubKey = signResult.pub_key.value

    const isValidAdr036 = verifyADR36Amino(
      'dydx',
      chainWallet.address,
      signDocBytes,
      fromBase64(resultPubKey),
      fromBase64(resultSignature)
    )

    console.log('isValidAdr036', isValidAdr036)

    // const isValid = await Secp256k1.verifySignature(
    //   Secp256k1Signature.fromFixedLength(fromBase64(resultSignature)),
    //   messageHash,
    //   fromBase64(resultPubKey)
    // )
    // console.log('isValid', isValid)
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
      @click="connect('keplr-extension')"
    >
      Connect Keplr
    </AppButton>
    <AppButton
      class="button"
      @click="connect('cdcwallet-extension')"
    >
      Connect Crypto.com
    </AppButton>
    <AppButton
      class="button"
      @click="connect('leap-extension')"
    >
      Connect Leap
    </AppButton>
  </div>
</template>

<style scoped>
.unit-page {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}
</style>
