<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import AppLeagueCard from '~/components/units/AppLeagueCard.vue'
import AppPagination from '~/components/units/AppPagination.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'

import CompetitionsPageContext from '~/app/vue/contexts/CompetitionsPageContext'

export default defineComponent({
  components: {
    AppLeagueCard,
    AppPagination,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      alias: '/',
    })

    const competitionsGraphqlClient = useGraphqlClient(CompetitionsQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        competitions: competitionsGraphqlClient,
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
</script>

<template>
  <div class="unit-container">
    <div class="cards">
      <AppLeagueCard v-for="it of context.competitions"
        :key="it.competitionId"
        :competition="it"
      />
    </div>

    <AppPagination :pagination="context.generatePaginationResult()"
      class="pagination"
    />
  </div>
</template>

<style scoped>
.unit-container {
  margin-inline: auto;

  max-width: var(--size-body-max-width);
}

.unit-container > .cards {
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
