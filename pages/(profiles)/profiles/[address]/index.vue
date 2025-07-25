<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'

import {
  useRoute,
  useRouter,
} from 'vue-router'

import AppTabLayout from '~/components/units/AppTabLayout.vue'
import SectionProfileOverview from '~/components/profile/SectionProfileOverview.vue'
import SectionProfileFinancialMetrics from '~/components/profile/SectionProfileFinancialMetrics.vue'
import ProfileRenameDialog from '~/components/dialogs/ProfileRenameDialog.vue'
import ProfileTransferHistory from '~/components/profile/ProfileTransferHistory.vue'
import ProfileLeagueHistory from '~/components/profile/ProfileLeagueHistory.vue'
import ProfileFinancialOverview from '~/components/profile/ProfileFinancialOverview.vue'
import ProfileOrders from '~/components/profile/ProfileOrders.vue'
import ProfileTrades from '~/components/profile/ProfileTrades.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'

import AddressCurrentCompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlLauncher'
import AddressNameQueryGraphqlLauncher from '~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlLauncher'
import CompetitionParticipantQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionParticipant/CompetitionParticipantQueryGraphqlLauncher'
import PutAddressNameMutationGraphqlLauncher from '~/app/graphql/client/mutations/putAddressName/PutAddressNameMutationGraphqlLauncher'

import PutAddressNameFormElementClerk from '~/app/domClerk/PutAddressNameFormElementClerk'

import ProfileDetailsContext from '~/app/vue/contexts/profile/ProfileDetailsPageContext'
import ProfileDetailsPageMutationContext from './ProfileDetailsPageMutationContext'

export default defineComponent({
  components: {
    AppTabLayout,
    SectionProfileOverview,
    SectionProfileFinancialMetrics,
    ProfileRenameDialog,
    ProfileTransferHistory,
    ProfileLeagueHistory,
    ProfileFinancialOverview,
    ProfileOrders,
    ProfileTrades,
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const router = useRouter()

    const addressCurrentCompetitionGraphqlClient = useGraphqlClient(AddressCurrentCompetitionQueryGraphqlLauncher)
    const addressNameGraphqlClient = useGraphqlClient(AddressNameQueryGraphqlLauncher)
    const competitionParticipantGraphqlClient = useGraphqlClient(CompetitionParticipantQueryGraphqlLauncher)
    const putAddressNameGraphqlClient = useGraphqlClient(PutAddressNameMutationGraphqlLauncher)
    const putAddressNameFormClerk = useAppFormClerk({
      FormElementClerk: PutAddressNameFormElementClerk,
      invokeRequestWithFormValueHash: putAddressNameGraphqlClient.invokeRequestWithFormValueHash,
    })

    /** @type {import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>} */
    const profileRenameDialogRef = ref(null)
    /** @type {import('vue').Ref<string | null>} */
    const errorMessageRef = ref(null)
    /** @type {import('vue').Ref<string | null>} */
    const mutationErrorMessageRef = ref(null)
    /** @type {import('vue').Ref<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview | null>} */
    const profileOverviewRef = ref(null)
    /** @type {import('vue').Ref<Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOrder>>} */
    const profileOrdersRef = ref([])
    /** @type {import('vue').Ref<Array<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileTradeFill>>} */
    const profileTradesRef = ref([])

    const statusReactive = reactive({
      isLoading: false,
      isFetchingName: false,
      isLoadingProfileOverview: true,
      isLoadingProfileOrders: true,
      isLoadingProfileTrades: true,
    })
    const mutationStatusReactive = reactive({
      isRenaming: false,
    })

    const args = {
      props,
      componentContext,
      route,
      router,
      graphqlClientHash: {
        addressCurrentCompetition: addressCurrentCompetitionGraphqlClient,
        addressName: addressNameGraphqlClient,
        competitionParticipant: competitionParticipantGraphqlClient,
      },
      profileOverviewRef,
      profileOrdersRef,
      profileTradesRef,
      errorMessageRef,
      statusReactive,
    }
    const context = ProfileDetailsContext.create(args)
      .setupComponent()

    const mutationArgs = {
      props,
      componentContext,
      graphqlClientHash: {
        putAddressName: putAddressNameGraphqlClient,
      },
      formClerkHash: {
        putAddressName: putAddressNameFormClerk,
      },
      refetchFunctionHash: {
        addressName: async () => {
          await context.refetchAddressName()
        },
      },
      profileRenameDialogRef,
      errorMessageRef: mutationErrorMessageRef,
      statusReactive: mutationStatusReactive,
    }
    const mutationContext = ProfileDetailsPageMutationContext.create(mutationArgs)
      .setupComponent()

    return {
      profileRenameDialogRef,

      context,
      mutationContext,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <SectionProfileOverview
      :competition="context.currentCompetition"
      :competition-participant-status-id="context.competitionParticipantStatusId"
      :address-name="context.normalizeAddressName()"
      :ranking="context.currentRanking"
      :is-renaming="mutationContext.isRenaming"
      @show-profile-rename-dialog="mutationContext.showDialog({
        dialogElement: profileRenameDialogRef,
      })"
    />

    <SectionProfileFinancialMetrics :metrics="context.generateFinancialMetrics()" />

    <AppTabLayout
      class="tabs"
      :tabs="context.profileTabs"
      :active-tab-key="context.extractActiveTabKeyFromRoute()"
      @change-tab="context.changeTab({
        fromTab: $event.fromTab,
        toTab: $event.toTab,
      })"
    >
      <template #contents>
        <ProfileFinancialOverview :profile-overview="context.profileOverview" />

        <ProfileTransferHistory />

        <ProfileLeagueHistory />

        <ProfileOrders
          :profile-orders="context.profileOrders"
          :is-loading="context.isLoadingProfileOrders"
        />

        <ProfileTrades
          :profile-trades="context.profileTrades"
          :is-loading="context.isLoadingProfileTrades"
        />
      </template>
    </AppTabLayout>

    <ProfileRenameDialog
      ref="profileRenameDialogRef"
      :initial-username="context.addressName"
      :is-renaming="mutationContext.isRenaming"
      :error-message="mutationContext.errorMessage"
      @update-username="mutationContext.updateUsername({
        formElement: $event.formElement,
      })"
    />
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}

.unit-page > .tabs {
  margin-inline: auto;

  padding-block: 2.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}
</style>
