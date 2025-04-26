<script>
import {
  defineComponent,
  ref,
  reactive,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppBadge from '~/components/units/AppBadge.vue'
import AppIconBadge from '~/components/badges/AppIconBadge.vue'
import AppButton from '~/components/units/AppButton.vue'
import AppLeagueCountdown from '~/components/units/AppLeagueCountdown.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'
import OnboardingDialogs from '~/components/dialogs/OnboardingDialogs.vue'

import useWalletStore from '~/stores/wallet'

import SectionLeagueContext from '~/app/vue/contexts/competition/SectionLeagueContext'

/**
 * @typedef {import('vue').PropType<
 *   import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity
 * >} CompetitionPropType
 */

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppBadge,
    AppIconBadge,
    AppButton,
    AppLeagueCountdown,
    CopyButton,
    LinkTooltipButton,
    OnboardingDialogs,
  },

  props: {
    competition: {
      /** @type {CompetitionPropType} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
    participantStatusId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    competitionId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    competitionStatusId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    enrolledParticipantsNumber: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    isHostOfCompetition: {
      type: Boolean,
      required: true,
    },
    isCompetitionFull: {
      type: Boolean,
      required: true,
    },
  },

  emits: [
    'showTermsDialog',
    'showCancelationDialog',
  ],

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>} */
    const onboardingDialogsComponentRef = ref(null)
    const statusReactive = reactive({
      isDescriptionExpanded: false,
    })

    const args = {
      props,
      componentContext,
      walletStore,
      onboardingDialogsComponentRef,
      statusReactive,
    }
    const context = SectionLeagueContext.create(args)
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

    <div class="inner">
      <div class="unit-details"
        :class="context.generateLeagueDetailClasses()"
      >
        <NuxtLink to="/competitions"
          class="link back"
        >
          <Icon name="heroicons:chevron-left"
            size="1.5rem"
            class="icon"
          />
          <span>Arenas List</span>
        </NuxtLink>

        <h2 class="heading">
          {{ context.normalizeTitle() }}
        </h2>

        <div class="unit-status">
          <AppIconBadge :severity="context.generateBadgeSeverity()"
            :icon-name="context.generateBadgeIconName()"
          >
            {{ context.generateBadgeDescription() }}
          </AppIconBadge>

          <AppBadge severity="neutral"
            class="badge host"
            :class="context.generateHostBadgeClasses()"
          >
            <Icon name="ph:crown-simple"
              size="1.25rem"
            />
          </AppBadge>

          <div class="timeline">
            <span class="period">
              <Icon name="heroicons:rocket-launch-solid"
                size="1.25rem"
              />
              <span class="timestamp">
                {{ context.normalizeStartDate() }}
              </span>
            </span>

            <span class="period">
              <span class="connector" />

              <Icon name="heroicons:flag-solid"
                size="1.25rem"
              />
              <span class="timestamp">
                {{ context.normalizeEndDate() }}
              </span>
            </span>
          </div>
        </div>

        <p class="description">
          <span>
            {{ context.normalizeDescription() }}
          </span> <button class="button"
            @click="context.toggleDescriptionExpansion()"
          >
            {{ context.generateDescriptionExpansionButtonLabel() }}
          </button>
        </p>

        <span class="balance">
          <Icon name="heroicons:wallet"
            class="icon"
            size="1.125rem"
          />

          {{ context.normalizeMinimumDeposit() }} <span class="note">(entry balance)</span>
        </span>

        <div class="actions">
          <AppButton class="button enroll"
            :disabled="context.shouldDisableEnrollButton()"
            :variant="context.generateEnrollButtonVariant()"
            :class="context.generateEnrollButtonClasses()"
            @click="context.initiateActionDialog()"
          >
            <template #startIcon>
              <Icon name="heroicons:check-circle"
                size="1.25rem"
                class="icon enrolled"
              />

              <Icon name="heroicons:user-minus"
                size="1.25rem"
                class="icon unregister"
              />
            </template>

            <template #default>
              <span class="content">
                {{ context.generateEnrollButtonLabel() }}
              </span>
              <span class="action unregister">
                Unregister
              </span>
            </template>
          </AppButton>

          <span class="unit-participants">
            <Icon name="heroicons:users"
              size="1.125rem"
            />
            <span class="amount">
              {{ context.normalizeEnrolledParticipantsNumber() }}
            </span>
            <span>already enrolled</span>
          </span>
        </div>

        <AppLeagueCountdown class="note"
          :schedules="context.schedules"
        />
      </div>

      <div class="unit-meta">
        <div class="actions">
          <img :src="context.generateImageUrl()"
            :alt="context.generateHostName()"
            class="image"
          >

          <div class="buttons">
            <NuxtLink :to="context.generateCompetitionEditUrl()"
              class="link edit"
              :class="context.generateCompetitionEditButtonClasses()"
            >
              <Icon name="heroicons:pencil-square"
                size="1.25rem"
              />
            </NuxtLink>

            <!-- TODO: Implement share feature. -->
            <!-- <button class="button">
              <Icon name="heroicons:share"
                size="1.25rem"
              />
            </button> -->

            <CopyButton :content-to-copy="context.generateCompetitionUrl()"
              icon-name="heroicons:link"
              icon-size="1.25rem"
            />
          </div>
        </div>

        <dl class="unit-statistics">
          <div class="entry">
            <dt class="term">
              League Host
            </dt>

            <dd class="details host">
              <span class="user">
                <Icon name="heroicons:user-circle"
                  size="1.25rem"
                  class="icon"
                />

                <NuxtLink class="name"
                  :to="context.generateProfileUrl()"
                >
                  {{ context.generateHostName() }}
                </NuxtLink>
              </span>

              <span class="wallet">
                <span class="connector" />

                <span class="address">
                  {{ context.generateHostAddress() }}
                </span>

                <CopyButton :content-to-copy="context.hostAddress" />

                <LinkTooltipButton :href="context.generateHostAddressUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  tooltip-message="View on Mintscan"
                />
              </span>
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Participation
            </dt>

            <dd class="details participant">
              <Icon name="heroicons:user"
                size="1.25rem"
                class="icon"
              />

              <span class="enrolled">
                {{ context.normalizeEnrolledParticipantsNumber() }}
              </span><span class="limit upper">
                / {{ context.normalizeParticipantUpperLimit() }}
              </span>
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Total Prize
            </dt>
            <dd class="details prize">
              <span class="amount">
                <img src="~/assets/img/tokens/usdc.svg"
                  alt="usdc"
                  class="image"
                >

                <span class="figure">
                  {{ context.normalizeCurrency({ value: context.totalPrize }) }}
                </span>
              </span>

              <span class="note">
                (Reward in USDC)
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  padding-block: 4.5rem 9.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  background-image: url('~/assets/img/backgrounds/horizon-grid.svg'),
    linear-gradient(
      180deg,
      rgba(24, 24, 37, 0.00) 0%,
      #181825 46.63%,
      rgba(24, 24, 37, 0.00) 100%
    );
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));

    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-section .inner {
  margin-inline: auto;

  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(0.5rem, 4vw, 5rem);

  max-width: var(--size-body-max-width);

  @media (48rem < width) {
    grid-template-columns: auto 22rem;
  }
}

