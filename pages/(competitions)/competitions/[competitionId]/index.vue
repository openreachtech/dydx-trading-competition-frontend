<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'

import CompetitionTermsDialog from '~/components/dialogs/CompetitionTermsDialog.vue'
import CompetitionEnrollmentDialog from '~/components/dialogs/CompetitionEnrollmentDialog.vue'
import SectionLeague from '~/components/competition-id/SectionLeague.vue'
import SectionSchedules from '~/components/competition-id/SectionSchedules.vue'
import SectionLeaderboard from '~/components/competition-id/SectionLeaderboard.vue'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'
import JoinCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/joinCompetition/JoinCompetitionMutationGraphqlLauncher'
import AddressNameQueryGraphqlLauncher from '~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlLauncher'

import JoinCompetitionFormElementClerk from '~/app/domClerk/JoinCompetitionFormElementClerk'

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
    SectionSchedules,
    SectionLeaderboard,
  },

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const competitionTermsDialogRef = ref(null)
    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const competitionEnrollmentDialogRef = ref(null)

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const joinCompetitionGraphqlClient = useGraphqlClient(JoinCompetitionMutationGraphqlLauncher)
    const addressNameGraphqlClient = useGraphqlClient(AddressNameQueryGraphqlLauncher)

    const joinCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: JoinCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: joinCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })

    const mutationErrorMessageHashReactive = reactive({
      joinCompetition: null,
    })
    const statusReactive = reactive({
      isLoading: false,
    })
    const mutationStatusReactive = reactive({
      isJoining: false,
    })

    const args = {
      props,
      componentContext,
      walletStore,
      graphqlClientHash: {
        competition: competitionGraphqlClient,
        addressName: addressNameGraphqlClient,
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

    <SectionSchedules :schedules="context.schedules" />

    <SectionLeaderboard />

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
