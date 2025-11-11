<script>
import {
  defineComponent,
} from 'vue'

import RelativeRegistrationPeriodCaptionContext from './RelativeRegistrationPeriodCaptionContext'

export default defineComponent({
  props: {
    schedules: {
      type: Array,
      required: true,
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
    const context = RelativeRegistrationPeriodCaptionContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span class="unit-caption">
    <slot name="startIcon" />

    <span class="text">
      {{ context.generateCaption() }}
    </span>
  </span>
</template>

<style scoped>
.unit-caption {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-caption:has(> .text:empty) {
  display: none;
}
</style>
