<script>
import {
  defineComponent,
  reactive,
  shallowRef,
} from 'vue'

import {
  Icon,
} from '#components'

import useToastStore from '~/stores/toast'

import AppToastContext from './AppToastContext'

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    id: {
      type: Symbol,
      required: true,
    },
    title: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
    message: {
      type: String,
      required: true,
    },
    color: {
      type: /** @type {import('vue').PropType<import('./AppToastContext').PropsType['color']>} */ (String),
      required: false,
      default: 'neutral',
    },
    timeout: {
      type: Number,
      required: false,
      default: 5000,
    },
    shouldHideProgressBar: {
      type: Boolean,
      required: false,
      default: false,
    },
    shouldPauseOnHover: {
      type: Boolean,
      required: false,
      default: true,
    },
    iconName: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup (
    props,
    componentContext
  ) {
    const toastStore = useToastStore()

    const statusReactive = reactive({
      isRunning: true,
    })
    /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
    const progressBarElementShallowRef = shallowRef(null)

    const args = {
      props,
      componentContext,
      toastStore,
      statusReactive,
      progressBarElementShallowRef,
    }
    const context = AppToastContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    class="unit-toast"
    :class="[
      context.color,
    ]"
    @mouseenter="context.onMouseEnter({
      mouseEvent: $event,
    })"
    @mouseleave="context.onMouseLeave({
      mouseEvent: $event,
    })"
  >
    <div class="contents">
      <Icon
        :name="context.iconName"
        size="1.25rem"
        class="icon"
        :class="{
          hidden: !context.iconName,
        }"
      />

      <div class="text">
        <span class="title">
          {{ context.title }}
        </span>
        <p class="message">
          {{ context.message }}
        </p>
      </div>

      <button
        class="button dismiss"
        @click="context.dismissToast()"
      >
        <slot name="closeIcon">
          <Icon
            name="heroicons:x-mark"
            size="1.25rem"
          />
        </slot>
      </button>
    </div>

    <div
      :ref="context.progressBarElementShallowRef"
      class="progress-bar"
      :style="{
        animationDuration: `${context.timeout}ms`,
        animationPlayState: context.generateProgressBarAnimationPlayState(),
        visibility: context.generateProgressBarVisibility(),
      }"
    />
  </div>
</template>

<style scoped>
.unit-toast {
  --color-background-toast: var(--palette-layer-2);
  --color-background-progress-bar: var(--palette-layer-7);
  --color-text-icon: var(--color-text-primary);
}

.unit-toast {
  display: flex;
  flex-direction: column;

  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border);

  overflow: hidden;

  background-color: var(--color-background-toast);

  @media (48rem < width) {
    border-radius: 0.5rem;
  }
}

.unit-toast > .contents {
  display: flex;
  align-items: start;
  gap: 0.675rem;

  padding-block: 0.75rem;
  padding-inline: 0.75rem;
}

.unit-toast > .contents > .icon {
  color: var(--color-text-icon);
}

.unit-toast > .contents > .icon.hidden {
  display: none;
}

.unit-toast > .contents > .text {
  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-toast > .contents > .text > .title {
  font-weight: 500;
}

.unit-toast > .contents > .text > .title:empty {
  display: none;
}

.unit-toast > .contents > .text > .message {
  color: var(--color-text-secondary);
}

.unit-toast > .contents > .button.dismiss {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);
  background-color: transparent;

  transition: color 250ms var(--transition-timing-base);
}

.unit-toast > .contents > .button.dismiss:hover {
  color: var(--color-text-primary);
}

.unit-toast > .progress-bar {
  align-self: start;

  block-size: 0.25rem;
  inline-size: 100%;

  background-color: var(--color-background-progress-bar);

  transform-origin: left;
  animation: scale-x linear 1 forwards;
}

@keyframes scale-x {
  0% {
    scale: 1 1;
  }

  100% {
    scale: 0 1;
  }
}

/***** Colors *****/
.unit-toast.neutral {
  --color-background-progress-bar: var(--palette-layer-7);
  --color-text-icon: var(--color-text-primary);
}

.unit-toast.success {
  --color-background-progress-bar: var(--palette-green);
  --color-text-icon: var(--palette-green);
}

.unit-toast.error {
  --color-background-progress-bar: var(--palette-red);
  --color-text-icon: var(--palette-red);
}

.unit-toast.warning {
  --color-background-progress-bar: var(--palette-yellow);
  --color-text-icon: var(--palette-yellow);
}

.unit-toast.info {
  --color-background-progress-bar: var(--palette-purple);
  --color-text-icon: var(--palette-purple);
}
</style>
