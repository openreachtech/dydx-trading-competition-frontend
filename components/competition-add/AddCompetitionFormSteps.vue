<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppMessage from '~/components/units/AppMessage.vue'

import AddCompetitionFormStepsContext from '~/app/vue/contexts/competition/AddCompetitionFormStepsContext'

export const EVENT_NAME = {
  GO_TO_STEP: 'goToStep',
  VALIDATE_FORM: 'validateForm',
}

export default defineComponent({
  components: {
    Icon,
    AppMessage,
  },

  props: {
    currentStep: {
      type: Number,
      required: true,
    },
    errorMessageHash: {
      /** @type {import('vue').PropType<Record<string, string | null> | null>} */
      type: [
        Object,
        null,
      ],
      required: false,
      default: null,
    },
  },

  emits: Object.values(EVENT_NAME),

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AddCompetitionFormStepsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <div class="steps">
      <div v-for="it of context.generateSteps()"
        :key="it.step"
        class="unit-step"
        :aria-current="context.generateAriaCurrent({
          step: it.step,
        })"
        :class="{
          active: context.isCurrentStep({
            step: it.step,
          }),
        }"
      >
        <div class="step">
          <button class="button"
            type="button"
            @click="context.goToStep({
              step: it.step,
            })"
          >
            <span class="indicator">
              <Icon name="heroicons:check"
                size="1rem"
                class="icon"
              />

              <span>{{ it.step }}</span>
            </span>

            <span class="label desktop">
              {{ it.title }}
            </span>
          </button>

          <div class="connector" />
        </div>

        <span class="label mobile">
          {{ it.title }}
        </span>
      </div>
    </div>

    <div class="unit-guide">
      <p class="note">
        Please complete all steps above to host your new trading arena.
      </p>
    </div>

    <AppMessage severity="error"
      variant="box"
      :is-hidden="!context.addCompetitionErrorMessage"
    >
      {{ context.addCompetitionErrorMessage }}
    </AppMessage>
  </div>
</template>

<style scoped>
.unit-container {
  padding-inline: 0.75rem 0;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (30rem < width) {
    padding-inline: 2rem 0.5rem;
  }

  @media (48rem < width) {
    border-radius: 1.25rem;

    padding-block: 1.25rem;
    padding-inline: 0.75rem;

    background-color: var(--color-background-competition-form-steps);
  }

  @media (60rem < width) {
    padding-inline: 1.25rem;
  }
}

.unit-container > .steps {
  display: flex;

  @media (48rem < width) {
    flex-direction: column;
  }
}

.unit-step {
  flex: 1;
}

.unit-step:last-of-type {
  flex: 0;
}

.unit-step > .step {
  display: flex;
  align-items: center;

  @media (48rem < width) {
    flex-direction: column;
    align-items: stretch;
  }
}

.unit-step > .step > .button {
  border-radius: 100vh;
  border-width: 0.125rem;
  border-style: solid;
  border-color: var(--color-border-form-step);

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  flex-shrink: 0;

  font-size: var(--font-size-small);
  font-weight: 500;

  transition: border-color 250ms var(--transition-timing-base);

  @media (48rem < width) {
    border-color: transparent;

    padding-block: 0.5rem;
    padding-inline: 0.5rem 0.75rem;

    justify-content: start;

    width: 100%;
    height: auto;

    background-color: var(--color-background-button-competition-step);
  }
}

.unit-step.active > .step > .button {
  border-color: var(--color-border-form-step-active);
}

.unit-step.completed > .step > .button {
  border-color: transparent;
}

.unit-step > .step > .button > .indicator {
  border-radius: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 2rem;
  height: 2rem;

  transition: border-color 250ms var(--transition-timing-base);

  @media (48rem < width) {
    border-color: var(--color-border-form-step);
    border-style: solid;
    border-width: 0.125rem;
  }
}

.unit-step.completed > .step > .button > .indicator {
  border-color: transparent;

  background-color: var(--color-background-competition-step-completed);
}

.unit-step > .step > .button > .indicator > .icon {
  display: none;
}

.unit-step.completed > .step > .button > .indicator > .icon {
  display: inline;
}

.unit-step.completed > .step > .button > .indicator > *:not(.icon) {
  display: none;
}

.unit-step > .step > .button > .label.desktop {
  display: none;

  font-size: var(--font-size-base);
  font-weight: 700;

  white-space: nowrap;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);

  @media (48rem < width) {
    display: inline;
  }
}z

.unit-step > .step > .button:hover:not(:disabled) > .label.desktop {
  color: var(--color-text-primary);
}

.unit-step.active > .step > .button > .label.desktop {
  color: var(--color-text-primary);
}

.unit-step > .label.mobile {
  display: inline-block;

  margin-block-start: 0.5rem;

  padding-inline-end: 0.5rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  white-space: nowrap;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);

  @media (48rem < width) {
    display: none;
  }
}

.unit-step.active > .label.mobile {
  color: var(--color-text-primary);
}

.unit-step > .step > .connector {
  border-block-end-width: 0.125rem;
  border-block-end-style: solid;
  border-color: var(--color-border-form-step);

  width: 100%;
  height: 0;

  @media (48rem < width) {
    border-width: 0;
    border-inline-end-width: 0.125rem;
    border-inline-end-style: dashed;

    width: 0;
    height: 1rem;

    margin-inline-start: calc(0.5rem + (2rem / 2)); /* Padding and half of indicator's width. */
  }
}

.unit-step:last-of-type > .step > .connector {
  display: none;
}

.unit-guide {
  display: none;
  flex-direction: column;
  gap: 0.5rem;

  flex: 1;

  @media (48rem < width) {
    display: flex;
  }
}

.unit-guide > .note {
  font-size: var(--font-size-small);
  color: var(--color-text-tertiary);
}
</style>
