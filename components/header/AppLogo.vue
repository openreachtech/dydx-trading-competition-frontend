<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
  Icon,
} from '#components'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
  },
})
</script>

<template>
  <NuxtLink
    to="/"
    class="unit-logo"
  >
    <Icon
      name="heroicons-solid:home"
      size="1.5rem"
      class="icon"
    />

    <img
      src="/img/logo-trading-arena.svg"
      alt="dYdX Trading Arena Logo"
    >
  </NuxtLink>
</template>

<style scoped>
.unit-logo {
  display: inline-flex;
  align-items: center;
  gap: 1.5rem;

  /* NOTE: Can remove if reset color in reset stylesheet. */
  color: inherit;
}

.unit-logo > .icon {
  display: none;

  @media (30rem <= width) {
    display: inline;
  }
}
</style>
