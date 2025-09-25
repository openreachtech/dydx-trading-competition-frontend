<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  Icon,
} from '#components'

import AppSelect from '~/components/units/AppSelect.vue'

import {
  AVAILABLE_SORT_COLUMN,
  SORT_DIRECTION_OPTION,
} from '~/app/constants'

import AddCompetitionFormStepOptionsContext from './AddCompetitionFormStepOptionsContext'

export default defineComponent({
  components: {
    Icon,
    AppSelect,
  },

  props: {
    isEditMode: {
      type: Boolean,
      required: false,
      default: false,
    },
    initialFormValueHash: {
      /**
       * @type {import('vue').PropType<
       *   import('./AddCompetitionFormStepOptionsContext').PropsType['initialFormValueHash']
       * >}
       */
      type: [
        Object,
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
    const sortOptionRef = ref({
      targetColumn: AVAILABLE_SORT_COLUMN.PNL,
      orderBy: SORT_DIRECTION_OPTION.DESC,
    })

    const args = {
      props,
      componentContext,
      sortOptionRef,
    }
    const context = AddCompetitionFormStepOptionsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-options">
    <label class="label">
      <Icon
        name="heroicons:arrows-up-down"
        size="1.25rem"
        class="icon"
      />
      <span>Sort Leaderboard By</span>
    </label>

    <AppSelect
      :items="context.leaderboardSortOptions"
      :model-value="context.selectedTargetColumn"
      @update:model-value="context.updateSortTargetColumn({
        targetColumn: $event,
      })"
    />

    <input
      type="text"
      :name="context.generateTargetColumnInputName()"
      :value="context.selectedTargetColumn"
      class="input hidden"
    >
    <input
      type="text"
      :name="context.generateOrderByInputName()"
      :value="context.selectedOrderBy"
      class="input hidden"
    >
  </div>
</template>

<style scoped>
.unit-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-options > .label {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.375rem;

  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-options > .label > .icon {
  color: var(--color-text-tertiary);
}

.unit-options > .input.hidden {
  display: none;
}
</style>
