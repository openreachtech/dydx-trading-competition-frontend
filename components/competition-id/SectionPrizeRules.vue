<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import SectionPrizeRulesContext from './SectionPrizeRulesContext'

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    prizeRules: {
      /** @type {import('vue').PropType<import('./SectionPrizeRulesContext').PropsType['prizeRules']>} */
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
    const context = SectionPrizeRulesContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <div class="inner">
      <div
        v-for="(prizeRule, index) of context.normalizePrizeRules()"
        :key="index"
        class="unit-rank"
      >
        <Icon
          name="heroicons:trophy"
          size="1.5rem"
          class="icon"
        />

        <div class="content">
          <span class="label">{{ prizeRule.label }}</span>
          <span class="prize">{{ prizeRule.amount }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  border-block-width: var(--size-thinnest);
  border-block-style: solid;
  border-block-color: var(--color-border-competition-section);

  padding-block: 2rem;

  background-color: var(--color-background-competition-section-darker);

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}

.unit-section > .inner {
  margin-inline: auto;

  padding-inline: var(--size-body-padding-inline-mobile);

  max-width: var(--size-body-max-width);

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  row-gap: 1rem;
  column-gap: 2rem;

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-rank {
  padding-block: 0.625rem;
  padding-inline: 0.75rem;

  display: flex;
  align-items: center;
  gap: 1rem;
}

.unit-rank > .content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-rank > .content > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-rank > .content > .prize {
  font-size: var(--font-size-large);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-rank > .icon {
  color: var(--color-text-placeholder);
}

.unit-rank:first-of-type > .icon {
  color: var(--color-text-rank-gold);
}

.unit-rank:nth-of-type(2) > .icon {
  color: var(--color-text-rank-emerald);
}

.unit-rank:nth-of-type(3) > .icon {
  color: var(--color-text-rank-platinum);
}

.unit-rank:nth-of-type(4) > .icon {
  color: var(--color-text-rank-bronze);
}
</style>
