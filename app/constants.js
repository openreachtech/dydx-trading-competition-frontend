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

export const PAGINATION = {
  LIMIT: 20,
}
