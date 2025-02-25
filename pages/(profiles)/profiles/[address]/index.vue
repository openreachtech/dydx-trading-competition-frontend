<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import SectionProfileOverview from '~/components/profile/SectionProfileOverview.vue'
import SectionProfileFinancialMetrics from '~/components/profile/SectionProfileFinancialMetrics.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import AddressCurrentCompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlLauncher'

import ProfileDetailsContext from '~/app/vue/contexts/profile/ProfileDetailsPageContext'

export default defineComponent({
  components: {
    SectionProfileOverview,
    SectionProfileFinancialMetrics,
  },

  setup (
    props,
    componentContext
  ) {
    const addressCurrentCompetitionGraphqlClient = useGraphqlClient(AddressCurrentCompetitionQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        addressCurrentCompetition: addressCurrentCompetitionGraphqlClient,
      },
      statusReactive,
    }
    const context = ProfileDetailsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <SectionProfileOverview :competition="context.currentCompetition"
      :ranking="context.currentRanking"
    />

    <SectionProfileFinancialMetrics :metrics="context.financialMetrics" />
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}
</style>
