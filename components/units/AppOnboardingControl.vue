<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppWalletAccount from '~/components/units/AppWalletAccount.vue'
import WalletSelectionDialog from '~/components/dialogs/WalletSelectionDialog.vue'
import KeyDerivationDialog from '~/components/dialogs/KeyDerivationDialog.vue'

import useAccountStore from '~/stores/account'

import AppOnboardingControlContext from '~/app/vue/contexts/AppOnboardingControlContext'

export default defineComponent({
  components: {
    AppButton,
    AppWalletAccount,
    WalletSelectionDialog,
    KeyDerivationDialog,
  },

  setup (
    props,
    componentContext
  ) {
    const accountStore = useAccountStore()

    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const walletSelectionDialogRef = ref(null)
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const keyDerivationDialogRef = ref(null)

    const args = {
      props,
      componentContext,
      accountStore,
      walletSelectionDialogRef,
      keyDerivationDialogRef,
    }
    const context = AppOnboardingControlContext.create(args)
      .setupComponent()

    return {
      walletSelectionDialogRef,
      keyDerivationDialogRef,

      context,
    }
  },
})
</script>

<template>
  <div class="unit-onboarding"
    :class="context.generateOnboardingControlClasses()"
  >
    <AppButton class="button connect"
      @click="context.showDialog({
        dialogElement: walletSelectionDialogRef,
      })"
    >
      Connect Wallet
    </AppButton>

    <AppWalletAccount class="account"
      @show-key-derivation-dialog="context.showDialog({
        dialogElement: keyDerivationDialogRef,
      })"
    />

    <WalletSelectionDialog ref="walletSelectionDialogRef"
      @next-step="context.goToDerivationStep()"
    />

    <KeyDerivationDialog ref="keyDerivationDialogRef" />
  </div>
</template>

<style scoped>
.unit-onboarding:not(.connected) > .account {
  display: none;
}

.unit-onboarding.connected > .button.connect {
  display: none;
}
</style>
