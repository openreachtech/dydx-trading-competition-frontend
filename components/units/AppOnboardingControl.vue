<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import WalletSelectionDialog from '~/components/dialogs/WalletSelectionDialog.vue'
import KeyDerivationDialog from '~/components/dialogs/KeyDerivationDialog.vue'

import AppOnboardingControlContext from '~/app/vue/contexts/AppOnboardingControlContext'

export default defineComponent({
  components: {
    AppButton,
    WalletSelectionDialog,
    KeyDerivationDialog,
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const walletSelectionDialogRef = ref(null)
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const keyDerivationDialogRef = ref(null)

    const args = {
      props,
      componentContext,
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
  <div>
    <AppButton @click="context.showDialog({
      dialogElement: walletSelectionDialogRef,
    })"
    >
      Connect Wallet
    </AppButton>

    <WalletSelectionDialog ref="walletSelectionDialogRef"
      @next-step="context.goToDerivationStep()"
    />

    <KeyDerivationDialog ref="keyDerivationDialogRef" />
  </div>
</template>
