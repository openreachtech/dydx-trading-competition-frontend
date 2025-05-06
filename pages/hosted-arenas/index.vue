<script>
import {
  defineComponent,
} from 'vue'

import HostedArenasPageContext from './HostedArenasPageContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = HostedArenasPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    Hosted Arenas
  </div>
</template>
