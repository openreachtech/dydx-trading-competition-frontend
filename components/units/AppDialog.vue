<script>
/*
 * <AppDialog> is defined to unify the design of dialogs used throughout the application.
 */

import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import FuroDialog from '@openreachtech/furo-nuxt/lib/components/FuroDialog.vue'

import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

export default defineComponent({
  name: 'AppDialog',

  components: {
    Icon,
    FuroDialog,
  },

  inheritAttrs: false,

  props: {
    title: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
  },

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
      context,
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
      <slot name="header">
        <div class="unit-header">
          <span class="title"
            :class="context.generateTitleClasses()"
          >
            {{ context.title }}
          </span>

          <button class="button close"
            @click="context.dismissDialog()"
          >
            <Icon name="heroicons:x-mark"
              size="1.5rem"
            />
          </button>
        </div>
      </slot>

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
    align-items: stretch;

    background-color: var(--color-background-dialog);
  }
}
</style>

<style scoped>
.unit-header {
  padding-block-end: 0.75rem;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
}

.unit-header > .title {
  font-size: var(--font-size-medium);
  font-weight: 500;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-secondary);
}

.unit-header > .title.hidden {
  display: none;
}

.unit-header > .button.close {
  color: var(--color-text-tertiary);

  justify-self: end;

  transition: color 250ms var(--transition-timing-base);
}

.unit-header > .button.close:hover {
  color: var(--color-text-primary);
}
</style>
