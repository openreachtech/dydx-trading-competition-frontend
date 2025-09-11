<script>
import {
  defineComponent,
} from 'vue'

import AppTextareaContext from '~/app/vue/contexts/AppTextareaContext'

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
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = AppTextareaContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span
    class="unit-textarea"
    :class="{
      error: context.hasError,
    }"
  >
    <textarea
      v-bind="$attrs"
      class="textarea"
    />

    <span class="error-message">
      {{ context.errorMessage }}
    </span>
  </span>
</template>

<style scoped>
.unit-textarea {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;

  /* Make sure the input is shrinkable in flex layout. */
  min-width: 0;
}

.unit-textarea .textarea {
  outline-width: 0;
  outline-color: transparent;

  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-input);

  padding-block: 0.625rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-input-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-primary);
  background-color: var(--color-background-input);

  transition: border-color 150ms var(--transition-timing-base),
    outline-color 150ms var(--transition-timing-base);

  resize: vertical;
}

.unit-textarea > .textarea::placeholder {
  color: var(--color-text-placeholder);
}

.unit-textarea > .textarea:focus {
  outline-width: var(--size-thinnest);
  outline-style: solid;
  outline-color: var(--color-border-input-focus);
}

.unit-textarea.error > .textarea {
  border-color: var(--color-border-input-error);
}

.unit-textarea > .error-message {
  font-size: var(--font-size-small);

  color: var(--color-text-error);
}

.unit-textarea:not(.error) > .error-message {
  display: none;
}
</style>
