<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppLeagueCardContext from '~/app/vue/contexts/AppLeagueCardContext'
import AppIconBadge from '~/components/badges/AppIconBadge.vue'
import AppLeagueCountdown from '~/components/units/AppLeagueCountdown.vue'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppLeagueCountdown,
    AppIconBadge,
  },

  props: {
    competition: {
      type: Object,
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
    const context = AppLeagueCardContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-card">
    <div class="unit-contents">
      <div class="header">
        <div class="unit-headline">
          <h4 class="heading">
            {{ context.title }}
          </h4>

          <img :src="context.generateImageUrl()"
            :alt="context.host?.name"
            class="image"
          >
        </div>

        <div class="unit-status">
          <div>
            <AppIconBadge :severity="context.generateBadgeSeverity()"
              :icon-name="context.generateBadgeIconName()"
            >
              {{ context.generateBadgeDescription() }}
            </AppIconBadge>

            <!-- TODO: Another badge here? -->
          </div>

          <AppLeagueCountdown :schedules="context.schedules" />
        </div>
      </div>

      <div class="body">
        <p class="description">
          {{ context.description }}
        </p>

        <span class="unit-deposit">
          <Icon name="heroicons:wallet"
            size="1.125rem"
          />

          <span>
            {{ context.normalizeMinimumDeposit() }} <span class="note">(entry balance)</span>
          </span>
        </span>
      </div>

      <div class="footer">
        <span class="prize">
          {{ context.normalizeCurrency({ value: context.totalPrize }) }}
        </span>

        <span class="unit-participants">
          <span class="figure">
            <Icon name="heroicons:users"
              size="1.125rem"
            />

            <span class="count">
              {{ context.normalizeNumber({ value: context.participantUpperLimit }) }}
            </span>
          </span>

          <span class="unit">
            participants
          </span>
        </span>
      </div>
    </div>

    <NuxtLink :to="context.generateDestination()" />
  </div>
</template>

<style scoped>
.unit-card {
  display: grid;
}

.unit-card > * {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.unit-contents {
  border-color: var(--color-border-card);
  border-radius: 1rem;
  border-style: solid;
  border-width: 0;
  border-block-end-width: 0.25rem;
  border-inline-start-width: 0.25rem;

  display: grid;
  grid-template-rows: 1fr auto auto;

  background-color: var(--color-background-card);

  overflow: hidden;

  transition: border-color 250ms var(--transition-timing-base);
}

.unit-card:hover > .unit-contents {
  border-color: var(--color-border-card-hover);
}

/* Header */
.unit-contents > .header {
  padding-block: 1.25rem;
  padding-inline: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  background-color: var(--color-background-card-header);
  background-image: url('~/assets/img/backgrounds/horizon-grid.svg');
  background-position: center;
  background-size: 130%;
}

.unit-headline {
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
}

.unit-headline > .heading {
  --max-line-count: 2;

  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);

  min-height: calc(var(--max-line-count) * var(--size-line-height-large));
}

/* If line-clamp is supported, use it. Otherwise, min-height is still two lines, which is not ideal but not ugly. */
@supports (line-clamp: 2) or ((-webkit-line-clamp: 2) and (display: -webkit-box) and (-webkit-box-orient: vertical)) {
  .unit-headline > .heading {
    display: -webkit-box;
    line-clamp: var(--max-line-count);
    -webkit-line-clamp: var(--max-line-count);
    -webkit-box-orient: vertical;

    height: calc(var(--size-line-height-large) * var(--max-line-count));
    overflow: hidden;
  }
}

.unit-headline > .image {
  border-radius: 0.875rem;

  flex-shrink: 0;

  width: 3.25rem;
  height: 3.25rem;

  background-color: var(--color-background-card);

  overflow: hidden;
}

.unit-headline > .image[src='/img/badges/league-badge-placeholder.png'] {
  object-fit: scale-down;
}

.unit-status {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}

/* Body */
.unit-contents > .body {
  padding-block: 1rem;
  padding-inline: 1.25rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  color: var(--color-text-tertiary);
}

.unit-contents > .body > .description {
  font-size: var(--font-size-small);
  font-weight: 400;
}

.unit-deposit {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  font-weight: 500;
}

.unit-deposit .note {
  font-weight: 400;
}

/* Footer */
.unit-contents > .footer {
  border-block-start-color: var(--color-border-card);
  border-block-start-style: solid;
  border-block-start-width: var(--size-thinnest);

  padding-block: 0.75rem;
  padding-inline: 1.25rem;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.unit-contents > .footer > .prize {
  font-size: var(--font-size-large);
  font-weight: 700;
}

.unit-participants {
  display: inline-flex;
  flex-direction: column;
  align-items: end;

  color: var(--color-text-tertiary);
}

.unit-participants > .figure {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}

.unit-participants > .figure > .count {
  color: var(--color-text-secondary);

  font-weight: 500;
}

.unit-participants > .unit {
  font-size: var(--font-size-small);
}

/* Different background images */
.unit-card:nth-child(4n) > .unit-contents > .header {
  background-image: url('~/assets/img/backgrounds/dots.svg');
}

.unit-card:nth-child(4n + 2) > .unit-contents > .header {
  background-image: url('~/assets/img/backgrounds/wave.svg');
}

.unit-card:nth-child(4n + 3) > .unit-contents > .header {
  background-image: url('~/assets/img/backgrounds/stack.svg');
}
</style>
