<script>
import {
  defineComponent,
} from 'vue'

import AppIconBadge from '~/components/badges/AppIconBadge.vue'

import CompetitionStatusBadgeContext from './CompetitionStatusBadgeContext'

export default defineComponent({
  components: {
    AppIconBadge,
  },

  props: {
    statusId: {
      type: [
        Number,
        null,
      ],
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
    const context = CompetitionStatusBadgeContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppIconBadge
    :icon-name="context.generateBadgeIconName()"
    :severity="context.generateBadgeSeverity()"
  >
    {{ context.generateBadgeCaption() }}
  </AppIconBadge>
</template>
