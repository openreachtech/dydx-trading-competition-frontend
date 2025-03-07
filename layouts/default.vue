<!-- layouts/default.vue -->
<script>
import {
  Icon,
  NuxtLink,
} from '#components'

import AppDefaultLayout from '~/components/units/AppDefaultLayout.vue'
import AppLogo from '~/components/header/AppLogo.vue'
import AddressesSearchBarHeader from '~/components/search/AddressesSearchBarHeader.vue'
import AddressesSearchBarSide from '~/components/search/AddressesSearchBarSide.vue'

export default {
  name: 'DefaultLayout',

  components: {
    AppDefaultLayout,
    AppLogo,
    AddressesSearchBarHeader,
    AddressesSearchBarSide,
    Icon,
    NuxtLink,
  },
}
</script>

<template>
  <AppDefaultLayout>
    <template #header>
      <div class="unit-header">
        <AppLogo />

        <AddressesSearchBarHeader class="search" />
      </div>
    </template>

    <template #nav-contents>
      <!-- TODO: Navigation / User profile contents -->
      <div>
        Navigation / User profile
      </div>
    </template>

    <template #search-header>
      <NuxtLink to="https://dydx.trade"
        external
        target="_blank"
        rel="noopener noreferrer"
        class="link trade menu-entry"
      >
        <Icon name="heroicons-solid:home"
          size="1rem"
        />

        <span>
          Open dydx.trade
        </span>
      </NuxtLink>
    </template>

    <template #search-contents>
      <AddressesSearchBarSide />
    </template>

    <template #contents>
      <slot />
    </template>

    <template #footer>
      <p class="copyright">
        © 2025 by DYDX Trading Leagues. All rights served!
      </p>
    </template>
  </AppDefaultLayout>
</template>

<style scoped>
.unit-header {
  /* Temporary workaround for styles leak from `<AppDialog>` */
  padding-block: 0;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

.unit-header > .search {
  display: none;

  @media (30rem < width) {
    display: block;
  }
}

.unit-body > .navigation {
  padding-block: 1rem;
  padding-inline: 1.5rem;
}

.unit-body > .contents {
  background-color: var(--color-background);
}

.unit-body .link.trade {
  font-size: var(--font-size-small);
  font-weight: 400;
  line-height: var(--line-height-small);

  color: inherit;
}

.unit-body .menu-entry {
  border-radius: 0.375rem;

  padding-block: 0.4375rem;
  padding-inline: 0.5rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  transition: background-color 300ms var(--transition-timing-base);
}

.unit-body .menu-entry:hover {
  background-color: var(--color-background-menu-entry-hover);
}

.unit-body > .footer > .copyright {
  color: var(--color-text-placeholder);
}
</style>
