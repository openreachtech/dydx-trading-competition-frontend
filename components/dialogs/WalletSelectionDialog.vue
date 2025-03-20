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
import AppDialog from '~/components/units/AppDialog.vue'

import useWalletStore from '~/stores/wallet'
import useAccountStore from '~/stores/account'

import WalletSelectionDialogContext from '~/app/vue/contexts/dialogs/WalletSelectionDialogContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppButton,
    AppDialog,
  },

  emits: [
    'nextStep',
  ],

  setup (
    props,
    componentContext
  ) {
    // NOTE: Actualy type is `AppDialog` but type declaration is `FuroDialog`.
    /** @type {import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>} */
    const dialogComponentRef = ref(null)
    const walletStore = useWalletStore()
    const accountStore = useAccountStore()

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      walletStore,
      accountStore,
    }
    const context = WalletSelectionDialogContext.create(args)
      .setupComponent()

    return {
      dialogComponentRef,
      context,
    }
  },
})
</script>

<template>
  <AppDialog ref="dialogComponentRef"
    class="unit-dialog"
  >
    <template #title>
      <span class="unit-title">
        Connect Your Wallet
      </span>
    </template>

    <template #contents>
      <div class="unit-contents">
        <p class="description">
          By connecting a wallet, you agree to DYDX Foundation
          <NuxtLink to="#"
            class="link"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
          </NuxtLink>
          and consent to its
          <NuxtLink to="#"
            class="link"
            external
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </NuxtLink>
        </p>

        <div class="actions">
          <AppButton v-for="it of context.generateDisplayedWallets()"
            variant="neutral"
            @click="context.selectWallet({
              connector: it,
            })"
          >
            <template #startIcon>
              <img :src="it.imageUrl"
                :alt="it.name"
                class="image wallet"
              >
            </template>

            <template #default>
              {{ it.name }}
            </template>
          </AppButton>
        </div>

        <NuxtLink class="link"
          to="#"
        >
          <span>
            Learn about wallet
          </span>

          <Icon name="heroicons-outline:external-link"
            size="1rem"
          />
        </NuxtLink>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  max-width: 30rem;

  padding-block: 1.25rem;
  padding-inline: 1.5rem;
}

.unit-title {
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  color: var(--color-text-primary);
}

.unit-contents {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-contents > .description {
  font-size: var(--font-size-small);

  color: var(--color-text-placeholder);
}

.unit-contents > .description > .link {
  font-weight: 700;

  color: inherit;
}

.unit-contents > .description > .link:hover {
  text-decoration: underline;
}

.unit-contents > .actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.75rem;
}

.unit-contents > .actions .image.wallet {
  width: 1.25rem;
  height: 1.25rem;
}

.unit-contents > .link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  align-self: center;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-contents > .link:hover {
  color: var(--color-text-primary);
}
</style>
