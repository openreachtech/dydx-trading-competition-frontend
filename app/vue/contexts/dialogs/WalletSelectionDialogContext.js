import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
  WALLETS,
} from '~/app/constants'

export default class WalletSelectionDialogContext extends AppDialogContext {
  /**
   * Has phantom wallet or not.
   *
   * @returns {boolean} `true` if has phantom wallet.
   */
  hasPhantomWallet () {
    return Boolean(window.phantom?.solana)
  }

  /**
   * get: supportedWallets
   *
   * @returns {typeof WALLETS} Supported wallets.
   */
  get supportedWallets () {
    // TODO: If wallet extensions are not installed, return their download link.
    return WALLETS
  }
}
