<script>
import {
  defineComponent,
  reactive,
  ref,
} from 'vue'

import SectionProfileOverview from '~/components/profile/SectionProfileOverview.vue'
import SectionProfileFinancialMetrics from '~/components/profile/SectionProfileFinancialMetrics.vue'
import SectionProfileHistory from '~/components/profile/SectionProfileHistory.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'

import AddressCurrentCompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlLauncher'
import AddressNameQueryGraphqlLauncher from '~/app/graphql/client/queries/addressName/AddressNameQueryGraphqlLauncher'
import PutAddressNameMutationGraphqlLauncher from '~/app/graphql/client/mutations/putAddressName/PutAddressNameMutationGraphqlLauncher'

import PutAddressNameFormElementClerk from '~/app/domClerk/PutAddressNameFormElementClerk'

import ProfileDetailsContext from '~/app/vue/contexts/profile/ProfileDetailsPageContext'
import ProfileDetailsPageMutationContext from './ProfileDetailsPageMutationContext'

export default defineComponent({
  components: {
    SectionProfileOverview,
    SectionProfileFinancialMetrics,
    SectionProfileHistory,
  },

  setup (
    props,
    componentContext
  ) {
    const addressCurrentCompetitionGraphqlClient = useGraphqlClient(AddressCurrentCompetitionQueryGraphqlLauncher)
    const addressNameGraphqlClient = useGraphqlClient(AddressNameQueryGraphqlLauncher)
    const putAddressNameGraphqlClient = useGraphqlClient(PutAddressNameMutationGraphqlLauncher)
    const putAddressNameFormClerk = useAppFormClerk({
      FormElementClerk: PutAddressNameFormElementClerk,
      invokeRequestWithFormValueHash: putAddressNameGraphqlClient.invokeRequestWithFormValueHash,
    })

    /** @type {import('vue').Ref<string | null>} */
    const errorMessageRef = ref(null)
    /** @type {import('vue').Ref<import('~/app/vue/contexts/profile/ProfileDetailsPageContext').ProfileOverview | null>} */
    const profileOverviewRef = ref(null)
    const statusReactive = reactive({
      isLoading: false,
      isFetchingName: false,
      isLoadingProfileOverview: true,
    })
    const mutationStatusReactive = reactive({
      isRenaming: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        addressCurrentCompetition: addressCurrentCompetitionGraphqlClient,
        addressName: addressNameGraphqlClient,
      },
      profileOverviewRef,
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
      statusReactive: mutationStatusReactive,
    }
    const mutationContext = ProfileDetailsPageMutationContext.create(mutationArgs)
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
    <SectionProfileOverview :competition="context.currentCompetition"
      :address-name="context.normalizeAddressName()"
      :ranking="context.currentRanking"
      :is-renaming="mutationContext.isRenaming"
      @update-username="mutationContext.updateUsername({
        formElement: $event.formElement,
      })"
    />

    <SectionProfileFinancialMetrics :metrics="context.generateFinancialMetrics()" />

    <SectionProfileHistory :profile-overview="context.profileOverview" />
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
