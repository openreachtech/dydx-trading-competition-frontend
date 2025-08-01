<script>
import {
  defineComponent,
  ref,
  shallowRef,
} from 'vue'

import {
  Icon,
} from '#components'

import ProfileAvatarContext from './ProfileAvatarContext'

export default defineComponent({
  components: {
    Icon,
  },

  props: {
    inputName: {
      type: String,
      required: false,
      default: '',
    },
    alt: {
      type: String,
      required: false,
      default: 'Avatar Image',
    },
    isUploadingImage: {
      type: Boolean,
      required: false,
      default: false,
    },
    defaultImageUrl: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
  },

  emits: [
    ProfileAvatarContext.EMIT_EVENT_NAME.UPLOAD_IMAGE,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').ShallowRef<HTMLInputElement | null>} */
    const inputElementShallowRef = shallowRef(null)
    /** @type {import('vue').Ref<string | null>} */
    const localImageSourceRef = ref(null)

    const args = {
      props,
      componentContext,
      inputElementShallowRef,
      localImageSourceRef,
    }
    const context = ProfileAvatarContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-avatar-container">
    <div
      class="unit-avatar"
      :class="{
        loading: context.isUploadingImage,
      }"
    >
      <img
        class="image"
        :src="context.generateAvatarImageUrl()"
        :alt="context.alt"
        :class="{
          hidden: !context.containsImage(),
        }"
      >

      <Icon
        name="heroicons:user-solid"
        class="icon fallback"
        :class="{
          hidden: context.containsImage(),
        }"
      />

      <input
        :ref="context.inputElementShallowRef"
        class="input"
        type="file"
        accept="image/*"
        @change="context.onInputChange({
          changeEvent: $event,
        })"
      >

      <!-- Hidden input to use when submitting form. -->
      <input
        type="hidden"
        :name="context.inputName"
      >

      <button
        class="button"
        :disabled="context.isUploadingImage"
        @click="context.selectFile()"
      >
        <Icon
          name="heroicons:photo-solid"
          size="2rem"
        />
      </button>

      <div
        class="loader"
        aria-hidden="true"
      >
        <Icon
          name="svg-spinners:3-dots-move"
          class="icon"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-avatar {
  --size-avatar: 6rem;
  --size-icon-fallback: 3.75rem;
  --size-icon-loader: 1.5rem;

  --color-background-backdrop: rgba(0, 0, 0, 0.4);
  --color-background-avatar: var(--palette-layer-4);
  --color-border-avatar: var(--palette-layer-4);

  display: grid;
  grid-template-areas: 'stack';

  width: var(--size-avatar);
  height: var(--size-avatar);

  background-color: var(--color-background-avatar);

  mask: url('~/assets/img/masks/hexagon-mask.svg') center / contain no-repeat;
}

.unit-avatar > * {
  grid-area: stack;
}

.unit-avatar > .image {
  width: var(--size-avatar);
  height: var(--size-avatar);
}

.unit-avatar > .image.hidden {
  display: none;
}

.unit-avatar > .icon.fallback {
  justify-self: center;
  align-self: center;

  width: var(--size-icon-fallback);
  height: var(--size-icon-fallback);

  color: var(--color-text-tertiary);
}

.unit-avatar > .icon.fallback.hidden {
  display: none;
}

.unit-avatar > .input {
  display: none;
}

.unit-avatar > .button {
  /* We need z-index to make button appear on top of other elements in Safari. */
  z-index: calc(var(--value-z-index-layer-content) + 1000);

  background-color: var(--color-background-backdrop);

  transition: opacity 250ms var(--transition-timing-base);
}

.unit-avatar:not(:hover) > .button,
.unit-avatar.loading > .button {
  opacity: 0;
}

.unit-avatar.loading > .button {
  cursor: not-allowed;
}

.unit-avatar > .loader {
  /* We need z-index to make loader appear on top of other elements in Safari. */
  z-index: calc(var(--value-z-index-layer-content) + 1000);

  display: grid;
  justify-content: center;
  align-items: center;

  background-color: var(--color-background-backdrop);

  transition: opacity 250ms var(--transition-timing-base);
}

.unit-avatar > .loader > .icon {
  width: var(--size-icon-loader);
  height: var(--size-icon-loader);

  color: var(--color-text-primary);
}

.unit-avatar:not(.loading) > .loader {
  opacity: 0;

  pointer-events: none;
}
</style>
