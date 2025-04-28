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
    <NuxtLink :to="context.generateCompetitionDetailsUrl()"
      class="return"
    >
      <Icon name="heroicons:arrow-left"
        size="1.5rem"
      />

      <span>Edit League</span>
    </NuxtLink>
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

.unit-page > .return {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  color: var(--color-text-primary);

  transition: gap 150ms var(--transition-timing-base);
}

.unit-page > .return:hover {
  gap: 1rem;
}
</style>
