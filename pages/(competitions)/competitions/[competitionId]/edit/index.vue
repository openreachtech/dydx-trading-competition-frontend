<script>
import {
  defineComponent,
} from 'vue'

import CompetitionDetailsEditPageContext from './CompetitionDetailsEditPageContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = CompetitionDetailsEditPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    Edit
  </div>
</template>
