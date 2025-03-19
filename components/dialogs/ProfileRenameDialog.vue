<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'
import AppInput from '~/components/units/AppInput.vue'

import ProfileRenameDialogContext from './ProfileRenameDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
    AppInput,
  },

  emits: [
    'updateUsername',
  ],

  setup (
    props,
    componentContext
  ) {
    // Actual value is `AppDialog` but type declaration is `FuroDialog`.
    /** @type {import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>} */
    const dialogComponentRef = ref(null)
    const formElementRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
    }
    const context = ProfileRenameDialogContext.create(args)
      .setupComponent()

    return {
      dialogComponentRef,
      formElementRef,

      context,
    }
  },
})
</script>

<template>
  <AppDialog ref="dialogComponentRef"
    title="Update Display Name"
    class="unit-dialog"
  >
    <template #contents>
      <form ref="formElementRef"
        class="unit-contents"
        @submit.prevent="context.submitForm({
          formElement: formElementRef,
        })"
      >
        <p class="description">
          Everyone will see you by your display name
        </p>

        <label class="label-container">
          <span class="label">Display Name</span>

          <AppInput name="name" />
        </label>

        <AppButton class="button"
          type="submit"
        >
          Save
        </AppButton>
      </form>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  width: 100%;
  max-width: min(
    calc(100% - var(--size-body-padding-inline-mobile)),
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

  color: var(--color-text-tertiary);
}

.unit-contents > .label-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-contents > .label-container > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-contents > .button {
  justify-content: center;
  align-self: end;

  text-align: center;
}
</style>
