<script>
import {
  defineComponent,
  ref,
  shallowRef,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'

import {
  ENROLLMENT_VERIFICATION_STEP,
} from '~/app/constants'

import EnrollmentVerificationDialogContext from './EnrollmentVerificationDialogContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppButton,
    AppDialog,
  },

  props: {
    competition: {
      /** @type {import('vue').PropType<import('./EnrollmentVerificationDialogContext').PropsType['competition']>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
    currentEquity: {
      /** @type {import('vue').PropType<import('./EnrollmentVerificationDialogContext').PropsType['currentEquity']>} */
      type: [
        Number,
        null,
      ],
      required: true,
    },
    userInterfaceState: {
      /** @type {import('vue').PropType<import('./EnrollmentVerificationDialogContext').PropsType['userInterfaceState']>} */
      type: Object,
      required: true,
    },
  },

  emits: [
    EnrollmentVerificationDialogContext.EMIT_EVENT_NAME.FETCH_CURRENT_EQUITY,
  ],

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').Ref<(typeof ENROLLMENT_VERIFICATION_STEP)[keyof typeof ENROLLMENT_VERIFICATION_STEP]>} */
    const currentStepRef = ref(ENROLLMENT_VERIFICATION_STEP.VERIFYING_BALANCE)

    /** @type {import('vue').ShallowRef<typeof AppDialog | null>} */
    const dialogComponentShallowRef = shallowRef(null)

    const args = {
      props,
      componentContext,
      currentStepRef,
      dialogComponentShallowRef,
    }
    const context = EnrollmentVerificationDialogContext.create(args)
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
    <template #contents>
      <div class="unit-contents">
        <div
          class="step verify"
          :class="{
            active: context.isAtVerifyingBalanceStep(),
          }"
        >
          <div class="icon-container">
            <Icon
              name="svg-spinners:90-ring-with-bg"
              class="icon"
            />
          </div>

          <span class="title">
            Fetching equity information...
          </span>

          <p class="description">
            Your spot is secured. We are <span class="highlight">verifying that your wallet has enough funds</span> to
            make you eligible for Arena rewards.
          </p>

          <div class="balance required">
            <img
              src="~/assets/img/tokens/usdc.svg"
              alt="USDC"
              class="icon"
            >

            <span>{{ context.formatMinimumTradingVolume() }} USDC</span>
          </div>

          <span class="note">
            Required Entry Balance
          </span>
        </div>

        <div
          class="step awaiting-deposit"
          :class="{
            active: context.isAtAwaitingAdditionalDepositStep(),
          }"
        >
          <div class="icon-container">
            <Icon
              name="heroicons:arrow-down-circle"
              class="icon"
            />
          </div>

          <span class="title">
            Spot Secured, Almost There!
          </span>

          <p class="description">
            You need <span class="highlight">more funds in your wallet</span> to meet
            the Required Entry Balance and unlock your eligibility for Arena Rewards.
          </p>

          <div
            class="balance current"
            :class="{
              loading: context.isFetchingCurrentEquity,
            }"
          >
            <Icon
              name="heroicons:wallet-solid"
              size="1.125rem"
            />

            <span class="figure">
              {{ context.formatCurrentEquity() }} <span class="total">/ {{ context.formatMinimumTradingVolume() }} USDC</span>
            </span>
          </div>

          <AppButton
            class="button refetch"
            type="button"
            appearance="outlined"
            :is-loading="context.isFetchingCurrentEquity"
            @click="context.emitFetchCurrentEquity()"
          >
            <template #startIcon>
              <Icon
                name="heroicons:arrow-path"
                size="0.875rem"
              />
            </template>

            <template #default>
              Check Balance Again
            </template>
          </AppButton>

          <div class="actions">
            <AppButton
              appearance="outlined"
              type="button"
              class="button"
              @click="context.dismissDialog()"
            >
              Deposit later
            </AppButton>
            <NuxtLink
              type="button"
              class="button link"
              target="_blank"
              rel="noopener noreferrer"
              :to="context.dydxTradeUtmUrl"
            >
              Deposit now
            </NuxtLink>
          </div>
        </div>

        <div
          class="step enrolled"
          :class="{
            active: context.isAtEnrolledActiveStep(),
          }"
        >
          <div class="icon-container">
            <Icon
              name="heroicons:check-circle"
              class="icon"
            />
          </div>

          <span class="title">
            You're In!
          </span>

          <p class="description">
            Welcome to the Trading Arena. You are all set for
            <span
              :class="{
                highlight: context.hasCompetitionTitle(),
              }"
            >
              {{ context.formatCompetitionTitle() }}
            </span>
          </p>

          <AppButton
            type="button"
            class="button confirm"
            @click="context.dismissDialog()"
          >
            Got it!
          </AppButton>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  --size-icon-usdc: 1.25rem;
  --size-icon-main: 5.625rem;

  --color-icon-main: var(--palette-purple);
  --color-icon-enrolled: var(--palette-green);

  max-width: min(
    calc(100% - (2 * var(--size-body-padding-inline-mobile))),
    30rem
  );

  padding-block: 1.5rem 2rem;
  padding-inline: 1.25rem;
}

