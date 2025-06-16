import {
  defineNuxtRouteMiddleware,
  navigateTo,
} from '#imports'

import useWalletStore from '~/stores/wallet'

const AUTHENTICATION_REQUIRED_ROUTES = [
  '/hosted-competitions',
]

/**
 * Remove a forward slash at the end of a string.
 *
 * @param {string} string - A string.
 * @returns {string} The string after being stripped of ending forward slash.
 */
function stripEndingForwardSlash (string) {
  return string.replace(/\/$/u, '')
}

export default defineNuxtRouteMiddleware(async to => {
  // Skip this middleware on the server.
  if (import.meta.server) {
    return goNextAsIs()
  }

  const normalizedDestinationPath = stripEndingForwardSlash(to.path)

  if (
    AUTHENTICATION_REQUIRED_ROUTES.includes(normalizedDestinationPath)
    && !hasSignedIn()
  ) {
    return navigateTo('/competitions')
  }

  return goNextAsIs()
})

/**
 * Check if the user has signed in.
 *
 * @returns {boolean}
 */
function hasSignedIn () {
  const walletStore = useWalletStore()
  const localAddress = walletStore.walletStoreRef
    .value
    .localWallet
    .address

  return Boolean(localAddress)
}

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}
