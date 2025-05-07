<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'
import AppMessage from '~/components/units/AppMessage.vue'

import useWalletStore from '~/stores/wallet'
import useAccountStore from '~/stores/account'

import {
  createStore as createMipdStore,
} from 'mipd'

import WalletSelectionDialogContext from '~/app/vue/contexts/dialogs/WalletSelectionDialogContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppButton,
    AppDialog,
    AppMessage,
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
    /** @type {import('vue').Ref<string | null>} */
    const errorMessageRef = ref(null)
    const walletStore = useWalletStore()
    const accountStore = useAccountStore()
    const mipdStore = createMipdStore()

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      errorMessageRef,
      walletStore,
      accountStore,
      mipdStore,
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
  <AppDialog
    ref="dialogComponentRef"
    class="unit-dialog"
  >
    <template #title>
      <span class="unit-title">
        Connect Your Wallet
      </span>
    </template>

    <template #contents>
      <div class="unit-contents">
        <div class="description">
          <p class="text">
            Select your preferred wallet from the list below and connect.
          </p>
          <p class="text">
            By connecting your wallet, you acknowledge that you have read and
            agreed to the following <NuxtLink
              to="/terms"
              class="link"
              rel="noopener noreferrer"
              target="_blank"
            >
              General Terms of Use
            </NuxtLink>
          </p>
        </div>

        <AppMessage
          variant="box"
          severity="error"
          :is-hidden="!context.errorMessage"
        >
          {{ context.errorMessage }}
        </AppMessage>

        <div class="actions">
          <AppButton
            v-for="it of context.generateDisplayedWallets()"
            variant="neutral"
            @click="context.selectWallet({
              wallet: it,
            })"
          >
            <template #startIcon>
              <img
                :src="it.icon"
                :alt="it.name"
                class="image wallet"
              >
            </template>

            <template #default>
              {{ it.name }}
            </template>
          </AppButton>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
/* Reset  */
p + p {
  margin-block-start: 0;
}

.unit-dialog {
  width: 100%;
  max-width: min(
    calc(100% - (2 * var(--size-body-padding-inline-mobile))),
    30rem
  );

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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: var(--font-size-small);

  color: var(--color-text-placeholder);
}

.unit-contents > .description > .text > .link {
  font-weight: 700;

  color: var(--color-text-tertiary);
}

.unit-contents > .description > .text > .link:hover {
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
