<script>
/*
 * <AppDialog> is defined to unify the design of dialogs used throughout the application.
 */

import {
  defineComponent,
  ref,
} from 'vue'

import {
  FuroButtonDialogContext,
} from '@openreachtech/furo-nuxt'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'

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

    const context = FuroButtonDialogContext.create({
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
    border-radius: 0.75rem;

    padding-block: 1rem;
    padding-inline: 2rem;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    background-color: #eee;
  }
}
</style>
