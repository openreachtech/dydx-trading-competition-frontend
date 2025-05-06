<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'
import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'
import useWalletStore from '~/stores/wallet'

import {
  NuxtLink,
  Icon,
} from '#components'

import AppSearchBar from '~/components/units/AppSearchBar.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppTable from '~/components/units/AppTable.vue'
import AppIconBadge from '~/components/badges/AppIconBadge.vue'

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'

import HostedArenasFetcher from './HostedArenasFetcher'
import HostedArenasPageContext from './HostedArenasPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppSearchBar,
    AppPagination,
    AppTable,
    AppIconBadge,
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const router = useRouter()
    const walletStore = useWalletStore()

    const statusReactive = reactive({
      isLoadingCompetitions: true,
    })

    const competitionsGraphqlClient = useGraphqlClient(CompetitionsQueryGraphqlLauncher)
    const hostedArenasFetcher = HostedArenasFetcher.create({
      route,
      walletStore,
      graphqlClientHash: {
        competitions: competitionsGraphqlClient,
      },
      statusReactive,
    })

    const args = {
      props,
      componentContext,
      route,
      router,
      fetcherHash: {
        hostedArenas: hostedArenasFetcher,
      },
    }
    const context = HostedArenasPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="header">
      <NuxtLink to="/competitions"
        class="link"
      >
        <Icon name="heroicons-outline:arrow-left"
          size="1.5rem"
        />
      </NuxtLink>
      <span class="heading">
        My Hosted Arenas
      </span>
    </div>

    <AppSearchBar placeholder="Search your hosted arenas"
      size="large"
      class="search"
      @search="query => context.updateTitleQuery({
        title: query,
      })"
    />

    <AppTable :header-entries="context.competitionsTableHeaderEntries"
      :entries="context.generateCompetitionsTableEntries()"
      class="table"
    >
      <template #body-title="{ value, row }">
        <span class="unit-column title">
          <img :src="row.image"
            :alt="value"
            class="image"
          >
          <span class="title">
            {{ value }}
          </span>
        </span>
      </template>

      <template #body-startDate="{ value }">
        <span class="unit-column date">
          <Icon name="heroicons:rocket-launch-solid"
            size="1rem"
            class="icon"
          />
          <span class="date">
            {{
              context.formatDate({
                datetime: value,
              })
            }}
          </span>

          <span />
          <span class="time">
            {{
              context.formatTime({
                datetime: value,
              })
            }}
          </span>
        </span>
      </template>

      <template #body-endDate="{ value }">
        <span class="unit-column date">
          <Icon name="heroicons:flag-solid"
            size="1rem"
            class="icon"
          />
          <span class="date">
            {{
              context.formatDate({
                datetime: value,
              })
            }}
          </span>

          <span />
          <span class="time">
            {{
              context.formatTime({
                datetime: value,
              })
            }}
          </span>
        </span>
      </template>

      <template #body-status="{ value }">
        <AppIconBadge :icon-name="context.generateBadgeIconName({
                        statusId: value,
                      })"
          :severity="context.generateBadgeSeverity({
            statusId: value,
          })"
        >
          {{
            context.generateBadgeDescription({
              statusId: value,
            })
          }}
        </AppIconBadge>
      </template>
    </AppTable>

    <AppPagination :pagination="context.generateCompetitionsPaginationResult()" />
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-block-end: 12rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .header {
  margin-block-end: 2.25rem;

  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-text-primary);
}

.unit-page > .header > .link {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: inherit;
}

.unit-page > .header > .link.back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-page > .header > .heading {
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);
}

.unit-page > .search {
  margin-block-end: 1.5rem;
}

.unit-page > .table {
  margin-block-end: 1.5rem;
}

.unit-column.title {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.unit-column.title > .image {
  border-radius: 0.5rem;

  width: 2rem;
  height: 2rem;

  padding-block: 0.125rem;
  padding-inline: 0.125rem;

  object-fit: cover;

  background-color: var(--color-background-skeleton);
}

.unit-column.title > .title {
  --max-line-count: 2;

  max-height: calc(var(--max-line-count) * var(--size-line-height-base));

  overflow: hidden;

  font-weight: 700;
  line-height: var(--size-line-height-base);
}

@supports (line-clamp: 2) or ((-webkit-line-clamp: 2) and (display: -webkit-box) and (-webkit-box-orient: vertical)) {
  .unit-column.title > .title {
    display: -webkit-box;
    line-clamp: var(--max-line-count);
    -webkit-line-clamp: var(--max-line-count);
    -webkit-box-orient: vertical;
  }
}

.unit-column.date {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  row-gap: 0.125rem;
  column-gap: 0.75rem;
  align-items: center;
}

.unit-column.date > .icon {
  color: var(--color-text-tertiary);
}

.unit-column.date > .date {
  color: var(--color-text-secondary);
}

.unit-column.date > .time {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}
</style>
