<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppSearchBar from '~/components/units/AppSearchBar.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import SearchAddressesQueryGraphqlLauncher from '~/app/graphql/client/queries/searchAddresses/SearchAddressesQueryGraphqlLauncher'

import AddressesSearchBarContext from '~/app/vue/contexts/search/AddressesSearchBarContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppSearchBar,
  },

  setup (
    props,
    componentContext
  ) {
    const statusReactive = reactive({
      isLoading: false,
    })
    const searchAddressesGraphqlClient = useGraphqlClient(SearchAddressesQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      statusReactive,
      graphqlClientHash: {
        searchAddresses: searchAddressesGraphqlClient,
      },
    }
    const context = AddressesSearchBarContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppSearchBar
    size="small"
    variant="transparent"
    :is-loading="context.isLoading"
    placeholder="Search by address, name..."
    :results="context.addresses"
    @search="query => context.searchAddresses({
      query,
    })"
  >
    <template #results="{ results }">
      <ul class="unit-addresses">
        <li
          v-for="it of results"
          :key="it.address"
        >
          <NuxtLink
            class="unit-address"
            :to="context.generateAddressUrl({
              address: it.address,
            })"
          >
            <img
              src="~/assets/img/address-icon.svg"
              :alt="it.address"
              class="image"
            >

            <div class="details">
              <span class="name">
                {{
                  context.normalizeName({
                    name: it.name,
                  })
                }}
              </span>
              <span class="address">
                {{ it.address }}
              </span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </template>
  </AppSearchBar>
</template>

<style scoped>
.unit-addresses {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-address {
  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 0.75rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  transition: background-color 250ms var(--transition-timing-base);

  overflow: hidden;
}

.unit-address:hover {
  background-color: var(--color-background-search-result-hover);
}

.unit-address > .image {
  width: 1.4rem;
  height: 1.4rem;
}

.unit-address > .details {
  display: flex;
  flex-direction: column;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
}

.unit-address > .details > .name {
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-address > .details > .address {
  color: var(--color-text-tertiary);

  word-break: break-all;
}
</style>
