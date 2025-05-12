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

import {
  NuxtLink,
  Icon,
} from '#components'

import AppIconBadge from '~/components/badges/AppIconBadge.vue'
import AppTabLayout from '~/components/units/AppTabLayout.vue'
import HostedCompetitionDetails from '~/components/hosted-competition/HostedCompetitionDetails.vue'
import HostedCompetitionParticipants from '~/components/hosted-competition/HostedCompetitionParticipants.vue'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'
import CompetitionParticipantsQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlLauncher'

import BulkUpdateParticipantStatusMutationGraphqlLauncher from '~/app/graphql/client/mutations/bulkUpdateParticipantStatus/BulkUpdateParticipantStatusMutationGraphqlLauncher'

import CompetitionParticipantsFetcher from './CompetitionParticipantsFetcher'
import HostedCompetitionDetailsFetcher from './HostedCompetitionDetailsFetcher'

import HostedCompetitionDetailsPageContext from './HostedCompetitionDetailsPageContext'
import HostedCompetitionDetailsMutationContext from '~/pages/hosted-competitions/[competitionId]/HostedCompetitionDetailsMutationContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppIconBadge,
    AppTabLayout,
    HostedCompetitionDetails,
    HostedCompetitionParticipants,
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    const statusReactive = reactive({
      isLoadingCompetition: false,
      isLoadingCompetitionParticipants: false,
      isBulkUpdatingCompetitionStatus: false,
    })

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const competitionParticipantsGraphqlClient = useGraphqlClient(CompetitionParticipantsQueryGraphqlLauncher)

    const competitionParticipantsFetcher = CompetitionParticipantsFetcher.create({
      route,
      graphqlClientHash: {
        competitionParticipants: competitionParticipantsGraphqlClient,
      },
      statusReactive,
    })
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
      route,
      fetcherHash: {
        competitionParticipants: competitionParticipantsFetcher,
        hostedCompetitionDetails: hostedCompetitionDetailsFetcher,
      },
      statusReactive,
    }
    const context = HostedCompetitionDetailsPageContext.create(args)
      .setupComponent()

    const bulkUpdateParticipantStatusGraphqlClient = useGraphqlClient(BulkUpdateParticipantStatusMutationGraphqlLauncher)

    const mutationArgs = {
      props,
      componentContext,
      graphqlClientHash: {
        bulkUpdateParticipantStatus: bulkUpdateParticipantStatusGraphqlClient,
      },
      fetcherHash: {
        competitionParticipants: competitionParticipantsFetcher,
      },
      statusReactive,
    }
    const mutationContext = HostedCompetitionDetailsMutationContext.create(mutationArgs)
      .setupComponent()

    return {
      context,
      mutationContext,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="header">
      <NuxtLink
        to="/hosted-competitions"
        class="link back"
        aria-label="See hosted arenas list"
      >
        <Icon
          name="heroicons:arrow-left"
          size="1.5rem"
        />
      </NuxtLink>

      <img
        class="image"
        :src="context.generateImageUrl()"
        :alt="context.generateTitle()"
      >

      <div class="headline">
        <h2 class="heading">
          {{ context.generateTitle() }}
        </h2>
        <AppIconBadge
          :severity="context.generateBadgeSeverity()"
          :icon-name="context.generateBadgeIconName()"
          class="badge"
        >
          {{ context.generateBadgeDescription() }}
        </AppIconBadge>
      </div>
    </div>

    <AppTabLayout
      :tabs="context.tabs"
      :active-tab-key="context.tabs[0].tabKey"
    >
      <template #contents>
        <div class="tab content">
          <HostedCompetitionDetails :competition="context.extractCompetition()" />
        </div>

        <div class="tab content">
          <HostedCompetitionParticipants
            :participants="context.participants"
            :pagination="context.generateParticipantsPagination()"
            @bulk-update-participant-status="mutationContext.executeBulkUpdateCompetitionStatusOnEvent($event)"
          />
        </div>
      </template>
    </AppTabLayout>
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

.unit-page > .header > .image {
  border-radius: 0.625rem;

  inline-size: 2.5rem;
  block-size: 2.5rem;

  padding-block: 0.25rem;
  padding-inline: 0.25rem;

  background-color: var(--color-background-skeleton);
}

.unit-page > .header > .headline > .heading {
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);
}

.unit-page > .header > .headline > .badge {
  margin-block: 0;

  padding-block: 0;
  padding-inline: 0;

  background-color: transparent;
}

.tab.content {
  margin-block-start: 1.25rem;
}
</style>
