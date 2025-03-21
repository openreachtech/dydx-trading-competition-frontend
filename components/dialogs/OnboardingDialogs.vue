<script>
import {
  defineComponent,
  ref,
} from 'vue'

import WalletSelectionDialog from '~/components/dialogs/WalletSelectionDialog.vue'
import KeyDerivationDialog from '~/components/dialogs/KeyDerivationDialog.vue'

import useWalletStore from '~/stores/wallet'

import OnboardingDialogsContext from './OnboardingDialogsContext'

export default defineComponent({
  components: {
    WalletSelectionDialog,
    KeyDerivationDialog,
  },

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const walletSelectionDialogRef = ref(null)
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const keyDerivationDialogRef = ref(null)

    const args = {
      props,
      componentContext,
      walletStore,
      walletSelectionDialogRef,
      keyDerivationDialogRef,
    }
    const context = OnboardingDialogsContext.create(args)
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
  <div class="unit-dialogs">
    <WalletSelectionDialog ref="walletSelectionDialogRef"
      @next-step="context.goToDerivationStep()"
    />

    <KeyDerivationDialog ref="keyDerivationDialogRef" />
  </div>
</template>

<style scoped>
.unit-dialogs {
  display: contents;
}
</style>
