<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppLeagueCountdownContext from './AppLeagueCountdownContext'

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    shouldHideIcon: {
      type: Boolean,
      required: false,
      default: false,
    },
    iconName: {
      type: String,
      required: false,
      default: 'heroicons:clock',
    },
    /**
     * Must use `rem`.
     */
    iconSize: {
      type: String,
      default: '0.875rem',
      required: false,
      /** @type {(value: string) => boolean} */
      validator: value => /^\d*\.?\d+rem$/u.test(value),
    },
    schedules: {
      /** @type {import('vue').PropType<import('./AppLeagueCountdownContext').AppLeagueCountdownProps['schedules']>} */
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
    const context = AppLeagueCountdownContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span
    class="unit-countdown"
    :class="context.generateCountdownClasses()"
  >
    <Icon
      :name="context.iconName"
      :size="context.iconSize"
      class="icon"
    />

    <span>{{ context.generateCountdownText() }}</span>
  </span>
</template>

<style scoped>
.unit-countdown {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-countdown.hide-icon > .icon {
  display: none;
}
</style>
