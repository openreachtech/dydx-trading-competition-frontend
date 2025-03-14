<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppInput from '~/components/units/AppInput.vue'

import AddCompetitionFormStepParticipationContext from './AddCompetitionFormStepParticipationContext'

export default defineComponent({
  components: {
    Icon,
    AppInput,
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AddCompetitionFormStepParticipationContext.create(args)
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
        3. Participation
      </h2>

      <p class="description">
        Set the participant limits and entry fee.
      </p>
    </div>

    <div class="unit-partition">
      <h3 class="heading">
        <Icon class="icon"
          size="1.25rem"
          name="heroicons:users"
        />

        <span>Participant Limits</span>
      </h3>

      <div class="inputs">
        <AppInput placeholder="Minimum"
          type="number"
          name="participantLowerLimit"
        />

        <div class="connector" />

        <AppInput placeholder="Maximum"
          type="number"
          name="participantUpperLimit"
        />
      </div>

      <p class="note">
        Smaller leagues (10-25) offer an intense competitive experience. Larger leagues
        (100+ or 1000+) attract a wider audience and can support bigger prize pools.
      </p>
    </div>

    <div class="unit-partition">
      <h3 class="heading">
        <Icon class="icon"
          size="1.25rem"
          name="heroicons:wallet"
        />

        <span>Entry Balance</span>
      </h3>

      <AppInput name="minimumDeposit" />

      <p class="note">
        Required balance in the DYDX wallet at the time of enrollment.
      </p>
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

.unit-partition {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-partition > .heading {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;

  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-partition > .heading + * {
  /* Reset default margin to 0 */
  margin-block-start: 0;
}

.unit-partition > .heading > .icon {
  color: var(--color-text-tertiary);
}

.unit-partition > .inputs {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-partition > .inputs > .connector {
  border-block-end-width: 0.125rem;
  border-block-end-style: solid;
  border-block-end-color: var(--color-background-connector);

  width: 1rem;
}

.unit-partition > .note {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}
</style>
