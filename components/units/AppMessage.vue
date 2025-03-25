<script>
import {
  defineComponent,
} from 'vue'

import AppErrorMessageContext from './AppMessageContext'

export default defineComponent({
  props: {
    variant: {
      type: /** @type {import('vue').PropType<import('./AppMessageContext').PropsType['variant']>} */ (String),
      required: false,
      default: 'text',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'text',
        'box',
      ]
        .includes(value),
    },
    severity: {
      type: /** @type {import('vue').PropType<import('./AppMessageContext').PropsType['severity']>} */ (String),
      required: false,
      default: 'info',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'info',
        'success',
        'error',
        'warn',
      ]
        .includes(value),
    },
    isHidden: {
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
    const context = AppErrorMessageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span class="unit-message"
    :class="context.generateErrorMessageClasses()"
  >
    <slot />
  </span>
</template>

<style scoped>
.unit-message {
  font-size: var(--font-size-small);

  color: var(--color-text-error);
}

.unit-message.box {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;

  padding-block: 0.5rem;
  padding-inline: 0.75rem;

  display: inline-block;
}

/******* Variants *******/

.unit-message.info {
  color: var(--color-text-message-info);
}

.unit-message.box.info {
  background-color: var(--color-background-message-info);
}

.unit-message.success {
  color: var(--color-text-message-success);
}

.unit-message.box.success {
  background-color: var(--color-background-message-success);
}

.unit-message.error {
  color: var(--color-text-message-error);
}

.unit-message.box.error {
  background-color: var(--color-background-message-error);
}

.unit-message.warn {
  color: var(--color-text-message-warn);
}

.unit-message.box.warn {
  background-color: var(--color-background-message-warn);
}

/******* Show/hide *******/

.unit-message.hidden {
  display: none;
}
</style>
