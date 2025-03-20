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
} from '@wagmi/connectors'

const metaMaskConnector = metaMask({
  dappMetadata: {
    name: 'dYdX Trading League',
  },
})

export default createConfig({
  chains: [
    mainnet,
    sepolia,
  ],
  connectors: [
    injected(),
    metaMaskConnector,
  ],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})
