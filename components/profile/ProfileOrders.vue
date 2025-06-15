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
      class="table"
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

    <AppTable
      class="table mobile"
      :header-entries="context.orderTableMobileHeaderEntries"
      :entries="context.generateOrderTableEntries()"
      min-width="15rem"
    >
      <template
        #body-status="{
          row,
        }"
      >
        <span class="unit-column mobile status">
          <span class="status">
            {{ row.status.toLowerCase() }}
          </span>
          <span class="fill">
            <span class="size">
              {{
                context.generateDisplayedFillSize({
                  totalFilled: row.totalFilled,
                  size: row.size,
                })
              }}
            </span>
            <span class="ticker">
              {{ row.ticker }}
            </span>
          </span>
        </span>
      </template>

      <template
        #body-price="{
          row,
        }"
      >
        <span class="unit-column mobile price">
          <span class="price">
            <span
              class="side"
              :class="{
                buy: context.isBuySide({
                  side: row.side,
                }),
                sell: context.isSellSide({
                  side: row.side,
                }),
              }"
            >
              {{ row.side.toLowerCase() }}
            </span>
            <span class="connector">@</span>
            <span class="price">
              {{
                context.formatCurrency({
                  figure: row.price,
                })
              }}
            </span>
          </span>
          <span class="type">
            {{ row.type.toLowerCase() }}
          </span>
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

/* UI for the table on mobile. */
.unit-container > .table:not(.mobile) {
  @media (width < 60rem) {
    display: none;
  }
}

.unit-container > .table.mobile {
  @media (60rem <= width) {
    display: none;
  }
}

.unit-column.mobile.status {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-column.mobile.status > .status {
  text-transform: capitalize;
}

.unit-column.mobile.status > .fill {
  font-size: var(--font-size-small);
}

.unit-column.mobile.status > .fill > .size {
  color: var(--color-text-tertiary);
}

.unit-column.mobile.status > .fill > .ticker {
  --color-background-ticker: var(--palette-layer-6);

  margin-inline-start: 0.25rem;

  border-radius: 0.25rem;

  padding-block: 0.125rem;
  padding-inline: 0.25rem;

  font-size: var(--font-size-mini);
  text-transform: capitalize;

  background-color: var(--color-background-ticker);
}

.unit-column.mobile.price {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-column.mobile.price > .price {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}

.unit-column.mobile.price > .price > .side {
  --color-text-side-buy: var(--palette-green);
  --color-text-side-sell: var(--palette-red);

  text-transform: capitalize;
}

.unit-column.mobile.price > .price > .side.buy {
  color: var(--color-text-side-buy);
}

.unit-column.mobile.price > .price > .side.sell {
  color: var(--color-text-side-sell);
}

.unit-column.mobile.price > .price > .connector {
  color: var(--color-text-tertiary);
}

.unit-column.mobile.price > .type {
  font-size: var(--font-size-small);

  text-transform: capitalize;

  color: var(--color-text-tertiary);
}
</style>
