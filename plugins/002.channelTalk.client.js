import {
  watch,
} from 'vue'

import {
  defineNuxtPlugin,
  useRuntimeConfig,
} from '#imports'

import * as ChannelService from '@channel.io/channel-web-sdk-loader'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useWalletStore from '~/stores/wallet'

import AddressProfileQueryGraphqlLauncher from '~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlLauncher'

export default defineNuxtPlugin({
  async setup () {
    const runtimeConfig = useRuntimeConfig()
    const pluginKey = runtimeConfig.public.CHANNEL_TALK_PLUGIN_KEY

    if (!pluginKey) {
      return
    }

    ChannelService.loadScript()

    const walletStore = useWalletStore()

    watch(
      walletStore.localAddressComputed,
      async (newAddress, oldAddress) => {
        if (oldAddress && !newAddress) {
          ChannelService.shutdown()

          return
        }

        if (!oldAddress && newAddress) {
          const name = await fetchAddressName({
            address: walletStore.localAddressComputed.value,
          })

          ChannelService.boot({
            pluginKey,
            appearance: 'dark',
          })

          // Configure user profile separately for instant update.
          ChannelService.updateUser({
            profile: {
              address: newAddress,
              name,
            },
          })
        }
      },
      {
        immediate: true,
      }
    )

    watch(
      walletStore.localAddressComputed,
      async newAddress => {
        if (
          !newAddress
          || newAddress === walletStore.sourceAddressComputed.value
        ) {
          return
        }

        const name = await fetchAddressName({
          address: newAddress,
        })

        ChannelService.updateUser({
          profile: {
            name,
          },
        })
      }
    )
  },
})

/**
 * Fetch username of current address.
 *
 * @param {{
 *   address: string | null
 * }} params - Parameters.
 * @returns {Promise<string | null>}
 */
async function fetchAddressName ({
  address,
}) {
  if (!address) {
    return null
  }

  const addressProfileClient = useGraphqlClient(AddressProfileQueryGraphqlLauncher)

  await addressProfileClient.invokeRequestOnEvent({
    variables: {
      input: {
        address,
      },
    },
  })

  return addressProfileClient.capsuleRef
    .value
    .name
}
