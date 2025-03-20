import dydxAppConfig from '~/app/dydxV4AppConfig.json'

export const HEADER_KEY = {
  ACCESS_TOKEN: 'x-renchan-access-token',
}

export const STORAGE_KEY = {
  FURO_ENV: 'furoEnv',

  ACCESS_TOKEN: 'access_token',

  SELECTED_NETWORK: 'dydx.SelectedNetwork',
}

export const COMPETITION_STATUS = {
  CREATED: {
    ID: 1,
    NAME: 'created',
    DESCRIPTION: 'Competition has been created',
  },
  REGISTRATION_ENDED: {
    ID: 2,
    NAME: 'registration_ended',
    DESCRIPTION: 'Registration period has ended',
  },
  IN_PROGRESS: {
    ID: 3,
    NAME: 'in_progress',
    DESCRIPTION: 'Competition is currently in progress',
  },
  COMPLETED: {
    ID: 4,
    NAME: 'completed',
    DESCRIPTION: 'Competition has been completed',
  },
  CANCELED: {
    ID: 5,
    NAME: 'cancelled',
    DESCRIPTION: 'Competition has been cancelled',
  },
}

export const SCHEDULE_CATEGORY = {
  REGISTRATION_START: {
    ID: 1,
    NAME: 'registration_start',
    DESCRIPTION: 'Competition registration period starts',
  },
  REGISTRATION_END: {
    ID: 2,
    NAME: 'registration_end',
    DESCRIPTION: 'Competition registration period ends',
  },
  COMPETITION_START: {
    ID: 3,
    NAME: 'competition_start',
    DESCRIPTION: 'Competition trading period starts',
  },
  COMPETITION_END: {
    ID: 4,
    NAME: 'competition_end',
    DESCRIPTION: 'Competition trading period ends',
  },
  PRIZE_DISTRIBUTE: {
    ID: 5,
    NAME: 'prize_distribute',
    DESCRIPTION: 'Competition prize distribution time',
  },
}

export const SCHEDULE_ID_GROUP = {
  REGISTRATION: [
    SCHEDULE_CATEGORY.REGISTRATION_START.ID,
    SCHEDULE_CATEGORY.REGISTRATION_END.ID,
  ],
  COMPETITION: [
    SCHEDULE_CATEGORY.COMPETITION_START.ID,
    SCHEDULE_CATEGORY.COMPETITION_END.ID,
  ],
  PRIZE_DISTRIBUTE: [
    SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
  ],
}

export const TRANSFER_CATEGORY = {
  TRANSFER_IN: {
    ID: 1,
    NAME: 'transfer_in',
    DESCRIPTION: 'Funds transferred into account',
  },
  TRANSFER_OUT: {
    ID: 2,
    NAME: 'transfer_out',
    DESCRIPTION: 'Funds transferred out of account',
  },
  DEPOSIT: {
    ID: 3,
    NAME: 'deposit',
    DESCRIPTION: 'Initial deposit into competition',
  },
  WITHDRAWAL: {
    ID: 4,
    NAME: 'withdrawal',
    DESCRIPTION: 'Withdrawal from competition',
  },
}

export const PAGINATION = {
  LIMIT: 30,
}

// ******* Wallet *******
export const ENVIRONMENT_CONFIG_HASH = dydxAppConfig.environments
export const TOKEN_CONFIG_HASH = dydxAppConfig.tokens
export const LINKS_CONFIG_HASH = dydxAppConfig.links
export const WALLETS_CONFIG_HASH = dydxAppConfig.wallets

export const WALLET_TYPE = {
  COINBASE_WALLET: 'COINBASE_WALLET',
  KEPLR: 'KEPLR',
  OKX_WALLET: 'OKX_WALLET',
  WALLETCONNECT_2: 'WALLETCONNECT_2',
  TEST_WALLET: 'TEST_WALLET',
  OTHER_WALLET: 'OTHER_WALLET',
  PRIVY: 'PRIVY',
  PHANTOM: 'PHANTOM',
  METAMASK: 'METAMASK',
}

export const CONNECTOR_TYPE = {
  INJECTED: 'injected',
  // Not a real connector type, but a link to download the wallet for those who don't have it installed
  DOWNLOAD_WALLET: 'downloadWallet',
  COINBASE: 'coinbase',
  WALLET_CONNECT: 'walletConnect',
  COSMOS: 'cosmos',
  TEST: 'test',
  PRIVY: 'privy',
  PHANTOM_SOLANA: 'phantomSolana',
}

export const WALLET_NETWORK_TYPE = {
  EVM: 'evm',
  COSMOS: 'cosmos',
  SOLANA: 'solana',
}

export const WALLETS = {
  [WALLET_TYPE.METAMASK]: {
    name: WALLET_TYPE.METAMASK,
    connectorType: WALLET_TYPE.METAMASK,
    label: 'MetaMask',
    iconUrl: '/img/wallets/metamask.svg',
  },
  [WALLET_TYPE.PHANTOM]: {
    name: WALLET_TYPE.PHANTOM,
    connectorType: WALLET_TYPE.PHANTOM,
    label: 'Phantom (Solana)',
    iconUrl: '/img/wallets/phantom.svg',
  },
  [WALLET_TYPE.KEPLR]: {
    name: WALLET_TYPE.KEPLR,
    connectorType: WALLET_TYPE.KEPLR,
    label: 'Keplr',
    iconUrl: '/img/wallets/keplr.svg',
  },
  [WALLET_TYPE.COINBASE_WALLET]: {
    name: WALLET_TYPE.COINBASE_WALLET,
    connectorType: WALLET_TYPE.COINBASE_WALLET,
    label: 'Coinbase Wallet',
    iconUrl: '/img/wallets/coinbase-wallet.svg',
  },
  [WALLET_TYPE.OKX_WALLET]: {
    name: WALLET_TYPE.OKX_WALLET,
    connectorType: WALLET_TYPE.OKX_WALLET,
    label: 'OKX',
    iconUrl: '/img/wallets/okx-wallet.svg',
  },
  [WALLET_TYPE.WALLETCONNECT_2]: {
    name: WALLET_TYPE.WALLETCONNECT_2,
    connectorType: WALLET_TYPE.WALLETCONNECT_2,
    label: 'WalletConnect',
    iconUrl: '/img/wallets/walletconnect.svg',
  },
}

/** @type {Record<string, string>} */
export const WALLET_IMAGE_URL_HASH = {
  metaMaskSDK: '/img/wallets/metamask.svg',
  'com.coinbase.wallet': '/img/wallets/coinbase-wallet.svg',
  'app.phantom': '/img/wallets/phantom.svg',
  'app.keplr': '/img/wallets/keplr.svg',
}

export const ONBOARDING_STATUS = /** @type {const} */ ({
  DISCONNECTED: 'Disconnected',
  WALLET_CONNECTED: 'WalletConnected',
  ACCOUNT_CONNECTED: 'AccountConnected',
})

export const EVM_DERIVED_ACCOUNT_STATUS = /** @type {const} */ ({
  NOT_DERIVED: 0,
  DERIVING: 1,
  ENSURING_DETERMINISM: 2,
  DERIVED: 3,
})

export const ONBOARDING_STATE = /** @type {const} */ ({
  DISCONNECTED: 'Disconnected',
  WALLET_CONNECTED: 'WalletConnected',
  ACCOUNT_CONNECTED: 'AccountConnected',
})

export const ONBOARDING_STEPS = /** @type {const} */ ({
  CHOOSE_WALLET: 'ChooseWallet',
  KEY_DERIVATION: 'KeyDerivation',
})
