<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AppCheckbox from '~/components/units/AppCheckbox.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppSelect from '~/components/units/AppSelect.vue'
import AppTable from '~/components/units/AppTable.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import HostedCompetitionParticipantsContext from './HostedCompetitionParticipantsContext'

export default defineComponent({
  components: {
    Icon,
    AppButton,
    AppCheckbox,
    AppPagination,
    AppSelect,
    AppTable,
    CopyButton,
    LinkTooltipButton,
  },

  props: {
    participants: {
      type: /** @type {import('vue').PropType<import('./HostedCompetitionParticipantsContext').PropsType['participants']>} */ (Array),
      required: true,
    },
    pagination: {
      type: /** @type {import('vue').PropType<import('./HostedCompetitionParticipantsContext').PropsType['pagination']>} */ ([
        Object,
        null,
      ]),
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

      <template #body-equity="{ value }">
        <span class="unit-equity">
          <AppButton
            class="button"
            is-rounded
            variant="neutral"
          >
            <Icon
              name="heroicons:arrow-path-rounded-square"
              size="1.25rem"
            />
          </AppButton>

          <span class="equity">
            {{ value }}
          </span>
        </span>
      </template>

      <template #body-status="{ value }">
        <span class="unit-status">
          <AppSelect
            class="select"
            :items="context.generateParticipantStatusSelectOptions()"
            :model-value="String(value.statusId)"
          >
            <AppButton
              class="button"
              variant="neutral"
            >
              <span>
                {{
                  context.generateParticipantStatusName({
                    statusId: value,
                  })
                }}
              </span>

              <template #endIcon>
                <Icon
                  name="heroicons:chevron-down"
                  size="1rem"
                  class="icon"
                />
              </template>
            </AppButton>
          </AppSelect>
        </span>
      </template>
    </AppTable>

    <AppPagination
      class="pagination"
      :pagination="context.pagination"
    />
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

.unit-equity {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-equity > .equity {
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-equity > .button {
  border-width: 0;

  padding-block: 0;
  padding-inline: 0;

  background-color: transparent;
  color: var(--color-text-tertiary);
}

.unit-equity > .button:hover {
  color: var(--color-text-primary);
}

.unit-status {
  display: inline-flex;
  justify-content: end;
}

.unit-status > .select .button {
  border-width: 0;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;

  text-transform: capitalize;

  background-color: transparent;
}

.unit-status > .select .button .icon {
  color: var(--color-text-tertiary);
}
</style>
