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

import CompetitionsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlLauncher'

import HostedArenasFetcher from './HostedArenasFetcher'
import HostedArenasPageContext from './HostedArenasPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppSearchBar,
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
      @search="query => context.updateTitleQuery({
        title: query,
      })"
    />
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
</style>
