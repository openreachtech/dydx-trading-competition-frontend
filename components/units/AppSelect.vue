<script>
import {
  defineComponent,
  reactive,
  ref,
  shallowRef,
} from 'vue'

import {
  Icon,
} from '#components'

import AppSelectContext from './AppSelectContext'

import vOnClickOutside from '~/app/vue/directives/vOnClickOutside'

import AppButton from '@/components/units/AppButton.vue'

const EVENT_NAME = {
  UPDATE_MODEL_VALUE: 'update:modelValue',
}

export default defineComponent({
  name: 'AppSelect',

  components: {
    AppButton,
    Icon,
  },

  directives: {
    onClickOutside: vOnClickOutside,
  },

  props: {
    dropdownClass: {
      type: String,
      required: false,
      default: '',
    },
    items: {
      type: /** @type {import('vue').PropType<Array<import('./AppSelectContext').SelectOption>>} */ (Array),
      default: () => [],
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    placeholder: {
      type: String,
      default: 'Options',
    },
    modelValue: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: '',
    },
    position: {
      type: /** @type {import('vue').PropType<import('./AppSelectContext').AppSelectContextProps['position']>} */ (String),
      default: 'left',
    },
  },

  emits: [
    EVENT_NAME.UPDATE_MODEL_VALUE,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
    const containerElementShallowRef = shallowRef(null)
    const selectedValueRef = ref('')

    const args = {
      props,
      componentContext,
      statusReactive: reactive({
        isOpenSelect: false,
      }),
      containerElementShallowRef,
      selectedValueRef,
    }

    const context = AppSelectContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    :ref="context.containerElementShallowRef"
    class="unit-select"
    :class="context.generateContainerClass()"
  >
    <input
      v-if="name"
      :name="name"
      :value="context.selectedValueRef.value"
      type="hidden"
    >

    <div
      class="trigger"
      @click="context.toggleSelect()"
    >
      <slot name="default">
        <AppButton
          :is-rounded="context.isRounded"
          variant="muted"
          :disabled="context.isDisabled"
          :is-loading="context.isLoading"
        >
          <Icon
            v-if="context.generateSelectedIconName()"
            :name="context.generateSelectedIconName()"
            size="1.25rem"
          />

          <span v-if="context.selectedValueRef.value">
            {{
              context.generateSelectedLabel()
            }}
          </span>

          <span
            v-else
            class="placeholder"
          >
            {{ context.placeholder }}
          </span>

          <Icon
            name="heroicons:chevron-down"
            class="icon"
            size="1rem"
          />
        </AppButton>
      </slot>
    </div>

    <Teleport to="#teleports">
      <Transition name="fade">
        <div
          v-if="context.isOpenSelect"
          v-on-click-outside="() => context.closeSelect()"
          class="unit-contents"
          :class="[
            context.dropdownClass,
          ]"
          :style="context.generateDropdownStyle()"
        >
          <template
            v-for="(item, index) in items"
            :key="index"
          >
            <slot
              :name="item.value"
              :item="item"
            >
              <div
                class="item"
                :class="context.generateItemClass({
                  selectedOption: item,
                })"
                @click="() => context.selectOption({
                  selectedOption: item,
                })"
              >
                <Icon
                  v-if="item.iconName"
                  class="icon"
                  :name="item.iconName"
                />

                <span class="label">
                  {{ item.label }}
                </span>
              </div>
            </slot>
          </template>
        </div>
      </Transition>
    </Teleport>
    </input>
  </div>
</template>

<style scoped>
.unit-select {
  position: relative;
  width: fit-content;
  font-size: var(--font-size-base);
}

.unit-select > .trigger {
  display: grid;

  width: 100%;
}

.unit-select.opened > .trigger .icon {
  transform: rotate(180deg);
}

.unit-select > .trigger .icon {
  transition: transform 200ms ease-in-out;
}

.unit-contents {
  --color-border: var(--palette-layer-6);
  --color-background: var(--palette-layer-2);

  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border);
  border-radius: 0.5rem;

  padding: 0.75rem;

  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 12.5rem;
  height: fit-content;

  max-height: 18.75rem;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  background-color: var(--color-background);
  z-index: calc(var(--value-z-index-layer-staying) + 1);

  animation: fade-in 200ms ease-in-out;
}

.unit-select.closed > .contents {
  animation: fade-out 200ms ease-in-out;
}

.unit-contents .item {
  border-radius: 0.25rem;
  padding-block: 0.625rem;
  padding-inline: 1rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}

.unit-contents .item.disabled {
  color: var(--color-text-placeholder);
  pointer-events: none;
}

.unit-contents .item:hover {
  --color-background-item-hover: var(--palette-layer-5);

  background-color: var(--color-background-item-hover);
}

.unit-contents .item.selected {
  --color-background-item-selected: var(--palette-layer-3);

  background-color: var(--color-background-item-selected);
}

.unit-select .placeholder {
  color: var(--color-text-placeholder);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