.unit-contents {
  display: grid;
  grid-template-areas: 'stack';
}

.unit-contents > * {
  grid-area: stack;
}

.unit-contents > .step {
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-inline: 1.5rem;
}

.unit-contents > .step:not(.active) {
  display: none;
}

.unit-contents > .step > .icon-container {
  padding-block: 1rem;
  padding-inline: 1rem;
}

.unit-contents > .step > .icon-container > .icon {
  width: var(--size-icon-main);
  height: var(--size-icon-main);

  color: var(--color-icon-main);
}

.unit-contents > .step > .title {
  margin-block-start: 0.5rem;

  font-size: var(--font-size-large);
  font-weight: 700;

  line-height: var(--size-line-height-large);

  text-align: center;
}

.unit-contents > .step > .description {
  margin-block-start: 0.5rem;

  text-align: center;

  color: var(--color-text-tertiary);
}

.unit-contents > .step > .description > .highlight {
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-contents > .step > .balance {
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  gap: 0.5rem;

  margin-block-start: 1rem;

  border-color: var(--color-border-default);
  border-radius: 100vh;
  border-style: solid;
  border-width: var(--size-thinnest);

  padding-block: 0.5rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-base);
  font-weight: 500;

  line-height: var(--size-line-height-base);
}

.unit-contents > .step.verify > .balance.required > .icon {
  width: var(--size-icon-usdc);
  height: var(--size-icon-usdc);
}

.unit-contents > .step.verify > .note {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  line-height: var(--size-line-height-small);

  color: var(--color-text-tertiary);
}

.unit-contents > .step.awaiting-deposit > .button.refetch {
  justify-content: center;

  margin-block-start: 0.5rem;

  border-width: 0;

  padding-block: 0.5rem;

  text-align: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-contents > .step.awaiting-deposit > .button.refetch:hover {
  color: var(--color-text-primary);
}

.unit-contents > .step.awaiting-deposit > .actions {
  align-self: stretch;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  margin-block-start: 1rem;

  @media (width < 48rem) {
    grid-template-columns: 1fr;
    gap: 0.5rem;
  }
}

.unit-contents > .step.awaiting-deposit > .actions > .button {
  justify-content: center;

  text-align: center;
}

.unit-contents > .step.awaiting-deposit > .actions > .button.link {
  display: grid;
  align-content: center;

  border-radius: 0.5rem;
  border-style: solid;
  border-width: var(--size-thinnest);
  border-color: var(--color-border-button);

  color: var(--color-text-primary);
  background-color: var(--color-background-button-primary);

  text-align: center;

  transition:
    filter 0.3s var(--transition-timing-base),
    background-color 0.3s var(--transition-timing-base),
    border-color 0.3s var(--transition-timing-base),
    color 0.3s var(--transition-timing-base);
}

.unit-contents > .step.awaiting-deposit > .actions > .button.link:hover {
  background-color: color-mix(
    in srgb,
    var(--color-background-button-primary) var(--value-button-hover-overlay-darken-opacity),
    var(--color-background-button-hover-overlay-darken)
  );
}

.unit-contents > .step.awaiting-deposit > .balance.current {
  transition: filter 250ms var(--transition-timing-base);
}

.unit-contents > .step.awaiting-deposit > .balance.current.loading {
  filter: opacity(0.6);
}

.unit-contents > .step.awaiting-deposit > .balance.current > .figure > .total {
  font-size: var(--font-size-small);

  line-height: var(--size-line-height-small);

  color: var(--color-text-tertiary);
}

.unit-contents > .step.enrolled > .icon-container > .icon {
  color: var(--color-icon-enrolled);
}

.unit-contents > .step.enrolled > .button.confirm {
  align-self: stretch;

  justify-content: center;

  margin-block-start: 2rem;

  text-align: center;
}
</style>
