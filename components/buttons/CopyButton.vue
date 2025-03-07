<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  Icon,
} from '#components'

import AppTooltip from '~/components/units/AppTooltip.vue'

import TimerClerk from '~/app/vue/TimerClerk'

import CopyButtonContext from '~/app/vue/contexts/buttons/CopyButtonContext'

export default defineComponent({
  components: {
    Icon,
    AppTooltip,
  },

  inheritAttrs: false,

  props: {
    tooltipMessage: {
      type: String,
      default: 'Copy',
      required: false,
    },
    /**
     * Set to `null` to use `tooltipMessage` as `tooltipActiveMessage`.
     */
    tooltipActiveMessage: {
      type: String,
      default: 'Copied!',
      required: false,
    },
    iconName: {
      type: String,
      default: 'heroicons-outline:duplicate',
      required: false,
    },
    /**
     * Must use `rem`.
     */
    iconSize: {
      type: String,
      default: '1rem',
      required: false,
      /** @type {(value: string) => boolean} */
      validator: value => /^\d*\.?\d+rem$/u.test(value),
    },
    contentToCopy: {
      type: String,
      required: true,
    },
    tooltipTimeout: {
      type: Number,
      default: 1000,
      required: false,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const statusReactive = reactive({
      isDisplayingTooltip: false,
    })
    const tooltipTimer = TimerClerk.create({
      callback: () => {
        statusReactive.isDisplayingTooltip = false
      },
      // NOTE: `vue/no-setup-props-reactivity-loss` is giving weird error. Have to use IIFE as a workaround.
      timeInMilliseconds: (() => props.tooltipTimeout)(),
    })

    const args = {
      props,
      componentContext,
      statusReactive,
      tooltipTimer,
    }
    const context = CopyButtonContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppTooltip :message="context.tooltipMessage"
    :active-message="context.tooltipActiveMessage"
    :is-active="context.isDisplayingTooltip"
  >
    <template #contents>
      <button class="button"
        v-bind="$attrs"
        @click="context.copyContent()"
      >
        <slot>
          <Icon :name="context.iconName"
            :size="context.iconSize"
          />
        </slot>
      </button>
    </template>
  </AppTooltip>
</template>

<style scoped>
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.button:hover {
  color: var(--color-text-primary);
}
</style>
