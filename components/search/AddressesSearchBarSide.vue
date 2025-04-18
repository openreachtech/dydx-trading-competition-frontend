<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppSearchBar from '~/components/units/AppSearchBar.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import SearchAddressesQueryGraphqlLauncher from '~/app/graphql/client/queries/searchAddresses/SearchAddressesQueryGraphqlLauncher'

import AddressesSearchBarSideContext from '~/app/vue/contexts/search/AddressesSearchBarSideContext'

export default defineComponent({
  components: {
    Icon,
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
    const context = AddressesSearchBarSideContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container"
    :class="context.generateSearchClasses()"
  >
    <AppSearchBar placeholder="Search by address, name..."
      @search="query => context.searchAddresses({
        query,
      })"
    />

    <ul class="unit-addresses">
      <li v-for="it of context.addresses"
        :key="it.address"
      >
        <NuxtLink class="unit-address"
          :to="context.generateAddressUrl({
            address: it.address,
          })"
        >
          <img src="~/assets/img/address-icon.svg"
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

    <div class="empty">
      <Icon name="heroicons:magnifying-glass"
        size="5rem"
      />

      <p class="description">
        No records found.
      </p>
    </div>

    <div class="loading">
      <Icon name="svg-spinners:90-ring-with-bg"
        size="1.5rem"
      />
    </div>
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 1.125rem;
}

.unit-addresses {
  margin-block-start: 1.125rem;

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

  background-color: var(--color-background-search-result);

  overflow: hidden;

  transition: background-color 250ms var(--transition-timing-base);
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

  overflow-wrap: break-word;

  color: var(--color-text-primary);
}

.unit-address > .details > .address {
  color: var(--color-text-tertiary);

  word-break: break-all;
}

.unit-container > .empty {
  padding-block: 2rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  min-height: 14rem;

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-container > .empty > .description {
  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-container:not(.no-results) > .empty {
  display: none;
}

.unit-container > .loading {
  display: flex;
  justify-content: center;
  align-items: center;

  padding-block: 2rem;
  padding-inline: 1rem;

  min-height: 14rem;

  color: var(--color-text-secondary);
}

.unit-container:not(.loading) > .loading {
  display: none;
}

.unit-container.loading > :where(.unit-addresses, .empty) {
  display: none;
}
</style>
