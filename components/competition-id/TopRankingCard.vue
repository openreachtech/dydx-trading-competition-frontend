<script>
import {
  defineComponent,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import TopRankingCardContext from '~/app/vue/contexts/competition/TopRankingCardContext'

export default defineComponent({
  components: {
    NuxtLink,
    LinkTooltipButton,
  },

  props: {
    rankDetails: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/competition/TopRankingCardContext').PropsType['rankDetails']>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
    shouldHidePrize: {
      type: Boolean,
      required: false,
      default: false,
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
    const context = TopRankingCardContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-card">
    <div
      class="unit-content"
      :class="context.generateCardClasses()"
    >
      <div class="details">
        <div class="unit-meta">
          <span class="rank">
            {{
              context.generateTopPlacementLabel()
            }}
          </span>

          <NuxtLink
            class="name"
            :to="context.generateProfileUrl()"
          >
            {{ context.generateName() }}
          </NuxtLink>

          <span class="address">
            <span>
              {{ context.generateShortenedAddress() }}
            </span>

            <LinkTooltipButton
              class="link"
              :href="context.generateAddressUrl()"
              target="_blank"
              rel="noopener noreferrer"
              icon-name="heroicons:arrow-up-right"
              icon-size="0.75rem"
              tooltip-message="View on Mintscan"
            />
          </span>
        </div>

        <img
          :src="context.generateTrophyImageUrl()"
          class="image"
        >
      </div>

      <div class="divider" />

      <dl class="profit">
        <div class="entry">
          <dt class="term">
            ROI
          </dt>
          <dd class="figure">
            {{ context.generateRoi() }}
          </dd>
        </div>

        <div class="entry">
          <dt class="term">
            PnL
          </dt>
          <dd class="figure pnl">
            {{ context.generatePnl() }}
          </dd>
        </div>

        <div
          class="entry"
          :class="context.generatePrizeClasses()"
        >
          <dt class="term">
            Prize
          </dt>
          <dd class="figure prize">
            {{ context.generatePrize() }}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<style scoped>
.unit-card {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);
}

.unit-content {
  padding-block: 1.25rem;
  padding-inline: 1.25rem;

  color: var(--color-text-tertiary);
  background-color: var(--color-background-card);

  background-image: url('~/assets/img/backgrounds/dots-faded.svg');
  background-size: 150% 180%;
  background-repeat: no-repeat;
  background-position: center;
}

.unit-content > .details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.unit-content > .details > .image {
  /* Better alignment for the svg. */
  margin-inline-end: -1rem;
}

.unit-meta {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.25rem;

  min-width: 0;
}

.unit-meta > .rank {
  font-size: 2rem;
  font-weight: 700;
}

.unit-content.top-1 > .details > .unit-meta > .rank {
  color: var(--color-text-rank-gold);
}

.unit-content.top-2 > .details > .unit-meta > .rank {
  color: var(--color-text-rank-diamond);
}

.unit-content.top-3 > .details > .unit-meta > .rank {
  color: var(--color-text-rank-emerald);
}

.unit-meta > .name {
  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
  font-weight: 700;

  color: var(--color-text-primary);

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  width: 100%;

  transition: color 250ms var(--transition-timing-base);
}

.unit-meta > .name[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-meta > .address {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-content > .divider {
  margin-block-start: 0.5rem;

  height: var(--size-thinnest);
}

.unit-content.top-1 > .divider {
  background-image: linear-gradient(to right, #ECC94B, #ECC94B00);
}

.unit-content.top-2 > .divider {
  background-image: linear-gradient(to right, #6966FF, #6966FF00);
}

.unit-content.top-3 > .divider {
  background-image: linear-gradient(to right, #3ED9A4, #3ED9A400);
}

/***************************************/

.unit-content > .profit {
  margin-block-start: 0.75rem;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}

.unit-content > .profit > .entry {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.unit-content > .profit > .entry.hidden {
  display: none;
}

.unit-content > .profit > .entry:nth-of-type(2n) {
  text-align: end;
}

.unit-content > .profit > .entry > .term {
  font-size: var(--font-size-small);
  line-height: var(--size-line-height-small);
  font-weight: 500;
}

.unit-content > .profit > .entry > .figure {
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-content > .profit > .entry > .figure.pnl {
  font-weight: 700;
}
</style>
