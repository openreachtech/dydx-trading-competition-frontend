<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  NuxtLink,
} from '#components'

import AppTable from '~/components/units/AppTable.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import TopRankingCard from '~/components/competition-id/TopRankingCard.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import {
  useRoute,
} from '#imports'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionLeaderboardQueryGraphqlLauncher from '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlLauncher'

import SectionLeaderboardContext from '~/app/vue/contexts/competition/SectionLeaderboardContext'

export default defineComponent({
  components: {
    NuxtLink,
    AppTable,
    AppPagination,
    TopRankingCard,
    LinkTooltipButton,
  },

  props: {
    competitionStatusId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const statusReactive = reactive({
      isLoading: false,
    })
    const competitionLeaderboardGraphqlClient = useGraphqlClient(CompetitionLeaderboardQueryGraphqlLauncher)

    const args = {
      props,
      componentContext,
      route,
      statusReactive,
      graphqlClientHash: {
        competitionLeaderboard: competitionLeaderboardGraphqlClient,
      },
    }
    const context = SectionLeaderboardContext.create(args)
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
      <h2>
        {{ context.generateSectionHeading() }}
      </h2>

      <div class="unit-champions">
        <div v-for="it of context.generateTopThree()"
          :key="it.rank"
          class="champion"
        >
          <TopRankingCard :rank-details="it"
            class="card"
          />

          <div class="tail" />
        </div>
      </div>

      <span class="note">
        {{ context.generateLastCalculatedAt() }}
      </span>

      <AppTable :header-entries="context.tableHeaderEntries"
        :entries="context.normalizeRankings()"
        :is-loading="context.statusReactive.isLoading"
        class="table"
      >
        <template #body-rank="{ value }">
          <span class="unit-rank">
            <span class="indicator">#</span> {{ value }}
          </span>
        </template>

        <template #body-name="{ value, row }">
          <NuxtLink class="unit-name"
            :to="context.generateProfileUrl({
              address: row.address,
            })"
          >
            {{ value }}
          </NuxtLink>
        </template>

        <template #body-address="{ value }">
          <span class="unit-address">
            <span>
              {{
                context.shortenAddress({
                  address: value,
                })
              }}
            </span>

            <LinkTooltipButton tooltip-message="View on Mintscan"
              :href="context.generateAddressUrl({
                address: value,
              })"
              target="_blank"
              rel="noopener noreferrer"
            />
          </span>
        </template>

        <template #body-baseline="{ value }">
          <span class="unit-baseline">
            {{
              context.normalizePerformanceBaseline({
                figure: value,
              })
            }}
          </span>
        </template>

        <template #body-roi="{ value }">
          <span class="unit-roi">
            {{
              context.normalizeRoi({
                figure: value,
              })
            }}
          </span>
        </template>

        <template #body-pnl="{ value }">
          <span class="unit-pnl">
            {{
              context.normalizePnl({
                figure: value,
              })
            }}
          </span>
        </template>
      </AppTable>

      <AppPagination class="pagination"
        page-key="leaderboardPage"
        :pagination="context.generatePaginationResult()"
      />
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  margin-block-start: 0;
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  padding-block: 4rem 2.5rem;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }

  @media (48rem < width) {
    padding-block: 5rem 3.5rem;
  }

  @media (60rem < width) {
    background-image: url('~/assets/img/backgrounds/league-leaderboard.png');
    background-repeat: no-repeat;
    background-position: 110%;
  }
}

.unit-section > .inner {
  margin-inline: auto;

  padding-inline: var(--size-body-padding-inline-mobile);

  display: flex;
  flex-direction: column;

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-section > .inner > .note {
  margin-block-start: 3rem;

  align-self: end;
  text-align: end;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);

  @media (48rem < width) {
    margin-block-start: 5rem;
  }
}

.unit-section > .inner > .table {
  margin-block-start: 1rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-section > .inner > .pagination {
  margin-block-start: 1.25rem;
}

/***************** Top 3 rankers ****************/
.unit-champions {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (48rem < width) {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
}

.unit-champions > .champion {
  display: flex;
  flex-direction: column;

  @media (48rem < width) {
    width: 17.25rem;
  }
}

.unit-champions > .champion:first-of-type {
  @media (48rem < width) {
    order: 1;

    margin-inline: -4rem;
  }

  @media (60rem < width) {
    margin-inline: 0;
  }
}

.unit-champions > .champion:nth-of-type(2) {
  @media (48rem < width) {
    margin-block-start: 15rem;

    order: 2;
  }

  @media (60rem < width) {
    margin-block-start: 3.5rem;
  }
}

.unit-champions > .champion > .card {
  z-index: calc(var(--value-z-index-layer-content) + 0);
}

.unit-champions > .champion:last-of-type {
  @media (48rem < width) {
    margin-block-start: 15.5rem;

    order: 0;
  }

  @media (60rem < width) {
    margin-block-start: 4.5rem;
  }
}

.unit-champions > .champion > .tail {
  display: none;

  flex: 1;

  min-height: 6.5rem;

  @media (48rem < width) {
    display: block;
  }
}

.unit-champions > .champion:first-of-type > .tail {
  clip-path: polygon(
    0.18% 0%,
    100% 0%,
    68.5% 100%,
    31.5% 100%
  );
  background-image: linear-gradient(to bottom, #1F1F30E5, #101018);
}

.unit-champions > .champion:nth-of-type(2) > .tail {
  margin-inline-start: -6rem;

  clip-path: polygon(
    100% 0%,
    26.2% 0%,
    0% 100%,
    30.4% 100%,
    100% 0%
  );
  background-image: linear-gradient(to bottom, #1F1F30E5, #101018);
}

.unit-champions > .champion:last-of-type > .tail {
  margin-inline-end: -6.5rem;

  clip-path: polygon(
    0% 0%,
    71.5% 0%,
    100% 100%,
    70.5% 100%,
    0% 0%
  );
  background-image: linear-gradient(to bottom, #1F1F30E5, #101018);
}

/***************** Non-podium rankers ****************/
.unit-rank {
  color: var(--color-text-primary);
}

.unit-rank > .indicator {
  color: var(--color-text-secondary);
}

.unit-name {
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-name[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-address {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-baseline {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-secondary);
}
</style>
