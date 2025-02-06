<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

import AppLeagueCard from '~/components/units/AppLeagueCard.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'

import CompetitionsPageContext from '~/app/vue/contexts/CompetitionsPageContext'

export default defineComponent({
  components: {
    AppLeagueCard,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      alias: '/',
    })

    const graphqlClient = useGraphqlClient(CompetitionsQueryGraphqlLauncher)
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClient,
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
    <AppLeagueCard v-for="it of context.capsuleRef.value.extractCompetitions()"
      :key="it.competitionId"
      :competition="it"
    />
  </div>
</template>

<style scoped>
.unit-container {
  margin-inline: auto;

  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  gap: 2rem;

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    grid-template-columns: repeat(auto-fill, minmax(21.5rem, 1fr));
  }
}
</style>
