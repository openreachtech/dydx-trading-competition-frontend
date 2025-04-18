<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import AppLeagueCard from '~/components/units/AppLeagueCard.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import AppLoadingLayout from '~/components/units/AppLoadingLayout.vue'
import AppSkeleton from '~/components/units/AppSkeleton.vue'
import LeagueHeroSection from '~/components/LeagueHeroSection.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'
import CompetitionStatisticsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionStatistics/CompetitionStatisticsQueryGraphqlLauncher'

import CompetitionsPageContext from '~/app/vue/contexts/CompetitionsPageContext'

export default defineComponent({
  components: {
    AppLeagueCard,
    AppPagination,
    AppLoadingLayout,
    AppSkeleton,
    LeagueHeroSection,
  },

  setup (
    props,
    componentContext
  ) {
    const competitionsGraphqlClient = useGraphqlClient(CompetitionsQueryGraphqlLauncher)
    const competitionStatisticsGraphqlClient = useGraphqlClient(CompetitionStatisticsQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoadingCompetitions: false,
      isLoadingCompetitionStatistics: true,
    })

    const args = {
      props,
      componentContext,
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

    <AppLoadingLayout :is-loading="context.isLoadingCompetitions">
      <template #contents>
        <div>
          <div class="unit-cards">
            <AppLeagueCard v-for="it of context.competitions"
              :key="it.competitionId"
              :competition="it"
            />
          </div>
        </div>
      </template>

      <template #loader>
        <div class="unit-cards">
          <AppSkeleton v-for="it of 6"
            height="21.25rem"
          />
        </div>
      </template>
    </AppLoadingLayout>

    <AppPagination :pagination="context.generatePaginationResult()"
      class="pagination"
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
  justify-content: center;
  gap: 2rem;

  @media (30rem < width) {
    grid-template-columns: repeat(auto-fill, minmax(21.5rem, 1fr));
  }
}

.unit-container > .pagination {
  margin-block-start: 4rem;
}
</style>
