import {
  useState,
} from '#imports'

import {
  StorageClerk,
} from '@openreachtech/furo'

import {
  STORAGE_KEY,
} from '~/app/constants'

/**
 * Use walletStore.
 *
 * @returns {WalletStore}
 */
export default function useWalletStore () {
  const localStorageClerk = StorageClerk.createAsLocal()
  const storageWalletState = localStorageClerk.get(STORAGE_KEY.WALLET)
  const defaultWalletState = {
    sourceAccount: {
      address: null,
      chain: null,
      encryptedSignature: null,
      walletDetail: null,
    },
    localWallet: {
      address: null,
      subaccountNumber: 0,
    },
    credential: {
      signDoc: null,
      signature: null,
      publicKey: null,
      address: null,
    },
    localWalletNonce: null,
  }

  /** @type {import('vue').Ref<WalletState>} */
  const walletStateRef = useState('wallet', () => generateInitialWalletState())

  return {
    walletStoreRef: walletStateRef,

    // Actions
    clearLocalWallet,
    clearSourceAccount,
    setCredential,
    setLocalWalletNonce,
    setSourceAddress,
    setWalletDetail,
    setLocalWallet,
  }

  /**
   * Generate initial wallet state value.
   *
   * @returns {WalletState}
   */
  function generateInitialWalletState () {
    if (!storageWalletState) {
      return defaultWalletState
    }

    const parsedStorageWalletState = JSON.parse(storageWalletState)

    return {
      sourceAccount: {
        ...defaultWalletState.sourceAccount,
        ...(parsedStorageWalletState.sourceAccount ?? {}),
      },
      localWallet: {
        ...defaultWalletState.localWallet,
        ...(parsedStorageWalletState.localWallet ?? {}),
      },
      credential: {
        ...defaultWalletState.credential,
        ...(parsedStorageWalletState.credential ?? {}),
      },
      localWalletNonce: parsedStorageWalletState.localWalletNonce ?? null,
    }
  }

  /**
   * Set `localWalletNonce` in wallet store.
   *
   * @param {{
   *   nonce: number
   * }} params - Parameters.
   */
  function setLocalWalletNonce ({
    nonce,
  }) {
    walletStateRef.value.localWalletNonce = nonce
  }

  /**
   * Set srouce address in wallet store.
   *
   * @param {{
   *   address: string
   *   chain: string
   * }} params - Parameters.
   * @returns {void}
   */
  function setSourceAddress ({
    address,
    chain,
  }) {
    if (!walletStateRef.value.sourceAccount) {
      return
    }

    // if the source wallet address has changed, clear the derived signature
    if (walletStateRef.value.sourceAccount.address !== address) {
      walletStateRef.value.sourceAccount.encryptedSignature = null
    }

    walletStateRef.value.sourceAccount.address = address
    walletStateRef.value.sourceAccount.chain = chain
  }

  /**
   * Set `sourceAccount.walletDetail` in wallet store.
   *
   * @param {{
   *   walletDetail: WalletDetail
   * }} params - Parameters.
   * @returns {void}
   */
  function setWalletDetail ({
    walletDetail,
  }) {
    walletStateRef.value.sourceAccount.walletDetail = walletDetail
  }

  /**
   * Set `localWallet` in wallet store.
   *
   * @param {{
   *   address?: string | null
   *   subaccountNumber?: number | null
   * }} params - Parameters.
   * @returns {void}
   */
  function setLocalWallet ({
    address = null,
    subaccountNumber = null,
  }) {
    walletStateRef.value.localWallet = {
      address,
      subaccountNumber,
    }
  }

  /**
   * Set `credential` in wallet store.
   *
   * @param {{
   *   credential: Partial<WalletState['credential']>
   * }} params - Parameters.
   * @returns {void}
   */
  function setCredential ({
    credential,
  }) {
    walletStateRef.value.credential = {
      ...walletStateRef.value.credential,
      ...credential,
    }
  }

  /**
   * Clear `localWallet` in wallet store.
   *
   * @returns {void}
   */
  function clearLocalWallet () {
    walletStateRef.value.localWallet = {
      address: null,
      subaccountNumber: null,
    }
  }

  /**
   * Clear `sourceAccount` in wallet store.
   *
   * @returns {void}
   */
  function clearSourceAccount () {
    walletStateRef.value.sourceAccount = {
      address: null,
      chain: null,
      encryptedSignature: null,
      walletDetail: null,
    }
  }
}

/**
 * @typedef {{
 *   walletStoreRef: import('vue').Ref<WalletState>
 *   clearLocalWallet: () => void
 *   clearSourceAccount: () => void
 *   setCredential: (params: {
 *     credential: Partial<WalletState['credential']>
 *   }) => void
 *   setLocalWalletNonce: (params: {
 *     nonce: number
 *   }) => void
 *   setSourceAddress: (params: {
 *     address: string
 *     chain: string
 *   }) => void
 *   setWalletDetail: (params: {
 *     walletDetail: WalletDetail
 *   }) => void
 *   setLocalWallet: (params: {
 *     address?: string | null
 *     subaccountNumber?: number | null
 *   }) => void
 * }} WalletStore
 */

/**
 * @typedef {{
 *   sourceAccount: SourceAccount
 *   localWallet: {
 *     address: string | null
 *     subaccountNumber: number | null
 *   }
 *   credential: {
 *     signDoc: string | null
 *     signature: string | null
 *     publicKey: string | null
 *     address: string | null
 *   }
 *   localWalletNonce: number | null
 * }} WalletState
 */

/**
 * @typedef {{
 *   address: string | null
 *   chain: string | null
 *   encryptedSignature: string | null
 *   walletDetail: WalletDetail | null
 * }} SourceAccount
 */

/**
 * @typedef {{
 *   connectorType: (typeof import('~/app/constants').CONNECTOR_TYPE)[keyof typeof import('~/app/constants').CONNECTOR_TYPE]
 *   name: string
 *   icon: string
 *   rdns: string
 *   downloadLink?: string | null
 * }} WalletDetail
 */
