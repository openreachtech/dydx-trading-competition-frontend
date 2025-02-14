<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppIconBadge from '~/components/badges/AppIconBadge.vue'
import AppButton from '~/components/units/AppButton.vue'

import SectionLeagueContext from '~/app/vue/contexts/competition/SectionLeagueContext'

/**
 * @typedef {import('vue').PropType<
 *   import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity
 * >} CompetitionPropType
 */

export default defineComponent({
  components: {
    Icon,
    AppIconBadge,
    AppButton,
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
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = SectionLeagueContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <div class="inner">
      <div class="unit-details">
        <h2 class="heading">
          {{ context.title }}
        </h2>

        <div class="unit-status">
          <AppIconBadge :severity="context.generateBadgeSeverity()"
            :icon-name="context.generateBadgeIconName()"
          >
            {{ context.generateBadgeDescription() }}
          </AppIconBadge>

          <!-- TODO: Real timeline data -->
          <div class="timeline">
            <Icon name="heroicons:rocket-launch-solid"
              size="1.25rem"
            />
            <span class="timestamp">
              12/28/2024-00:00 UTC
            </span>

            <span class="connector" />

            <Icon name="heroicons:flag-solid"
              size="1.25rem"
            />
            <span class="timestamp">
              02/05/2025-23:59 UTC
            </span>
          </div>
        </div>

        <p class="description">
          {{ context.description }}
        </p>

        <span class="balance">
          <Icon name="heroicons:wallet"
            class="icon"
            size="1.125rem"
          />

          {{ context.normalizeMinimumDeposit() }} <span class="note">(entry balance)</span>
        </span>

        <div class="actions">
          <AppButton class="button">
            Enroll now
          </AppButton>

          <!-- NOTE: Participants here. Missing API -->
        </div>

        <!-- TODO: This one should be a countdown? -->
        <span class="note">
          Registration closes in 20 days.
        </span>
      </div>

      <div class="unit-meta">
        <div class="actions">
          <img :src="context.generateImageUrl()"
            :alt="context.generateHostName()"
            class="image"
          >

          <div class="buttons">
            <button class="button">
              <Icon name="heroicons:share"
                size="1.25rem"
              />
            </button>

            <button class="button"
              @click="context.copyCompetitionUrl"
            >
              <Icon name="heroicons:link"
                size="1.25rem"
              />
            </button>
          </div>
        </div>

        <dl class="unit-statistics">
          <div class="entry">
            <dt class="term">
              League Host
            </dt>

            <dd class="details host">
              <Icon name="heroicons:user-circle"
                size="1.25rem"
                class="icon"
              />

              <span class="name">
                {{ context.generateHostName() }}
              </span>

              <span class="connector" />

              <span class="wallet-address">
                {{ context.generateHostAddress() }}
              </span>

              <!-- TODO: Add copy logic -->
              <button class="button">
                <Icon name="heroicons-outline:duplicate"
                  size="1rem"
                  class="icon"
                />
              </button>

              <button class="button">
                <Icon name="heroicons-outline:external-link"
                  size="1rem"
                  class="icon"
                />
              </button>
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

              <!-- TODO: Should show current number of participants here -->
              <span class="limit lower">
                {{ context.normalizeNumber({ value: context.participantLowerLimit }) }}
              </span><span class="limit upper">
                / {{ context.normalizeNumber({ value: context.participantUpperLimit }) }}
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
  padding-block: 4.5rem 9.5rem;

  background-image: url('~/assets/img/backgrounds/horizon-grid.svg'),
    linear-gradient(
      180deg,
      rgba(24, 24, 37, 0.00) 0%,
      #181825 46.63%,
      rgba(24, 24, 37, 0.00) 100%
    );
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}

.unit-section .inner {
  margin-inline: auto;

  display: grid;
  grid-template-columns: auto auto;
  gap: 4rem;

  max-width: var(--size-body-max-width);
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
}

.unit-status > .timeline {
  margin-inline-start: 1.25rem;

  display: flex;
  align-items: center;

  color: var(--color-text-tertiary);
}

.unit-status > .timeline > .timestamp {
  margin-inline-start: 0.5rem;

  display: inline-block;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-status > .timeline > .connector {
  border-radius: 100vh;

  margin-inline: 0.75rem;

  display: inline-block;

  width: 0.75rem;
  height: 0.1rem;

  background-color: var(--color-background-connector);
}

.unit-details > .description {
  margin-block-start: 1.5rem;

  font-size: var(--font-size-medium);

  color: var(--color-text-tertiary);
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
  gap: 1.75rem;
}

.unit-details > .actions > .button {
  padding-inline: 5rem;

  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-details > .note {
  margin-block-start: 0.75rem;

  display: inline-block;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  max-width: 22rem;
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
}

.unit-meta > .actions > .buttons {
  display: flex;
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

.unit-statistics > .entry > .details.host > .name {
  font-size: var(--font-size-base);
  font-weight: 700;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.host > .connector {
  margin-inline: 0.5rem;

  border-radius: 100vh;

  width: 0.1875rem;
  height: 0.1875rem;

  flex-shrink: 0;

  background-color: var(--color-background-connector);
}

.unit-statistics > .entry > .details.host > .button {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-statistics > .entry > .details.host > .button:hover {
  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.participant > .limit.lower {
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
