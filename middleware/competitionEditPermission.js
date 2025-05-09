import {
  defineNuxtRouteMiddleware,
  navigateTo,
} from '#imports'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useWalletStore from '~/stores/wallet'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'

export default defineNuxtRouteMiddleware(async to => {
  // Skip middleware on server
  if (import.meta.server) {
    return goNextAsIs()
  }

  const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)

  try {
    await competitionGraphqlClient.invokeRequestOnEvent({
      variables: {
        input: {
          competitionId: Number(to.params.competitionId),
        },
      },
    })
  } catch {
    return navigateTo(`/competitions/${to.params.competitionId}`)
  }

  const {
    hostAddress,
  } = competitionGraphqlClient.capsuleRef.value

  if (
    !isHost({
      hostAddress,
    })
  ) {
    return navigateTo(`/competitions/${to.params.competitionId}`)
  }

  return goNextAsIs()
})

/**
 * Go next as is.
 *
 * @returns {Promise<void>}
 */
async function goNextAsIs () {
  return Promise.resolve()
}

/**
 * Check if the current user is the host of a competition.
 *
 * @param {{
 *   hostAddress: string | null
 * }} params - Parameters.
 * @returns {boolean}
 */
function isHost ({
  hostAddress,
}) {
  if (hostAddress === null) {
    return false
  }

  const walletStore = useWalletStore()
  const userAddress = walletStore.walletStoreRef
    .value
    .localWallet
    .address

  return hostAddress === userAddress
}
