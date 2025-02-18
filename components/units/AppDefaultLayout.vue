<script>
import {
  defineComponent,
  shallowRef,
} from 'vue'

import {
  Icon,
} from '#components'

import AppOffCanvasMenuLayoutContext from '~/app/vue/contexts/AppOffCanvasMenuLayoutContext'

export default defineComponent({
  components: {
    Icon,
  },

  setup (
    props,
    componentContext
  ) {
    /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
    const rootElementRef = shallowRef(null)

    const args = {
      props,
      componentContext,
      rootElementRef,
    }
    const context = AppOffCanvasMenuLayoutContext.create(args)
      .setupComponent()

    return {
      rootElementRef,
      context,
    }
  },
})
</script>

<template>
  <div ref="rootElementRef"
    class="unit-body"
  >
    <header class="header">
      <div class="inner">
        <slot name="header" />

        <!-- TODO: Replace this button with wallet connector and account -->
        <button class="button"
          @click="context.clickToggleNavigation()"
        >
          Toggle navigation panel
        </button>

        <button class="button toggle-navigation"
          @click="context.clickToggleSearchPanel()"
        >
          <slot name="toggle-menu">
            <Icon name="heroicons-outline:bars-3"
              size="1.5rem"
            />
          </slot>
        </button>
      </div>
    </header>

    <div class="backdrop"
      @click="context.handleBackdropClick()"
    />

    <nav class="navigation">
      <div class="header">
        <slot name="nav-header" />

        <button class="button close"
          @click="context.closeNavigation()"
        >
          <Icon name="heroicons-outline:x-mark"
            size="1.5rem"
          />
        </button>
      </div>

      <slot name="nav-contents" />
    </nav>

    <section class="search">
      <div class="header">
        <slot name="search-header" />

        <button class="button close"
          @click="context.closeSearchPanel()"
        >
          <Icon name="heroicons-outline:x-mark"
            size="1.5rem"
          />
        </button>
      </div>

      <slot name="search-contents" />
    </section>

    <main class="contents">
      <slot name="contents" />
    </main>

    <footer class="footer">
      <slot name="footer" />
    </footer>
  </div>
</template>

<style>
:root {
  --time-transition-nav-toggle: 0.3s;
}
</style>

<style scoped>
/* NOTE: Can remove if reset text color in reset stylesheet. */
.unit-body .button {
  color: inherit;
}

.unit-body {
  min-height: var(--size-screen-height);

  display: flex;
  flex-direction: column;
}

.unit-body > .header {
  height: var(--size-header-height);

  display: flex;
  align-items: center;

  position: sticky;
  top: 0;

  background-color: var(--color-background-header);

  z-index: calc(var(--value-z-index-layer-staying) + 0);
}

.unit-body > .header > .inner {
  margin-inline: auto;

  padding-inline: var(--size-body-padding-inline-mobile);

  display: grid;
  grid-template-columns: 1fr repeat(2, auto);
  align-items: center;
  gap: 1rem;

  width: 100%;
  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-body > .header > .inner > .button.toggle-navigation {
  display: flex;
  justify-content: center;
  align-items: center;

  @media (30rem < width) {
    display: none;
  }
}

.unit-body > .contents {
  flex: 1;

  padding-block: 1rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-body > .footer {
  border-top-width: var(--size-thinnest);
  border-top-style: solid;
  border-top-color: var(--color-border-default);

  height: var(--size-footer-height);

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--color-background-footer);
}

/*********************** Sidebars ***************************/

.unit-body > :where(.navigation, .search) {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;

  transform: translateX(100%);

  transition: transform var(--time-transition-nav-toggle) var(--transition-timing-base);
}

.unit-body > .navigation {
  padding-block: 0.75rem 1.25rem;
  padding-inline: 1.25rem;

  width: var(--size-nav-width);

  background-color: var(--color-background-nav);

  z-index: calc(var(--value-z-index-layer-staying) + 1000);
}

.unit-body > .search {
  padding-block: 1rem;
  padding-inline: 1.5rem;

  width: min(var(--size-search-width), 100%);

  background-color: var(--color-background-search-panel);

  z-index: calc(var(--value-z-index-layer-staying) + 1000);
}

.unit-body.open-search > .search {
  transform: translateX(0);
}

.unit-body.open-nav > .navigation {
  transform: translateX(0);

  @media (30rem < width) {
    transform: translateX(100%);
  }
}

.unit-body > :where(.navigation, .search) > .header {
  border-bottom-width: var(--size-thinnest);
  border-bottom-style: solid;
  border-bottom-color: var(--color-border-default);

  padding-block-end: 0.5rem;

  min-height: 1rem;

  display: grid;
  grid-template-columns: 1fr auto;

  justify-items: start;
}

.unit-body > :where(.navigation, .search) > .header > .button.close {
  justify-self: end;

  display: flex;
  justify-content: center;
  align-items: center;

  color: inherit;
}

/*********************** Backdrop *************************/

.unit-body > .backdrop {
  position: fixed;
  inset: 0;

  transform: translateZ(1rem);

  background-color: rgba(0, 0, 0, 0.5);

  display: none;

  z-index: calc(var(--value-z-index-layer-staying) + 1000);
}

.unit-body.open-search > .backdrop {
  display: block;

  animation: fade-in var(--time-transition-nav-toggle) var(--transition-timing-base) forwards;
}

.unit-body:not(.open-search) > .backdrop {
  animation: fade-out var(--time-transition-nav-toggle) var(--transition-timing-base) forwards;
}

.unit-body.open-nav > .backdrop {
  display: block;

  animation: fade-in var(--time-transition-nav-toggle) var(--transition-timing-base) forwards;

  @media (30rem < width) {
    display: none;

    animation: none;
  }
}

.unit-body:not(.open-nav, .open-search) > .backdrop {
  animation: fade-out var(--time-transition-nav-toggle) var(--transition-timing-base) forwards;

  @media (30rem < width) {
    animation: none;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
    display: none;
  }

  100% {
    opacity: 1;
    display: block;
  }
}

@keyframes fade-out {
  0% {
    opacity: 1;
    display: block;
  }

  100% {
    opacity: 0;
    display: none;
  }
}
</style>
