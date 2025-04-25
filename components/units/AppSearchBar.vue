<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

import {
  useDebounce,
} from '~/composables/useDebounce'

import vOnClickOutside from '~/app/vue/directives/vOnClickOutside'

import AppSearchBarContext, {
  EMIT_EVENT_NAME,
} from '~/app/vue/contexts/AppSearchBarContext'

export default defineComponent({
  components: {
    Icon,
    AppButton,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },

  inheritAttrs: false,

  props: {
    placeholder: {
      type: String,
      required: false,
      default: '',
    },
    hasFilter: {
      type: Boolean,
      required: false,
      default: false,
    },
    filters: {
      /** @type {import('vue').PropType<Array<import('~/app/vue/contexts/AppSearchBarContext').Filter>>} */
      type: Array,
      required: false,
      default: () => [],
    },
    results: {
      /** @type {import('vue').PropType<Array<*>>} */
      type: Array,
      required: false,
      default: () => [],
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    size: {
      type: /** @type {import('vue').PropType<import('~/app/vue/contexts/AppSearchBarContext').SizeProp>} */ (String),
      required: false,
      default: 'base',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'small',
        'base',
        'large',
      ]
        .includes(value),
    },
    variant: {
      type: /** @type {import('vue').PropType<import('~/app/vue/contexts/AppSearchBarContext').VariantProp>} */ (String),
      required: false,
      default: 'base',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'base',
        'transparent',
      ]
        .includes(value),
    },
  },

  emits: Object.values(EMIT_EVENT_NAME),

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const router = useRouter()

    const isOpenResultRef = ref(false)
    const isOpenFilterRef = ref(false)
    const debouncedSearch = useDebounce({
      callback: emitSearch,
      timeInMs: 300,
    })

    const args = {
      props,
      componentContext,
      route,
      router,
      isOpenResultRef,
      isOpenFilterRef,
      debouncedSearch,
    }
    // @ts-expect-error - Type is correct but BaseFuroContextParams does not receive the emit generic.
    const context = AppSearchBarContext.create(args)
      .setupComponent()

    return {
      context,
    }

    /**
     * Callback function for debouncing search.
     *
     * @param {{
     *   inputEvent: Event
     * }} params - Parameters.
     * @returns {void}
     */
    function emitSearch ({
      inputEvent,
    }) {
      if (!inputEvent) {
        return
      }

      if (!(inputEvent.target instanceof HTMLInputElement)) {
        return
      }

      const inputValue = inputEvent.target.value

      componentContext.emit(EMIT_EVENT_NAME.SEARCH, inputValue)
    }
  },
})
</script>

<template>
  <div v-on-click-outside="() => context.closeResult()"
    class="unit-search"
    :class="context.generateSearchBarClasses()"
    v-bind="$attrs"
  >
    <div class="input-container">
      <label class="label">
        <slot name="searchIcon">
          <Icon class="icon"
            name="heroicons:magnifying-glass"
          />
        </slot>

        <input class="input"
          :placeholder="context.placeholder"
          @input="context.debouncedSearch({
            inputEvent: $event,
          })"
          @focus="context.openResult()"
        >
      </label>

      <div v-on-click-outside="() => context.closeFilter()"
        class="unit-filter"
        :class="context.generateFilterClasses()"
      >
        <button class="button"
          @click.stop="context.toggleFilter()"
        >
          <Icon name="heroicons:funnel"
            size="1.25rem"
            class="icon"
          />

          <span>Filters</span>

          <span class="indicator"
            :class="context.generateFilterIndicatorClasses()"
            aria-hidden="true"
          />
        </button>

        <div class="dropdown filter">
          <slot name="filter">
            <div class="unit-filters">
              <div v-for="filter of context.filters"
                class="filter"
              >
                <span class="caption">
                  {{ filter.caption }}
                </span>
                <div class="options">
                  <button v-for="option of filter.options"
                    type="button"
                    class="option"
                    :class="context.generateFilterOptionClasses({
                      name: filter.name,
                      value: option.value,
                    })"
                    @click="context.toggleFilterOptionState({
                      name: filter.name,
                      value: option.value,
                    })"
                  >
                    {{ option.label }}
                  </button>
                </div>
              </div>

              <div class="actions">
                <AppButton type="button"
                  appearance="outlined"
                  class="button"
                  @click="context.clearFilters()"
                >
                  Clear
                </AppButton>
                <AppButton type="button"
                  class="button"
                  @click="context.closeFilter()"
                >
                  Done
                </AppButton>
              </div>
            </div>
          </slot>
        </div>
      </div>
    </div>

    <div class="dropdown results">
      <slot name="results"
        :results="context.results"
      />

      <div class="empty-container">
        <slot name="emptyResult">
          <div class="unit-empty">
            <Icon name="heroicons:magnifying-glass"
              size="5rem"
            />

            <p class="description">
              No records found.
            </p>
          </div>
        </slot>
      </div>

      <div class="loading-container">
        <slot name="loading">
          <div class="unit-loading">
            <Icon name="svg-spinners:90-ring-with-bg"
              size="1.5rem"
            />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-search {
  outline-width: var(--size-thinnest);
  outline-color: transparent;
  outline-style: solid;

  border-radius: 0.75rem;

  padding-inline: 1rem;

  background-color: var(--color-background-input);

  position: relative;

  transition: border-color 150ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);
}

