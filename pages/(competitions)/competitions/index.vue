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
  Icon,
} from '#components'

import {
  definePageMeta,
} from '#imports'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AppLeagueCard from '~/components/units/AppLeagueCard.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppLoadingLayout from '~/components/units/AppLoadingLayout.vue'
import AppSkeleton from '~/components/units/AppSkeleton.vue'
import AppSearchBar from '~/components/units/AppSearchBar.vue'
import LeagueHeroSection from '~/components/LeagueHeroSection.vue'

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'
import CompetitionStatisticsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionStatistics/CompetitionStatisticsQueryGraphqlLauncher'

import {
  BASE_PAGE_TITLE,
} from '~/app/constants'

import CompetitionsPageContext from '~/app/vue/contexts/CompetitionsPageContext'

export default defineComponent({
  components: {
    Icon,
    AppLeagueCard,
    AppPagination,
    AppLoadingLayout,
    AppSkeleton,
    AppSearchBar,
    LeagueHeroSection,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: `Arenas - ${BASE_PAGE_TITLE}`,
      },
    })

    const route = useRoute()
    const router = useRouter()

    const competitionsGraphqlClient = useGraphqlClient(CompetitionsQueryGraphqlLauncher)
    const competitionStatisticsGraphqlClient = useGraphqlClient(CompetitionStatisticsQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoadingCompetitions: false,
      isLoadingCompetitionStatistics: true,
    })

    const args = {
      props,
      componentContext,
      route,
      router,
      graphqlClientHash: {
        competitions: competitionsGraphqlClient,
        competitionStatistics: competitionStatisticsGraphqlClient,
      },
      statusReactive,
    }
    const context = CompetitionsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})

// TODO: `.unit-cards` is wrapped by an empty `<div>` because its `display: grid` is overwriting
// the `display: none` value of furo-loading-layout. This is a temporary workaround.
</script>

<template>
  <div class="unit-container">
    <LeagueHeroSection :competition-statistics-capsule="context.competitionStatisticsCapsule" />

    <AppSearchBar
      has-filter
      placeholder="Search for arena"
      size="large"
      :filters="context.competitionsFilters"
      @search="query => context.fetchCompetitions({
        title: query,
      })"
    />

    <AppLoadingLayout :is-loading="context.isLoadingCompetitions">
      <template #contents>
        <div>
          <div class="unit-cards">
            <AppLeagueCard
              v-for="it of context.competitions"
              :key="it.competitionId"
              :competition="it"
            />
          </div>

          <div
            class="unit-empty competitions"
            :class="context.generateEmptyCompetitionsClasses()"
          >
            <Icon
              name="heroicons:magnifying-glass"
              size="7rem"
            />
            <p class="description">
              No arenas found
            </p>
          </div>
        </div>
      </template>

      <template #loader>
        <div class="unit-cards">
          <AppSkeleton
            v-for="it of 6"
            height="21.25rem"
          />
        </div>
      </template>
    </AppLoadingLayout>

    <AppPagination
      :pagination="context.generatePaginationResult()"
      class="pagination"
      :class="context.generatePaginationClasses()"
    />
  </div>
</template>

<style scoped>
.unit-container {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-block-end: 7.5rem;
}

.unit-cards {
  padding-block-start: 2.25rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 1fr;
  justify-content: center;
  gap: 2rem;

  @media (30rem < width) {
    grid-template-columns: repeat(auto-fill, minmax(21.5rem, 1fr));
  }
}

.unit-empty.competitions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;

  padding-block: 4rem 2rem;
  padding-inline: 1rem;

  text-align: center;

  color: var(--color-text-placeholder);
}

.unit-empty.competitions > .description {
  font-size: var(--font-size-large);
  font-weight: 700;
}

.unit-empty.hidden {
  display: none;
}

.unit-container > .pagination {
  margin-block-start: 4rem;
}

.unit-container > .pagination.hidden {
  display: none;
}
</style>