.unit-details > .link.back {
  margin-block-end: 1.5rem;

  align-items: center;
  gap: 0.75rem;

  display: inline-flex;

  font-size: var(--font-size-medium);
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base),
    gap 250ms var(--transition-timing-base);
}

.unit-details > .link.back[href]:hover {
  gap: 0.5rem;

  color: var(--color-text-primary);
}

.unit-details > .link.back > .icon {
  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-details > .link.back[href]:hover > .icon {
  color: var(--color-text-primary);
}

.unit-details > .heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-headline);
  font-weight: 700;
  line-height: var(--size-line-height-headline);
}

.unit-status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.125rem;
}

.unit-status > .badge.host {
  padding-block: 0.125rem;
  padding-inline: 0.5rem;

  align-self: stretch;
}

.unit-status > .badge.host.hidden {
  display: none;
}

.unit-status > .timeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  color: var(--color-text-tertiary);
}

.unit-status > .timeline > .period {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-status > .timeline > .period > .timestamp {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-status > .timeline > .period > .connector {
  margin-inline-end: 0.25rem;

  border-radius: 100vh;

  width: 0.75rem;
  height: 0.1rem;

  background-color: var(--color-background-connector);
}

.unit-details > .description {
  margin-block-start: 1.5rem;

  font-size: var(--font-size-medium);

  color: var(--color-text-tertiary);
}

.unit-details > .description > .button {
  font-size: inherit;
  font-weight: 500;

  color: inherit;

  transition: color 250ms var(--transition-timing-base);
}

.unit-details > .description > .button:not(:disabled):hover {
  color: var(--color-text-primary);
}

.unit-details:not(.expandable-description) > .description > .button {
  display: none;
}

.unit-details > .balance {
  margin-block-start: 0.75rem;

  display: inline-flex;
  align-items: center;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary)
}

.unit-details > .balance > .icon {
  margin-inline-end: 0.5rem;
}

.unit-details > .balance > .note {
  margin-inline-start: 0.25rem;

  font-weight: 400;
}

.unit-details > .actions {
  margin-block-start: 1.5rem;

  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.75rem;
}

.unit-details > .actions > .button.enroll {
  min-width: 15rem;

  justify-content: center;

  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-details > .actions > .button.enroll.neutral:disabled {
  filter: none;
}

.unit-details > .actions > .button.enroll .icon {
  display: none;
}

.unit-details > .actions > .button.enroll .action {
  display: none;
}

.unit-details > .actions > .button.enroll.enrolled .icon.enrolled {
  display: inline;
}

.unit-details > .actions > .button.enroll.enrolled:hover {
  border-color: var(--color-border-button-highlight-hover);
  background-color: var(--color-background-button-highlight-hover);
  color: var(--color-text-button-highlight-hover);
}

.unit-details > .actions > .button.enroll.enrolled:hover .icon.enrolled {
  display: none;
}

.unit-details > .actions > .button.enroll.enrolled:hover .icon.unregister {
  display: inline;
}

.unit-details > .actions > .button.enroll.enrolled:hover .content {
  display: none;
}

.unit-details > .actions > .button.enroll.enrolled:hover .action.unregister {
  display: inline;
}

.unit-participants {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  color: var(--color-text-tertiary);
}

.unit-participants > .amount {
  margin-inline-start: 0.125rem;

  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-details > .note {
  margin-block-start: 0.75rem;
}

.unit-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  min-width: 0;
  max-height: fit-content;
}

.unit-meta > .actions {
  border-radius: 0.625rem;

  padding-inline: 0.5rem 0.75rem;
  padding-block: 0.25rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-background-competition-meta);
}

.unit-meta > .actions > .image {
  border-radius: 0.5rem;

  width: 2.25rem;
  height: 2.25rem;

  background-color: var(--color-background-card);
}

.unit-meta > .actions > .image[src='/img/badges/league-badge-placeholder.png'] {
  object-fit: scale-down;
}

.unit-meta > .actions > .buttons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.unit-meta > .actions > .buttons > .button {
  padding: 0;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-meta > .actions > .buttons > .button:hover {
  color: var(--color-text-secondary);
}

.unit-meta > .actions > .buttons > .link.edit {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-button-highlight);

  transition: color 250ms var(--transition-timing-base);
}

.unit-meta > .actions > .buttons > .link.edit:hover {
  color: var(--color-text-button-highlight-hover);
}

.unit-meta > .actions > .buttons > .link.edit.hidden {
  display: none;
}

.unit-statistics {
  border-radius: 0.625rem;

  padding-block: 1.25rem 1.5rem;
  padding-inline: 1.75rem;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-background-competition-meta);
}

