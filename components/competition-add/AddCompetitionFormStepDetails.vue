<script>
import {
  defineComponent,
} from 'vue'

import AppInput from '~/components/units/AppInput.vue'
import AppTextarea from '~/components/units/AppTextarea.vue'

import AddCompetitionFormStepDetailsContext from '~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext'

export default defineComponent({
  components: {
    AppInput,
    AppTextarea,
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AddCompetitionFormStepDetailsContext.create(args)
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
        1. League Details
      </h2>

      <p class="description">
        Basic information about your league
      </p>
    </div>

    <label class="unit-label">
      <span class="label">
        League title
      </span>

      <AppInput name="title"
        placeholder="Give your league a name (max 30 characters)"
      />
    </label>

    <label class="unit-label">
      <span class="label">
        Description
      </span>

      <AppTextarea name="description"
        rows="10"
        placeholder="Describe your league (max 250 characters)"
      />
    </label>

    <div class="unit-badge">
      <label class="label">
        League Badge<span class="note">(Optional)</span>
      </label>

      <p class="description">
        An image to represent your league - which will be displayed to all participants
      </p>

      <!-- TODO: Badge upload logic. -->
    </div>
  </section>
</template>

<style scoped>
.unit-section {
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

.unit-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-label > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-badge {

}

.unit-badge > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-badge > .label > .note {
  margin-inline-start: 0.25rem;

  font-weight: 400;

  color: var(--color-text-tertiary);
}

.unit-badge > .description {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-secondary);
}
</style>
