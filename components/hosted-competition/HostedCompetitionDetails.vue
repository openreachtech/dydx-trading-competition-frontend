<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppTimeline from '~/components/units/AppTimeline.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import HostedCompetitionDetailsContext from './HostedCompetitionDetailsContext'

export default defineComponent({
  components: {
    Icon,
    AppTimeline,
    CopyButton,
    LinkTooltipButton,
  },

  props: {
    competition: {
      type: /** @type {import('vue').PropType<import('./HostedCompetitionDetailsContext').PropsType['competition']>} */ ([
        Object,
        null,
      ]),
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
    const context = HostedCompetitionDetailsContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-container">
    <div class="details">
      <div class="unit-host">
        <Icon
          class="icon"
          name="heroicons-outline:user-circle"
          size="1.25rem"
        />
        <span class="label">
          Arena Captain:
        </span>
        <span class="name">
          {{ context.generateDisplayedHostName() }}
        </span>

        <div class="wallet">
          <span class="connector" />
          <span class="address">
            {{ context.generateDisplayedHostAddress() }}
          </span>
          <CopyButton :content-to-copy="context.hostAddress" />
          <LinkTooltipButton
            external
            rel="noopener noreferrer"
            tooltip-message="View on Mintscan"
            :href="context.generateHostMintscanUrl()"
          />
        </div>
      </div>

      <div class="unit-limits">
        <div class="participants">
          <Icon
            name="heroicons:users"
            size="1.25rem"
            class="icon"
          />
          <span class="label">Participants:</span>
          <span class="figure">
            {{ context.generateDisplayedParticipationLimit() }}
          </span>
        </div>

        <div class="balance">
          <Icon
            name="heroicons:wallet"
            size="1.25rem"
            class="icon"
          />
          <span class="label">Entry Balance:</span>
          <span class="figure">
            {{ context.generateDisplayedEntryBalance() }}
          </span>
        </div>
      </div>

      <p class="unit-description">
        {{ context.generateDisplayedDescription() }}
      </p>

      <div class="unit-prize">
        <div class="prize">
          <img
            src="~/assets/img/tokens/usdc.svg"
            alt="USDC"
            class="image"
          >

          <div class="total">
            <span class="label">
              Total Prize:
            </span>

            <span class="content">
              <span class="figure">
                {{ context.generateDisplayedTotalPrize() }}
              </span>
              <span class="unit">
                USDC
              </span>
            </span>
          </div>
        </div>

        <div class="divider" />

        <div class="trophies">
          <div
            v-for="(prizeRule, index) of context.normalizePrizeRules()"
            :key="index"
            class="rank"
          >
            <Icon
              name="heroicons:trophy"
              size="1.5rem"
              class="icon"
            />

            <div class="content">
              <span class="label">
                {{ prizeRule.label }}
              </span>
              <span class="prize">
                {{ prizeRule.amount }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="unit-schedules">
        <template
          v-for="(it, index) of context.generateScheduleGroups()"
          :key="index"
        >
          <div class="unit-schedule">
            <span class="title">
              {{ it.title }}
            </span>

            <AppTimeline
              :timeline="it.timeline"
              class="timeline"
            >
              <template #contents="{ event }">
                <span>
                  {{
                    context.normalizeTimestamp({
                      timestamp: event.timestamp,
                    })
                  }}
                </span>
              </template>
            </AppTimeline>
          </div>

          <Icon
            class="connector schedule"
            name="heroicons:chevron-down"
            size="2rem"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-container > .details {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin-block-end: 2.25rem;

  border-radius: 0.875rem;

  padding-block: 1.25rem;
  padding-inline: 1.5rem;

  background-color: var(--color-background-card);
}

.unit-host {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;

  border-block-end-width: var(--size-thinnest);
  border-block-end-color: var(--color-border-card);
  border-block-end-style: solid;

  padding-block: 0.5rem 1.25rem;
}

.unit-host > .icon {
  color: var(--color-text-tertiary);
}

.unit-host > .label {
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-host > .name {
  font-weight: 700;
}

.unit-host > .wallet {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-host > .wallet > .connector {
  border-radius: var(--size-radius-rounded);

  inline-size: 0.1875rem;
  block-size: 0.1875rem;

  background-color: var(--color-background-connector);
}

.unit-host > .wallet > .address {
  color: var(--color-text-secondary);
}

.unit-limits {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 4rem;

  border-block-end-width: var(--size-thinnest);
  border-block-end-color: var(--color-border-card);
  border-block-end-style: solid;

  padding-block: 0.5rem 1.25rem;
}

.unit-limits > :where(.participants, .balance) {
  display: inline-flex;
  align-items: center;
}

.unit-limits > :where(.participants, .balance) > .icon {
  margin-inline-end: 0.5rem;

  color: var(--color-text-tertiary);
}

.unit-limits > :where(.participants, .balance) > .label {
  margin-inline-end: 0.25rem;

  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-limits > :where(.participants, .balance) > .figure {
  font-weight: 500;
}

.unit-description {
  border-block-end-width: var(--size-thinnest);
  border-block-end-color: var(--color-border-card);
  border-block-end-style: solid;

  padding-block-end: 0.75rem;

  color: var(--color-text-secondary);
}

.unit-prize {
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  column-gap: 2rem;

  border-block-end-width: var(--size-thinnest);
  border-block-end-color: var(--color-border-card);
  border-block-end-style: solid;

  padding-block: 0.375rem 1.5rem;

  @media (48rem < width) {
    flex-direction: row;
    align-items: center;
  }
}

.unit-prize > .prize {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-prize > .prize > .image {
  inline-size: 1.75rem;
  block-size: 1.75rem;
}

.unit-prize > .prize > .total {
  display: flex;
  flex-direction: column;
}

.unit-prize > .prize > .total > .label {
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-prize > .prize > .total > .content > .figure {
  font-weight: 700;
}

.unit-prize > .prize > .total > .content > .unit {
  font-weight: 500;
}

.unit-prize > .divider {
  background-color: var(--color-background-divider);

  inline-size: 2rem;
  block-size: var(--size-thinnest);

  @media (48rem < width) {
    inline-size: var(--size-thinnest);
    block-size: 2rem;
  }
}

.unit-prize > .trophies {
  flex: 1;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
  row-gap: 1.5rem;
  column-gap: 1.75rem;
}

.unit-prize > .trophies > .rank {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.unit-prize > .trophies > .rank > .content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-prize > .trophies > .rank > .content > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-prize > .trophies > .rank > .content > .prize {
  font-size: var(--font-size-large);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-prize > .trophies > .rank > .icon {
  color: var(--color-text-placeholder);
}

.unit-prize > .trophies > .rank:first-of-type > .icon {
  color: var(--color-text-rank-gold);
}

.unit-prize > .trophies > .rank:nth-of-type(2) > .icon {
  color: var(--color-text-rank-emerald);
}

.unit-prize > .trophies > .rank:nth-of-type(3) > .icon {
  color: var(--color-text-rank-platinum);
}

.unit-prize > .trophies > .rank:nth-of-type(4) > .icon {
  color: var(--color-text-rank-bronze);
}

.unit-schedules {
  padding-block: 1rem 0.75rem;
}

.unit-schedules {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: 1.5rem;
  column-gap: 1rem;

  @media (60rem < width) {
    grid-template-columns: repeat(3, 1fr auto);
  }
}

.unit-schedule {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  @media (60rem < width) {
    align-items: start;
  }
}

.unit-schedule > .title {
  font-size: 1.125rem;
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-schedule > .timeline {
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.connector.schedule {
  color: var(--color-text-tertiary);
  align-self: center;

  @media (60rem < width) {
    rotate: -90deg;
  }
}

.connector.schedule:last-of-type {
  display: none;
}

.unit-container > .actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  margin-inline: auto;

  border-radius: 0.5rem;

  padding-block: 0.375rem;
  padding-inline: 0.375rem;

  background-color: var(--color-background-competition-meta);

  @media (48rem < width) {
    flex-direction: row;

    inline-size: fit-content;
  }
}

.unit-container > .actions > .button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  padding-block: 0.625rem;
  padding-inline: 1rem;

  font-weight: 500;

  background-color: transparent;
}

.unit-container > .actions > .button > .icon {
  color: var(--color-text-tertiary);
}

.unit-container > .actions > .button.cancel {
  color: var(--color-text-error);
}

.unit-container > .actions > .button.cancel > .icon {
  color: var(--color-text-error);
}

.unit-container > .actions > .divider {
  inline-size: 1.5rem;
  block-size: var(--size-thinnest);

  background-color: var(--color-background-divider);

  @media (48rem < width) {
    inline-size: var(--size-thinnest);
    block-size: 1.5rem;
  }
}
</style>
