<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'

import HostedCompetitionDetailsFetcher from './HostedCompetitionDetailsFetcher'
import HostedCompetitionDetailsPageContext from './HostedCompetitionDetailsPageContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    const statusReactive = reactive({
      isLoadingCompetition: false,
    })

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)

    const hostedCompetitionDetailsFetcher = HostedCompetitionDetailsFetcher.create({
      route,
      graphqlClientHash: {
        competition: competitionGraphqlClient,
      },
      statusReactive,
    })

    const args = {
      props,
      componentContext,
      fetcherHash: {
        hostedCompetitionDetails: hostedCompetitionDetailsFetcher,
      },
      statusReactive,
    }
    const context = HostedCompetitionDetailsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    Hosted Arena Details
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
</style>
