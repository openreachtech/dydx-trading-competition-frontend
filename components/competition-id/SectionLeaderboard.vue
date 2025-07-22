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
  useRouter,
} from 'vue-router'

import useWalletStore from '~/stores/wallet'

import AppButton from '~/components/units/AppButton.vue'
import AppTable from '~/components/units/AppTable.vue'
import AppTabLayout from '~/components/units/AppTabLayout.vue'
import AppPagination from '~/components/units/AppPagination.vue'
import TopRankingCard from '~/components/competition-id/TopRankingCard.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import SectionLeaderboardContext from '~/app/vue/contexts/competition/SectionLeaderboardContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppButton,
    AppTable,
    AppTabLayout,
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
    isLoadingLeaderboard: {
      type: Boolean,
      required: true,
    },
    isLoadingMetricLeaderboard: {
      type: Boolean,
      required: true,
    },
    leaderboardTableHeaderEntries: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['leaderboardTableHeaderEntries']
       * >}
       */
      type: Array,
      required: true,
    },
    leaderboardTableEntries: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['leaderboardTableEntries']
       * >}
       */
      type: Array,
      required: true,
    },
    topThreeLeaderboardEntries: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['topThreeLeaderboardEntries']
       * >}
       */
      type: Array,
      required: true,
    },
    metricLeaderboardTableHeaderEntries: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['metricLeaderboardTableHeaderEntries']
       * >}
       */
      type: Array,
      required: true,
    },
    metricLeaderboardTableEntries: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['metricLeaderboardTableEntries']
       * >}
       */
      type: Array,
      required: true,
    },
    leaderboardPaginationResult: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['leaderboardPaginationResult']
       * >}
       */
      type: Object,
      required: true,
    },
    metricLeaderboardPaginationResult: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/SectionLeaderboardContext').PropsType['metricLeaderboardPaginationResult']
       * >}
       */
      type: Object,
      required: true,
    },
    lastLeaderboardUpdateTimestamp: {
      type: [
        String,
        null,
      ],
      required: true,
    },
    outcomeCsvUrl: {
      type: [
        String,
        null,
      ],
      required: false,
      default: null,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const router = useRouter()

    const walletStore = useWalletStore()

    const args = {
      props,
      componentContext,
      route,
      router,
      walletStore,
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
      <h2
        class="heading"
        :class="context.generateSectionHeadingClasses()"
      >
        {{ context.generateSectionHeading() }}
      </h2>

      <AppTabLayout
        :tabs="context.leaderboardTabs"
        :active-tab-key="context.extractActiveTabKeyFromRoute()"
        class="leaderboard"
        @change-tab="context.changeTab({
          fromTab: $event.fromTab,
          toTab: $event.toTab,
          tabKey: 'leaderboardTab',
        })"
      >
        <template #contents>
          <div class="unit-leaderboard pnl">
            <div
              class="champions"
              :class="context.generateTopRankerClasses()"
            >
              <div
                v-for="(it, index) of context.generateTopThree()"
                :key="index"
                class="champion"
              >
                <TopRankingCard
                  :rank-details="it"
                  :should-hide-prize="!context.hasFinishedCompetition()"
                  class="card"
                />

                <div class="tail" />
              </div>
            </div>

            <span
              class="note"
              :class="context.generateLastUpdateNoteClasses()"
            >
              {{ context.formatLastLeaderboardUpdateTimestamp() }}
            </span>

            <AppTable
              :header-entries="context.leaderboardTableHeaderEntries"
              :entries="context.leaderboardTableEntries"
              :is-loading="context.isLoadingLeaderboard"
              class="table"
            >
              <!-- ** Competition participants list ** -->
              <template #body-participantName="{ value, row }">
                <NuxtLink
                  class="unit-name participant"
                  :class="{
                    you: context.isMyRanking({
                      address: row.participantAddress,
                    }),
                  }"
                  :to="context.generateProfileUrl({
                    address: row.participantAddress,
                  })"
                >
                  <span>{{ value }}</span>
                  <span class="note"> (You)</span>
                </NuxtLink>
              </template>

              <template #body-participantAddress="{ value }">
                <span class="unit-address participant">
                  <span>{{ value }}</span>

                  <LinkTooltipButton
                    tooltip-message="View on Mintscan"
                    :href="context.generateAddressUrl({
                      address: value,
                    })"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </span>
              </template>

              <template #body-participantEquity="{ value, row }">
                <span class="unit-column equity">
                  {{ value }}
                </span>
              </template>

              <template #body-participantStatus="{ value }">
                <span
                  class="unit-status participant"
                  :class="context.generateParticipantStatusClasses({
                    statusId: value.statusId,
                  })"
                >
                  {{
                    context.normalizeStatusName({
                      statusName: value.name,
                    })
                  }}
                </span>
              </template>

              <!-- ** Ongoing competition leaderboard ** -->
              <template #body-ongoingRank="{ value }">
                <span class="unit-rank ongoing">
                  <span class="indicator">#</span> {{ value }}
                </span>
              </template>

              <template #body-ongoingName="{ value, row }">
                <NuxtLink
                  class="unit-name ongoing"
                  :class="{
                    you: context.isMyRanking({
                      address: row.ongoingAddress,
                    }),
                  }"
                  :to="context.generateProfileUrl({
                    address: row.ongoingAddress,
                  })"
                >
                  <span>{{ value }}</span>
                  <span class="note"> (You)</span>
                </NuxtLink>
              </template>

              <template #body-ongoingAddress="{ value }">
                <span class="unit-address ongoing">
                  <span>
                    {{
                      context.shortenAddress({
                        address: value,
                      })
                    }}
                  </span>

                  <LinkTooltipButton
                    tooltip-message="View on Mintscan"
                    :href="context.generateAddressUrl({
                      address: value,
                    })"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </span>
              </template>

              <template #body-ongoingBaseline="{ value }">
                <span class="unit-baseline ongoing">
                  {{
                    context.normalizePerformanceBaseline({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template #body-ongoingRoi="{ value }">
                <span
                  class="unit-roi ongoing"
                  :class="{
                    positive: context.isPositiveRoi({
                      value,
                    }),
                    negative: context.isNegativeRoi({
                      value,
                    }),
                  }"
                >
                  {{
                    context.normalizeRoi({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template #body-ongoingPnl="{ value }">
                <span class="unit-pnl ongoing">
                  {{
                    context.normalizePnl({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <!-- ** Leaderboard final outcome ** -->
              <template #body-outcomeRank="{ value }">
                <span class="unit-rank outcome">
                  <span class="indicator">#</span> {{ value }}
                </span>
              </template>

              <template #body-outcomeName="{ value, row }">
                <NuxtLink
                  class="unit-name outcome"
                  :to="context.generateProfileUrl({
                    address: row.outcomeAddress,
                  })"
                >
                  {{ value }}
                </NuxtLink>
              </template>

              <template #body-outcomeAddress="{ value }">
                <span class="unit-address outcome">
                  <span>
                    {{
                      context.shortenAddress({
                        address: value,
                      })
                    }}
                  </span>

                  <LinkTooltipButton
                    tooltip-message="View on Mintscan"
                    :href="context.generateAddressUrl({
                      address: value,
                    })"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </span>
              </template>

              <template #body-outcomeBaseline="{ value }">
                <span class="unit-baseline outcome">
                  {{
                    context.normalizePerformanceBaseline({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template #body-outcomeRoi="{ value }">
                <span
                  class="unit-roi outcome"
                  :class="{
                    positive: context.isPositiveRoi({
                      value,
                    }),
                    negative: context.isNegativeRoi({
                      value,
                    }),
                  }"
                >
                  {{
                    context.normalizeRoi({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template #body-outcomePnl="{ value }">
                <span class="unit-pnl outcome">
                  {{
                    context.normalizePnl({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template #body-outcomePrize="{ value }">
                <span class="unit-prize outcome">
                  ${{ value }}
                </span>
              </template>
            </AppTable>

            <div class="footer">
              <div class="empty" />

              <AppPagination
                class="pagination"
                page-key="pnlLeaderboardPage"
                :pagination="context.leaderboardPaginationResult"
              />

              <AppButton
                variant="neutral"
                class="button download-result"
                :class="{
                  hidden: !context.outcomeCsvUrl,
                }"
                @click="context.downloadOutcomeCsv()"
              >
                <template #startIcon>
                  <Icon
                    name="heroicons:arrow-down-tray"
                    size="1rem"
                  />
                </template>
                <template #default>
                  Download full result
                </template>
              </AppButton>
            </div>
          </div>

          <div class="unit-leaderboard volume">
            <AppTable
              class="table"
              :header-entries="context.metricLeaderboardTableHeaderEntries"
              :entries="context.metricLeaderboardTableEntries"
              :is-loading="context.isLoadingMetricLeaderboard"
              min-width="50rem"
            >
              <template
                #body-name="{
                  value,
                  row,
                }"
              >
                <NuxtLink
                  :to="context.generateProfileUrl({
                    address: row.address,
                  })"
                  class="unit-column metric name"
                >
                  {{ value }}
                </NuxtLink>
              </template>

              <template
                #body-address="{
                  value,
                }"
              >
                <span class="unit-column metric address">
                  <span>
                    {{
                      context.shortenAddress({
                        address: value,
                      })
                    }}
                  </span>
                  <LinkTooltipButton
                    tooltip-message="View on Mintscan"
                    :href="context.generateAddressUrl({
                      address: value,
                    })"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                </span>
              </template>

              <template
                #body-makerVolume="{
                  value,
                }"
              >
                <span class="unit-column metric makerVolume">
                  {{
                    context.formatCurrency({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template
                #body-takerVolume="{
                  value,
                }"
              >
                <span class="unit-column metric takerVolume">
                  {{
                    context.formatCurrency({
                      figure: value,
                    })
                  }}
                </span>
              </template>

              <template
                #body-totalVolume="{
                  value,
                }"
              >
                <span class="unit-column metric totalVolume">
                  {{
                    context.formatCurrency({
                      figure: value,
                    })
                  }}
                </span>
              </template>
            </AppTable>

            <AppPagination
              page-key="volumeLeaderboardPage"
              :pagination="context.metricLeaderboardPaginationResult"
            />
          </div>
        </template>
      </AppTabLayout>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  margin-block-start: 0;
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  padding-block: 4rem 2.5rem;

  background-image:
    url('~/assets/img/backgrounds/league-leaderboard.png'),
    url('~/assets/img/backgrounds/stars.png');
  background-repeat:
    no-repeat,
    no-repeat;
  background-position:
    110%,
    top;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }

  @media (48rem < width) {
    padding-block: 5rem 3.5rem;
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

.unit-section > .inner > .heading {
  display: inline-block;

  margin-block-end: 2rem;

  font-family: var(--font-family-heading);
  font-size: var(--font-size-headline);
  font-weight: 700;
  line-height: var(--size-line-height-headline);

  text-align: center;
}

.unit-section > .inner > .heading.outcome {
  margin-block-end: 4rem;
}

.unit-section > .inner > .heading.hidden {
  display: none;
}

.unit-leaderboard > .note {
  align-self: end;
  text-align: end;

  font-size: var(--font-size-small);
  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-leaderboard > .note.hidden {
  display: none;
}

.unit-leaderboard > .table {
  margin-block-start: 1rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-leaderboard > .footer {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.75rem;
  column-gap: 1rem;

  @media (48rem < width) {
    grid-template-columns: 1fr auto 1fr;
  }
}

.unit-leaderboard > .footer > .empty {
  display: none;

  @media (48rem < width) {
    display: block;
  }
}

.unit-leaderboard > .footer > .button.download-result {
  justify-self: center;

  @media (48rem < width) {
    justify-self: end;
  }
}

.unit-leaderboard > .footer > .button.download-result.hidden {
  display: none;
}

/***************** Top 3 rankers ****************/
.unit-leaderboard > .champions {
  margin-block-end: 3rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (48rem < width) {
    margin-block-end: 5rem;

    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
}

.unit-leaderboard > .champions.hidden {
  display: none;
}

.unit-leaderboard > .champions > .champion {
  display: flex;
  flex-direction: column;

  @media (48rem < width) {
    width: 17.25rem;
  }
}

.unit-leaderboard > .champions > .champion:first-of-type {
  @media (48rem < width) {
    order: 1;

    margin-inline: -4rem;
  }

  @media (60rem < width) {
    margin-inline: 0;
  }
}

.unit-leaderboard > .champions > .champion:nth-of-type(2) {
  @media (48rem < width) {
    margin-block-start: 15rem;

    order: 2;
  }

  @media (60rem < width) {
    margin-block-start: 3.5rem;
  }
}

.unit-leaderboard > .champions > .champion > .card {
  z-index: calc(var(--value-z-index-layer-content) + 0);
}

.unit-leaderboard > .champions > .champion:last-of-type {
  @media (48rem < width) {
    margin-block-start: 15.5rem;

    order: 0;
  }

  @media (60rem < width) {
    margin-block-start: 4.5rem;
  }
}

.unit-leaderboard > .champions > .champion > .tail {
  display: none;

  flex: 1;

  min-height: 6.5rem;

  @media (48rem < width) {
    display: block;
  }
}

.unit-leaderboard > .champions > .champion:first-of-type > .tail {
  clip-path: polygon(
    0.18% 0%,
    100% 0%,
    68.5% 100%,
    31.5% 100%
  );
  background-image: linear-gradient(to bottom, #1F1F30E5, #101018);
}

.unit-leaderboard > .champions > .champion:nth-of-type(2) > .tail {
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

.unit-leaderboard > .champions > .champion:last-of-type > .tail {
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

.unit-leaderboard > .table {
  margin-block-end: 1.25rem;
}

/***************** Non-podium rankers ****************/
.unit-rank:where(.ongoing, .outcome) {
  white-space: nowrap;

  color: var(--color-text-primary);
}

.unit-rank:where(.ongoing, .outcome) > .indicator {
  color: var(--color-text-secondary);
}

.unit-name:where(.participant, .ongoing, .outcome) {
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-name:where(.participant, .ongoing, .outcome)[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-name:where(.participant, .ongoing, .outcome) > .note {
  color: var(--color-text-tertiary);
}

.unit-name:where(.participant, .ongoing, .outcome):not(.you) > .note {
  display: none;
}

.unit-address:where(.participant, .ongoing, .outcome) {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-baseline:where(.ongoing, .outcome) {
  font-size: var(--font-size-base);
  font-weight: 500;
  line-height: var(--size-line-height-base);

  color: var(--color-text-secondary);
}

.unit-status.participant {
  text-transform: capitalize;
  color: var(--color-text-primary);
}

.unit-status.participant.active {
  color: var(--color-text-participant-status-active);
}

.unit-status.participant.completed {
  color: var(--color-text-participant-status-completed);
}

.unit-status.participant.disqualified {
  color: var(--color-text-participant-status-disqualified);
}

.unit-status.participant.canceled {
  color: var(--color-text-participant-status-canceled);
}

.unit-roi {
  --color-text-roi-positive: var(--palette-green);
  --color-text-roi-negative: var(--palette-red);
}

.unit-roi.positive {
  color: var(--color-text-roi-positive);
}

.unit-roi.negative {
  color: var(--color-text-roi-negative);
}

/***************** Trading volume leaderboard ****************/
.unit-column.metric.name {
  color: inherit;
}

.unit-column.metric.name:hover {
  text-decoration: underline;
}

.unit-column.metric.address {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
}
</style>

<style>
@layer {
  .furo-layout.tab.leaderboard {
    --color-background-tab: var(--palette-layer-0);
    --color-background-tab-active: var(--palette-layer-4);

    --color-text-tab: var(--color-text-placeholder);
    --color-text-tab-active: var(--color-text-primary);

    --size-tab-min-width: 10rem;
  }

  .furo-layout.tab.leaderboard > .tabs {
    gap: 0;

    border: none;
    border-radius: 0.5rem;

    margin-block-end: 4rem;
    margin-inline: auto;

    inline-size: fit-content;

    padding-block: 0.2rem;
    padding-inline: 0.2rem;

    background-color: var(--color-background-tab);
  }

  .furo-layout.tab.leaderboard > .tabs > .tab {
    border: none;
    border-radius: 0.375rem;

    min-width: var(--size-tab-min-width);

    padding-block: 0.5rem;
    padding-inline: 1rem;

    line-height: 1.3;

    color: var(--color-text-tab);

    transition: color 250ms var(--transition-timing-base),
      background-color 150ms var(--transition-timing-base);
  }

  .furo-layout.tab.leaderboard > .tabs > .tab:hover {
    color: var(--color-text-tab-active);
  }

  .furo-layout.tab.leaderboard > .tabs > .tab.active {
    background-color: var(--color-background-tab-active);
    color: var(--color-text-tab-active);

    pointer-events: none;
  }
}
</style>
