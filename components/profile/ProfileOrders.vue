<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppTable from '~/components/units/AppTable.vue'

import ProfileOrdersContext from './ProfileOrdersContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppTable,
  },

  props: {
    profileOrders: {
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
    const context = ProfileOrdersContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <AppTable
      :header-entries="context.orderTableHeaderEntries"
      :entries="context.generateOrderTableEntries()"
    >
      <template
        #body-ticker="{
          value,
        }"
      >
        <NuxtLink
          class="unit-column ticker"
          :to="context.generateTickerUrl({
            ticker: value,
          })"
          external
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ value }}
        </NuxtLink>
      </template>

      <template
        #body-type="{
          value,
        }"
      >
        <span class="unit-column type">
          {{ value.toLowerCase() }}
        </span>
      </template>

      <template
        #body-side="{
          value,
        }"
      >
        <span
          class="unit-column side"
          :class="{
            buy: context.isBuySide({
              side: value,
            }),
            sell: context.isSellSide({
              side: value,
            }),
          }"
        >
          {{ value.toLowerCase() }}
        </span>
      </template>

      <template
        #body-orderValue="{
          value,
        }"
      >
        {{
          context.formatCurrency({
            figure: value,
          })
        }}
      </template>

      <template
        #body-price="{
          value,
        }"
      >
        <span class="unit-column price">
          {{
            context.formatCurrency({
              figure: value,
            })
          }}
        </span>
      </template>

      <template
        #body-triggerPrice="{
          value,
        }"
      >
        <span
          class="unit-column trigger-price"
          :class="{
            null: context.isNullish({
              value,
            }),
          }"
        >
          {{
            context.formatCurrency({
              figure: value,
            })
          }}
        </span>
      </template>

      <template
        #body-marginMode="{
          value,
        }"
      >
        <span class="unit-column margin-mode">
          {{ value }}
        </span>
      </template>

      <template
        #body-goodTilBlockTime="{
          value,
        }"
      >
        <span>
          {{
            context.formatRelativeTime({
              timestamp: value,
            })
          }}
        </span>
      </template>
    </AppTable>
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 2rem;
}

.unit-column.ticker {
  white-space: nowrap;

  color: var(--color-text-secondary);
}

.unit-column.ticker:hover {
  text-decoration: underline;
}

.unit-column.type {
  text-transform: capitalize;
}

.unit-column.side {
  --color-text-side-buy: var(--palette-green);
  --color-text-side-sell: var(--palette-red);
  --color-background-side-buy: var(--palette-green-faded);
  --color-background-side-sell: var(--palette-red-faded);

  border-radius: 0.25rem;

  padding-block: 0.125rem;
  padding-inline: 0.25rem;

  font-size: var(--font-size-small);

  text-transform: capitalize;
}

.unit-column.side.buy {
  color: var(--color-text-side-buy);
  background-color: var(--color-background-side-buy);
}

.unit-column.side.sell {
  color: var(--color-text-side-sell);
  background-color: var(--color-background-side-sell);
}

.unit-column.trigger-price.null {
  color: var(--color-text-placeholder);
}

.unit-column.margin-mode {
  --color-background-margin-mode: var(--palette-layer-6);

  border-radius: 0.25rem;

  padding-block: 0.125rem;
  padding-inline: 0.25rem;

  font-size: var(--font-size-small);
  text-transform: capitalize;

  background-color: var(--color-background-margin-mode);
}
</style>
