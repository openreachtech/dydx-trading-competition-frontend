<script>
import {
  defineComponent,
} from 'vue'

import AppTabLayout from '~/components/units/AppTabLayout.vue'
import AppPagination from '~/components/units/AppPagination.vue'

import SectionProfileHistoryContext from '~/app/vue/contexts/profile/SectionProfileHistoryContext'

export default defineComponent({
  components: {
    AppTabLayout,
    AppPagination,
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
        <div>Transfer History</div>

        <div>League History</div>
      </template>
    </AppTabLayout>

    <AppPagination class="pagination" />
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

.unit-section > .pagination {
  margin-block-start: 1.25rem;
}
</style>