.unit-statistics > .entry {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-statistics > .entry > .term {
  font-size: var(--font-size-medium);
  font-weight: 700;

  color: var(--color-text-tertiary);
}

.unit-statistics > .entry > .details {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-text-tertiary);
}

.unit-statistics > .entry > .details .icon {
  flex-shrink: 0;
}

.unit-statistics > .entry > .details.host {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.unit-statistics > .entry > .details.host > :where(.user, .wallet) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-statistics > .entry > .details.host > .user > .name {
  font-size: var(--font-size-base);
  font-weight: 700;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  color: var(--color-text-primary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-statistics > .entry > .details.host > .user > .name[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-statistics > .entry > .details.host > .wallet > .connector {
  margin-inline: 0.5rem 0.25rem;

  border-radius: 100vh;

  width: 0.1875rem;
  height: 0.1875rem;

  flex-shrink: 0;

  background-color: var(--color-background-connector);
}

.unit-statistics > .entry > .details.participant > .enrolled {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.participant > .limit.upper {
  font-size: var(--font-size-small);
  font-weight: 500;
 }

.unit-statistics > .entry > .details.prize {
  flex-direction: column;
  align-items: start;
}

.unit-statistics > .entry > .details.prize > .amount {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-statistics > .entry > .details.prize > .amount > .image {
  width: 1.75rem;
  height: 1.75rem;
}

.unit-statistics > .entry > .details.prize > .amount > .figure {
  font-size: var(--font-size-extra);
  font-weight: 700;

  word-break: break-all;

  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.prize > .note {
  font-size: var(--font-size-base);
  font-weight: 500;
}
</style>
