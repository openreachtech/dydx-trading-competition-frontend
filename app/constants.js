import dydxAppConfig from '~/app/dydxV4AppConfig.json'

export const HEADER_KEY = {
  ACCESS_TOKEN: 'x-renchan-access-token',
}

export const STORAGE_KEY = {
  FURO_ENV: 'furoEnv',

  ACCESS_TOKEN: 'access_token',
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
