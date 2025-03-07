import dydxAppConfig from '~/app/dydxV4AppConfig.json'

const CURRENT_MODE_HASH = /** @type {const} */ ({
  production: 'MAINNET',
  testnet: 'TESTNET',
  staging: 'DEV',
  development: 'DEV',
})

export const CURRENT_MODE = CURRENT_MODE_HASH[/** @type {keyof typeof CURRENT_MODE_HASH} */ (import.meta.env.MODE)]
  ?? 'MAINNET'

export const AVAILABLE_ENVIRONMENTS = dydxAppConfig.deployments[CURRENT_MODE]
