<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import OnboardingDialogs from '~/components/dialogs/OnboardingDialogs.vue'

import {
  useRouter,
} from 'vue-router'

import useWalletStore from '~/stores/wallet'

import LeagueHeroSectionContext from '~/app/vue/contexts/LeagueHeroSectionContext'

export default defineComponent({
  components: {
    AppButton,
    OnboardingDialogs,
  },

  props: {
    competitionStatisticsCapsule: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/LeagueHeroSectionContext').PropsType['competitionStatisticsCapsule'] | null>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const router = useRouter()
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>} */
    const onboardingDialogsComponentRef = ref(null)

    const args = {
      props,
      componentContext,
      router,
      walletStore,
      onboardingDialogsComponentRef,
    }
    const context = LeagueHeroSectionContext.create(args)
      .setupComponent()

    return {
      onboardingDialogsComponentRef,
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <OnboardingDialogs ref="onboardingDialogsComponentRef" />

    <div class="headline">
      <span class="note">
        <span>Powered by</span>
        <img
          src="~/assets/img/logos/clc-text.svg"
          alt="CLC logo"
          class="image"
        >
      </span>

      <h1 class="heading">
        dYdX Trading Arena
      </h1>
    </div>

    <p class="description">
      Join the league, test your skills and <b class="highlight yellow">earn rewards</b>. <br>
      Or, create your own and <b class="highlight purple">challenge others</b>.
    </p>

    <div class="actions">
      <AppButton
        class="button"
        @click="context.hostLeague()"
      >
        Host a league
      </AppButton>
    </div>

    <dl class="unit-statistics">
      <div class="figure">
        <dt class="term">
          {{ context.generateTotalHostedCompetitionsNumber() }}
        </dt>
        <dd class="label">
          Leagues hosted
        </dd>
      </div>

      <div class="figure">
        <dt class="term">
          {{ context.generateTotalEnrolledCompetitionParticipantsNumber() }}
        </dt>
        <dd class="label">
          Enrolled participants
        </dd>
      </div>

      <div class="figure">
        <dt class="term">
          {{ context.generateTotalPaidOutPrizesUsdAmount() }}
        </dt>
        <dd class="label">
          Prizes paid out
        </dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.unit-section {
  margin-inline: auto;

  padding-block: 3.5rem 3.75rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.25rem;

  max-width: var(--size-body-max-width);

  @media (48rem < width) {
    padding-block-end: 4.75rem;
  }

  @media (60rem < width) {
    background-image: url('~/assets/img/backgrounds/league-hero.png');
    background-repeat: no-repeat;
    background-position: right 3.5rem;

    padding-block-end: 7.75rem;
  }
}

.unit-section > .headline {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-section > .headline > .heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-title);
  font-weight: 700;
  line-height: var(--size-line-height-title);
}

.unit-section > .headline > .heading + * {
  margin-block-start: 0;
}

.unit-section > .headline > .note {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  font-size: var(--font-size-small);
  letter-spacing: 0.16em;

  color: var(--color-text-tertiary);
}

.unit-section > .headline > .note > .image {
  height: var(--font-size-extra);
}

.unit-section > .description {
  font-size: var(--font-size-medium);

  color: var(--color-text-secondary);
}

.unit-section > .description > .highlight {
  font-weight: 700;
}

.unit-section > .description > .highlight.yellow {
  color: var(--color-text-highlight-yellow);
}

.unit-section > .description > .highlight.purple {
  color: var(--color-text-highlight-purple);
}

.unit-section > .actions {
  display: flex;
  gap: 0.75rem;
}

.unit-section > .actions > .button {
  padding-block: 0.75rem;
  padding-inline: 2rem;

  font-size: var(--font-size-medium);
  font-weight: 500;
  line-height: var(--size-line-height-medium);
}

.unit-statistics {
  margin-block-start: 2.25rem;

  display: flex;

  gap: 1rem;

  @media (30rem < width) {
    gap: 3.5rem;
  }
}

.unit-statistics > .figure {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-statistics > .figure > .term {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  @media (48rem < width) {
    font-size: var(--font-size-headline);
    line-height: var(--size-line-height-headline);
  }
}

.unit-statistics > .figure > .label {
  font-size: var(--font-size-mini);
  font-weight: 500;
  line-height: var(--size-line-height-mini);

  color: var(--color-text-tertiary);

  @media (30rem < width) {
    font-size: var(--font-size-small);
    line-height: var(--size-line-height-small);
  }

  @media (48rem < width) {
    font-size: var(--font-size-base);
    line-height: var(--size-line-height-base);
  }
}
</style>
