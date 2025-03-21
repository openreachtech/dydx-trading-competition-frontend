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
import AppInput from '~/components/units/AppInput.vue'

import CompetitionEnrollmentDialogContext from './CompetitionEnrollmentDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
    AppInput,
  },

  props: {
    competition: {
      /** @type {import('vue').PropType<import('./CompetitionEnrollmentDialogContext').PropsType['competition']>} */
      type: Object,
      required: true,
    },
    initialUsername: {
      type: [
        String,
        null,
      ],
      required: true,
    },
    validationMessage: {
      /** @type {import('vue').PropType<furo.ValidatorHashType['message']>} */
      type: Object,
      default: null,
      required: false,
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
    /** @type {import('vue').Ref<HTMLFormElement | null>} */
    const formElementRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
      route,
    }
    const context = CompetitionEnrollmentDialogContext.create(args)
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
    title="Enroll League"
    class="unit-dialog"
  >
    <template #contents>
      <form ref="formElementRef"
        class="unit-contents"
        @submit.prevent="context.submitForm({
          formElement: formElementRef,
        })"
      >
        <input type="number"
          class="input hidden"
          name="competitionId"
          :value="context.generateCompetitionId()"
        >

        <p class="note">
          By clicking Enroll, you agree to the Trading League's rules.
        </p>

        <label class="label-container">
          <span class="label">Display name</span>

          <AppInput name="name"
            :has-error="Boolean(context.validationMessage.name)"
            :error-message="context.validationMessage.name"
            :value="context.initialUsername"
          />
        </label>

        <div class="balance">
          <span class="label">Entry balance</span>

          <span class="unit-figure">
            <img src="~/assets/img/tokens/usdc.svg"
              alt="USDC"
              class="icon"
            >

            <span class="number">
              <span>{{ context.normalizeMinimumDeposit() }}</span>

              <span class="currency">USDC</span>
            </span>
          </span>

          <p class="note">
            Required balance in your DYDX wallet at the time of enrollment.
            Please make sure you have enough balance when enroll league.
          </p>
        </div>

        <AppButton class="button">
          Enroll League
        </AppButton>
      </form>
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

.unit-contents > .message.error {
  font-size: var(--font-size-small);
  color: var(--color-text-error);
}

.unit-contents > .message.error.hidden {
  display: none;
}

.unit-contents > .note,
.unit-contents > .balance > .note {
  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-contents > .label-container > .label,
.unit-contents > .balance > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-contents > .label-container,
.unit-contents > .balance {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-figure {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-figure > .icon {
  width: 1.25rem;
  height: 1.25rem;
}

.unit-figure > .number {
  display: inline-flex;
  align-items: end;
  gap: 0.25rem;

  font-size: var(--font-size-medium);
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-figure > .number > .currency {
  font-size: var(--font-size-mini);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-contents > .button {
  margin-block-start: 1rem;

  align-self: end;
}

.input.hidden {
  display: none;
}
</style>
