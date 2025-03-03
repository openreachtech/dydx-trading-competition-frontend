<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import SectionLeague from '~/components/competition-id/SectionLeague.vue'
import SectionSchedules from '~/components/competition-id/SectionSchedules.vue'
import SectionLeaderboard from '~/components/competition-id/SectionLeaderboard.vue'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionDetailsPageContext from '~/app/vue/contexts/CompetitionDetailsPageContext'

export default defineComponent({
  components: {
    SectionLeague,
    SectionSchedules,
    SectionLeaderboard,
  },

  setup (
    props,
    componentContext
  ) {
    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        competition: competitionGraphqlClient,
      },
      statusReactive,
    }
    const context = CompetitionDetailsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div>
    <SectionLeague :competition="context.competition" />

    <SectionSchedules :schedules="context.schedules" />

    <SectionLeaderboard />
  </div>
</template>
