<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

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
    isBulkUpdatingParticipantStatus: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: Object.values(
    HostedCompetitionParticipantsContext.EMIT_EVENT_NAME
  ),

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const router = useRouter()

    const selectedParticipantRef = ref({})

    const args = {
      props,
      componentContext,
      route,
      router,
      selectedParticipantRef,
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
      <template #header>
        <div class="unit-header">
          <div
            class="actions"
            :class="{
              hidden: !context.hasSelectedParticipants(),
            }"
          >
            <AppButton
              variant="neutral"
              class="button"
              @click="context.emitFetchParticipantsCurrentEquities()"
            >
              <span>Fetch Equity</span>
              <Icon
                name="heroicons:arrow-path-rounded-square"
                size="1rem"
              />
            </AppButton>

            <div class="divider" />

            <AppSelect
              class="select"
              :items="context.generateParticipantStatusSelectOptions()"
              :is-loading="context.isBulkUpdatingParticipantStatus"
              @update:model-value="context.emitBulkUpdateParticipantStatus({
                statusId: $event,
              })"
            >
              <AppButton
                variant="neutral"
                size="icon"
                class="button"
                :is-loading="context.isBulkUpdatingParticipantStatus"
              >
                <span>Change Status</span>
                <Icon
                  name="heroicons:chevron-down"
                  size="1rem"
                />
              </AppButton>
            </AppSelect>
          </div>

          <span
            class="heading"
            :class="{
              hidden: context.hasSelectedParticipants(),
            }"
          >
            Select participants to fetch their equity or update their status
          </span>

          <AppSelect
            :items="context.generateParticipantStatusFullSelectOptions()"
            placeholder="All Status"
            class="something"
            :model-value="context.extractStatusIdFromRoute()"
            @update:model-value="context.updateStatusIdQuery({
              statusId: $event,
            })"
          />
        </div>
      </template>

      <template #head-checkbox>
        <AppCheckbox
          :model-value="context.hasSelectedAllParticipants()"
          :indeterminate="context.hasIndeterminatelySelectedParticipants()"
          @update:model-value="context.toggleSelectAllParticipants()"
        />
      </template>

      <template #body-checkbox="{ row }">
        <AppCheckbox
          :model-value="context.isParticipantSelected({
            participantId: row.competitionParticipantId,
          })"
          @update:model-value="context.toggleParticipant({
            participantId: row.competitionParticipantId,
          })"
        />
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

      <template #body-equity="{ value, row }">
        <span class="unit-equity">
          <AppButton
            class="button"
            is-rounded
            variant="neutral"
            @click="context.emitFetchParticipantsCurrentEquities({
              competitionParticipantIds: [row.competitionParticipantId]
            })"
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

      <template #body-status="{ value, row }">
        <span class="unit-status">
          <AppSelect
            class="select"
            :items="context.generateParticipantStatusSelectOptions()"
            :model-value="String(value.statusId)"
            @update:model-value="context.emitBulkUpdateParticipantStatus({
              competitionParticipantIds: [row.competitionParticipantId],
              statusId: $event,
            })"
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

.unit-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  margin-block-end: 0.25rem;

  @media (48rem < width) {
    flex-direction: row;
    align-items: center;
  }
}

.unit-header > .actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.unit-header > .actions > .button,
.unit-header > .actions > .select .button {
  border-width: 0;

  padding-block: 0;
  padding-inline: 0;

  background-color: transparent;
  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-header > .actions > .button:hover,
.unit-header > .actions > .select .button:hover {
  background-color: transparent;
  color: var(--color-text-primary);
}

.unit-header > .actions > .divider {
  inline-size: var(--size-thinnest);
  block-size: 1.25rem;

  background-color: var(--color-background-divider);
}

.unit-header > .heading {
  font-size: var(--font-size-medium);
  font-weight: 500;

  color: var(--color-text-placeholder);
}

.unit-header > :where(.actions, .heading).hidden {
  display: none;
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
