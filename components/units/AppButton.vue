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
  <button
    class="unit-button"
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
  --color-background-button: var(--color-background-button-primary);

  border-radius: 0.5rem;
  border-style: solid;
  border-width: var(--size-thinnest);
  border-color: var(--color-border-button);

  padding-block: 0.75rem;
  padding-inline: 1rem;

  display: inline-grid;

  background-color: var(--color-background-button);
  color: var(--color-text-primary);

  font-size: var(--font-size-small);
  font-weight: 500;
  line-height: 1;

  transition: filter 0.3s var(--transition-timing-base),
    background-color 0.3s var(--transition-timing-base),
    border-color 0.3s var(--transition-timing-base),
    color 0.3s var(--transition-timing-base);

  user-select: none;
}

.unit-button > * {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.unit-button > .contents {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-button:not(.is-loading) > .loader {
  visibility: hidden;
}

.unit-button.is-loading > :not(.loader) {
  visibility: hidden;
}

/******************************************************/

/* Variants */
.unit-button.primary {
  --color-background-button: var(--color-background-button-primary);
}

.unit-button.neutral {
  border-color: var(--color-border-button-neutral);

  --color-background-button: var(--color-background-button-neutral);
}

.unit-button.success {
  --color-background-button: var(--color-background-button-success);
}

.unit-button.error {
  --color-background-button: var(--color-background-button-error);
}

.unit-button.muted {
  border-color: var(--color-border-button-muted);

  --color-background-button: var(--color-background-button-muted);
}

.unit-button.filled:not(:disabled):hover {
  background-color: color-mix(
    in srgb,
    var(--color-background-button) var(--value-button-hover-overlay-darken-opacity),
    var(--color-background-button-hover-overlay-darken)
  );
}

.unit-button.outlined {
  border-color: var(--color-border-button-outlined);

  background-color: transparent;
}

.unit-button.outlined:not(:disabled):hover {
  border-color: var(--color-border-button-outlined-hover);
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
  filter: brightness(0.4);

  cursor: not-allowed;
}
</style>
