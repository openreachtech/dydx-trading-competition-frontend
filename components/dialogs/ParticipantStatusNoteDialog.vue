<script>
import {
  defineComponent,
  shallowRef,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'

import ParticipantStatusNoteDialogContext from './ParticipantStatusNoteDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').ShallowRef<import('~/components/units/AppDialog.vue').default | null>} */
    const dialogComponentShallowRef = shallowRef(null)

    const args = {
      props,
      componentContext,
      dialogComponentShallowRef,
    }
    const context = ParticipantStatusNoteDialogContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <AppDialog
    :ref="context.dialogComponentShallowRef"
    class="unit-dialog"
  >
    <template #header>
      <div aria-hidden />
    </template>

    <template #contents>
      <div class="unit-contents">
        <span class="title">
          Finalizing Your Entry...
        </span>

        <p class="description">
          Entry finalizing. You will be active in under 5 minutes.
        </p>

        <AppButton
          type="button"
          variant="neutral"
          class="button"
          @click="context.dismissDialog()"
        >
          Got it!
        </AppButton>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  border-color: var(--color-border-default);
  border-radius: 1.25rem;
  border-style: solid;
  border-width: calc(var(--size-thinnest) * 2);

  padding-block: 1.5rem 2rem;
  padding-inline: 1.25rem;
}

.unit-contents {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.unit-contents > .title {
  font-size: var(--font-size-large);
  font-weight: 700;

  line-height: var(--size-line-height-large);

  text-align: center;
}

.unit-contents > .description {
  margin-block-start: 0.5rem;

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-contents > .button {
  justify-content: center;

  margin-block-start: 2rem;

  width: min(11rem, 100%);

  font-size: var(--font-size-medium);

  line-height: var(--size-line-height-medium);

  text-align: center;
}
</style>
