import {
  http,
  createConfig,
} from '@wagmi/core'

import {
  mainnet,
  sepolia,
} from '@wagmi/core/chains'

import {
  injected,
  metaMask,
  coinbaseWallet,
} from '@wagmi/connectors'

const metaMaskConnector = metaMask({
  dappMetadata: {
    name: 'dYdX Trading Arena',
  },
})

export const coinbaseWalletConnector = coinbaseWallet({
  appName: 'dYdX Trading Arena',
  reloadOnDisconnect: false,
  // disable Coinbase Smart Wallet because dydx-client currently doesn't handle EIP-6492 signatures
  preference: 'eoaOnly',
})

export default createConfig({
  chains: [
    mainnet,
    sepolia,
  ],
  connectors: [
    injected(),
    metaMaskConnector,
    coinbaseWalletConnector,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
