<script>
import {
  defineComponent,
} from 'vue'

import AppInputContext from '~/app/vue/contexts/AppInputContext'

export default defineComponent({
  inheritAttrs: false,

  props: {
    hasError: {
      type: Boolean,
      required: false,
      default: false,
    },
    errorMessage: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
    /**
     * Root class for layout controlled by parent element.
     */
    rootClass: {
      type: String,
      required: false,
      default: '',
    },
  },

  emits: [
    'value-update',
  ],

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AppInputContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span class="unit-input"
    :class="context.generateInputClasses()"
  >
    <input v-bind="$attrs"
      class="input"
      @input="context.onInput({
        inputEvent: $event,
      })"
    >

    <span class="error-message">
      {{ context.errorMessage }}
    </span>
  </span>
</template>

<style scoped>
.unit-input {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-input > .input {
  outline-width: 0;
  outline-color: transparent;

  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-input);

  padding-block: 0.625rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-primary);
  background-color: var(--color-background-input);

  transition: border-color 150ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);
}

.unit-input > .input::placeholder {
  color: var(--color-text-placeholder);
}

.unit-input > .input:focus {
  outline-width: var(--size-thinnest);
  outline-style: solid;
  outline-color: var(--color-border-input-focus);
}

.unit-input.error > .input {
  border-color: var(--color-border-input-error);
}

.unit-input > .error-message {
  color: var(--color-text-error);
}

.unit-input:not(.error) > .error-message {
  display: none;
}
</style>
