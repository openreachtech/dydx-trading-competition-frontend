<script>
import {
  defineComponent,
} from 'vue'

import AppBadgeContext from '~/app/vue/contexts/badges/AppBadgeContext'

export default defineComponent({
  props: AppBadgeContext.sharedProps,

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AppBadgeContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span
    class="unit-badge"
    :class="[
      context.props.severity,
    ]"
  >
    <slot />
  </span>
</template>

<style scoped>
.unit-badge {
  border-radius: 0.5rem;

  padding-block: 0.375rem;
  padding-inline: 0.75rem 1rem;

  font-size: var(--font-size-base);
  font-weight: 500;

  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

/* Severities */
.unit-badge.info {
  color: var(--color-text-badge-info);
  background-color: var(--color-background-badge-info);
}

.unit-badge.success {
  color: var(--color-text-badge-success);
  background-color: var(--color-background-badge-success);
}

.unit-badge.warn {
  color: var(--color-text-badge-warn);
  background-color: var(--color-background-badge-warn);
}

.unit-badge.neutral {
  color: var(--color-text-badge-neutral);
  background-color: var(--color-background-badge-neutral);
}

.unit-badge.completed {
  color: var(--color-text-badge-completed);
  background-color: var(--color-background-badge-completed);
}

.unit-badge.canceled {
  color: var(--color-text-badge-canceled);
  background-color: var(--color-background-badge-canceled);
}
</style>
