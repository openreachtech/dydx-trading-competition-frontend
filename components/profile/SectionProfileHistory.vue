<script>
import {
  defineComponent,
} from 'vue'

import AppTabLayout from '~/components/units/AppTabLayout.vue'
import ProfileTransferHistory from '~/components/profile/ProfileTransferHistory.vue'
import ProfileLeagueHistory from '~/components/profile/ProfileLeagueHistory.vue'
import ProfileFinancialOverview from '~/components/profile/ProfileFinancialOverview.vue'

import SectionProfileHistoryContext from '~/app/vue/contexts/profile/SectionProfileHistoryContext'

export default defineComponent({
  components: {
    AppTabLayout,
    ProfileTransferHistory,
    ProfileLeagueHistory,
    ProfileFinancialOverview,
  },

  props: {
    profileOverview: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/profile/SectionProfileHistoryContext').PropsType['profileOverview']>} */
      type: Object,
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = SectionProfileHistoryContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-section">
    <AppTabLayout :tabs="context.tabs"
      :active-tab-key="context.tabs[0].tabKey"
    >
      <template #contents>
        <ProfileFinancialOverview :profile-overview="context.profileOverview" />

        <ProfileTransferHistory />

        <ProfileLeagueHistory />
      </template>
    </AppTabLayout>
  </div>
</template>

<style scoped>
.unit-section {
  margin-inline: auto;

  padding-block: 2.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}
</style>
