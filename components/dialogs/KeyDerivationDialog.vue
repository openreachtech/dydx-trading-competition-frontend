<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'

import useWalletStore from '~/stores/wallet'
import useAccountStore from '~/stores/account'

import KeyDerivationDialogContext from '~/app/vue/contexts/dialogs/KeyDerivationDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
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

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      walletStore,
      accountStore,
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
        <img src="/img/wallets/metamask.svg"
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

.unit-contents > .description {
  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-tertiary);
}

.unit-contents > .actions {
  margin-block-start: 1rem;

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
</style>
