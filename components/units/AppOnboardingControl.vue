<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import WalletSelectionDialog from '~/components/dialogs/WalletSelectionDialog.vue'

import AppOnboardingControlContext from '~/app/vue/contexts/AppOnboardingControlContext'

export default defineComponent({
  components: {
    AppButton,
    WalletSelectionDialog,
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const walletSelectionDialogRef = ref(null)

    const args = {
      props,
      componentContext,
    }
    const context = AppOnboardingControlContext.create(args)
      .setupComponent()

    return {
      walletSelectionDialogRef,

      context,
    }
  },
})
</script>

<template>
  <div>
    <AppButton @click="context.showWalletSelectionDialog({
      dialogElement: walletSelectionDialogRef,
    })"
    >
      Connect Wallet
    </AppButton>

    <WalletSelectionDialog ref="walletSelectionDialogRef" />
  </div>
</template>
