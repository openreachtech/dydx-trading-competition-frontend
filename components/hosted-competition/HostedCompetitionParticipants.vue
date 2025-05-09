<script>
import {
  defineComponent,
} from 'vue'

import AppCheckbox from '~/components/units/AppCheckbox.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppTable from '~/components/units/AppTable.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import HostedCompetitionParticipantsContext from './HostedCompetitionParticipantsContext'

export default defineComponent({
  components: {
    AppCheckbox,
    AppPagination,
    AppTable,
    CopyButton,
    LinkTooltipButton,
  },

  props: {
    participants: {
      type: /** @type {import('vue').PropType<import('./HostedCompetitionParticipantsContext').PropsType['participants']>} */ (Array),
      required: true,
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
    const context = HostedCompetitionParticipantsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <AppTable
      :header-entries="context.participantsTableHeaderEntries"
      :entries="context.generateParticipantsTableEntries()"
      class="table"
    >
      <template #head-checkbox>
        <AppCheckbox />
      </template>

      <template #body-checkbox>
        <AppCheckbox />
      </template>

      <template #body-name="{ value }">
        <span class="unit-name">
          {{ value }}
        </span>
      </template>

      <template #body-address="{ value }">
        <span class="unit-address">
          <span class="address">
            {{
              context.generateDisplayedParticipantAddress({
                address: value,
              })
            }}
          </span>
          <CopyButton :content-to-copy="value" />
          <LinkTooltipButton
            tooltip-message="View on Mintscan"
            :href="context.generateParticipantMintscanUrl({
              address: value,
            })"
            external
            rel="noopener noreferrer"
          />
        </span>
      </template>
    </AppTable>

    <AppPagination class="pagination" />
  </div>
</template>

<style scoped>
.unit-container > .pagination {
  margin-block-start: 1.5rem;
}

.unit-name {
  color: var(--color-text-secondary);
}

.unit-address {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-address > .address {
  color: var(--color-text-secondary);
}
</style>
