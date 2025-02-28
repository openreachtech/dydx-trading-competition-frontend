<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import FuroLoadingLayout from '@openreachtech/furo-nuxt/lib/components/FuroLoadingLayout.vue'

export default defineComponent({
  name: 'AppLoadingLayout',

  components: {
    Icon,
    FuroLoadingLayout,
  },

  inheritAttrs: false,

  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<template>
  <FuroLoadingLayout class="design"
    v-bind="{
      ...$attrs,
      ...$props,
    }"
  >
    <template #contents>
      <slot name="contents" />
    </template>

    <template #loader>
      <slot name="loader">
        <div class="unit-loader">
          <Icon name="svg-spinners:90-ring-with-bg"
            size="1.5rem"
          />
        </div>
      </slot>
    </template>
  </FuroLoadingLayout>
</template>

<style scoped>
.unit-loader {
  border-radius: 0.5rem;

  padding-block: 1rem;
  padding-inline: 1rem;

  display: flex;
  justify-content: center;
  align-items: center;

  min-height: 14rem;

  background-color: var(--color-background-skeleton);
}
</style>
