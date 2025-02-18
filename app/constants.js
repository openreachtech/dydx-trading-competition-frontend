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

export const PAGINATION = {
  LIMIT: 30,
}
