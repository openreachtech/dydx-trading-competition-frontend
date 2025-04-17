import dydxAppConfig from '~/app/dydxV4AppConfig.json'

export const HEADER_KEY = {
  ACCESS_TOKEN: 'x-renchan-access-token',
}

export const STORAGE_KEY = {
  FURO_ENV: 'furoEnv',

  ACCESS_TOKEN: 'access_token',

  SELECTED_NETWORK: 'dydx.SelectedNetwork',
  WALLET: 'wallet',
}

export const DYDX_TRADE_CTA_URL = 'https://dydx.trade/markets?utm_source=clc&utm_medium=trading-competition&utm_campaign=07042025-clc-menu-cta&utm_term=&utm_content=trading-comp-menu-cta'

export const ORDINAL_SUFFIX_HASH = {
  1: 'st',
  2: 'nd',
  3: 'rd',
  OTHER: 'th',
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

export const COMPETITION_PARTICIPANT_STATUS = {
  REGISTERED: {
    ID: 1,
    NAME: 'registered',
    DESCRIPTION: 'Participant has registered for competition',
  },
  ACTIVE: {
    ID: 2,
    NAME: 'active',
    DESCRIPTION: 'Participant is actively trading in competition',
  },
  DISQUALIFIED: {
    ID: 3,
    NAME: 'disqualified',
    DESCRIPTION: 'Participant has been disqualified',
  },
  COMPLETED: {
    ID: 4,
    NAME: 'completed',
    DESCRIPTION: 'Participant has completed the competition',
  },
  CANCELED: {
    ID: 5,
    NAME: 'canceled',
    DESCRIPTION: 'Participant has canceled their registration',
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

export const PHANTOM_DOWNLOAD_LINK = 'https://phantom.com/download'

// Extension wallet EIP-6963 identifiers
export const MIPD_RDNS_HASH = {
  PHANTOM: 'app.phantom',
  OKX: 'com.okex.wallet',
  KEPLR: 'app.keplr',
  COINBASE: 'com.coinbase.wallet',
  METAMASK: 'io.metamask',
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

export const DERIVATION_STATUS_HASH = /** @type {const} */ ({
  PENDING: 0,
  DERIVING: 1,
  ENSURING_DETERMINISM: 2,
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

// ******* Base URLS *******

export const BASE_INDEXER_URL = 'https://indexer.dydx.trade/v4'

// ******* Error Codes *******

/** @type {Record<string, string | Array<string>>} */
export const ERROR_CODE_HASH = {
  // Standard Error Codes (1XX prefix)
  Unknown: '100.X000.001',
  ConcreteMemberNotFound: '101.X000.001',
  Unauthenticated: '102.X000.001',
  Unauthorized: '102.X000.002',
  DeniedSchemaPermission: '102.X000.003',
  Database: '104.X000.001',

  // Invalid Input Errors (203 prefix)
  InvalidPrizeRules: [
    '203.M001.001',
    '203.M005.002',
  ],
  InvalidTitle: [
    '203.M001.002',
    '203.M004.002',
    '203.Q007.001',
  ],
  InvalidDescription: [
    '203.M001.003',
    '203.M004.003',
  ],
  InvalidMinimumDeposit: [
    '203.M001.004',
    '203.M009.002',
  ],
  InvalidTotalPrize: '203.M001.005',
  InvalidImageId: [
    '203.M001.006',
    '203.M004.004',
  ],
  InvalidParticipantUpperLimit: [
    '203.M001.007',
    '203.M009.003',
  ],
  InvalidParticipantLowerLimit: [
    '203.M001.008',
    '203.M009.004',
  ],
  InvalidSchedules: [
    '203.M001.009',
    '203.M006.002',
  ],
  InvalidSignature: [
    '203.M001.010',
    '203.M002.003',
    '203.M003.002',
    '203.M010.002',
    '203.M009.005',
    '203.M004.005',
    '203.M005.003',
    '203.M006.003',
    '203.M007.003',
  ],
  InvalidSignDoc: [
    '203.M001.011',
    '203.M002.004',
    '203.M003.003',
    '203.M010.003',
    '203.M009.006',
    '203.M004.006',
    '203.M005.004',
    '203.M006.004',
    '203.M007.004',
  ],
  InvalidAddress: [
    '203.M001.012',
    '203.M002.005',
    '203.M003.004',
    '203.M010.004',
    '203.M009.007',
    '203.M004.007',
    '203.M005.005',
    '203.M006.005',
    '203.M007.005',
    '203.Q001.001',
    '203.Q002.001',
    '203.Q009.001',
    '203.Q003.001',
    '203.Q012.002',
  ],
  InvalidPublicKey: [
    '203.M001.013',
    '203.M002.006',
    '203.M003.005',
    '203.M010.005',
    '203.M009.008',
    '203.M004.008',
    '203.M005.006',
    '203.M006.006',
    '203.M007.006',
  ],
  InvalidCompetitionId: [
    '203.M002.001',
    '203.M010.001',
    '203.M009.001',
    '203.M004.001',
    '203.M005.001',
    '203.M006.001',
    '203.M007.001',
    '203.Q013.001',
    '203.Q005.001',
    '203.Q012.001',
    '203.Q011.001',
    '203.Q004.001',
  ],
  InvalidName: [
    '203.M002.002',
    '203.M003.001',
  ],
  InvalidStatusId: [
    '203.M007.002',
    '203.Q011.002',
    '203.Q007.002',
  ],
  InvalidImageFile: '203.M008.001',
  InvalidLimit: [
    '203.Q002.002',
    '203.Q003.002',
    '203.Q013.002',
    '203.Q005.002',
    '203.Q011.003',
    '203.Q007.003',
    '203.Q008.002',
    '203.Q014.002',
  ],
  InvalidOffset: [
    '203.Q002.003',
    '203.Q003.003',
    '203.Q013.003',
    '203.Q005.003',
    '203.Q011.004',
    '203.Q007.004',
    '203.Q008.003',
    '203.Q014.003',
  ],
  InvalidSort: [
    '203.Q002.004',
    '203.Q003.004',
    '203.Q013.004',
    '203.Q005.004',
    '203.Q011.005',
    '203.Q007.005',
    '203.Q008.004',
    '203.Q014.004',
  ],
  InvalidHostAddress: '203.Q007.006',
  InvalidQuery: [
    '203.Q008.001',
    '203.Q014.001',
  ],

  // Database Errors (204 prefix)
  AddressNotFound: [
    '204.M001.001',
    '204.Q009.001',
  ],
  CompetitionNotFound: [
    '204.M002.001',
    '204.M010.001',
    '204.M009.001',
    '204.M004.001',
    '204.M005.001',
    '204.M006.001',
    '204.M007.001',
    '204.Q005.001',
    '204.Q011.002',
    '204.Q004.001',
  ],
  ParticipantLimitExceeded: '204.M002.002',
  AddressAlreadyRegisteredToCompetition: '204.M002.003',
  InvalidCompetitionState: [
    '204.M002.004',
    '204.M010.002',
    '204.M009.004',
    '204.M004.004',
    '204.M005.002',
    '204.M006.002',
  ],
  AddressNameAlreadyBeenUsed: '204.M002.005',
  NameAlreadyBeenUsed: '204.M003.001',
  ParticipantNotFound: '204.M010.003',
  CurrentDetailInformationSameToNewDetailInformation: [
    '204.M009.002',
    '204.M004.002',
  ],
  CurrentTotalParticipantConflictsWithNewParticipantLimit: '204.M009.003',
  StatusNotFound: '204.M007.002',
  CurrentStatusSameToNewStatus: '204.M007.003',
  FinalResultsNotFound: '204.Q013.001',
  CompetitionParticipantStatusNotFound: '204.Q011.001',
  CompetitionStatusNotFound: '204.Q007.001',

  // Authentication Errors (205 prefix)
  SignatureAuthenticationFailed: [
    '205.M001.001',
    '205.M002.001',
    '205.M003.001',
    '205.M010.001',
    '205.M009.001',
    '205.M004.001',
    '205.M005.001',
    '205.M006.001',
    '205.M007.001',
  ],
  PermissionDenied: [
    '205.M009.002',
    '205.M004.002',
    '205.M005.002',
    '205.M006.002',
    '205.M007.002',
  ],
}

/** @type {Record<string, string>} */
export const ERROR_MESSAGE_HASH = {
  // Standard Error Codes (1XX prefix)
  Unknown: 'Unknown error occurred',
  ConcreteMemberNotFound: 'Member not found',
  Unauthenticated: 'Authentication required',
  Unauthorized: 'Access not authorized',
  DeniedSchemaPermission: 'Schema permission denied',
  Database: 'Database error occurred',

  // Invalid Input Errors (203 prefix)
  InvalidCompetitionParticipantIds: 'Invalid competition participant IDs',
  InvalidStatusId: 'Invalid status ID',
  InvalidCompetitionId: 'Invalid competition ID',
  InvalidEmail: 'Invalid email address',
  InvalidPassword: 'Invalid password',
  InvalidLimit: 'Invalid limit value',
  InvalidOffset: 'Invalid offset value',
  InvalidSort: 'Invalid sort parameter',
  InvalidTitle: 'Invalid title',
  InvalidTimestamp: 'Invalid timestamp',
  InvalidPrizeRules: 'Invalid prize rules',
  InvalidDescription: 'Invalid description',
  InvalidMinimumDeposit: 'Invalid minimum deposit amount',
  InvalidTotalPrize: 'Invalid total prize amount',
  InvalidImageId: 'Invalid image ID',
  InvalidParticipantUpperLimit: 'Invalid participant upper limit',
  InvalidParticipantLowerLimit: 'Invalid participant lower limit',
  InvalidSchedules: 'Invalid schedules',
  InvalidSignature: 'Invalid signature',
  InvalidSignDoc: 'Invalid sign document',
  InvalidAddress: 'Invalid address',
  InvalidPublicKey: 'Invalid public key',
  InvalidName: 'Invalid name',
  InvalidImageFile: 'Invalid image file',
  InvalidQuery: 'Invalid query parameters',

  // Database Errors (204 prefix)
  CompetitionParticipantNotFound: 'Competition participant not found',
  StatusNotFound: 'Status not found',
  CurrentStatusSameToNewStatus: 'Current status is same as new status',
  CompetitionNotFound: 'Competition not found',
  CompetitionAlreadyCanceled: 'Competition has already been canceled',
  CompetitionAlreadyEnded: 'Competition has already ended',
  MissingPrizeRuleForRank: 'Missing prize rule for rank',
  AdminNotFound: 'Admin not found',
  CompetitionStartScheduleNotFound: 'Competition start schedule not found',
  CompetitionAlreadyStarted: 'Competition has already started',
  CompetitionParticipantLowerThanMinimumLimit: 'Participant count below minimum limit',
  ActiveParticipantNotFound: 'Active participant not found',
  IndexerSnapshotDatetimeNotFound: 'Indexer snapshot datetime not found',
  MissingEquity: 'Missing equity information',
  CompetitionParticipantStatusNotFound: 'Competition participant status not found',
  CompetitionStatusNotFound: 'Competition status not found',
  CompetitionParticipantAddressNotFound: 'Competition participant address not found',
  AddressNotFound: 'Address not found',
  ParticipantLimitExceeded: 'Participant limit exceeded',
  AddressAlreadyRegisteredToCompetition: 'You can only register to one competition at a time',
  InvalidCompetitionState: 'Invalid competition state',
  NameAlreadyBeenUsed: 'Name has already been used',
  AddressNameAlreadyBeenUsed: 'This username has already been taken',
  CurrentDetailInformationSameToNewDetailInformation: 'No changes in detail information',
  CurrentTotalParticipantConflictsWithNewParticipantLimit: 'Current total participants conflicts with new limit',
  InvalidTotalPrizeAmount: 'Invalid total prize amount',

  // Authentication Errors (205 prefix)
  InvalidCredentials: 'Invalid credentials',
  SignatureAuthenticationFailed: 'Signature authentication failed',
  PermissionDenied: 'Permission denied',
}
