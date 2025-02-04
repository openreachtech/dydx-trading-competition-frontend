<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppButtonContext from '~/app/vue/contexts/AppButtonContext'

/**
 * @typedef {import('vue').PropType<
 *    'primary'
 *    | 'neutral'
 *    | 'success'
 *    | 'error'
 *    | 'muted'
 * >} VariantPropType
 */

/**
 * @typedef {import('vue').PropType<
 *    'filled'
 *    | 'outlined'
 * >} AppearancePropType
 */

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    variant: {
      type: /** @type {VariantPropType} */ (String),
      required: false,
      default: 'primary',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'primary',
        'neutral',
        'success',
        'error',
        'muted',
      ]
        .includes(value),
    },
    appearance: {
      type: /** @type {AppearancePropType} */ (String),
      required: false,
      default: 'filled',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'filled',
        'outlined',
      ]
        .includes(value),
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    isLoading: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
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
    const context = AppButtonContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <button class="unit-button"
    :class="[
      context.props.variant,
      context.props.appearance,
      {
        rounded: context.props.isRounded,
        'is-loading': context.props.isLoading,
      },
    ]"
    :disabled="context.isDisabled()"
  >
    <span class="contents">
      <slot name="startIcon" />

      <slot />

      <slot name="endIcon" />
    </span>

    <span class="loader">
      <slot name="loader">
        <Icon name="svg-spinners:3-dots-fade" />
      </slot>
    </span>
  </button>
</template>

<style scoped>
.unit-button {
  border-radius: 0.5rem;
  border-style: solid;
  border-width: var(--size-thinnest);
  border-color: var(--color-border-button);

  padding-block: 0.75rem;
  padding-inline: 1rem;

  display: inline-grid;

  color: var(--color-text-primary);

  font-size: var(--font-size-small);
  font-weight: 500;
  line-height: 1;

  transition: opacity 0.3s var(--transition-timing-base);

  user-select: none;
}

.unit-button > .contents {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-button:not(.is-loading) > .loader {
  display: none;
}

.unit-button.is-loading > :not(.loader) {
  display: none;
}

/******************************************************/

/* Variants */
.unit-button.primary {
  background-color: var(--color-background-button-primary);
}

.unit-button.neutral {
  border-color: var(--color-border-button-neutral);

  background-color: var(--color-background-button-neutral);
}

.unit-button.success {
  background-color: var(--color-background-button-success);
}

.unit-button.error {
  background-color: var(--color-background-button-error);
}

.unit-button.muted {
  border-color: var(--color-border-button-muted);

  background-color: var(--color-background-button-muted);
}

/* Appearance */
.unit-button.outlined {
  border-color: var(--color-border-button-outlined);

  background-color: transparent;
}

.unit-button.outlined.success {
  border-color: var(--color-border-button-outlined-success);
}

.unit-button.outlined.error {
  border-color: var(--color-border-button-outlined-error);
}

/* Rounded */
.unit-button.rounded {
  border-radius: 100vh;
}

/* Disabled */
.unit-button:disabled {
  opacity: 0.4;

  cursor: not-allowed;
}
</style>
