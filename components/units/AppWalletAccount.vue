<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import useWalletStore from '~/stores/wallet'
import useAccountStore from '~/stores/account'

import vOnClickOutside from '~/app/vue/directives/vOnClickOutside'

import WalletAccountContext from '~/app/vue/contexts/AppWalletAccountContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppButton,
    CopyButton,
    LinkTooltipButton,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },

  emits: [
    'showKeyDerivationDialog',
  ],

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()
    const accountStore = useAccountStore()

    const isShowingDropdownRef = ref(false)

    const args = {
      props,
      componentContext,
      walletStore,
      accountStore,
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
      <img :src="context.generateWalletImageUrl()"
        alt="Wallet Icon"
        class="image"
      >

      <span>{{ context.generateSourceAccountAddress() }}</span>

      <Icon name="heroicons:chevron-down-16-solid"
        size="1rem"
        class="icon"
      />
    </button>

    <div class="unit-dropdown">
      <div class="address">
        <div class="unit-chain">
          <img src="~/assets/img/address-icon.svg"
            alt="dYdX Chain Address"
            class="image"
          >

          <div class="details">
            <span class="label">dYdX Chain Address</span>

            <span class="content">
              <span>{{ context.generateLocalAccountAddress() }}</span>
              <CopyButton :content-to-copy="context.localWalletAddress" />
              <LinkTooltipButton tooltip-message="View on Mintscan"
                href="https://www.mintscan.io"
              />
            </span>
          </div>
        </div>

        <div class="connector" />

        <div class="unit-chain">
          <img :src="context.generateWalletImageUrl()"
            alt="Wallet Icon"
            class="image"
          >

          <div class="details">
            <span class="label">Source address</span>
            <span class="content">
              {{ context.generateSourceAccountAddress() }}
            </span>
          </div>
        </div>
      </div>

      <div class="reconnect">
        <p class="note">
          Welcome back! One or more of your keys needs to be recovered
        </p>

        <AppButton type="button"
          class="button"
          @click="context.showKeyDerivationDialog()"
        >
          Recover keys
        </AppButton>
      </div>

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
        <NuxtLink class="link"
          :to="context.generateProfileUrl()"
        >
          <Icon name="heroicons:user"
            size="1rem"
          />

          <span>My league profile</span>
        </NuxtLink>

        <NuxtLink to="https://dydx.trade"
          external
          target="_blank"
          rel="noopener noreferrer"
          class="link"
        >
          <Icon name="heroicons:home-solid"
            size="1rem"
          />

          <span>Open dydx.trade</span>
        </NuxtLink>

        <button class="button"
          @click="context.attemptWalletDisconnection()"
        >
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

.unit-account > .button > .image {
  width: 1.25rem;
  height: 1.25rem;
}

.unit-account > .button > .icon {
  transition: transform 150ms var(--transition-timing-base);
}

.unit-account.show-dropdown > .unit-dropdown {
  display: block;

  animation: fade-in 150ms var(--transition-timing-base) forwards;
}

.unit-account:not(.show-dropdown) > .unit-dropdown {
  animation: fade-out 150ms var(--transition-timing-base) forwards;
}

.unit-account.show-dropdown > .button > .icon {
  transform: rotate(180deg);
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

.unit-dropdown > .address {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.unit-dropdown > .address > .connector {
  border-inline-start-width: var(--size-thinnest);
  border-inline-start-style: dashed;
  border-inline-start-color: var(--color-border-default);

  margin-inline-start: 0.75rem;

  height: 1.75rem;
}

.unit-dropdown > .reconnect {
  margin-block-start: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-dropdown > .reconnect > .note {
  font-size: var(--font-size-small);

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-dropdown > .reconnect > .button {
  justify-content: center;

  text-align: center;
}

.unit-account.recovered > .unit-dropdown > .reconnect {
  display: none;
}

.unit-chain {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-chain > .image {
  width: 1.5rem;
  height: 1.5rem;
}

.unit-chain > .details {
  display: inline-flex;
  flex-direction: column;
}

.unit-chain > .details > .label {
  font-size: var(--font-size-mini);
  line-height: var(--size-line-height-mini);

  color: var(--color-text-tertiary);
}

.unit-chain > .details > .content {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-size-base);

  color: var(--color-text-primary);
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

.unit-dropdown > .actions > :where(.button, .link) {
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

.unit-dropdown > .actions > .button:not(:disabled):hover,
.unit-dropdown > .actions > .link[href]:hover {
  filter: brightness(1.4);
}

.unit-dropdown > .actions > .button:disabled,
.unit-dropdown > .actions > .link:not([href]) {
  color: var(--color-text-placeholder);

  cursor: not-allowed;
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
