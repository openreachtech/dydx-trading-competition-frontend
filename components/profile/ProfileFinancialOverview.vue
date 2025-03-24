<script>
import {
  defineComponent,
} from 'vue'

import ProfileFinancialOverviewContext from './ProfileFinancialOverviewContext'

export default defineComponent({
  props: {
    profileOverview: {
      /** @type {import('vue').PropType<import('./ProfileFinancialOverviewContext').PropsType['profileOverview']>} */
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
    const context = ProfileFinancialOverviewContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div>
    <!--  -->
  </div>
</template>
