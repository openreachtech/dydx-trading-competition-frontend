<script>
import {
  defineComponent,
} from 'vue'

import SectionProfileOverview from '~/components/profile/SectionProfileOverview.vue'

export default defineComponent({
  components: {
    SectionProfileOverview,
  },
})
</script>

<template>
  <div class="unit-page">
    <SectionProfileOverview />
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
