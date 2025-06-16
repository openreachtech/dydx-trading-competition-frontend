<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppTable from '~/components/units/AppTable.vue'

import ProfileTradesContext from './ProfileTradesContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppTable,
  },

  props: {
    profileTrades: {
      /** @type {import('vue').PropType<import('./ProfileTradesContext').PropsType['profileTrades']>} */
      type: Array,
      required: true,
    },
    isLoading: {
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
    const context = ProfileTradesContext.create(args)
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
      :header-entries="context.tradeTableHeaderEntries"
      :entries="context.generateTradeTableEntries()"
      :is-loading="context.isLoading"
      min-width="50rem"
    >
      <template
        #body-market="{
          value,
        }"
      >
        <NuxtLink
          :to="context.generateMarketUrl({
            market: value,
          })"
          class="unit-column market"
          external
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ value }}
        </NuxtLink>
      </template>

      <template
        #body-createdAt="{
          value,
        }"
      >
        <time
          class="unit-column created-at"
          :datetime="value"
        >
          {{
            context.formatRelativeTime({
              timestamp: value,
            })
          }}
        </time>
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
        #body-total="{
          value,
        }"
      >
        <span class="unit-column total">
          {{
            context.formatCurrency({
              figure: value,
            })
          }}
        </span>
      </template>

      <template
        #body-fee="{
          value,
        }"
      >
        <span class="unit-column fee">
          {{
            context.formatCurrency({
              figure: value,
            })
          }}
        </span>
      </template>

      <template
        #body-liquidity="{
          value,
        }"
      >
        <span class="unit-column liquidity">
          {{ value.toLowerCase() }}
        </span>
      </template>
    </AppTable>

    <AppTable
      class="table mobile"
      :header-entries="context.tradeTableMobileHeaderEntries"
      :entries="context.generateTradeTableEntries()"
      :is-loading="context.isLoading"
      min-width="20rem"
    >
      <template
        #body-createdAt="{
          value,
        }"
      >
        <time
          class="unit-column mobile created-at"
          :datetime="value"
        >
          {{
            context.formatRelativeTime({
              timestamp: value,
            })
          }}
        </time>
      </template>

      <template
        #body-typeSize="{
          row,
        }"
      >
        <span class="unit-column mobile type-size">
          <span class="type">
            {{ row.type.toLowerCase() }}
          </span>
          <span class="size">
            {{ row.size }}
          </span>
        </span>
      </template>

      <template
        #body-priceFee="{
          row,
        }"
      >
        <span class="unit-column mobile price-fee">
          <span class="valuation">
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

          <span class="commission">
            <span class="liquidity">
              {{ row.liquidity.toLowerCase() }}
            </span>
            <span class="fee">
              {{
                context.formatCurrency({
                  figure: row.fee,
                })
              }}
            </span>
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

.unit-column.market {
  color: var(--color-text-primary);

  white-space: nowrap;
}

.unit-column.market:hover {
  text-decoration: underline;
}

.unit-column.created-at {
  color: var(--color-text-tertiary);
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

.unit-column.liquidity {
  text-transform: capitalize;
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

.unit-column.mobile.type-size {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-column.mobile.type-size > .type {
  text-transform: capitalize;
}

.unit-column.mobile.type-size > .size {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-column.mobile.price-fee {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-column.mobile.price-fee > .valuation {
  display: inline-flex;
  align-items: start;
  gap: 0.25rem;
}

.unit-column.mobile.price-fee > .valuation > .side {
  --color-text-side-buy: var(--palette-green);
  --color-text-side-sell: var(--palette-red);

  text-transform: capitalize;
}

.unit-column.mobile.price-fee > .valuation > .side.buy {
  color: var(--color-text-side-buy);
}

.unit-column.mobile.price-fee > .valuation > .side.sell {
  color: var(--color-text-side-sell);
}

.unit-column.mobile.price-fee > .valuation > .connector {
  color: var(--color-text-tertiary);
}

.unit-column.mobile.price-fee > .commission {
  font-size: var(--font-size-small);
}

.unit-column.mobile.price-fee > .commission > .liquidity {
  text-transform: capitalize;
}

.unit-column.mobile.price-fee > .commission > .fee {
  margin-inline-start: 0.25rem;

  color: var(--color-text-tertiary);
}
</style>
