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

  setup (
    props,
    componentContext
  ) {
    const inputValueRef = ref('')
    const isDropdownOpenRef = ref(false)
    /** @type {import('./AppDatePickerContext').DateReactive} */
    const dateReactive = reactive({
      currentMonth: new Date()
        .getMonth(),
      currentYear: new Date()
        .getFullYear(),
    })

    const args = {
      props,
      componentContext,
      inputValueRef,
      isDropdownOpenRef,
      dateReactive,
    }
    const context = AppDatePickerContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span v-on-click-outside="() => context.closeDropdown()"
    class="unit-picker"
    :class="context.generateDatePickerClasses()"
  >
    <span class="unit-input">
      <input type="text"
        class="input"
        :value="context.inputValue"
        @click="context.openDropdown()"
      >

      <button class="button"
        @click="context.toggleDropdown()"
      >
        <slot name="inputIcon">
          <Icon name="heroicons:calendar"
            size="1rem"
          />
        </slot>
      </button>
    </span>

    <div class="unit-dropdown">
      <div class="header">
        <button class="button"
          @click="context.goToPreviousMonth()"
        >
          <Icon name="heroicons:chevron-left"
            size="1.25rem"
          />
        </button>

        <button class="button month">
          {{ context.generateDisplayedCurrentMonthYear() }}
        </button>

        <button class="button"
          @click="context.goToNextMonth()"
        >
          <Icon name="heroicons:chevron-right"
            size="1.25rem"
          />
        </button>
      </div>

      <div class="dates">
        <div v-for="it of context.daysOfWeek"
          :key="it"
          class="label"
        >
          {{ it }}
        </div>

        <button v-for="(it, index) of context.generateDisplayedDays()"
          :key="index"
          class="date"
          :class="context.generateDateButtonClasses({
            date: it,
          })"
          @click="context.selectDate({
            date: it,
          })"
        >
          {{ it.day }}
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

.unit-dropdown > .dates > .date:hover {
  background-color: var(--color-background-date-picker-hover);
  color: var(--color-text-primary);
}

.unit-dropdown > .dates > .date.selected {
  outline-color: var(--color-border-input-focus);
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
