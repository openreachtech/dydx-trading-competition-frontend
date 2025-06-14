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

  props: {
    validationMessage: {
      /**
       * @type {import('vue').PropType<
       *   import('./AddCompetitionFormStepPrizeContext').PropsType['validationMessage']
       * >}
       */
      type: Object,
      required: true,
    },
    initialFormValueHash: {
      /**
       * @type {import('vue').PropType<
       *   import('./AddCompetitionFormStepPrizeContext').PropsType['initialFormValueHash']
       * >}
       */
      type: [
        Object,
        null,
      ],
      required: false,
      default: null,
    },
    shouldOmitTotalPrize: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('./AddCompetitionFormStepPrizeContext').AddCompetitionFormStepPrizeContextFactoryParams['prizeRulesRef']} */
    const prizeRulesRef = ref(generateInitialPrizeRules())

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

    /**
     * Generate initial prize rules.
     *
     * @returns {Array<import('./AddCompetitionFormStepPrizeContext').PrizeRule>}
     */
    function generateInitialPrizeRules () {
      const defaultPrizeRules = [
        {
          rankFrom: 1,
          rankTo: 1,
          amount: '0',
          isRankRange: false,
        },
      ]

      if (!props.initialFormValueHash) {
        return defaultPrizeRules
      }

      return props.initialFormValueHash.prizeRules
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

    <span
      class="message error"
      :class="context.generateErrorMessageClasses({
        fieldName: 'prizeRules',
      })"
    >
      {{ context.validationMessage.prizeRules }}
    </span>

    <div class="tier">
      <h3 class="heading">
        <Icon
          class="icon"
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

        <fieldset
          v-for="(it, index) of context.prizeRulesRef.value"
          class="unit-fieldset"
          name="prizeRules[]"
        >
          <span
            class="ranks"
            :class="context.generateRankRangeClasses({
              prizeRule: it,
            })"
          >
            <AppInput
              type="number"
              :value="it.rankFrom"
              root-class="rank"
              name="rankFrom"
              @value-update="context.updateInputValue({
                index,
                key: 'rankFrom',
                newValue: $event.newValue,
              })"
            />

            <span class="connector">to</span>

            <AppInput
              type="number"
              :value="it.rankTo"
              root-class="rank to"
              name="rankTo"
              @value-update="context.updateInputValue({
                index,
                key: 'rankTo',
                newValue: $event.newValue,
              })"
            />
          </span>

          <button
            class="button toggle"
            :class="context.generateToggleButtonClasses({
              prizeRule: it,
            })"
            type="button"
            @click="context.toggleRankRange({
              index,
            })"
          >
            <Icon
              name="heroicons-outline:plus"
              size="0.875rem"
              class="plus"
            />

            <Icon
              name="heroicons-outline:minus"
              size="0.875rem"
              class="minus"
            />
          </button>

          <div class="connector" />

          <AppInput
            root-class="input prize"
            placeholder="Enter prize amount"
            name="amount"
            :value="it.amount"
            @value-update="context.updateInputValue({
              index,
              key: 'amount',
              newValue: $event.newValue,
            })"
          />

          <button
            class="button minus"
            type="button"
            @click="context.removePrizeRule({
              index,
            })"
          >
            <Icon
              name="heroicons-outline:minus"
              size="1.5rem"
            />
          </button>
        </fieldset>
      </div>

      <AppButton
        appearance="outlined"
        type="button"
        :disabled="context.shouldProhibitMoreRules()"
        @click="context.addPrizeRule()"
      >
        <template #startIcon>
          <Icon name="heroicons-outline:plus" />
        </template>

        <span>Rank Tier</span>
      </AppButton>
    </div>

    <div class="pool">
      <h3 class="heading">
        <Icon
          class="icon"
          size="1.25rem"
          name="heroicons:trophy"
        />

        <span>Total Prize Pool</span>
      </h3>

      <span class="total">
        <img
          src="~/assets/img/tokens/usdc.svg"
          alt="USDC"
          class="icon"
        >

        <input
          type="text"
          name="totalPrize"
          class="input hidden"
          :disabled="context.shouldOmitTotalPrize"
          :value="context.calculateTotalPrize()"
        >

        <span>{{ context.totalPrizeComputed.value }}</span>
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

.unit-section > .message.error {
  font-size: var(--font-size-small);

  color: var(--color-text-error);
}

.unit-section > .message.error.hidden {
  display: none;
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

.unit-fieldset {
  display: contents;
}

.unit-fieldset > .ranks {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  min-width: 0;
}

.unit-fieldset > .ranks > .rank {
  flex: 1;

  min-width: 0;
}

.unit-fieldset > .ranks:not(.range) > .rank.to {
  display: none;
}

.unit-fieldset > .ranks > .connector {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-fieldset > .ranks:not(.range) > .connector {
  display: none;
}

.unit-fieldset > .button {
  border-radius: 100vh;

  padding-block: 0.3125rem;
  padding-inline: 0.3125rem;

  transition: color 250ms var(--transition-timing-base);
}

.unit-fieldset > .button.toggle {
  background-color: var(--color-background-button-muted);
  color: var(--color-text-tertiary);
}

.unit-fieldset > .button.toggle:not(.range) > .minus {
  display: none;
}

.unit-fieldset > .button.toggle.range > .plus {
  display: none;
}

.unit-fieldset > .button.minus {
  color: var(--color-text-placeholder);
}

.unit-fieldset:first-of-type > .button.minus {
  visibility: hidden;
}

.unit-fieldset > .button:hover {
  color: var(--color-text-primary);
}

.unit-fieldset > .connector {
  border-inline-start-width: var(--size-thinnest);
  border-inline-start-style: solid;
  border-inline-start-color: var(--color-border-default);

  height: 100%;
}

.unit-fieldset > .input.prize {
  grid-column: span 2;

  min-width: 0;

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

.input.hidden {
  display: none;
}
</style>
