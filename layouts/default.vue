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

import DefaultLayoutContext from '~/layouts/DefaultLayoutContext'

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

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = DefaultLayoutContext.create(args)

    return {
      context,
    }
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
      <NuxtLink
        :to="context.dydxTradeCtaUrl"
        external
        target="_blank"
        rel="noopener noreferrer"
        class="link trade menu-entry"
      >
        <Icon
          name="heroicons-solid:home"
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
      <div class="unit-footer">
        <p class="copyright">
          <span>
            © 2025 Crypto Learning Club | dYdX Validator. All rights reserved.
          </span><NuxtLink
            to="/terms"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            Terms of Use
          </NuxtLink>
        </p>

        <ul class="links">
          <li
            v-for="(platform, index) of context.socialPlatforms"
            :key="index"
            class="entry"
          >
            <NuxtLink
              :to="platform.href"
              external
              rel="noopener noreferrer"
              target="_blank"
              class="link"
            >
              <Icon
                :name="platform.iconName"
                class="icon"
              />
            </NuxtLink>
          </li>
          <li
            v-for="(platform, index) of context.dydxPlatforms"
            :key="index"
            class="entry"
          >
            <NuxtLink
              :to="platform.href"
              external
              rel="noopener noreferrer"
              target="_blank"
              class="link"
            >
              <img
                :src="platform.imageUrl"
                :alt="platform.name"
                class="icon image"
              >
            </NuxtLink>
          </li>
        </ul>
      </div>
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

  @media (60rem < width) {
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

.unit-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.unit-footer > .copyright {
  font-weight: 500;

  text-align: center;

  color: var(--color-text-placeholder);
}

.unit-footer > .copyright > .link {
  font-weight: 500;
  color: var(--color-text-tertiary);
}

.unit-footer > .copyright > .link:hover {
  text-decoration: underline;
}

.unit-footer > .links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.unit-footer > .links > .entry > .link {
  color: var(--color-text-placeholder);

  display: inline-flex;
  justify-content: center;
  align-items: center;

  transition: color 250ms var(--transition-timing-base);
}

.unit-footer > .links > .entry:hover > .link {
  color: var(--color-text-primary);
}

.unit-footer > .links > .entry > .link > .icon {
  height: 1rem;
  width: 1rem;
}

.unit-footer > .links > .entry > .link > .icon.image {
  filter: grayscale(1) brightness(0.8);
  transition: filter 250ms var(--transition-timing-base);
}

.unit-footer > .links > .entry:hover > .link > .icon.image {
  filter: grayscale(0) brightness(1.2);
}
</style>
