<script>
import {
  defineComponent,
} from 'vue'

import SectionProfileFinancialMetricsContext from '~/app/vue/contexts/profile/SectionProfileFinancialMetricsContext'

export default defineComponent({
  props: {
    metrics: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/profile/SectionProfileFinancialMetricsContext').Metrics>} */
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
    const context = SectionProfileFinancialMetricsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <dl class="inner">
      <div
        v-for="(it, index) of context.metrics"
        :key="index"
        class="unit-description"
      >
        <dt class="term">
          {{ it.label }}
        </dt>
        <dd class="details">
          {{
            context.normalizeMetric({
              value: it.value,
            })
          }}
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.unit-section {
  margin-block-start: 0;

  border-block-width: var(--size-thinnest);
  border-block-style: solid;
  border-block-color: var(--color-border-profile-section);

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  background-color: var(--color-background-profile-section-darker);
}

.inner {
  margin-inline: auto;

  padding-inline: var(--size-body-padding-inline-mobile);

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 3rem;

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-description {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-description > .term {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-tertiary);
}

.unit-description > .details {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-primary);
}

.unit-description:first-of-type > .details {
  font-size: var(--font-size-large);
  line-height: var(--size-line-height-large);
}
</style>
