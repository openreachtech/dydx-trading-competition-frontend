<script>
import {
  defineComponent,
} from 'vue'

import HostedArenaDetailsPageContext from './HostedArenaDetailsPageContext'

export default defineComponent({
  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = HostedArenaDetailsPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    Hosted Arena Details
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-block-end: 12rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}
</style>
