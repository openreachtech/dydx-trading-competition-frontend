<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppTooltip from '~/components/units/AppTooltip.vue'

import LinkTooltipButtonContext from '~/app/vue/contexts/buttons/LinkTooltipButtonContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppTooltip,
  },

  inheritAttrs: false,

  props: {
    tooltipMessage: {
      type: String,
      required: true,
    },
    tooltipPosition: {
      type: /** @type {import('vue').PropType<import('~/app/vue/contexts/AppTooltipContext').TooltipPosition>} */ (String),
      required: false,
      default: 'top',
    },
    href: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      default: 'heroicons-outline:external-link',
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
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = LinkTooltipButtonContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppTooltip :message="context.tooltipMessage"
    :position="context.tooltipPosition"
  >
    <template #contents>
      <NuxtLink :to="context.href"
        class="link"
        v-bind="$attrs"
      >
        <slot>
          <Icon :name="context.iconName"
            :size="context.iconSize"
          />
        </slot>
      </NuxtLink>
    </template>
  </AppTooltip>
</template>

<style scoped>
.link {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.link:hover {
  color: var(--color-text-primary);
}
</style>
