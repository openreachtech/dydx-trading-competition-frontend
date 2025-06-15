<script>
import {
  defineComponent,
} from 'vue'

import FuroTabLayout from '@openreachtech/furo-nuxt/lib/components/FuroTabLayout.vue'

export default defineComponent({
  name: 'AppTabLayout',

  components: {
    FuroTabLayout,
  },

  inheritAttrs: false,

  setup (props) {
    return {
      props,
    }
  },
})
</script>

<template>
  <FuroTabLayout
    class="design"
    v-bind="$attrs"
  >
    <template #contents>
      <slot name="contents" />
    </template>
  </FuroTabLayout>
</template>

<!-- can not use scoped here -->
<style>
@layer app {
  .furo-layout.tab.design > .tabs {
    border-block-end-width: var(--size-thinnest);
    border-block-end-style: solid;
    border-block-end-color: var(--color-border);

    overflow-x: auto;

    gap: 2rem;
  }

  .furo-layout.tab.design > .tabs > .tab {
    border-block-end-width: 0.125rem;
    border-block-end-style: solid;
    border-block-end-color: transparent;

    padding-block: 0 0.75rem;
    padding-inline: 1rem;

    font-size: var(--font-size-small);
    font-weight: 500;

    white-space: nowrap;

    background-color: transparent;
    color: var(--color-text-tertiary);

    transition: color 250ms var(--transition-timing-base),
      border-color 150ms var(--transition-timing-base);

    @media (48rem < width) {
      font-size: var(--font-size-base);
    }
  }

  .furo-layout.tab.design > .tabs > .tab:hover {
    color: var(--color-text-primary);
  }

  .furo-layout.tab.design > .tabs > .tab.active {
    border-block-end-color: var(--color-border-tab-active);

    color: var(--color-text-primary);

    pointer-events: none;
  }
}
</style>
