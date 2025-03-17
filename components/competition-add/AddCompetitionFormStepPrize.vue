<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AppInput from '~/components/units/AppInput.vue'

import AddCompetitionFormStepPrizeContext from './AddCompetitionFormStepPrizeContext'

export default defineComponent({
  components: {
    Icon,
    AppButton,
    AppInput,
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('./AddCompetitionFormStepPrizeContext').AddCompetitionFormStepPrizeContextFactoryParams['prizeRulesRef']} */
    const prizeRulesRef = ref([
      {
        rankFrom: 1,
        rankTo: 1,
        amount: '0',
        isRankRange: false,
      },
    ])

    const args = {
      props,
      componentContext,
      prizeRulesRef,
    }
    const context = AddCompetitionFormStepPrizeContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <div class="headline">
      <h2 class="heading">
        4. Rank & Prize
      </h2>

      <p class="description">
        Define the total prize pool and how it will be distributed
      </p>
    </div>

    <div class="tier">
      <h3 class="heading">
        <Icon class="icon"
          size="1.25rem"
          name="heroicons:chart-pie"
        />

        <span>Prize Tier</span>
      </h3>

      <div class="unit-rules">
        <span class="label rank">
          Rank
        </span>
        <span class="label prize">
          Prize
        </span>

        <template v-for="(it, index) of context.prizeRulesRef.value">
          <span class="ranks"
            :class="context.generateRankRangeClasses({
              prizeRule: it,
            })"
          >
            <AppInput type="number"
              :value="it.rankFrom"
              root-class="rank"
            />

            <span class="connector">to</span>

            <AppInput type="number"
              :value="it.rankFrom"
              root-class="rank to"
            />
          </span>

          <button class="button plus"
            type="button"
            @click="context.toggleRankRange({
              index,
            })"
          >
            <Icon name="heroicons-outline:plus"
              size="0.875rem"
            />
          </button>

          <div class="connector" />

          <AppInput type="number"
            root-class="input prize"
            placeholder="Enter prize amount"
            :value="it.amount"
          />

          <button class="button minus"
            type="button"
          >
            <Icon name="heroicons-outline:minus"
              size="1.5rem"
            />
          </button>
        </template>
      </div>

      <AppButton appearance="outlined"
        type="button"
      >
        <template #startIcon>
          <Icon name="heroicons-outline:plus" />
        </template>

        <span>Rank Tier</span>
      </AppButton>
    </div>

    <div class="pool">
      <h3 class="heading">
        <Icon class="icon"
          size="1.25rem"
          name="heroicons:trophy"
        />

        <span>Total Prize Pool</span>
      </h3>

      <span class="total">
        <img src="~/assets/img/tokens/usdc.svg"
          alt="USDC"
          class="icon"
        >

        <span>0.00 USDC</span>
      </span>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  /* Reset default top margin of section to 0 */
  margin-block-start: 0;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.unit-section > .headline > .heading {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);
}

.unit-section > .headline > .description {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-section > :where(.tier, .pool) > .heading {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-section > :where(.tier, .pool) > .heading + * {
  /* Reset default margin to 0 */
  margin-block-start: 0;
}

.unit-section > :where(.tier, .pool) > .heading > .icon {
  color: var(--color-text-tertiary);
}

.unit-section > .tier {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
}

.unit-rules {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;;
  gap: 1rem;

  width: 100%;

  @media (48rem < width) {
    grid-template-columns: 1fr auto auto 1fr auto;
  }
}

.unit-rules > .label {
  margin-block-end: -0.5rem;

  grid-column: span 2;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-rules > .label.rank {
  grid-column: span 3;
}

.unit-rules > .label.prize {
  display: none;

  @media (48rem < width) {
    display: inline;
  }
}

.unit-rules > .ranks {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.unit-rules > .ranks > .rank {
  flex: 1;
}

.unit-rules > .ranks:not(.range) > .rank.to {
  display: none;
}

.unit-rules > .ranks > .connector {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-rules > .ranks:not(.range) > .connector {
  display: none;
}

.unit-rules > .button {
  border-radius: 100vh;

  padding-block: 0.3125rem;
  padding-inline: 0.3125rem;

  transition: color 250ms var(--transition-timing-base);
}

.unit-rules > .button.plus {
  background-color: var(--color-background-button-muted);
  color: var(--color-text-tertiary);
}

.unit-rules > .button.minus {
  color: var(--color-text-placeholder);
}

.unit-rules > .button.minus:nth-of-type(2) {
  visibility: hidden;
}

.unit-rules > .button:hover {
  color: var(--color-text-primary);
}

.unit-rules > .connector {
  border-inline-start-width: var(--size-thinnest);
  border-inline-start-style: solid;
  border-inline-start-color: var(--color-border-default);

  height: 100%;
}

.unit-rules > .input.prize {
  grid-column: span 2;

  @media (48rem < width) {
    grid-column: span 1;
  }
}

.unit-section > .pool {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.75rem
}

.unit-section > .pool > .total {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-large);
  font-weight: 500;

  color: var(--color-text-placeholder);
}

.unit-section > .pool > .total > .icon {
  width: 1.5rem;
  height: 1.5rem;
}
</style>
