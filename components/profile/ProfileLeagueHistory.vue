<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import AppTable from '~/components/units/AppTable.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppIconBadge from '~/components/badges/AppIconBadge.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AddressPastCompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/addressPastCompetitions/AddressPastCompetitionsQueryGraphqlLauncher'

import ProfileLeagueHistoryContext from '~/app/vue/contexts/profile/ProfileLeagueHistoryContext'

export default defineComponent({
  components: {
    AppTable,
    AppPagination,
    AppIconBadge,
  },

  setup (
    props,
    componentContext
  ) {
    const statusReactive = reactive({
      isLoading: false,
    })
    const addressPastCompetitionsGraphqlClient = useGraphqlClient(AddressPastCompetitionsQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      statusReactive,
      graphqlClientHash: {
        addressPastCompetitions: addressPastCompetitionsGraphqlClient,
      },
    }
    const context = ProfileLeagueHistoryContext.create(args)
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
      min-width="45rem"
    >
      <template #body-title="{ value, row }">
        <div class="unit-title">
          <img :src="row.image"
            :alt="value"
            class="image"
          >

          <span>{{ value }}</span>
        </div>
      </template>

      <template #body-rank="{ value }">
        <span class="unit-rank">
          #{{ value }}
        </span>
      </template>

      <template #body-baseline="{ value }">
        <span class="unit-baseline">
          {{
            context.normalizePerformanceBaseline({
              figure: value,
            })
          }}
        </span>
      </template>

      <template #body-prize="{ value }">
        <span class="unit-prize">
          {{ value }}
        </span>
      </template>

      <template #body-profit="{ value }">
        <span class="unit-profit">
          <span class="pnl">
            {{
              context.normalizePnl({
                figure: value.pnl,
              })
            }}
          </span>

          <span class="roi">
            ({{
              context.normalizeRoi({
                figure: value.roi,
              })
            }})
          </span>
        </span>
      </template>

      <template #body-status="{ value }">
        <AppIconBadge :severity="context.generateStatusSeverity({
                        statusId: value.statusId,
                      })"
          :icon-name="context.generateStatusIconName({
            statusId: value.statusId,
          })"
        >
          {{
            context.generateStatusDescription({
              statusId: value.statusId,
            })
          }}
        </AppIconBadge>
      </template>
    </AppTable>

    <AppPagination class="pagination"
      page-key="leaguePage"
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

.unit-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-tertiary);
}

.unit-title > .image {
  border-radius: 0.625rem;

  width: 2.5rem;
  height: 2.5rem;
}

.unit-rank {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-secondary);
}

.unit-baseline {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-secondary);
}

.unit-prize {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-profit {
  display: inline-flex;
  flex-direction: column;
  gap: 0.125rem;
}

.unit-profit > .pnl {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-secondary);
}

.unit-profit > .roi {
  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);

  color: var(--color-text-tertiary);
}
</style>
