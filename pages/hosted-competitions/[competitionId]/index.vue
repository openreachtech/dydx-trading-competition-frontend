<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  definePageMeta,
} from '#imports'

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
import ParticipantsCurrentEquitiesQueryGraphqlLauncher from '~/app/graphql/client/queries/participantsCurrentEquities/ParticipantsCurrentEquitiesQueryGraphqlLauncher'

import BulkUpdateParticipantStatusMutationGraphqlLauncher from '~/app/graphql/client/mutations/bulkUpdateParticipantStatus/BulkUpdateParticipantStatusMutationGraphqlLauncher'

import CompetitionParticipantsFetcher from './CompetitionParticipantsFetcher'
import HostedCompetitionDetailsFetcher from './HostedCompetitionDetailsFetcher'
import ParticipantsCurrentEquitiesFetcher from './ParticipantsCurrentEquitiesFetcher'

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
    definePageMeta({
      middleware: 'competition-edit-permission',
    })

    const route = useRoute()

    const statusReactive = reactive({
      isLoadingCompetition: false,
      isLoadingCompetitionParticipants: false,
      isLoadingParticipantsCurrentEquities: false,
      isBulkUpdatingCompetitionStatus: false,
    })

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const competitionParticipantsGraphqlClient = useGraphqlClient(CompetitionParticipantsQueryGraphqlLauncher)
    const participantsCurrentEquitiesGraphqlClient = useGraphqlClient(ParticipantsCurrentEquitiesQueryGraphqlLauncher)

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
    const participantsCurrentEquitiesFetcher = ParticipantsCurrentEquitiesFetcher.create({
      graphqlClientHash: {
        participantsCurrentEquities: participantsCurrentEquitiesGraphqlClient,
      },
      fetcherHash: {
        competitionParticipants: competitionParticipantsFetcher,
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
        participantsCurrentEquities: participantsCurrentEquitiesFetcher,
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
      <div class="content">
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

      <NuxtLink
        :to="context.generateCompetitionEditUrl()"
        class="link edit"
      >
        <Icon
          name="heroicons:pencil-square"
          size="1rem"
          class="icon"
        />
        <span>Edit League</span>
      </NuxtLink>
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
            @fetch-participants-current-equities="context.fetchParticipantsCurrentEquities($event)"
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

.unit-page > .header > .content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
}

.unit-page > .header > .content > .link {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: inherit;
}

.unit-page > .header > .content > .link.back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-page > .header > .content > .image {
  border-radius: 0.625rem;

  inline-size: 2.5rem;
  block-size: 2.5rem;

  padding-block: 0.25rem;
  padding-inline: 0.25rem;

  background-color: var(--color-background-skeleton);
}

.unit-page > .header > .content > .headline > .heading {
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);
}

.unit-page > .header > .content > .headline > .badge {
  margin-block: 0;

  padding-block: 0;
  padding-inline: 0;

  background-color: transparent;
}

.unit-page > .header > .link.edit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  border-radius: 0.5rem;
  border-width: calc(var(--size-thinnest) * 1.5);
  border-color: var(--color-border-button-outlined);
  border-style: solid;

  padding-block: 0.5rem;
  padding-inline: 1rem;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-primary);

  transition: border-color 250ms var(--transition-timing-base);
}

.unit-page > .header > .link.edit:hover {
  border-color: var(--color-border-button-outlined-hover);
}

.unit-page > .header > .link.edit > .icon {
  color: var(--color-text-tertiary);
}

.tab.content {
  margin-block-start: 1.25rem;
}
</style>
