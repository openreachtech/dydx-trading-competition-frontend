<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  Icon,
} from '#components'

import AppTable from '~/components/units/AppTable.vue'
import AppPagination from '~/components/units/AppPagination.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AddressCurrentCompetitionTransfersQueryGraphqlLauncher from '~/app/graphql/client/queries/addressCurrentCompetitionTransfers/AddressCurrentCompetitionTransfersQueryGraphqlLauncher'

import ProfileTransferHistoryContext from '~/app/vue/contexts/profile/ProfileTransferHistoryContext'

export default defineComponent({
  components: {
    Icon,
    AppTable,
    AppPagination,
  },

  setup (
    props,
    componentContext
  ) {
    const statusReactive = reactive({
      isLoading: false,
    })
    const addressCurrentCompetitionTransfersGraphqlClient = useGraphqlClient(AddressCurrentCompetitionTransfersQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      statusReactive,
      graphqlClientHash: {
        addressCurrentCompetitionTransfers: addressCurrentCompetitionTransfersGraphqlClient,
      },
    }
    const context = ProfileTransferHistoryContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <AppTable :header-entries="context.tableHeaderEntries"
      :entries="context.generateTableEntries()"
      should-hide-header-cells
      min-width="45rem"
    >
      <template #body-time="{ value }">
        <span class="unit-time">
          <span>
            {{
              context.generateDate({
                dateString: value,
              })
            }}
          </span>
          <span class="hour">
            {{
              context.generateHour({
                dateString: value,
              })
            }}
          </span>
        </span>
      </template>

      <template #body-participant="{ value, row }">
        <div class="unit-participant"
          :class="context.generateParticipantClasses({
            categoryId: row.categoryId,
          })"
        >
          <span class="icon">
            <Icon size="1.25rem"
              :name="context.generateParticipantIconName({
                categoryId: row.categoryId,
              })"
            />
          </span>

          <span class="address">
            {{
              context.shortenAddress({
                address: value.address,
              })
            }}
          </span>
        </div>
      </template>

      <template #body-amount="{ value }">
        <span class="unit-amount">
          {{ value }}
        </span>
      </template>

      <template #body-hash="{ value }">
        <div class="unit-hash">
          <span class="hash">
            <span>
              {{
                context.shortenAddress({
                  address: value,
                })
              }}
            </span>

            <button class="button">
              <Icon name="heroicons-outline:duplicate"
                size="1rem"
              />
            </button>
            <button class="button">
              <Icon name="heroicons-outline:external-link"
                size="1rem"
              />
            </button>
          </span>

          <span class="note">
            on DYDX Chain (hash)
          </span>
        </div>
      </template>
    </AppTable>

    <AppPagination class="pagination"
      page-key="transferPage"
      :pagination="context.paginationResult"
    />
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 2rem;
}

.unit-container > .pagination {
  margin-block-start: 1.25rem;
}

.unit-time {
  display: inline-flex;
  flex-direction: column;
  gap: 0.125rem;

  font-size: var(--font-size-base);

  white-space: nowrap;

  color: var(--color-text-secondary);
}

.unit-time > .hour {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-participant {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.unit-participant > .icon {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  border-radius: 100vh;

  padding: 0.5rem;
}

.unit-participant.out > .icon {
  background-color: var(--color-background-transfer-out);
  color: var(--color-text-transfer-out);
}

.unit-participant.in > .icon {
  background-color: var(--color-background-transfer-in);
  color: var(--color-text-transfer-in);
}

.unit-participant > .address {
  color: var(--color-text-secondary);
}

.unit-amount {
  font-size: var(--font-size-base);
  font-weight: 500;
}

.unit-hash {
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 0.125rem;
}

.unit-hash > .hash {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-hash > .hash > .button {
  border-radius: 100vh;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-hash > .hash > .button:hover {
  color: var(--color-text-primary);
}

.unit-hash > .note {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}
</style>
