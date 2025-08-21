<script>
import {
  defineComponent,
  ref,
  reactive,
} from 'vue'

import {
  Icon,
} from '#components'

import vOnClickOutside from '~/app/vue/directives/vOnClickOutside'

import AppDatePickerContext from './AppDatePickerContext'

export default defineComponent({
  components: {
    Icon,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },

  inheritAttrs: false,

  props: {
    initialDate: {
      type: [
        Date,
        String,
        null,
      ],
      required: false,
      default: null,
    },
    shouldDisablePastDates: {
      type: Boolean,
      required: false,
      default: false,
    },
    shouldStayOnSelect: {
      type: Boolean,
      required: false,
      default: false,
    },
    /**
     * Class of root element for layout purpose (controlled by parent component).
     */
    rootClass: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'changeDate',
  ],

  setup (
    props,
    componentContext
  ) {
    const isDropdownOpenRef = ref(false)
    /** @type {import('vue').Ref<import('./AppDatePickerContext').SelectedDate | null>} */
    const selectedDateRef = ref(null)
    /** @type {import('vue').Reactive<import('./AppDatePickerContext').CurrentViewDate>} */
    const currentViewDateReactive = reactive(AppDatePickerContext.generateInitialCurrentViewDate())

    const args = {
      props,
      componentContext,
      isDropdownOpenRef,
      selectedDateRef,
      currentViewDateReactive,
    }
    // @ts-expect-error - Type of emit should take a generic. Needs to resolve in furo-nuxt.
    const context = AppDatePickerContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    v-on-click-outside="() => context.closeDropdown()"
    class="unit-picker"
    :class="context.generateDatePickerClasses()"
  >
    <button
      type="button"
      class="button"
      @click="context.toggleDropdown()"
    >
      <span class="unit-input">
        <span
          class="date"
          :class="{
            selected: context.hasSelectedDate(),
          }"
        >
          {{ context.formatDisplayedDate() }}
        </span>

        <input
          type="text"
          class="input hidden"
          :value="context.normalizeInputValue()"
          v-bind="$attrs"
        >

        <span class="icon picker">
          <slot name="inputIcon">
            <Icon
              name="heroicons:calendar"
              size="1rem"
            />
          </slot>
        </span>
      </span>
    </button>

    <div class="unit-dropdown">
      <div class="header">
        <button
          class="button"
          type="button"
          @click="context.goToPreviousMonth()"
        >
          <Icon
            name="heroicons:chevron-left"
            size="1.25rem"
          />
        </button>

        <button
          class="button month"
          type="button"
        >
          {{ context.generateDisplayedCurrentMonthYear() }}
        </button>

        <button
          class="button"
          type="button"
          @click="context.goToNextMonth()"
        >
          <Icon
            name="heroicons:chevron-right"
            size="1.25rem"
          />
        </button>
      </div>

      <div class="dates">
        <div
          v-for="it of context.daysOfWeek"
          :key="it"
          class="label"
        >
          {{ it }}
        </div>

        <button
          v-for="(it, index) of context.generateDisplayedDays()"
          :key="index"
          type="button"
          class="date"
          :class="context.generateDateButtonClasses({
            date: it,
          })"
          :disabled="context.isDisabledDate({
            date: it,
          })"
          @click="context.selectDate({
            date: it,
          })"
        >
          <span class="figure">
            {{
              context.normalizeDisplayedDay({
                day: it.day,
              })
            }}
          </span>
        </button>
      </div>

      <div class="time">
        <template
          v-for="it of context.createDatePickerTimeItemContexts()"
          :key="it.key"
        >
          <div class="control">
            <button
              type="button"
              class="button increment"
              @click="it.incrementClockTime()"
            >
              <Icon
                name="heroicons:chevron-up"
                size="1rem"
              />
            </button>

            <input
              type="text"
              inputmode="numeric"
              class="input"
              size="2"
              :value="it.formatClockTime()"
              @input="it.onInputChange({
                inputEvent: $event,
              })"
            >

            <button
              type="button"
              class="button decrement"
              @click="it.decrementClockTime()"
            >
              <Icon
                name="heroicons:chevron-down"
                size="1rem"
              />
            </button>
          </div>

          <span
            class="connector"
            aria-hidden="true"
          >
            :
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-picker {
  --color-background-picker: var(--color-background-input);
  --color-background-picker-hover: var(--palette-layer-4);

  position: relative;
}

.unit-picker > .button {
  outline-width: 0;
  outline-color: transparent;

  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-input);

  padding-inline-end: 0.75rem;

  background-color: var(--color-background-picker);

  display: inline-block;

  width: 100%;

  transition:
    border-color 150ms var(--transition-timing-base),
    background-color 150ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);
}

.unit-picker > .button:hover {
  background-color: var(--color-background-picker-hover);
}

.unit-picker.open > .button {
  outline-width: var(--size-thinnest);
  outline-style: solid;
  outline-color: var(--color-border-input-focus);
}

