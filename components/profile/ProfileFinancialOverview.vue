<script>
import {
  defineComponent,
} from 'vue'

import AppTable from '~/components/units/AppTable.vue'

import ProfileFinancialOverviewContext from './ProfileFinancialOverviewContext'

export default defineComponent({
  components: {
    AppTable,
  },

  props: {
    profileOverview: {
      /** @type {import('vue').PropType<import('./ProfileFinancialOverviewContext').PropsType['profileOverview']>} */
      type: [
        Object,
        null,
      ],
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
    const context = ProfileFinancialOverviewContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <!-- Past orders implementation is to be decided. -->
    <!-- <div></div> -->

    <div class="accounts">
      <div
        v-for="childSubaccount of context.childSubaccounts"
        :key="childSubaccount.subaccountNumber"
        class="unit-account"
      >
        <div class="positions">
          <span class="position">
            <span class="label">Open Perpetual Positions</span>
            <span class="figure">
              {{
                context.calculateOpenPerpetualPositionCount({
                  openPerpetualPositions: childSubaccount.openPerpetualPositions,
                })
              }}
            </span>
          </span>

          <span class="separator">/</span>

          <span class="position">
            <span class="label">Asset Positions</span>
            <span class="figure">{{
              context.extractAssetPositionSize({
                childSubaccount,
              })
            }}</span>
            <span class="currency">USDC</span>
          </span>
        </div>

        <AppTable
          :header-entries="context.subaccountTableHeaderEntries"
          :entries="context.normalizeOpenPerpetualPositions({
            openPerpetualPositions: childSubaccount.openPerpetualPositions,
          })"
          min-width="45rem"
        >
          <template #body-side="{ value }">
            <span
              class="unit-side"
              :class="context.generateTradeSideClasses({
                side: value,
              })"
            >{{
              context.generateTradeSideSymbol({
                side: value,
              })
            }}</span>
          </template>

          <template #body-market="{ value }">
            <span class="unit-market">
              <span class="name">{{ value }}</span>
              <span class="note">Perpetual</span>
            </span>
          </template>

          <template #body-size="{ value }">
            <span class="unit-size">{{ value }}</span>
          </template>

          <template #body-entryPrice="{ value }">
            <span class="unit-price entry">{{ value }}</span>
          </template>

          <template #body-realizedPnl="{ value }">
            <span
              class="unit-pnl"
              :class="context.generateProfitClasses({
                figure: value,
              })"
            >{{
              value
            }}</span>
          </template>

          <template #body-unrealizedPnl="{ value }">
            <span
              class="unit-pnl"
              :class="context.generateProfitClasses({
                figure: value,
              })"
            >{{
              value
            }}</span>
          </template>

          <template #body-netFunding="{ value }">
            <span
              class="unit-net-funding"
              :class="context.generateProfitClasses({
                figure: value,
              })"
            >{{
              value
            }}</span>
          </template>
        </AppTable>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 2rem;
}

.unit-container > .accounts {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.unit-account {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-account > .positions {
  border-radius: 0.625rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-default);

  padding-block: 0.625rem;
  padding-inline: 1rem;

  display: flex;
  flex-wrap: wrap;
  column-gap: 1.25rem;
  row-gap: 0.5rem;

  align-self: start;

  background-color: var(--color-background-card);
}

.unit-account > .positions > .position {
  display: inline-flex;
  gap: 0.5rem;
}

.unit-account > .positions > .position > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-account > .positions > .position > .figure {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-account > .positions > .position > .currency {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-account > .positions > .separator {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-side {
  border-radius: 0.375rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  width: 1.75rem;
  height: 1.75rem;

  font-size: var(--font-size-small);
  font-weight: 700;

  text-align: center;

  color: var(--color-text-primary);
}

.unit-side.long {
  background-color: var(--color-background-trade-side-long);
}

.unit-side.short {
  background-color: var(--color-background-trade-side-short);
}

.unit-market {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;

  font-size: var(--font-size-base);
}

.unit-market > .name {
  font-weight: 500;

  color: var(--color-text-primary);
}

.unit-market > .note {
  color: var(--color-text-tertiary);
}

.unit-size {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-primary);
}

.unit-price.entry {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-pnl {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-net-funding {
  font-size: var(--font-size-base);
  font-weight: 500;
}

/* Increased and decreased colors. */
.unit-pnl.increased,
.unit-net-funding.increased {
  color: var(--color-text-increased);
}

.unit-pnl.decreased,
.unit-net-funding.decreased {
  color: var(--color-text-decreased);
}
</style>
