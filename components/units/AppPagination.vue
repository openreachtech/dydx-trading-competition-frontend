<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import FuroPagination from '@openreachtech/furo-nuxt/lib/components/FuroPagination.vue'

export default defineComponent({
  name: 'AppPagination',

  components: {
    Icon,
    FuroPagination,
  },

  inheritAttrs: false,

  // NOTE: Redeclare props for autocompletion and information. Shared props are more ideal.
  props: {
    pagination: {
      /**
       * @type {import('vue').PropType<{
       *   limit: number
       *   totalRecords: number
       * }>}
       */
      type: Object,
      default: () => ({
        limit: 20,
        totalRecords: 0,
      }),
      validator: value => {
        if (typeof value !== 'object') {
          return false
        }

        if (value === null) {
          return false
        }

        if (Array.isArray(value)) {
          return false
        }

        return true
      },
    },
    pageKey: {
      type: String,
      default: 'page',
    },
    maxPageRange: {
      type: Number,
      default: 5,
    },
  },

  setup (props) {
    return {
      props,
    }
  },
})
</script>

<template>
  <FuroPagination class="design"
    v-bind="{...$attrs, ...props}"
  >
    <template #previous>
      <slot name="previous">
        <Icon name="heroicons-outline:chevron-left"
          size="1.25rem"
        />
      </slot>
    </template>
    <template #next>
      <slot name="next">
        <Icon name="heroicons-outline:chevron-right"
          size="1.25rem"
        />
      </slot>
    </template>
  </FuroPagination>
</template>

<style>
@layer app {
  .furo-pagination.design {
    gap: 0.25rem;

    color: var(--color-text-tertiary);
  }

  .furo-pagination.design > :where(
    .page,
    .dash,
    .previous,
    .next
  ) {
    border-radius: 0.375rem;

    padding-block: 0.375rem;
    padding-inline: 0.25rem;

    display: flex;
    justify-content: center;
    align-items: center;

    min-width: 2.25rem;
    height: 2.25rem;

    color: inherit;
  }

  .furo-pagination.design > .page {
    font-size: var(--font-size-base);
    font-weight: 500;
  }

  .furo-pagination.design > :where(.page, .previous, .next):hover {
    background-color: var(--color-background-pagination-hover);
  }

  .furo-pagination.design > .page.current {
    background-color: var(--color-background-pagination-active);
    color: var(--color-text-primary);
  }

  .furo-pagination.disabled-previous > .previous,
  .furo-pagination.disabled-next > .next {
    pointer-events: none;

    color: var(--color-text-pagination-disabled);
  }

  .furo-pagination.design > .dash {
    pointer-events: none;
  }

  /* NOTE: Have to redeclare these because `display: flex` on this layer overrides them. */
  .furo-pagination.hidden-first > .first,
  .furo-pagination.hidden-last > .last {
    display: none;
  }

  .furo-pagination.hidden-first-dash > .first.dash,
  .furo-pagination.hidden-last-dash > .last.dash {
    display: none;
  }
}
</style>
