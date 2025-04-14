<script>
import {
  defineComponent,
  ref,
} from 'vue'

import {
  useRoute,
} from '#imports'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'
import AppMessage from '~/components/units/AppMessage.vue'

import CompetitionCancelationDialogContext from './CompetitionCancelationDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
    AppMessage,
  },

  props: {
    competitionName: {
      type: [
        String,
        null,
      ],
      required: true,
    },
    isUnregisteringFromCompetition: {
      type: Boolean,
      required: false,
      default: false,
    },
  },

  emits: [
    'joinCompetition',
  ],

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    // Actual value is `AppDialog` but type declaration is `FuroDialog`.
    /** @type {import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>} */
    const dialogComponentRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      route,
    }
    const context = CompetitionCancelationDialogContext.create(args)
      .setupComponent()

    return {
      dialogComponentRef,
      context,
    }
  },
})
</script>

<template>
  <AppDialog ref="dialogComponentRef"
    title="Unregister From Arena"
    class="unit-dialog"
  >
    <template #contents>
      <div class="unit-contents">
        <p class="description">
          Are you sure you want to unregister from the <b>{{ context.competitionName }}</b> trading arena right now?
        </p>
        <AppMessage variant="text"
          severity="warn"
        >
          You will be mark as disqualified. This action can not be undone.
        </AppMessage>

        <div class="actions">
          <AppButton appearance="outlined"
            @click="context.dismissDialog()"
          >
            No, stay on the arena
          </AppButton>
          <AppButton :is-loading="context.isUnregisteringFromCompetition"
            @click="context.unregisterFromCompetition()"
          >
            Yes, unregister me
          </AppButton>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  width: 100%;
  max-width: min(
    calc(100% - (2 * var(--size-body-padding-inline-mobile))),
    30rem
  );

  @media (30rem < width) {
    margin-inline: auto;
  }
}

.unit-contents {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.unit-contents > .description {
  font-size: var(--font-size-small);

  color: var(--color-text-secondary);
}

.unit-contents > .actions {
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  column-gap: 1rem;

  @media (48rem < width) {
    flex-direction: row;
    align-self: end;
  }
}
</style>
