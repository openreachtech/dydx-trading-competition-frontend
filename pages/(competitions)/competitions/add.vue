<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import AddCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlLauncher'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'

import AddCompetitionFormElementClerk from '~/app/domClerk/AddCompetitionFormElementClerk'

import AddCompetitionPageContext from '~/app/vue/contexts/AddCompetitionPageContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const addCompetitionGraphqlClient = useGraphqlClient(AddCompetitionMutationGraphqlLauncher)
    const addCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: AddCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: addCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })
    const statusReactive = reactive({
      isLoading: false,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        addCompetition: addCompetitionGraphqlClient,
      },
      formClerkHash: {
        addCompetition: addCompetitionFormClerk,
      },
      statusReactive,
    }
    const context = AddCompetitionPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <!-- TODO: Fulfill page -->
  <div>
    Add Competition
  </div>
</template>
