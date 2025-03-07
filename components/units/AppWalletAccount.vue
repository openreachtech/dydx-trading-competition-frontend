<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import vOnClickOutside from '~/app/vue/directives/vOnClickOutside'

import WalletAccountContext from '~/app/vue/contexts/AppWalletAccountContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },

  setup (
    props,
    componentContext
  ) {
    const isShowingDropdownRef = ref(false)

    const args = {
      props,
      componentContext,
      isShowingDropdownRef,
    }
    const context = WalletAccountContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div v-on-click-outside="() => context.closeDropdown()"
    class="unit-account"
    :class="context.generateDropdownClasses()"
  >
    <button class="button"
      @click="context.toggleDropdown"
    >
      <img src="/img/wallets/metamask.svg"
        alt="Metamask"
      >

      <span>0xDcf2ED...d10c</span>

      <Icon name="heroicons:chevron-down-16-solid"
        size="1rem"
      />
    </button>

    <div class="unit-dropdown">
      <div class="balance">
        <span class="label">
          <span>USDC Balance</span>

          <img src="~/assets/img/tokens/usdc.svg"
            alt="USDC"
            class="image"
          >
        </span>

        <span class="figure">
          0.00
        </span>
      </div>

      <div class="actions">
        <NuxtLink class="button">
          <Icon name="heroicons:user"
            size="1rem"
          />

          <span>My league profile</span>
        </NuxtLink>

        <NuxtLink to="https://dydx.trade"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="button"
        >
          <Icon name="heroicons:home-solid"
            size="1rem"
          />

          <span>Open dydx.trade</span>
        </NuxtLink>

        <button class="button">
          <Icon name="heroicons:arrow-right-start-on-rectangle"
            size="1rem"
          />

          <span>Disconnect wallet</span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-account {
  position: relative;
}

.unit-account > .button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-account.show-dropdown > .unit-dropdown {
  display: block;

  animation: fade-in 150ms var(--transition-timing-base) forwards;
}

.unit-account:not(.show-dropdown) > .unit-dropdown {
  animation: fade-out 150ms var(--transition-timing-base) forwards;
}

.unit-dropdown {
  border-radius: 1rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-dropdown);

  padding-block: 1.25rem;
  padding-inline: 1.25rem;

  display: none;

  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;

  width: 17.5rem;

  background-color: var(--color-background-dropdown);
}

.unit-dropdown > .balance {
  margin-block-start: 1.5rem;

  border-radius: 0.5rem;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;

  background-color: var(--color-background-competition-meta);
}

.unit-dropdown > .balance > .label {
  font-size: var(--font-size-mini);
  line-height: var(--size-line-height-mini);

  color: var(--color-text-tertiary);
}

.unit-dropdown > .balance > .label > .image {
  margin-inline-start: 0.25rem;

  display: inline-block;

  width: 0.875rem;
  height: 0.875rem;

  border-radius: 0.375rem;
}

.unit-dropdown > .balance > .figure {
  font-size: var(--font-size-medium);
  line-height: var(--size-line-height-medium);

  color: var(--color-text-primary);
}

.unit-dropdown > .actions {
  margin-block-start: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-dropdown > .actions > .button {
  border-radius: 0.375rem;

  padding-block: 0.4375rem;
  padding-inline: 0.5rem;

  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);

  background-color: var(--color-background-dropdown);
  color: var(--color-text-secondary);

  transition: filter 250ms var(--transition-timing-base);
}

.unit-dropdown > .actions > .button:hover {
  filter: brightness(1.4);
}

@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
    transform: scale(0.9) translateY(-0.5rem);
  }

  100% {
    opacity: 1;
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    display: block;
  }

  100% {
    opacity: 0;
    display: none;
    transform: scale(0.9) translateY(-0.5rem);
  }
}
</style>
