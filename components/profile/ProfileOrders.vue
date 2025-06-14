<script>
import {
  defineComponent,
} from 'vue'

import AppTable from '~/components/units/AppTable.vue'

import ProfileOrdersContext from './ProfileOrdersContext'

export default defineComponent({
  components: {
    AppTable,
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = ProfileOrdersContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <AppTable
      :header-entries="context.orderTableHeaderEntries"
      :entries="[]"
    />
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 2rem;
}
</style>
