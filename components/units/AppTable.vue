<script>
import {
  defineComponent,
} from 'vue'

import AppTableContext from '~/app/vue/contexts/AppTableContext'

export default defineComponent({
  props: {
    entries: {
      type: Array,
      required: true,
    },
    headerEntries: {
      type: Array,
      required: true,
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
  <div class="unit-table-container">
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
            >
              <slot :name="`body-${entry.key}`"
                :row="row"
                :value="row[entry.key]"
              >
                {{ row[entry.key] }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
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

.unit-table {
  border-collapse: collapse;

  width: 100%;
}

.unit-table > .thead > .row > .cell.head {
  padding-block-end: 1rem;

  text-align: start;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
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
</style>
