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
</style>
