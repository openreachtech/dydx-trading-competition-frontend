<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'

import CompetitionTermsDialog from '~/components/dialogs/CompetitionTermsDialog.vue'
import CompetitionEnrollmentDialog from '~/components/dialogs/CompetitionEnrollmentDialog.vue'
import SectionLeague from '~/components/competition-id/SectionLeague.vue'
import SectionPrizeRules from '~/components/competition-id/SectionPrizeRules.vue'
import SectionSchedules from '~/components/competition-id/SectionSchedules.vue'
import SectionLeaderboard from '~/components/competition-id/SectionLeaderboard.vue'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'
import JoinCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/joinCompetition/JoinCompetitionMutationGraphqlLauncher'
import AddressNameQueryGraphqlLauncher from '~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlLauncher'
import CompetitionLeaderboardQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlLauncher'
import CompetitionFinalOutcomeQueryGraphqlLauncher from '~/app/graphql/client/mutations/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlLauncher'

import JoinCompetitionFormElementClerk from '~/app/domClerk/JoinCompetitionFormElementClerk'

import {
  useRoute,
} from 'vue-router'
import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'
import useWalletStore from '~/stores/wallet'

import CompetitionDetailsPageContext from '~/app/vue/contexts/CompetitionDetailsPageContext'
import CompetitionDetailsPageMutationContext from './CompetitionDetailsPageMutationContext'

export default defineComponent({
  components: {
    CompetitionTermsDialog,
    CompetitionEnrollmentDialog,
    SectionLeague,
    SectionPrizeRules,
    SectionSchedules,
    SectionLeaderboard,
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const competitionTermsDialogRef = ref(null)
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const competitionEnrollmentDialogRef = ref(null)

    /** @type {import('vue').Ref<import('~/app/vue/contexts/CompetitionDetailsPageContext').LeaderboardEntries>} */
    const leaderboardEntriesRef = ref([])

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const joinCompetitionGraphqlClient = useGraphqlClient(JoinCompetitionMutationGraphqlLauncher)
    const addressNameGraphqlClient = useGraphqlClient(AddressNameQueryGraphqlLauncher)
    const competitionLeaderboardGraphqlClient = useGraphqlClient(CompetitionLeaderboardQueryGraphqlLauncher)
    const competitionFinalOutcomeGraphqlClient = useGraphqlClient(CompetitionFinalOutcomeQueryGraphqlLauncher)

    const joinCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: JoinCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: joinCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })

    const mutationErrorMessageHashReactive = reactive({
      joinCompetition: null,
    })
    const statusReactive = reactive({
      isLoading: false,
      isLoadingLeaderboard: true,
    })
    const mutationStatusReactive = reactive({
      isJoining: false,
    })

    const args = {
      props,
      componentContext,
      route,
      walletStore,
      leaderboardEntriesRef,
      graphqlClientHash: {
        competition: competitionGraphqlClient,
        addressName: addressNameGraphqlClient,
        competitionLeaderboard: competitionLeaderboardGraphqlClient,
        competitionFinalOutcome: competitionFinalOutcomeGraphqlClient,
      },
      statusReactive,
    }
    const context = CompetitionDetailsPageContext.create(args)
      .setupComponent()

    const mutationArgs = {
      props,
      componentContext,
      graphqlClientHash: {
        joinCompetition: joinCompetitionGraphqlClient,
      },
      formClerkHash: {
        joinCompetition: joinCompetitionFormClerk,
      },
      errorMessageHashReactive: mutationErrorMessageHashReactive,
      statusReactive: mutationStatusReactive,
    }
    const mutationContext = CompetitionDetailsPageMutationContext.create(mutationArgs)
      .setupComponent()

    return {
      competitionTermsDialogRef,
      competitionEnrollmentDialogRef,

      context,
      mutationContext,
    }
  },
})
</script>

<template>
  <div>
    <SectionLeague :competition="context.competition"
      @show-terms-dialog="context.showDialog({
        dialogElement: competitionTermsDialogRef,
      })"
    />

    <CompetitionTermsDialog ref="competitionTermsDialogRef"
      :competition="context.competition"
      @show-enrollment-dialog="context.showDialog({
        dialogElement: competitionEnrollmentDialogRef,
      })"
    />

    <SectionPrizeRules :prize-rules="context.prizeRules" />

    <SectionSchedules :schedules="context.schedules" />

    <SectionLeaderboard :competition-status-id="context.competitionStatusId"
      :leaderboard-table-entries="context.leaderboardEntries"
      :leaderboard-table-header-entries="context.generateLeaderboardHeaderEntries()"
      :is-loading-leaderboard="context.isLoadingLeaderboard"
      :leaderboard-pagination-result="context.generateLeaderboardPaginationResult()"
      :last-leaderboard-update-timestamp="context.extractLastLeaderboardUpdateTimestamp()"
    />

    <CompetitionEnrollmentDialog ref="competitionEnrollmentDialogRef"
      :competition="context.competition"
      :initial-username="context.addressName"
      :validation-message="mutationContext.joinCompetitionValidationMessage"
      :error-message-hash="mutationContext.errorMessageHashReactive"
      @join-competition="mutationContext.joinCompetition({
        formElement: $event.formElement,
      })"
    />
  </div>
</template>
