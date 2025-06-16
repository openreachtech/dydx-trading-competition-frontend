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
</style>
