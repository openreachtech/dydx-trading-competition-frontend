<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import LandingPageContext from '~/app/vue/contexts/LandingPageContext'

export default defineComponent({
  components: {
    NuxtLink,
  },

  setup (
    props,
    componentContext
  ) {
    const args = {
      props,
      componentContext,
    }
    const context = LandingPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <section class="section hero">
      <h1 class="heading">
        dYdX Trading Arena
      </h1>

      <p class="description">
        Trade, compete, verify: The open platform connecting traders through
        transparent competitions on dYdX's decentralized exchange.
      </p>

      <NuxtLink class="button call-to-action"
        to="/competitions"
      >
        Let's join a competition now!
      </NuxtLink>
    </section>

    <section class="section">
      <div class="unit-inner">
        <h2 class="heading">
          Our Purpose
        </h2>

        <p class="description">
          The dYdX Trading Arena Board embodies the core principles of DeFi,
          creating a transparent, verifiable platform for traders to showcase their skills.
        </p>

        <div class="unit-purposes">
          <div v-for="it of context.purposes"
            :key="it.title"
            class="card"
          >
            <h3 class="heading">
              {{ it.title }}
            </h3>

            <p class="description">
              {{ it.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="unit-inner audience">
        <h2 class="heading">
          Who This Is For
        </h2>

        <p class="description">
          The dYdX Trading Arena Board is designed to serve traders across
          multiple experience levels, providing unique benefits for each segment.
        </p>

        <div class="unit-audience">
          <div v-for="it of context.audience"
            :key="it.title"
            class="card"
          >
            <h3 class="heading">
              {{ it.title }}
            </h3>

            <span class="subtitle">
              {{ it.subtitle }}
            </span>

            <p class="description">
              {{ it.description }}
            </p>

            <ul class="unit-characteristics">
              <li v-for="characteristic of it.characteristics"
                class="characteristic"
              >
                <span class="bullet" />

                <span>{{ characteristic }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="unit-inner lifecycle">
        <h2 class="heading">
          Competition Lifecycle
        </h2>

        <p class="description">
          Follow the journey of a dYdX trading arena from start to finish,
          with clear roles for hosts, traders, and the platform system.
        </p>

        <div class="unit-timeline">
          <template v-for="phase of context.lifecycle">
            <h3 class="heading">
              {{ phase.phaseName }}
            </h3>

            <div v-for="it of phase.timeline"
              class="unit-stage"
              :class="it.actor"
            >
              <div class="content">
                <span class="actor">
                  {{ it.actor }}
                </span>

                <span class="title">
                  {{ it.title }}
                </span>

                <p class="description">
                  {{ it.description }}
                </p>

                <ul class="unit-characteristics">
                  <li v-for="(characteristic, index) of it.characteristics"
                    :key="index"
                    class="characteristic"
                  >
                    <span class="bullet" />
                    <span>{{ characteristic }}</span>
                  </li>
                </ul>
              </div>

              <div class="connector">
                <div class="indicator">
                  <div class="dot" />
                </div>
                <div class="line" />
              </div>

              <div class="empty" />
            </div>
          </template>
        </div>

        <NuxtLink class="button call-to-action"
          to="/competitions"
        >
          Get it? Let's join a competition now!
        </NuxtLink>
      </div>
    </section>

    <section class="section">
      <div class="unit-inner">
        <h2 class="heading">
          Frequently Asked Questions
        </h2>

        <p class="description">
          Get answers to common questions about the dYdX Trading Arena Board.
        </p>

        <div class="unit-faqs">
          <div v-for="it of context.faqs"
            :key="it.question"
            class="card"
          >
            <h3 class="heading">
              <span class="label">Q</span>

              <span>{{ it.question }}</span>
            </h3>

            <p class="description">
              <span class="label">A</span>

              <span v-html="it.answer" />
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/************** Hero section **************/

.unit-page > .section {
  margin-block-start: 0;
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}

.unit-page > .section.hero {
  padding-block: 7.5rem 12rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  display: flex;
  flex-direction: column;
  align-items: center;

  text-align: center;

  background-image: linear-gradient(
    180deg,
    rgba(24, 24, 37, 0.00) 0%,
    #181825 46.63%,
    rgba(24, 24, 37, 0.00) 100%
  );

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .section.hero > .heading {
  font-size: var(--font-size-headline);
  line-height: var(--size-line-height-headline);
  font-weight: 700;

  @media (48rem < width) {
    font-size: var(--font-size-title);
    line-height: var(--size-line-height-title);
  }
}

.unit-page > .section.hero > .description {
  font-size: var(--font-size-base);

  max-width: 42rem;

  color: var(--color-text-secondary);

  @media (48rem < width) {
    font-size: var(--font-size-medium);
  }
}

.unit-page > .section.hero > .button {
  margin-block-start: 4rem;
}

/************** Other sections **************/

.unit-page > .section {
  padding-block: 5rem;
}

.unit-page > .section:last-of-type {
  padding-block-end: 12rem;
}

.unit-page > .section:not(.hero):nth-of-type(2n) {
  border-block-width: var(--size-thinnest);
  border-block-style: solid;
  border-block-color: var(--color-border-competition-section);

  background-color: var(--color-background-competition-section-darker);
}

.unit-inner {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-inner > .heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-extra);
  line-height: var(--size-line-height-extra);
}

.unit-inner > .description {
  margin-block-start: 1rem;

  font-size: var(--font-size-base);

  color: var(--color-text-secondary);

  max-width: 38rem;
}

/************** Purpose section **************/

.unit-purposes {
  margin-block-start: 3rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (48rem < width) {
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  }
}

.unit-purposes > .card {
  border-radius: 0.75rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  background-color: var(--color-background-card);

  transition: background-color 500ms var(--transition-timing-base),
    border-color 500ms var(--transition-timing-base);
}

.unit-purposes > .card:hover {
  border-color: var(--color-border-default);

  background-color: var(--color-background-card-active);
}

.unit-purposes > .card > .heading {
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);
}

.unit-purposes > .card > .description {
  font-size: var(--font-size-base);

  color: var(--color-text-tertiary);

  transition: color 500ms var(--transition-timing-base);
}

.unit-purposes > .card:hover > .description {
  color: var(--color-text-secondary);
}

/************** Audience section **************/

.unit-inner.audience {
  background-image: url('~/assets/img/backgrounds/league-hero.png');
  background-repeat: no-repeat;
  background-position: right;
}

.unit-audience {
  margin-block-start: 3rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (48rem < width) {
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
  }
}

.unit-audience > .card > .heading {
  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);
}

.unit-audience > .card > .subtitle {
  margin-block-start: 0.25rem;

  display: inline-block;

  font-size: var(--font-size-medium);
  line-height: var(--size-line-height-medium);

  color: var(--color-text-secondary);
}

.unit-audience > .card > .description {
  margin-block-start: 1.25rem;

  font-size: var(--font-size-base);

  color: var(--color-text-tertiary);
}

.unit-characteristics {
  margin-block-start: 0.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: var(--font-size-base);

  color: var(--color-text-tertiary);
}

.unit-characteristics > .characteristic {
  display: inline-flex;
  gap: 0.75rem;
}

.unit-characteristics > .characteristic > .bullet {
  margin-block-start: 0.375rem;

  border-radius: 100vh;

  flex-shrink: 0;

  height: 0.5rem;
  width: 0.5rem;

  background-color: var(--color-text-highlight-purple);
}

/************** Lifecycle section **************/

.unit-inner.lifecycle {
  display: flex;
  flex-direction: column;
  align-items: start;
}

.unit-inner.lifecycle > .button {
  margin-block-start: 3rem;

  align-self: center;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
}

.unit-timeline {
  margin-block-start: 3rem;

  display: flex;
  flex-direction: column;
}

.unit-timeline > .heading {
  margin-block: 1.25rem;

  border-radius: 100vh;

  padding-block: 0.5rem;
  padding-inline: 1.5rem;

  background-color: var(--color-background-card-header);

  align-self: start;

  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  text-align: center;

  box-shadow: 0 0 7rem 2rem var(--palette-purple-faded);

  @media (48rem < width) {
    align-self: center;
  }
}

.unit-stage {
  /* Reset default top margin. */
  margin-block-start: 0;

  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 1rem;

  @media (48rem < width) {
    grid-template-columns: 1fr auto 1fr;
  }
}

.unit-stage:nth-of-type(2n) > .connector {
  @media (48rem < width) {
    order: 2;
  }
}

.unit-stage:nth-of-type(2n) > .content {
  @media (48rem < width) {
    order: 3;
  }
}

.unit-stage:nth-of-type(2n) > .empty {
  @media (48rem < width) {
    order: 1;
  }
}

.unit-stage > .content {
  margin-block-end: 4rem;

  border-radius: 0.75rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem;

  order: 2;

  background-color: var(--color-background-card);

  @media (48rem < width) {
    order: 1;
  }
}

.unit-stage > .content > .actor {
  border-radius: 100vh;

  padding-block: 0.25rem;
  padding-inline: 0.75rem;

  font-size: var(--font-size-small);
  font-weight: 700;

  background-color: var(--palette-purple-faded);
  color: var(--palette-purple);

  text-transform: uppercase;
}

.unit-stage > .content > .title {
  margin-block-start: 0.5rem;

  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);
}

.unit-stage > .content > .description {
  font-size: var(--font-size-base);

  color: var(--color-text-secondary);
}

.unit-stage > .connector {
  display: flex;
  flex-direction: column;
  align-items: center;

  order: 1;

  @media (48rem < width) {
    order: 2;
  }
}

.unit-stage > .connector > .indicator {
  border-radius: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;

  padding-block: 0.375rem;
  padding-inline: 0.375rem;

  background-color: var(--palette-purple-faded);
}

.unit-stage > .connector > .indicator > .dot {
  border-radius: inherit;

  height: 0.5rem;
  width: 0.5rem;

  background-color: var(--palette-purple);
}

.unit-stage > .connector > .line {
  border-inline-end-width: 0.125rem;
  border-inline-end-style: dashed;
  border-inline-end-color: var(--color-background-timeline-connector);

  flex: 1;
}

.unit-stage > .empty {
  display: none;

  @media (48rem < width) {
    display: block;

    order: 3;
  }
}

.unit-stage.trader > .content > .actor {
  background-color: var(--palette-yellow-faded);
  color: var(--palette-yellow);
}

.unit-stage.trader > .connector > .indicator {
  background-color: var(--palette-yellow-faded);
}

.unit-stage.trader > .connector > .indicator > .dot {
  background-color: var(--palette-yellow);
}

.unit-stage.system > .content > .actor {
  background-color: var(--palette-green-faded);
  color: var(--palette-green);
}

.unit-stage.system > .connector > .indicator {
  background-color: var(--palette-green-faded);
}

.unit-stage.system > .connector > .indicator > .dot {
  background-color: var(--palette-green);
}

/************** FAQs section **************/

.unit-faqs {
  margin-block-start: 3rem;

  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (48rem < width) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.unit-faqs > .card {
  border-radius: 0.75rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);

  padding-block: 1.5rem;
  padding-inline: 1.5rem;

  background-color: var(--color-background-card);
}

.unit-faqs > .card > .heading {
  display: inline-flex;
  gap: 0.5rem;

  font-size: var(--font-size-large);
  font-weight: 700;
  line-height: var(--size-line-height-large);
}

.unit-faqs > .card > .description {
  margin-block-start: 1.25rem;

  display: inline-flex;
  gap: 0.75rem;

  font-size: var(--font-size-base);

  color: var(--color-text-tertiary);
}

.unit-faqs > .card > :where(.heading, .description) > .label {
  font-size: var(--font-size-large);
  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-faqs > .card > .heading > .label {
  color: var(--color-text-highlight-purple);
}

/******** Call-to-action button ********/
/* TODO: Should have shared styles between link-button and button */

@property --color-darken-filter {
  syntax: '<color>';
  initial-value: #00000000;
  inherits: false;
}

.button.call-to-action {
  border-radius: 0.5rem;
  border-style: solid;
  border-width: var(--size-thinnest);
  border-color: var(--color-border-button);

  padding-block: 0.75rem;
  padding-inline: 1rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-primary);

  background-color: var(--color-background-button-primary);
  background-image: linear-gradient(
    to bottom,
    var(--color-darken-filter),
    var(--color-darken-filter)
  );

  transition: box-shadow 500ms var(--transition-timing-base),
    --color-darken-filter 500ms var(--transition-timing-base);
}

.button.call-to-action:hover {
  --color-darken-filter: #00000047;

  box-shadow: 0 0 7rem 2rem var(--palette-purple-faded);
}
</style>