.unit-input {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 0.5rem;

  text-align: start;
}

.unit-input > .date {
  padding-block: 0.625rem;
  padding-inline-start: 0.75rem;

  font-size: var(--font-size-base);

  line-height: var(--size-line-height-base);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.unit-input > .date:not(.selected) {
  color: var(--color-text-placeholder);
}

.unit-input > .input.hidden {
  display: none;
}

.unit-input > .icon.picker {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-picker > .button:hover > .unit-input > .icon.picker {
  color: var(--color-text-primary);
}

/********** Dropdown **********/

.unit-dropdown {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-dropdown);

  padding-block: 0.5rem 0.75rem;
  padding-inline: 0.75rem;

  display: none;

  position: absolute;
  top: calc(100% + 0.5rem);

  width: 100%;
  min-width: max-content;

  background-color: var(--color-background-dropdown);

  z-index: calc(var(--value-z-index-layer-content) + 1);
}

.unit-picker.open > .unit-dropdown {
  display: block;
  animation: fade-in 150ms var(--transition-timing-base);
}

.unit-picker:not(.open) > .unit-dropdown {
  animation: fade-out 150ms var(--transition-timing-base);
}

.unit-dropdown > .header {
  padding-block: 0.25rem 0.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.unit-dropdown > .header > .button {
  border-radius: 100vh;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  padding-block: 0.5rem;
  padding-inline: 0.5rem;

  color: var(--color-text-secondary);

  transition: background-color 250ms var(--transition-timing-base);
}

.unit-dropdown > .header > .button:hover {
  background-color: var(--color-background-date-picker-hover);
}

.unit-dropdown > .header > .button.month {
  border-radius: 0.375rem;

  padding-block: 0.375rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-base);
  font-weight: 500;

  text-align: center;

  color: var(--color-text-primary);
}

.unit-dropdown > .dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
}

.unit-dropdown > .dates > .label {
  padding-block: 0.75rem;

  font-size: var(--font-size-small);

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-dropdown > .dates > .date {
  outline-width: var(--size-thinnest);
  outline-style: solid;
  outline-color: transparent;

  border-radius: 0.375rem;

  padding-block: 0.625rem;

  aspect-ratio: 1 / 1;

  font-size: var(--font-size-base);
  font-feature-settings: 'tnum';

  color: var(--color-text-secondary);

  transition: background-color 250ms var(--transition-timing-base),
    color 250ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);
}

.unit-dropdown > .dates > .date:not(:disabled):hover {
  background-color: var(--color-background-date-picker-hover);
  color: var(--color-text-primary);
}

.unit-dropdown > .dates > .date.selected {
  outline-color: var(--color-border-input-focus);
}

.unit-dropdown > .dates > .date.off-month {
  color: var(--color-text-placeholder);
}

.unit-dropdown > .dates > .date.today > .figure {
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-dropdown > .dates > .date.today > .figure::after {
  border-radius: 100vh;

  position: absolute;
  top: calc(100% + 0.25rem);

  width: 0.25rem;
  height: 0.25rem;

  background-color: var(--color-text-placeholder);

  content: '';
}

.unit-dropdown > .dates > .date:disabled {
  color: var(--color-text-placeholder);

  cursor: not-allowed;
}

.unit-dropdown > .time {
  display: grid;
  grid-auto-flow: column;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  margin-block-start: 0.5rem;

  border-block-start-color: var(--color-border-dropdown);
  border-block-start-width: var(--size-thinnest);
  border-block-start-style: solid;

  padding-block-start: 0.5rem;
}

.unit-dropdown > .time > .control {
  display: grid;
  grid-template-rows: auto 1fr auto;
  gap: 0.25rem;
}

.unit-dropdown > .time > .control > .button {
  border-radius: 0.25rem;

  padding-block: 0.25rem;
  padding-inline: 0.25rem;

  transition: background-color 250ms var(--transition-timing-base);
}

.unit-dropdown > .time > .control > .button:hover {
  background-color: var(--color-background-date-picker-hover);
}

.unit-dropdown > .time > .control > .input {
  border-width: 0;

  padding-block: 0;

  font-size: var(--font-size-small);
  font-weight: 500;

  line-height: var(--size-line-height-small);

  text-align: center;

  color: var(--color-text-secondary);
  background-color: transparent;

  transition: color 250ms var(--transition-timing-base);
}

.unit-dropdown > .time > .control > .input:focus-visible {
  outline-width: 0;

  color: var(--color-text-primary);
}

.unit-dropdown > .time > .connector:last-of-type {
  display: none;
}

/********** Animation **********/

/* TODO: Unify fade-in animation */
@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
    transform: translateY(-0.25rem);
  }

  100% {
    opacity: 1;
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    display: block;
  }

  100% {
    opacity: 0;
    display: none;
    transform: translateY(-0.25rem);
  }
}
</style>
