<script>
import {
  defineComponent,
} from 'vue'

import AppTimelineContext from '~/app/vue/contexts/AppTimelineContext'

/**
 * @typedef {Array<{
 *   title?: string
 *   description?: string
 *   timestamp: Date | string
 * }>} Timeline
 */

export default defineComponent({
  props: {
    timeline: {
      /** @type {import('vue').PropType<Timeline>} */
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
    const context = AppTimelineContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-timeline">
    <span class="fallback"
      :class="{
        hidden: context.shouldHideFallback(),
      }"
    >
      ----
    </span>

    <div v-for="(event, index) of context.timeline"
      :key="index"
      class="event"
    >
      <div class="unit-connector"
        :class="{
          elapsed: context.hasElapsed({ timestamp: event.timestamp }),
        }"
      >
        <slot name="indicator"
          :event="event"
        >
          <div class="indicator" />
        </slot>
        <div class="line" />
      </div>

      <div class="contents">
        <slot name="contents"
          :event="event"
        >
          <span>
            {{ context.normalizeTimestamp({ timestamp: event.timestamp }) }}
          </span>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.unit-timeline {
  display: flex;
  flex-direction: column;
}

.unit-timeline > .fallback.hidden {
  display: none;
}

.unit-timeline > .event {
  display: flex;
  gap: 0.5rem;
}

.unit-timeline > .event > .contents {
  padding-block-end: 1rem;
}

.unit-timeline > .event:last-of-type > .contents {
  padding-block-end: 0;
}

.unit-timeline > .event:last-of-type > .unit-connector > .line {
  display: none;
}

.unit-connector {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.unit-connector > .indicator {
  border-radius: 100vh;

  flex-shrink: 0;

  width: 0.5rem;
  height: 0.5rem;

  background-color: var(--color-background-timeline-connector);

  margin-block: 0.25rem;
}

.unit-connector.elapsed > .indicator {
  background-color: var(--color-background-timeline-connector-elapsed);
}

.unit-connector > .line {
  width: var(--size-thinnest);
  height: 100%;
  min-height: 1.75rem;

  background-color: var(--color-background-timeline-connector);
}

.unit-connector.elapsed > .line {
  background-color: var(--color-background-timeline-connector-elapsed);
}
</style>
