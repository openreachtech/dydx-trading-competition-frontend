import BaseCosmosConnector from './BaseCosmosConnector'

import {
  wallets as keplrWallets,
} from '@cosmos-kit/keplr'

export default class KeplrConnector extends BaseCosmosConnector {
  /** @override */
  static get wallets () {
    return keplrWallets
  }

  /** @override */
  static get walletName () {
    return 'keplr-extension'
  }

  /**
   * Check if Keplr wallet is available.
   *
   * @returns {boolean}
   */
  hasKeplrWallet () {
    return Boolean(window.keplr)
  }
}
