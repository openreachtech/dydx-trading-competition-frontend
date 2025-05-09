<script>
import {
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import AppCheckboxContext from './AppCheckboxContext'

export default {
  name: 'AppCheckbox',

  components: {
    Icon,
  },

  inheritAttrs: false,

  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    indeterminate: {
      type: Boolean,
      default: false,
    },
  },

  emits: [
    'update:modelValue',
  ],

  setup (
    props,
    componentContext
  ) {
    const internalValueRef = ref(false)

    const args = {
      props,
      componentContext,
      internalValueRef,
    }

    const context = AppCheckboxContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
}
</script>

<template>
  <div
    class="unit-checkbox"
    :class="{
      disabled: disabled,
    }"
    @click="context.toggle()"
  >
    <div
      class="checkbox"
      :class="{
        'checked': context.internalValueRef.value,
        'disabled': context.disabled,
        'indeterminate': context.shouldShowIndeterminateStatus(),
      }"
    >
      <input
        v-model="context.internalValueRef.value"
        type="checkbox"
        :indeterminate="context.indeterminate"
        :disabled="context.disabled"
        class="input"
        v-bind="$attrs"
      >

      <Icon
        v-if="context.shouldShowIndeterminateStatus()"
        name="heroicons-outline:minus"
        size="1rem"
      />

      <Icon
        v-else-if="context.internalValueRef.value"
        name="heroicons-outline:check"
        size="1rem"
      />
    </div>

    <label
      v-if="label"
      class="label"
      :class="{
        disabled: context.disabled,
      }"
    >
      {{ context.label }}
    </label>
  </div>
</template>

<style scoped>
.unit-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  inline-size: fit-content;
}

.unit-checkbox.disabled {
  cursor: not-allowed;
}

.checkbox {
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-input);
  border-radius: 0.25rem;

  position: relative;

  inline-size: 1rem;
  block-size: 1rem;

  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-input);
  color: var(--color-text-primary);
  transition: background-color 100ms var(--transition-timing-base);
}

.checked, .indeterminate {
  background-color: var(--color-background-button-primary);
  border-color: var(--color-background-button-primary);
}

.disabled {
  border-color: var(--color-border-input-disabled);
  opacity: 0.9;
}

.input {
  position: absolute;
  inset-block-start: 0;
  inset-inline-start: 0;
  inline-size: 100%;
  block-size: 100%;
  opacity: 0;
  cursor: inherit;
}

.label {
  margin-inline-start: 0.5rem;
  font-size: var(--font-size-base);
}

.label.disabled {
  opacity: 0.7;
}
</style>
