<script>
import {
  defineComponent,
} from 'vue'

import AppToast from '~/components/toast/AppToast.vue'

import useToastStore from '~/stores/toast'

import ToastContainerContext from './AppToastContainerContext'

export default defineComponent({
  components: {
    AppToast,
  },

  setup (
    props,
    componentContext
  ) {
    const toastStore = useToastStore()

    const args = {
      props,
      componentContext,
      toastStore,
    }
    const context = ToastContainerContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-toasts">
    <ul class="toasts">
      <TransitionGroup name="toast">
        <li
          v-for="it of context.toasts"
          :key="it.id"
          class="entry"
        >
          <AppToast v-bind="it" />
        </li>
      </TransitionGroup>
    </ul>
  </div>
</template>

<style scoped>
.unit-toasts {
  position: fixed;

  /* TODO: Other toast positions should be configurable. */
  inset-block-end: 0;
  inset-inline: 0;

  z-index: calc(var(--value-z-index-layer-overlay) + 0);

  @media (48rem < width) {
    inset-block-end: 1.5rem;
    inset-inline: auto 1.5rem;
  }
}

.unit-toasts > .toasts {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-toasts > .toasts > .entry {
  @media (48rem < width) {
    inline-size: 28rem;
  }
}

.toast-move,
.toast-enter-active,
.toast-leave-active {
  transition: transform 150ms var(--transition-timing-base),
    opacity 150ms var(--transition-timing-base);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(1rem);
}

.toast-leave-active:not(:first-of-type) {
  position: absolute;
}
</style>
