import {
  http,
  createConfig,
} from '@wagmi/core'

import {
  mainnet,
  sepolia,
} from '@wagmi/core/chains'

import {
  metaMask,
  coinbaseWallet,
} from '@wagmi/connectors'

const metaMaskConnector = metaMask({
  dappMetadata: {
    name: 'dYdX Trading League',
  },
})

const coinbaseWalletConnector = coinbaseWallet({
  appName: 'dYdX Trading League',
})

export default createConfig({
  chains: [
    mainnet,
    sepolia,
  ],
  connectors: [
    metaMaskConnector,
    coinbaseWalletConnector,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
