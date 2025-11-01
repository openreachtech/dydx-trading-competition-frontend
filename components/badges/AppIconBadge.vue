<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppBadge from '~/components/units/AppBadge.vue'

import AppIconBadgeContext from '~/app/vue/contexts/badges/AppIconBadgeContext'

export default defineComponent({
  components: {
    AppBadge,
    Icon,
  },

  props: {
    ...AppIconBadgeContext.sharedProps,
    iconName: {
      type: String,
      required: false,
      default: '',
    },
    iconSize: {
      type: String,
      required: false,
      default: '',
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
    const context = AppIconBadgeContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppBadge
    v-bind="context.props"
    :class="{
      'show-icon': context.shouldShowIcon(),
    }"
  >
    <slot name="indicator">
      <span class="indicator">
        <span class="dot" />

        <Icon
          :name="context.props.iconName"
          :size="context.props.iconSize"
        />
      </span>
    </slot>

    <slot />
  </AppBadge>
</template>

<style>
/* TODO: Style with @layer */
.unit-badge > .indicator {
  border-radius: var(--size-radius-rounded);

  padding-block: 0.125rem;
  padding-inline: 0.125rem;

  width: 1rem;
  height: 1rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-badge > .indicator > .dot {
  border-radius: var(--size-radius-rounded);

  width: 0.5rem;
  height: 0.5rem;

  background-color: currentColor;
}

/* Display or hide icon */
.unit-badge.show-icon > .indicator > .dot {
  display: none;
}

.unit-badge:not(.show-icon) > .indicator > :not(.dot) {
  display: none;
}

/* Severities */
.unit-badge.info > .indicator {
  background-color: var(--color-background-badge-indicator-info);
}

.unit-badge.success > .indicator {
  background-color: var(--color-background-badge-indicator-success);
}

.unit-badge.warn > .indicator {
  background-color: var(--color-background-badge-indicator-warn);
}

.unit-badge.neutral > .indicator {
  background-color: var(--color-background-badge-indicator-neutral);
}

.unit-badge.completed > .indicator {
  background-color: var(--color-background-badge-indicator-completed);
}

.unit-badge.canceled > .indicator {
  background-color: var(--color-background-badge-indicator-canceled);
}
</style>
