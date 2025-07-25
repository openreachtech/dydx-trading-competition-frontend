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
    const inputValueRef = ref(generateInitialInputValue())
    const isDropdownOpenRef = ref(false)
    /** @type {import('./AppDatePickerContext').DateReactive} */
    const dateReactive = reactive(generateInitialDateReactive())

    const args = {
      props,
      componentContext,
      inputValueRef,
      isDropdownOpenRef,
      dateReactive,
    }
    // @ts-expect-error - Type of emit should take a generic. Needs to resolve in furo-nuxt.
    const context = AppDatePickerContext.create(args)
      .setupComponent()

    return {
      context,
    }

    /**
     * Generate initial input value.
     *
     * @returns {string}
     */
    function generateInitialInputValue () {
      if (props.initialDate === null) {
        return ''
      }

      return new Date(props.initialDate)
        .toISOString()
        .split('T')
        .at(0)
        ?? ''
    }

    /**
     * Generate initial `dateReactive`.
     *
     * @returns {import('./AppDatePickerContext').DateReactive}
     */
    function generateInitialDateReactive () {
      const date = props.initialDate === null
        ? new Date()
        : new Date(props.initialDate)

      return {
        currentMonth: date.getMonth(),
        currentYear: date.getFullYear(),
      }
    }
  },
})
</script>

<template>
  <span
    v-on-click-outside="() => context.closeDropdown()"
    class="unit-picker"
    :class="context.generateDatePickerClasses()"
  >
    <span class="unit-input">
      <input
        type="text"
        class="input"
        v-bind="$attrs"
        :value="context.inputValue"
        @click="context.openDropdown()"
      >

      <button
        class="button"
        type="button"
        @click="context.toggleDropdown()"
      >
        <slot name="inputIcon">
          <Icon
            name="heroicons:calendar"
            size="1rem"
          />
        </slot>
      </button>
    </span>

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
    </div>
  </span>
</template>

<style scoped>
.unit-picker {
  outline-width: 0;
  outline-color: transparent;

  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-input);

  padding-inline-end: 0.75rem;

  background-color: var(--color-background-input);

  position: relative;

  display: inline-block;

  transition: border-color 150ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);
}

.unit-picker.open {
  outline-width: var(--size-thinnest);
  outline-style: solid;
  outline-color: var(--color-border-input-focus);
}

.unit-input {
  display: flex;
  gap: 0.5rem;
}

.unit-input > .input {
  border-width: 0;
  outline-width: 0;

  padding-block: 0.625rem;
  padding-inline-start: 0.75rem;

  flex: 1;

  background-color: inherit;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
}

.unit-input > .input::placeholder {
  color: var(--color-text-placeholder);
}

.unit-input > .button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-input > .button:hover {
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
