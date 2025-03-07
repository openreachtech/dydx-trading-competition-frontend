import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

export default class WalletSelectionDialogContext extends AppDialogContext {
  /**
   * get: supportedWallets
   *
   * @returns {Array<{
   *   label: string
   * }>} Supported wallets.
   */
  get supportedWallets () {
    return [
      {
        label: 'MetaMask',
      },
      {
        label: 'WalletConnect',
      },
    ]
  }
}
