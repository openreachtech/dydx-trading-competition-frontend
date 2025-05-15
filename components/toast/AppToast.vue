<script>
import {
  defineComponent,
  ref,
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
      default: 'default',
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
    const isRunningRef = ref(true)
    /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
    const progressBarElementShallowRef = shallowRef(null)

    const args = {
      props,
      componentContext,
      toastStore,
      isRunningRef,
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
  --color-background-toast-neutral: var(--palette-layer-2);
  --color-background-toast-info: var(--color-palette-layer-2);
  --color-background-toast-success: var(--color-palette-layer-2);
  --color-background-toast-error: var(--color-palette-layer-2);
  --color-background-toast-warning: var(--color-palette-layer-2);

  --color-background-progress-bar-neutral: var(--palette-purple);
  --color-background-progress-bar-info: var(--palette-purple);
  --color-background-progress-bar-success: var(--palette-purple);
  --color-background-progress-bar-error: var(--palette-purple);
  --color-background-progress-bar-warning: var(--palette-purple);
}

.unit-toast {
  display: flex;
  flex-direction: column;

  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border);

  overflow: hidden;

  background-color: var(--color-background-toast-neutral);

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
  color: var(--color-text-primary);
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

  background-color: var(--color-background-progress-bar-neutral);

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
</style>
