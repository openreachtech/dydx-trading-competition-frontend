<script>
import {
  defineComponent,
} from 'vue'

import ProfileTradesContext from './ProfileTradesContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = ProfileTradesContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    Profile Trades
  </div>
</template>

<style scoped>
.unit-container {
  margin-block-start: 2rem;
}
</style>
