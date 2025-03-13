<script>
import {
  defineComponent,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'

import LandingPageContext from '~/app/vue/contexts/LandingPageContext'

export default defineComponent({
  components: {
    AppButton,
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
        dYdX Trading Competition Board
      </h1>

      <p class="description">
        Trade, compete, verify: The open platform connecting traders through
        transparent competitions on dYdX's decentralized exchange.
      </p>

      <AppButton is-rounded
        class="button"
      >
        Let's join a competition now!
      </AppButton>
    </section>

    <section class="section">
      <div class="unit-inner">
        <h2 class="heading">
          Our Purpose
        </h2>

        <p class="description">
          The dYdX Trading Competition Board embodies the core principles of DeFi,
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
          The dYdX Trading Competition Board is designed to serve traders across
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
          Follow the journey of a dYdX trading competition from start to finish,
          with clear roles for hosts, traders, and the platform system.
        </p>

        <AppButton class="button">
          Get it? Let's join a competition now!
        </AppButton>
      </div>
    </section>

    <section class="section">
      <div class="unit-inner">
        <h2 class="heading">
          Frequently Asked Questions
        </h2>

        <p class="description">
          Get answers to common questions about the dYdX Trading Competition Board.
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
}

.unit-page > .section.hero > .heading {
  font-size: var(--font-size-title);
  line-height: var(--size-line-height-title);
  font-weight: 700;
}

.unit-page > .section.hero > .description {
  font-size: var(--font-size-medium);

  max-width: 42rem;

  color: var(--color-text-secondary);
}

.unit-page > .section.hero > .button {
  margin-block-start: 4rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  transition: box-shadow 500ms var(--transition-timing-base),
    --color-darken-filter 500ms var(--transition-timing-base);
}

.unit-page > .section.hero > .button:hover {
  box-shadow: 0 0 7rem 2rem var(--palette-purple-faded);
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

.unit-inner.lifecycle > .button {
  margin-block-start: 3rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
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
</style>
