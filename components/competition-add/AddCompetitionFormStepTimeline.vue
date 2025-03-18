<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  Icon,
} from '#components'

import AppDatePicker from '~/components/units/AppDatePicker.vue'

import AddCompetitionFormStepTimelineContext from './AddCompetitionFormStepTimelineContext'

export default defineComponent({
  components: {
    Icon,
    AppDatePicker,
  },

  setup (
    props,
    componentContext
  ) {
    const endDateReactive = reactive({
      registration: '',
      competition: '',
    })

    const args = {
      props,
      componentContext,
      endDateReactive,
    }
    const context = AddCompetitionFormStepTimelineContext.create(args)
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
        2. League Timeline
      </h2>

      <p class="description">
        Set the date for each stage of your league. Determine the duration of each stage:
        Registration, Competition and Prize Distribution.
      </p>
    </div>

    <div class="timeline">
      <div v-for="phase of context.generateTimeline()"
        :key="phase.startDateInputId"
        class="unit-stage"
        :class="context.generatePhaseClasses({
          phase,
        })"
      >
        <Icon :name="phase.iconName"
          size="1rem"
          class="icon"
          :aria-hidden="phase.shouldHideIcon"
        />

        <div class="connector">
          <div class="indicator">
            <div class="dot" />
          </div>
          <div class="line" />
        </div>

        <div class="content">
          <span class="heading">
            {{ phase.title }}
          </span>

          <div class="unit-pickers">
            <fieldset class="fieldset"
              name="schedules[]"
            >
              <label class="date">
                <span class="label">
                  Start Date (MM/DD/YYYY)
                </span>

                <input type="number"
                  name="categoryId"
                  class="input hidden"
                  :value="phase.startDateInputId"
                >

                <AppDatePicker should-disable-past-dates
                  name="scheduledDatetime"
                />
              </label>
            </fieldset>

            <fieldset class="date end"
              name="schedules[]"
            >
              <span class="label">
                End Date
              </span>

              <input type="number"
                name="categoryId"
                class="input hidden"
                :disabled="!phase.endDateExtractionKey"
                :value="phase.endDateInputId"
              >
            </fieldset>
          </div>
        </div>
      </div>
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

/* TODO: Should update AppTimeline so it can be reused here. */
.unit-section > .timeline {
  margin-block-start: 1.5rem;

  display: flex;
  flex-direction: column;
}

.unit-stage {
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 0.5rem;
}

.unit-stage > .icon {
  /* Align icon with the center of the dot connector. */
  margin-block-start: 0.125rem;

  color: var(--color-text-tertiary);
}

.unit-stage > .connector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.unit-stage > .connector > .indicator {
  border-radius: 100vh;

  padding-block: 0.3125rem;
  padding-inline: 0.3125rem;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color-background-timeline-indicator-yellow);
}

.unit-stage > .connector > .indicator > .dot {
  border-radius: inherit;

  width: 0.625rem;
  height: 0.625rem;

  background-color: var(--color-background-timeline-dot-yellow);
}

.unit-stage:nth-of-type(3n + 2) > .connector > .indicator {
  background-color: var(--color-background-timeline-indicator-green);
}

.unit-stage:nth-of-type(3n + 2) > .connector > .indicator > .dot {
  background-color: var(--color-background-timeline-dot-green);
}

.unit-stage:nth-of-type(3n) > .connector > .indicator {
  background-color: var(--color-background-timeline-indicator-neutral);
}

.unit-stage:nth-of-type(3n) > .connector > .indicator > .dot {
  background-color: var(--color-background-timeline-dot-neutral);
}

.unit-stage > .connector > .line {
  border-inline-end-width: var(--size-thinnest);
  border-inline-end-style: solid;
  border-inline-end-color: var(--color-background-timeline-connector);

  flex: 1;
}

.unit-stage:last-of-type > .connector > .line {
  display: none;
}

.unit-stage > .content {
  margin-block-end: 4rem;
  margin-inline-start: 0.25rem;
}

.unit-stage > .content > .heading {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-pickers {
  margin-block-start: 0.5rem;

  display: flex;
  gap: 2rem;
}

.unit-pickers > .date,
.unit-pickers > .fieldset > .date {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-pickers > .date > .label,
.unit-pickers > .fieldset > .date > .label {
  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-pickers > .date > .note {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-pickers > .date > .note > .figure {
  font-weight: 500;

  color: var(--color-text-secondary);
}

/* Conditionally hide stuff */
.unit-stage.hide-icon > .icon {
  /* If `display: none` is used, it will break the layout. */
  opacity: 0;
}

.unit-stage.hide-end-date > .content > .unit-pickers > .date.end {
  display: none;
}

.input.hidden {
  display: none;
}
</style>
