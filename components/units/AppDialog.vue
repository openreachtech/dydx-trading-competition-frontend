<script>
/*
 * <AppDialog> is defined to unify the design of dialogs used throughout the application.
 */

import {
  defineComponent,
  ref,
} from 'vue'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

export default defineComponent({
  name: 'AppDialog',

  components: {
    FuroDialog,
  },

  inheritAttrs: false,

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<FuroDialog | null>} */
    const dialogComponentRef = ref(null)

    const context = AppDialogContext.create({
      props,
      componentContext,
      dialogComponentRef,
    })

    componentContext.expose(
      context.generateExposeHash()
    )

    return {
      dialogComponentRef,
    }
  },
})
</script>

<template>
  <FuroDialog ref="dialogComponentRef"
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>
  </FuroDialog>
</template>

<style>
@layer app {
  .furo-dialog[open].design {
    border-radius: 1.25rem;

    padding-block: 0.75rem 1rem;
    padding-inline: 1.25rem;

    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 0.25rem;

    background-color: var(--color-background-dialog);
  }
}
</style>
