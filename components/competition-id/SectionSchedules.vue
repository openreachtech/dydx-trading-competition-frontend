<script>
import {
  defineComponent,
} from 'vue'

import {
  Icon,
} from '#components'

import AppTimeline from '~/components/units/AppTimeline.vue'

import SectionSchedulesContext from '~/app/vue/contexts/competition/SectionSchedulesContext'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'
 */

export default defineComponent({
  components: {
    Icon,
    AppTimeline,
  },

  props: {
    schedules: {
      /** @type {import('vue').PropType<CompetitionEntity['schedules']>} */
      type: Array,
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
    const context = SectionSchedulesContext.create(args)
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
      <h2 class="heading">
        Activity Schedule
      </h2>

      <p
        class="registration-end"
        :class="{
          ended: context.hasRegistrationPeriodEnded(),
        }"
      >
        {{ context.generateRegistrationEndLabel() }} <time class="time">{{ context.generateLateRegistrationEndTimestamp() }}</time>
      </p>

      <div class="unit-schedules">
        <template
          v-for="(it, index) of context.generateScheduleGroups()"
          :key="index"
        >
          <div
            class="schedule"
            :class="{
              active: context.isActiveTimeline({
                timeline: it.timeline,
              }),
            }"
          >
            <div class="border" />

            <div class="contents">
              <h3 class="heading">
                {{ it.title }}
              </h3>

              <AppTimeline :timeline="it.timeline">
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
          </div>

          <Icon
            class="connector"
            name="heroicons:chevron-down"
          />
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  /* Reset block-start margin of base styles. */
  margin-block-start: 0;
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  border-block-width: var(--size-thinnest);
  border-block-style: solid;
  border-block-color: var(--color-border-competition-section);

  padding-block: 3rem 4.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  background-color: var(--color-background-competition-section-darker);

  background-image: url('~/assets/img/backgrounds/vertical-grid.svg');
  background-position: top;
  background-repeat: repeat-x;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));

    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-section > .inner {
  margin-inline: auto;

  max-width: var(--size-body-max-width);
}

.unit-section > .inner > .heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-headline);
  font-weight: 700;
  line-height: var(--size-line-height-headline);

  text-align: center;
}

.unit-section > .inner > .registration-end {
  --color-text-time: var(--palette-yellow);

  margin-block-start: 0.5rem;
  margin-inline: 2rem;

  font-size: var(--font-size-base);

  line-height: var(--size-line-height-base);

  text-align: center;

  color: var(--color-text-tertiary);

  @media (48rem <= width) {
    font-size: var(--font-size-medium);

    line-height: var(--size-line-height-medium);
  }
}

.unit-section > .inner > .registration-end > .time {
  font-weight: 500;

  color: var(--color-text-time);
}

.unit-section > .inner > .registration-end.ended > .time {
  color: var(--color-text-secondary);
}

.unit-schedules {
  display: grid;

  grid-template-columns: 1fr;
  grid-auto-rows: 1fr auto;
  gap: 0.5rem;

  margin-block-start: 1.25rem;

  @media (48rem < width) {
    grid-template-columns: repeat(2, 1fr);

    margin-block-start: 2rem;
  }
}

.unit-schedules > .schedule {
  --clip-path: polygon(
    7.3% 50%,
    0.3% 0%,
    92.6% 0%,
    99.7% 50%,
    92.6% 100%,
    0.3% 100%
  );
  --clip-path-start: polygon(
    7.3% 50%,
    0.3% 0%,
    92.6% 0%,
    99.7% 50%,
    92.6% 100%,
    0.3% 100%
  );
  --clip-path-end: polygon(
    7.3% 50%,
    0.3% 0%,
    92.6% 0%,
    99.7% 50%,
    92.6% 100%,
    0.3% 100%
  );

  margin-inline: 0;

  display: grid;

  @media (48rem < width) {
    margin-inline: -0.6rem;
  }

  @media (60rem <= width) {
    margin-inline: -1rem;
  }
}

.unit-schedules > .schedule > * {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.unit-schedules > .schedule > .contents {
  border-radius: 0.5rem;

  margin-block: 0.09375rem;
  margin-inline: 0.09375rem;

  padding-block: 1.5rem;
  padding-inline: 2.5rem 1.5rem;

  background-color: var(--color-background-card);

  color: var(--color-text-primary);

  clip-path: none;

  @media (48rem < width) {
    border-radius: 0;

    clip-path: var(--clip-path);

    padding-inline: 3rem 2rem;
  }

  @media (60rem < width) {
    padding-inline: 4rem 3rem;
  }
}

.unit-schedules > .schedule.active > .contents {
  background-color: var(--color-background-card-active);

  color: var(--color-text-secondary);
}

.unit-schedules > .schedule > .contents > .heading {
  font-family: var(--font-family-body);
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-secondary);
}

.unit-schedules > .schedule > .border {
  border-radius: 0.5rem;

  background-color: var(--color-border-card);

  clip-path: none;

  @media (48rem < width) {
    border-radius: 0;

    clip-path: var(--clip-path);
  }
}

.unit-schedules > .schedule:first-of-type > :where(.border, .contents) {
  clip-path: none;

  @media(48rem < width) {
    border-start-start-radius: 0.5rem;
    border-end-start-radius: 0.5rem;

    clip-path: var(--clip-path-start);
  }
}

.unit-schedules > .schedule:last-of-type > :where(.border, .contents) {
  clip-path: none;

  @media(48rem < width) {
    border-start-end-radius: 0.5rem;
    border-end-end-radius: 0.5rem;

    clip-path: var(--clip-path-end);
  }
}

.unit-schedules > .connector {
  justify-self: center;

  width: 3rem;
  height: 1.5rem;

  @media (48rem < width) {
    display: none;
  }
}

.unit-schedules > .connector:last-of-type {
  display: none;
}
</style>
