<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'
import AppMessage from '~/components/units/AppMessage.vue'

import useWalletStore from '~/stores/wallet'
import useAccountStore from '~/stores/account'

import {
  DERIVATION_STATUS_HASH,
} from '~/app/constants'

import KeyDerivationDialogContext from '~/app/vue/contexts/dialogs/KeyDerivationDialogContext'

export default defineComponent({
  components: {
    Icon,
    AppButton,
    AppDialog,
    AppMessage,
  },

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()
    const accountStore = useAccountStore()

    // Actual value is `AppDialog` but type declaration is `FuroDialog`.
    /** @type {import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>} */
    const dialogComponentRef = ref(null)
    /** @type {import('vue').Ref<string | null>} */
    const errorMessageRef = ref(null)
    /** @type {import('vue').Ref<(typeof DERIVATION_STATUS_HASH)[keyof typeof DERIVATION_STATUS_HASH]>} */
    const derivationStatusRef = ref(DERIVATION_STATUS_HASH.PENDING)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      walletStore,
      accountStore,
      errorMessageRef,
      derivationStatusRef,
    }
    const context = KeyDerivationDialogContext.create(args)
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
        <img :src="context.generateWalletIconSource()"
          alt="MetaMask"
          class="image"
        >

        <span>Sign Message</span>
      </span>
    </template>

    <template #contents>
      <div class="unit-contents">
        <p class="description">
          Signatures are used to verify your ownership and to confirm wallet
          compatibility. New users will receive two signature requests.
        </p>

        <div v-for="(loader, index) of context.derivationLoaders"
          :key="index"
          class="unit-loader"
          :class="context.generateLoaderClasses({
            status: loader.corespondingStatus,
          })"
        >
          <div class="content">
            <span class="caption">
              {{ loader.caption }}
            </span>
            <p class="description">
              {{ loader.description }}
            </p>
          </div>

          <Icon name="svg-spinners:90-ring-with-bg"
            size="2rem"
            class="icon loading"
          />

          <Icon name="heroicons:check-circle"
            size="2rem"
            class="icon done"
          />
        </div>

        <AppMessage variant="box"
          severity="error"
          :is-hidden="!context.errorMessage"
        >
          {{ context.errorMessage }}
        </AppMessage>

        <div class="actions">
          <span class="note">
            Signing is free and will not send a transaction.
          </span>

          <AppButton class="button"
            @click="context.deriveKeys()"
          >
            Send Request
          </AppButton>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  max-width: 23rem;
}

.unit-title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  color: var(--color-text-primary);
}

.unit-title > .image {
  width: 1.25rem;
  height: 1.25rem;
}

.unit-contents {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-contents > .description {
  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-tertiary);
}

.unit-contents > .actions {
  border-radius: 0.5rem;

  text-align: center;

  display: flex;
  flex-direction: column;

  background-color: var(--color-background);
}

.unit-contents > .actions > .note {
  padding-block: 1rem;
  padding-inline: 1rem;

  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);

  color: var(--color-text-tertiary);
}

.unit-contents > .actions > .button {
  text-align: center;

  justify-content: center;
}

.unit-loader {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;

  border-radius: 0.5rem;

  padding-block: 0.75rem;
  padding-inline: 0.75rem;

  background-color: var(--color-background-skeleton);
}

.unit-loader > .content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-loader > .content > .caption {
  font-size: var(--font-size-base);

  color: var(--color-text-secondary);
}

.unit-loader > .content > .description {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-loader > .icon.loading {
  color: var(--color-text-tertiary);
}

.unit-loader > .icon.done {
  color: var(--color-text-message-success);
}

.unit-loader.hidden {
  display: none;
}

.unit-loader.done > .icon.loading {
  display: none;
}

.unit-loader:not(.done) > .icon.done {
  display: none;
}
</style>
