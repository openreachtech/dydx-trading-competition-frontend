<script>
import {
  defineComponent,
} from 'vue'

import AppTooltipContext from '~/app/vue/contexts/AppTooltipContext'

export default defineComponent({
  props: {
    position: {
      type: /** @type {import('vue').PropType<import('~/app/vue/contexts/AppTooltipContext').TooltipPosition>} */ (String),
      required: false,
      default: 'top',
      /** @type {(value: string) => boolean} */
      validator: value => [
        'top',
        'top-start',
        'top-end',
        'right',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
      ]
        .includes(value),
    },
    message: {
      type: String,
      required: true,
    },
    activeMessage: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
    isHiddenOnHover: {
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
    const context = AppTooltipContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <span
    class="unit-tooltip"
    :class="context.generateTooltipClasses()"
  >
    <slot name="contents" />

    <span class="message">
      <slot
        name="tooltip"
        :message="context.generateTooltipMessage()"
      >
        {{ context.generateTooltipMessage() }}
      </slot>
    </span>
  </span>
</template>

<style scoped>
.unit-tooltip {
  position: relative;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-tooltip > .message {
  border-radius: 0.25rem;

  padding-block: 0.125rem;
  padding-inline: 0.5rem;

  position: absolute;

  display: none;
  justify-content: center;
  align-items: center;

  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);

  color: var(--color-text-secondary);
  background-color: var(--color-background-tooltip);

  z-index: calc(var(--value-z-index-layer-content) + 1);
}

.unit-tooltip > .message::before {
  content: '';

  position: absolute;

  width: 1rem;
  height: 0.5rem;

  background-color: var(--color-background-tooltip);
}

/**************** Conditional display ************/
.unit-tooltip:not(.no-hover, .active):hover > .message {
  display: inline-flex;

  animation: fade-in 250ms var(--transition-timing-base) forwards;
}

.unit-tooltip.active > .message {
  display: inline-flex;
}

/**************** Tooltip's position ************/
.unit-tooltip.top > .message {
  bottom: calc(100% + 0.75rem);
}

.unit-tooltip.top > .message::before {
  top: 100%;

  clip-path: polygon(
    0% 0%,
    50% 100%,
    100% 0%
  );
}

.unit-tooltip.top-start > .message {
  bottom: calc(100% + 0.75rem);
  right: 0;
}

.unit-tooltip.top-start > .message::before {
  top: 100%;
  right: 0;

  clip-path: polygon(
    0% 0%,
    50% 100%,
    50% 0%
  );
}

.unit-tooltip.top-end > .message {
  bottom: calc(100% + 0.75rem);
  left: 0;
}

.unit-tooltip.top-end > .message::before {
  top: 100%;
  left: 0;

  clip-path: polygon(
    50% 0%,
    50% 100%,
    100% 0%
  );
}

.unit-tooltip.right > .message {
  left: calc(100% + 0.75rem);
}

.unit-tooltip.right > .message::before {
  right: 100%;

  clip-path: polygon(
    0% 50%,
    100% 0%,
    100% 100%
  );
}

.unit-tooltip.bottom > .message {
  top: calc(100% + 0.75rem);
}

.unit-tooltip.bottom > .message::before {
  bottom: 100%;

  clip-path: polygon(
    0% 100%,
    50% 0%,
    100% 100%
  );
}

.unit-tooltip.bottom-start > .message {
  top: calc(100% + 0.75rem);
  right: 0;
}

.unit-tooltip.bottom-start > .message::before {
  bottom: 100%;
  right: 0;

  clip-path: polygon(
    0% 100%,
    50% 0%,
    50% 100%
  );
}

.unit-tooltip.bottom-end > .message {
  top: calc(100% + 0.75rem);
  left: 0;
}

.unit-tooltip.bottom-end > .message::before {
  bottom: 100%;
  left: 0;

  clip-path: polygon(
    50% 0%,
    50% 100%,
    100% 100%
  );
}

.unit-tooltip.left > .message {
  right: calc(100% + 0.75rem);
}

.unit-tooltip.left > .message::before {
  left: 100%;

  clip-path: polygon(
    0% 0%,
    0% 100%,
    100% 50%
  );
}

.unit-tooltip.top > .message,
.unit-tooltip.bottom > .message {
  text-align: center;
}

.unit-tooltip.left > .message::before,
.unit-tooltip.right > .message::before {
  width: 0.25rem;
  height: 0.5rem;
}

/**************** Animation ************/
@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
    transform: scale(0.9);
  }

  100% {
    opacity: 1;
    display: inline-flex;
  }
}
</style>
