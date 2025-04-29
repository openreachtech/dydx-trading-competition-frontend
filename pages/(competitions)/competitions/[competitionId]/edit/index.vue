<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
  Icon,
} from '#components'

import {
  useRoute,
} from 'vue-router'

import CompetitionDetailsEditPageContext from './CompetitionDetailsEditPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()

    const args = {
      props,
      componentContext,
      route,
    }
    const context = CompetitionDetailsEditPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="header">
      <NuxtLink :to="context.generateCompetitionDetailsUrl()"
        aria-label="Go back to competition details"
        class="link back"
      >
        <Icon name="heroicons:arrow-left"
          size="1.5rem"
        />
      </NuxtLink>
      <span class="heading">
        Edit League
      </span>
    </div>
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .header {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-text-primary);
}

.unit-page > .header > .link {
  color: inherit;
}

.unit-page > .header > .link.back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-page > .header > .heading {
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);
}
</style>
