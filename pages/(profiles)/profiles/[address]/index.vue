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

import useToastStore from '~/stores/toast'
import useAppFormClerk from '~/composables/useAppFormClerk'

import AddressCurrentCompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlLauncher'
import AddressNameQueryGraphqlLauncher from '~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlLauncher'
import AddressProfileQueryGraphqlLauncher from '~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlLauncher'
import CompetitionParticipantQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionParticipant/CompetitionParticipantQueryGraphqlLauncher'
import PutAddressNameMutationGraphqlLauncher from '~/app/graphql/client/mutations/putAddressName/PutAddressNameMutationGraphqlLauncher'
import PutAddressImageMutationGraphqlLauncher from '~/app/graphql/client/mutations/putAddressImage/PutAddressImageMutationGraphqlLauncher'

import PutAddressNameFormElementClerk from '~/app/domClerk/PutAddressNameFormElementClerk'

import AddressProfileFetcher from './AddressProfileFetcher'

import ProfileDetailsContext from '~/app/vue/contexts/profile/ProfileDetailsPageContext'
import ProfileDetailsPageMutationContext from './ProfileDetailsPageMutationContext'
import PutAddressImageSubmitterContext from './PutAddressImageSubmitterContext'

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

    const toastStore = useToastStore()

    const addressCurrentCompetitionGraphqlClient = useGraphqlClient(AddressCurrentCompetitionQueryGraphqlLauncher)
    const addressNameGraphqlClient = useGraphqlClient(AddressNameQueryGraphqlLauncher)
    const addressProfileGraphqlClient = useGraphqlClient(AddressProfileQueryGraphqlLauncher)
    const competitionParticipantGraphqlClient = useGraphqlClient(CompetitionParticipantQueryGraphqlLauncher)

    const putAddressNameGraphqlClient = useGraphqlClient(PutAddressNameMutationGraphqlLauncher)
    const putAddressImageGraphqlClient = useGraphqlClient(PutAddressImageMutationGraphqlLauncher)

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
      isFetchingAddressProfile: false,
      isUploadingAvatar: false,
    })
    const mutationStatusReactive = reactive({
      isRenaming: false,
    })

    const addressProfileFetcher = AddressProfileFetcher.create({
      statusReactive,
      graphqlClientHash: {
        addressProfile: addressProfileGraphqlClient,
      },
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
      fetcherHash: {
        addressProfile: addressProfileFetcher,
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

    const putAddressImageSubmitterContext = PutAddressImageSubmitterContext.create({
      toastStore,
      statusReactive,
      graphqlClientHash: {
        putAddressImage: putAddressImageGraphqlClient,
      },
    })

    return {
      profileRenameDialogRef,

      context,
      mutationContext,
      putAddressImageSubmitterContext,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <SectionProfileOverview
      :address-profile="context.extractAddressProfileValueHash()"
      :competition="context.currentCompetition"
      :competition-participant-status-id="context.competitionParticipantStatusId"
      :ranking="context.currentRanking"
      :is-renaming="mutationContext.isRenaming"
      :user-interface-state="context.statusReactive"
      @upload-image="putAddressImageSubmitterContext.putAddressImageOnEvent({
        valueHash: {
          file: $event.file,
        },
      })"
      @show-profile-rename-dialog="mutationContext.showDialog({
        dialogElement: profileRenameDialogRef,
      })"
    />

    <SectionProfileFinancialMetrics :metrics="context.generateFinancialMetrics()" />

    <section class="section">
      <h1 class="heading">
        Current Arena
      </h1>

      <AppTabLayout
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
    </section>

    <section class="section">
      <h1 class="heading">
        Arena History
      </h1>

      <ProfileLeagueHistory />
    </section>

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
/* Reset base furo stylesheet. */
section + section {
  margin-block-start: 0;
}

.unit-page {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}

.unit-page > .section {
  margin-inline: auto;

  padding-block: 2.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .section > .heading {
  font-size: var(--font-size-extra);
  font-weight: 700;

  line-height: var(--size-line-height-extra);
}
</style>
