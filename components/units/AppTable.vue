<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppTableContext from '~/app/vue/contexts/AppTableContext'

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    entries: {
      type: Array,
      required: true,
    },
    headerEntries: {
      type: Array,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Min width for table, must use `rem`.
     */
    minWidth: {
      type: String,
      required: false,
      default: '40rem',
      /** @type {(value: string) => boolean} */
      validator: value => /^\d*\.?\d+rem$/u.test(value),
    },
    shouldHideHeaderCells: {
      type: Boolean,
      required: false,
      default: false,
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
    const context = AppTableContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-table-container"
    :class="{
      empty: context.isEmpty(),
      loading: context.isLoading,
    }"
  >
    <slot name="header" />

    <div class="scroll-container">
      <table class="unit-table"
        :style="{
          minWidth: context.minWidth,
        }"
      >
        <thead class="thead">
          <tr class="row">
            <th v-for="headerEntry of context.headerEntries"
              :key="headerEntry.key"
              class="cell head"
              :class="context.generateCellClasses({
                columnOptions: headerEntry.columnOptions,
              })"
            >
              <slot :label="headerEntry.label"
                :property="headerEntry.key"
                :name="`head-${headerEntry.key}`"
              >
                {{ headerEntry.label }}
              </slot>
            </th>
          </tr>
        </thead>

        <tbody class="tbody">
          <tr v-for="(row, index) of context.entries"
            :key="index"
            class="row"
          >
            <td v-for="entry of context.headerEntries"
              class="cell"
              :class="context.generateCellClasses({
                columnOptions: entry.columnOptions,
              })"
            >
              <slot :name="`body-${entry.key}`"
                :row="row"
                :value="row[entry.key]"
                :index="index"
              >
                {{ row[entry.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="empty-container">
      <slot name="empty">
        <div class="unit-empty">
          <Icon name="heroicons:table-cells"
            size="2rem"
          />

          <p class="description">
            No records found.
          </p>
        </div>
      </slot>
    </div>

    <div class="loading-container">
      <slot name="loading">
        <div class="unit-loading">
          <Icon name="svg-spinners:90-ring-with-bg"
            size="1.5rem"
          />
        </div>
      </slot>
    </div>

    <slot name="footer" />
  </div>
</template>

<style scoped>
.unit-table-container {
  border-radius: 0.875rem;
  overflow: hidden;

  padding-block: 1.5rem 0.5rem;
  padding-inline: 1.75rem;

  background-color: var(--color-background-table);
}

.unit-table-container > .scroll-container {
  overflow: auto;
}

.unit-table-container:has(.cell.head.hide-head) {
  padding-block-start: 0.5rem;
}

.unit-table {
  border-collapse: collapse;

  width: 100%;
}

.unit-table > .thead > .row > .cell.head {
  padding-block-end: 1rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-table > .thead > .row > .cell.head.hide-head {
  display: none;
}

.unit-table > .tbody > .row > .cell {
  padding-block: 0.75rem;
}

.unit-table > :where(.thead, .tbody) > .row > .cell {
  border-block-end-width: var(--size-thinnest);
  border-block-end-style: solid;
  border-block-end-color: var(--color-border-table-row);

  padding-inline-end: 1rem;
}

.unit-table > .tbody > .row:last-of-type > .cell {
  border-block-end-color: transparent;
}

.unit-table > :where(.thead, .tbody) > .row > .cell:last-of-type {
  padding-inline-end: 0;
}

/* Column options */
.unit-table > :where(.thead, .tbody) > .row > :where(.cell, .cell.text-start) {
  text-align: start;
}

.unit-table > :where(.thead, .tbody) > .row > .cell.text-end {
  text-align: end;
}

.unit-table > :where(.thead, .tbody) > .row > .cell.text-center {
  text-align: center;
}

.unit-table-container:not(.empty) > .empty-container {
  display: none;
}

.unit-empty {
  border-radius: inherit;

  padding-block: 2rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  min-height: 14rem;

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-empty > .description {
  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-table-container:not(.loading) > .loading-container {
  display: none;
}

.unit-table-container.loading > .scroll-container > .unit-table > .tbody,
.unit-table-container.loading > .empty-container {
  display: none;
}

.unit-loading {
  border-radius: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-block: 2rem;
  padding-inline: 1rem;

  min-height: 14rem;

  color: var(--color-text-secondary);
}
</style>
