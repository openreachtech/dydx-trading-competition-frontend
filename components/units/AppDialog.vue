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
          <slot name="title"
            :title="context.title"
          >
            <span class="title">{{
              context.title
            }}</span>
          </slot>

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
    justify-content: start;
    align-items: stretch;

    background-color: var(--color-background-dialog);

    animation: fade-in 150ms var(--transition-timing-base) forwards;
  }

  .furo-dialog:not([open]).design {
    animation: fade-out 150ms var(--transition-timing-base) forwards;
  }

  .unit-header {
    padding-block-end: 0.75rem;

    display: flex;
    justify-content: space-between;
    gap: 0.5rem;
  }

  .unit-header:has(> .title:empty) {
    /* Make sure close button is at the end if there's no title. */
    justify-content: end;
  }

  .unit-header > .title {
    font-size: var(--font-size-medium);
    font-weight: 500;
    line-height: var(--size-line-height-medium);

    color: var(--color-text-secondary);
  }

  .unit-header:has(> .title:empty) > .title {
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

  @keyframes fade-in {
    0% {
      opacity: 0;
      display: none;
      transform: scale(0.95);
    }

    100% {
      opacity: 1;
      display: block;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
      display: block;
    }

    100% {
      opacity: 0;
      display: none;
      transform: scale(0.95);
    }
  }
}
</style>