.unit-search:focus-within {
  outline-color: var(--color-border-input-focus);
}

.unit-search > .input-container {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-search > .input-container > .label {
  display: flex;
  align-items: center;
  gap: 1rem;

  flex: 1;
}

.unit-search > .input-container > .label > .icon {
  font-size: 1.5rem;
}

.unit-search > .input-container > .label > .input {
  outline-width: 0;
  border-width: 0;

  padding-block: 0.625rem;
  padding-inline: 0;

  flex: 1;

  background-color: inherit;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
}

.unit-search > .input-container > .label > .input::placeholder {
  color: var(--color-text-placeholder);
}

.unit-filter {
  display: flex;
  align-items: center;

  position: relative;
}

.unit-filter > .button {
  display: inline-flex;
  align-items: center;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-filter > .button > .icon {
  margin-inline-end: 0.5rem;

  display: inline-block;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-filter > .button > .indicator {
  border-radius: 100vh;

  align-self: start;

  width: 0.375rem;
  height: 0.375rem;

  background-color: var(--color-background-search-indicator);
}

.unit-filter > .button > .indicator.hidden {
  visibility: hidden;
}

.unit-filter > .button:hover,
.unit-filter > .button:hover > .icon {
  color: var(--color-text-primary);
}

/************* Sizes *************/
.unit-search.small {
  border-radius: 0.5rem;

  padding-inline: 0.5rem;
}

.unit-search.small > .input-container > .label {
  gap: 0.5rem;
}

.unit-search.small > .input-container > .label > .input {
  padding-block: 0.4375rem;

  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);
  font-weight: 500;
}

.unit-search.small > .input-container > .label > .icon {
  font-size: 1rem;
}

.unit-search.small > .dropdown.results {
  left: auto;
  right: 0;

  width: min(25rem, 90vw);
}

.unit-search.large {
  padding-inline: 1.5rem;
}

/************* Variants *************/
.unit-search.transparent {
  background-color: transparent;
}

.unit-search.transparent > .input-container > .label > .icon {
  color: var(--color-text-tertiary);
}

/************* Results dropdown *************/
.dropdown {
  border-radius: 0.5rem;
  border-style: solid;
  border-width: var(--size-thinnest);
  border-color: var(--color-border-dropdown);

  position: absolute;

  top: calc(100% + 0.5rem);

  background-color: var(--color-background-dropdown);
}

.unit-search > .dropdown.results {
  padding-block: 0.5rem;
  padding-inline: 0.5rem;

  left: 0;
  right: 0;

  z-index: calc(var(--value-z-index-layer-staying) + 1);
}

.unit-search.open.show-results > .dropdown.results {
  animation: fade-in 150ms var(--transition-timing-base) forwards;
}

.unit-search:not(.open.show-results) > .dropdown.results {
  display: none;

  animation: fade-out 150ms var(--transition-timing-base) forwards;
}

.unit-search:not(.no-results) > .dropdown.results > .empty-container {
  display: none;
}

.unit-empty {
  border-radius: inherit;

  padding-block: 2rem;
  padding-inline: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  min-height: 14rem;

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-empty > .description {
  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-search:not(.loading) > .dropdown.results > .loading-container {
  display: none;
}

.unit-search.loading > .dropdown.results > *:not(.loading-container) {
  display: none;
}

.unit-loading {
  border-radius: inherit;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-block: 2rem;
  padding-inline: 1rem;

  min-height: 14rem;

  color: var(--color-text-secondary);
}

/************* Filter dropdown *************/
.unit-filter.hidden {
  display: none;
}

.unit-filter > .dropdown.filter {
  padding-block: 1rem;
  padding-inline: 1.25rem;

  top: calc(100% + 0.25rem);
  right: -0.75rem;

  width: 27.5rem;

  z-index: calc(var(--value-z-index-layer-content) + 2);
}

.unit-filter.open > .dropdown.filter {
  animation: fade-in 150ms var(--transition-timing-base) forwards;
}

.unit-filter:not(.open) > .dropdown.filter {
  display: none;

  animation: fade-out 150ms var(--transition-timing-base) forwards;
}

.unit-filters {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.unit-filters > .filter {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-filters > .filter > .caption {
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-filters > .filter > .options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.unit-filters > .filter > .options > .option {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-default);

  padding-block: 0.4375rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: background-color 250ms var(--transition-timing-base),
    border-color 250ms var(--transition-timing-base);
}

.unit-filters > .filter > .options > .option:hover {
  border-color: var(--color-border-filter-hover);
}

.unit-filters > .filter > .options > .option.active {
  background-color: var(--color-background-filter-active);
}

.unit-filters > .actions {
  margin-block-start: 1rem;

  display: flex;
  justify-content: end;
  gap: 1rem;
}

.unit-filters > .actions > .button {
  padding-block: 0.75rem;
  padding-inline: 1.25rem;
}

@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
    transform: translateY(-0.25rem);
  }

  100% {
    opacity: 1;
    display: block;
    transform: translateY(0);
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    display: block;
    transform: translateY(0);
  }

  100% {
    opacity: 0;
    display: none;
    transform: translateY(-0.25rem);
  }
}
</style>
