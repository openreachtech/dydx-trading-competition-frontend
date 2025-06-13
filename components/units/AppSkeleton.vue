<script>
import {
  defineComponent,
} from 'vue'

import AppSkeletonContext from '~/app/vue/contexts/AppSkeletonContext'

export default defineComponent({
  props: {
    isRounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    width: {
      type: String,
      required: false,
      default: '100%',
    },
    height: {
      type: String,
      required: false,
      default: '1rem',
    },
    borderRadius: {
      type: String,
      required: false,
      default: '0.625rem',
    },
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AppSkeletonContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="unit-skeleton"
    :style="context.generateSkeletonStyles()"
    aria-hidden="true"
  />
</template>

<style scoped>
.unit-skeleton {
  background-color: var(--color-background-skeleton);

  animation: pulse 2000ms infinite var(--transition-timing-base);
}

@keyframes pulse {
  50% {
    opacity: 50%;
  }
}
</style>
