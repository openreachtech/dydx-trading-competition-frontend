<script>
import {
  defineComponent,
  reactive,
  ref,
  shallowRef,
} from 'vue'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppBadge from '~/components/units/AppBadge.vue'
import AppButton from '~/components/units/AppButton.vue'
import AppMarkdownViewer from '~/components/units/AppMarkdownViewer.vue'
import AppSelect from '~/components/units/AppSelect.vue'
import CompetitionStatusBadge from '~/components/molecules/CompetitionStatusBadge.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'
import OnboardingDialogs from '~/components/dialogs/OnboardingDialogs.vue'
import RelativeRegistrationPeriodCaption from '~/components/molecules/RelativeRegistrationPeriodCaption.vue'

import useWalletStore from '~/stores/wallet'

import SectionLeagueContext from '~/app/vue/contexts/competition/SectionLeagueContext'

/**
 * @typedef {import('vue').PropType<
 *   import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity
 * >} CompetitionPropType
 */

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppBadge,
    AppButton,
    AppMarkdownViewer,
    AppSelect,
    CompetitionStatusBadge,
    CopyButton,
    LinkTooltipButton,
    OnboardingDialogs,
    RelativeRegistrationPeriodCaption,
  },

  props: {
    competition: {
      /** @type {CompetitionPropType} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
    participantStatusId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    competitionId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    competitionStatusId: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    enrolledParticipantsNumber: {
      type: [
        Number,
        null,
      ],
      required: true,
    },
    currentTradingVolumeUsd: {
      type: [
        String,
        null,
      ],
      required: true,
    },
    dynamicPrizeRules: {
      /** @type {import('vue').PropType<Array<schema.graphql.CompetitionDynamicPrizeRuleSummary>>} */
      type: Array,
      required: true,
    },
    isHostOfCompetition: {
      type: Boolean,
      required: true,
    },
    isCompetitionFull: {
      type: Boolean,
      required: true,
    },
  },

  emits: [
    'showTermsDialog',
    'showCancelationDialog',
  ],

  setup (
    props,
    componentContext
  ) {
    const walletStore = useWalletStore()

    /** @type {import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>} */
    const onboardingDialogsComponentRef = ref(null)
    /** @type {import('vue').ShallowRef<HTMLDivElement | null>} */
    const descriptionElementShallowRef = shallowRef(null)

    const statusReactive = reactive({
      isDescriptionExpandable: false,
      isDescriptionExpanded: false,
    })

    const args = {
      props,
      componentContext,
      walletStore,
      onboardingDialogsComponentRef,
      descriptionElementShallowRef,
      statusReactive,
    }
    const context = SectionLeagueContext.create(args)
      .setupComponent()

    return {
      onboardingDialogsComponentRef,
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <OnboardingDialogs ref="onboardingDialogsComponentRef" />

    <div class="inner">
      <div
        class="unit-details"
        :class="context.generateLeagueDetailClasses()"
      >
        <NuxtLink
          to="/competitions"
          class="link back"
        >
          <Icon
            name="heroicons:chevron-left"
            size="1.5rem"
            class="icon"
          />
          <span>Arenas List</span>
        </NuxtLink>

        <h2 class="heading">
          {{ context.normalizeTitle() }}
        </h2>

        <div class="actions">
          <AppButton
            class="button enroll"
            :disabled="context.shouldDisableEnrollButton()"
            appearance="filled"
            :variant="context.generateEnrollButtonVariant()"
            @click="context.processPrimaryAction()"
          >
            <template #startIcon>
              <Icon
                :name="context.generateEnrollButtonIconName()"
                size="1.25rem"
                class="icon"
              />
            </template>

            <template #default>
              <span class="content">
                {{ context.generateEnrollButtonLabel() }}
              </span>
            </template>
          </AppButton>

          <AppSelect
            position="right"
            class="select"
            dropdown-class="teleported-competition-enroll-options"
            :items="context.generateEnrollSelectOptions()"
            @update:model-value="context.selectEnrollOption({
              optionValue: $event,
            })"
          >
            <template #default>
              <AppButton
                type="button"
                class="slot default"
                variant="muted"
                aria-label="View more enroll actions"
              >
                <Icon
                  name="heroicons:ellipsis-vertical"
                  size="1.75rem"
                />
              </AppButton>
            </template>
          </AppSelect>
        </div>

        <RelativeRegistrationPeriodCaption
          class="note"
          :class="{
            hidden: context.shouldHideRegistrationCaption(),
          }"
          :schedules="context.schedules"
        />

        <div class="unit-status">
          <CompetitionStatusBadge :status-id="context.competitionStatusId" />

          <AppBadge
            severity="neutral"
            class="badge host"
            :class="context.generateHostBadgeClasses()"
          >
            <Icon
              name="ph:crown-simple"
              size="1.25rem"
            />
          </AppBadge>

          <div class="timeline">
            <span class="period">
              <Icon
                name="heroicons:rocket-launch-solid"
                size="1.25rem"
              />
              <span class="timestamp">
                {{ context.normalizeStartDate() }}
              </span>
            </span>

            <span class="period">
              <span class="connector" />

              <Icon
                name="heroicons:flag-solid"
                size="1.25rem"
              />
              <span class="timestamp">
                {{ context.normalizeEndDate() }}
              </span>
            </span>
          </div>
        </div>

        <div
          class="description"
          :class="{
            expanded: context.isDescriptionExpanded,
          }"
        >
          <div
            :ref="context.descriptionElementShallowRef"
            class="content"
          >
            <AppMarkdownViewer
              :content="context.normalizeDescription()"
              :class="[
                $style.markdown,
                $style['arena-description'],
              ]"
            />
          </div>
        </div>

        <AppButton
          class="button expand"
          @click="context.toggleDescriptionExpansion()"
        >
          <template #startIcon>
            <Icon
              name="heroicons:chevron-up-down"
              size="1.5rem"
            />
          </template>

          <template #default>
            {{ context.generateDescriptionExpansionButtonLabel() }}
          </template>
        </AppButton>

        <div class="meta">
          <span class="balance">
            <Icon
              name="heroicons:wallet"
              class="icon"
              size="1.125rem"
            />

            <span>{{ context.normalizeMinimumDeposit() }}</span>
            <span class="note">(entry balance)</span>
          </span>

          <span class="trading-volume">
            <Icon
              class="icon"
              name="heroicons:chart-bar-square"
              size="1.125rem"
            />
            <span>{{ context.formatMinimumTradingVolume() }}</span>
            <span class="note">(minimum trading volume)</span>
          </span>

          <span class="unit-participants">
            <Icon
              name="heroicons:users"
              size="1.125rem"
            />
            <span class="amount">
              {{ context.normalizeEnrolledParticipantsNumber() }}
            </span>
            <span>already enrolled</span>
          </span>
        </div>
      </div>

      <div class="unit-meta">
        <div class="actions">
          <img
            :src="context.generateImageUrl()"
            :alt="context.generateHostName()"
            class="image"
          >

          <div class="buttons">
            <NuxtLink
              :to="context.generateCompetitionEditUrl()"
              class="link edit"
              :class="context.generateCompetitionEditButtonClasses()"
            >
              <Icon
                name="heroicons:pencil-square"
                size="1.25rem"
              />
            </NuxtLink>

            <!-- TODO: Implement share feature. -->
            <!-- <button class="button">
              <Icon name="heroicons:share"
                size="1.25rem"
              />
            </button> -->

            <CopyButton
              :content-to-copy="context.generateCompetitionUrl()"
              icon-name="heroicons:link"
              icon-size="1.25rem"
            />
          </div>
        </div>

        <dl class="unit-statistics">
          <div class="entry">
            <dt class="term">
              Arena Captain
            </dt>

            <dd class="details host">
              <span class="user">
                <Icon
                  name="heroicons:user-circle"
                  size="1.25rem"
                  class="icon"
                />

                <NuxtLink
                  class="name"
                  :to="context.generateProfileUrl()"
                >
                  {{ context.generateHostName() }}
                </NuxtLink>
              </span>

              <span class="wallet">
                <span class="connector" />

                <span class="address">
                  {{ context.generateHostAddress() }}
                </span>

                <CopyButton :content-to-copy="context.hostAddress" />

                <LinkTooltipButton
                  :href="context.generateHostAddressUrl()"
                  target="_blank"
                  rel="noopener noreferrer"
                  tooltip-message="View on Mintscan"
                />
              </span>
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Participation
            </dt>

            <dd class="details participant">
              <Icon
                name="heroicons:user"
                size="1.25rem"
                class="icon"
              />

              <span class="enrolled">
                {{ context.normalizeEnrolledParticipantsNumber() }}
              </span><span class="limit upper">
                / {{ context.normalizeParticipantUpperLimit() }}
              </span>
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Total Prize
            </dt>
            <dd class="details prize">
              <span class="amount">
                <img
                  src="~/assets/img/tokens/usdc.svg"
                  alt="usdc"
                  class="image"
                >

                <span class="figure">
                  {{ context.normalizeCurrency({ value: context.totalPrize }) }}
                </span>
              </span>

              <span class="note">
                (Reward in USDC)
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div class="unit-dynamic-prize">
        <div class="total">
          <div
            class="icon-container"
            aria-hidden="true"
          >
            <img
              src="~/assets/img/tokens/usdc-prize.png"
              class="icon usdc"
            >
            <div class="blur" />
          </div>

          <div class="entry prize">
            <span class="number">
              {{ context.formatTotalPrize() }}
            </span>
            <div class="label">
              <Icon
                name="heroicons:trophy-solid"
                class="icon"
              />
              <span class="text">Max Prize (USDC)</span>
            </div>
          </div>

          <div
            class="separator"
            aria-hidden="true"
          />

          <div class="entry volume">
            <span class="number">
              {{ context.formatCurrentTradingVolumeUsd() }}
            </span>
            <div class="label">
              <Icon
                name="heroicons:chart-bar-solid"
                class="icon"
              />
              <span class="text">Current Total Trading Vol. (USD)</span>
            </div>
          </div>

          <span class="note">
            <span>The higher the Volume</span>
            <span>The greater the Prize</span>
          </span>
        </div>

        <div
          class="prize-rules"
          :class="{
            hidden: context.hasNoDynamicPrizeRules(),
          }"
        >
          <div class="milestones-scroller">
            <div class="unit-milestones">
              <div class="progress-bar">
                <div
                  class="filled"
                  :style="{
                    '--value-progress': context.calculateTradingVolumeProgress(),
                  }"
                />
              </div>

              <div class="unit-milestone label">
                <div class="milestone">
                  <Icon
                    name="heroicons:chart-bar-solid"
                    size="1rem"
                    class="icon"
                  />
                  <span>Total Trading Vol.</span>
                </div>

                <div
                  class="total-prize"
                  aria-hidden="true"
                />

                <div
                  class="connector"
                  aria-hidden="true"
                />

                <ul class="prizes">
                  <li
                    v-for="(category, index) of context.generateAvailablePrizeCategories()"
                    :key="index"
                    class="prize"
                  >
                    <Icon
                      :name="category.iconName"
                      size="1rem"
                      class="icon"
                    />
                    <span>{{ category.label }}</span>
                  </li>
                </ul>
              </div>

              <div class="entries">
                <div
                  v-for="(it, index) of context.createDynamicPrizeItemContexts()"
                  :key="index"
                  class="unit-milestone"
                  :class="{
                    done: it.hasReachedMilestone(),
                  }"
                  :style="{
                    '--value-horizontal-position': it.calculateHorizontalPosition(),
                  }"
                >
                  <span class="milestone">
                    {{
                      context.abbreviateNumber({
                        value: it.tradingVolumeMilestone,
                      })
                    }}
                  </span>

                  <div class="total-prize">
                    <Icon
                      name="heroicons:trophy-solid"
                      class="icon"
                    />
                    <span>
                      {{
                        context.abbreviateNumber({
                          value: it.calculateTotalPrize(),
                        })
                      }}
                    </span>
                  </div>

                  <div
                    class="connector"
                    aria-hidden="true"
                  />

                  <ul class="prizes">
                    <li
                      v-for="(category, categoryIndex) of context.generateAvailablePrizeCategories()"
                      :key="categoryIndex"
                    >
                      {{
                        context.formatNumber({
                          value: it.extractPrizeAmount({
                            categoryId: category.id,
                          }),
                        })
                      }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.teleported-competition-enroll-options.unit-contents {
  --color-text-action-destructive: var(--palette-red);

  padding-block: 0.5rem;
}

.teleported-competition-enroll-options.unit-contents > .option.unregister {
  color: var(--color-text-action-destructive);
}

.teleported-competition-enroll-options.unit-contents > .option.unregister.disabled {
  filter: brightness(0.4);
}
</style>

<style scoped>
.unit-section {
  --color-border-enroll-dropdown: var(--palette-layer-7);
  --color-border-button-awaiting-deposit: var(--palette-purple);
  --color-text-button-awaiting-deposit: var(--palette-purple-lighter);

  --size-total-prize-entry: 2.5rem;
  --size-trading-volume-progress-width: 30rem;
  --size-meta-panel: 22rem;

  --color-border-total-prize: var(--palette-layer-1);
  --color-background-total-prize: var(--palette-purple);
  --color-background-trading-volume-progress: var(--palette-layer-3);

  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  padding-block: 4.5rem 9.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  background-image: url('~/assets/img/backgrounds/horizon-grid.svg'),
    linear-gradient(
      180deg,
      rgba(24, 24, 37, 0.00) 0%,
      #181825 46.63%,
      rgba(24, 24, 37, 0.00) 100%
    );
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));

    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-section .inner {
  margin-inline: auto;

  display: grid;
  grid-template-columns: 1fr;
  column-gap: clamp(0.5rem, 4vw, 5rem);
  row-gap: 2rem;

  max-width: var(--size-body-max-width);

  @media (48rem < width) {
    grid-template-columns: auto var(--size-meta-panel);
    row-gap: 3.5rem;
  }
}

.unit-details > .link.back {
  margin-block-end: 1.5rem;

  align-items: center;
  gap: 0.75rem;

  display: inline-flex;

  font-size: var(--font-size-medium);
  font-weight: 500;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base),
    gap 250ms var(--transition-timing-base);
}

.unit-details > .link.back[href]:hover {
  gap: 0.5rem;

  color: var(--color-text-primary);
}

.unit-details > .link.back > .icon {
  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-details > .link.back[href]:hover > .icon {
  color: var(--color-text-primary);
}

.unit-details > .heading {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-headline);
  font-weight: 700;
  line-height: var(--size-line-height-headline);
}

.unit-status {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.125rem;

  margin-block-start: 1.5rem;
}

.unit-status > .badge.host {
  padding-block: 0.125rem;
  padding-inline: 0.5rem;

  align-self: stretch;
}

.unit-status > .badge.host.hidden {
  display: none;
}

.unit-status > .timeline {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;

  color: var(--color-text-tertiary);
}

.unit-status > .timeline > .period {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-status > .timeline > .period > .timestamp {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-status > .timeline > .period > .connector {
  margin-inline-end: 0.25rem;

  border-radius: var(--size-radius-rounded);

  width: 0.75rem;
  height: 0.1rem;

  background-color: var(--color-background-connector);
}

.unit-details > .description {
  display: grid;

  margin-block-start: 1.5rem;

  font-size: var(--font-size-medium);

  color: var(--color-text-tertiary);
}

.unit-details > .description > * {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.unit-details > .description > .content {
  --size-description-collapsed-max-height: 12rem;

  max-block-size: var(--size-description-collapsed-max-height);
  overflow: hidden;
}

.unit-details > .description.expanded > .content {
  max-block-size: 100%;
}

.unit-details > .button.expand {
  --color-text-hover: var(--palette-purple-lighter);

  display: block;

  border: none;

  padding-block: 0.5rem;
  padding-inline: 0;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: inherit;
  background-color: transparent;

  transition: color 250ms var(--transition-timing-base);
}

.unit-details > .button.expand:not(:disabled):hover {
  color: var(--color-text-hover);
  background-color: transparent;
}

.unit-details:not(.expandable-description) > .button.expand {
  display: none;
}

.unit-details > .meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  margin-block-start: 0.75rem;
}

.unit-details > .meta > :where(.balance, .trading-volume) {
  display: inline-flex;
  align-items: center;

  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-tertiary)
}

.unit-details > .meta > :where(.balance, .trading-volume) > .icon {
  margin-inline-end: 0.5rem;
}

.unit-details > .meta > :where(.balance, .trading-volume) > .note {
  margin-inline-start: 0.25rem;

  font-weight: 400;
}

.unit-details > .actions {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
}

.unit-details > .actions > .button.enroll {
  min-width: 15rem;

  justify-content: center;

  font-size: var(--font-size-medium);
  font-weight: 500;
}

.unit-details > .actions > .button.enroll.outlined {
  border-color: var(--color-border-button-awaiting-deposit);

  color: var(--color-text-button-awaiting-deposit);
}

.unit-details > .actions > .button.enroll.neutral:disabled,
.unit-details > .actions > .button.enroll.muted:disabled {
  filter: none;
}

.unit-details > .actions > .select .slot.default {
  border-color: var(--color-border-enroll-dropdown);

  padding-block: 0.625rem;
  padding-inline: 0.625rem;
}

.unit-participants {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;

  color: var(--color-text-tertiary);
}

.unit-participants > .amount {
  margin-inline-start: 0.125rem;

  font-weight: 700;

  color: var(--color-text-secondary);
}

.unit-details > .note {
  margin-block-start: 0.75rem;
}

.unit-details > .note.hidden {
  display: none;
}

.unit-dynamic-prize {
  --value-milestone-header-column: 8rem;
  --value-milestone-column-gap: 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  grid-column: 1 / -1;

  border-color: transparent;
  border-radius: 1rem;
  border-style: solid;
  border-width: 0.1rem 0.1rem 0;

  padding-block: 1.25rem 1.5rem;
  padding-inline: 1.5rem;

  background:
    linear-gradient(180deg, #0d0d13, var(--palette-layer-2)) no-repeat padding-box,
    linear-gradient(180deg, var(--palette-purple), transparent) no-repeat border-box;

  box-shadow: 0 -0.25rem 1.25rem 0 #6966ff33;

  @media (width < 48rem) {
    grid-row: 2 / 3;
  }
}

.unit-dynamic-prize > .total {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (48rem <= width) {
    flex-direction: row;
    align-items: center;
    gap: 2.5rem;
  }
}

.unit-dynamic-prize > .total > .icon-container {
  display: grid;
  grid-template-areas: 'stack';

  user-select: none;

  @media (width < 60rem) {
    display: none;
  }
}

.unit-dynamic-prize > .total > .icon-container > * {
  grid-area: stack;
}

.unit-dynamic-prize > .total > .icon-container > .icon.usdc {
  width: 3.5rem;
  height: 3.5rem;

  filter: drop-shadow(-0.05rem 0.05rem 0.1rem #00000040);
}

.unit-dynamic-prize > .total > .icon-container > .blur {
  --color-background-blur: var(--palette-purple);

  background-color: var(--color-background-blur);

  width: 80%;
  height: 80%;

  filter: blur(1.7rem);
}

.unit-dynamic-prize > .total > .entry {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.unit-dynamic-prize > .total > .entry > .number {
  font-size: var(--font-size-extra);
  font-weight: 700;

  line-height: var(--size-line-height-extra);
}

.unit-dynamic-prize > .total > .entry > .label {
  display: flex;
  align-items: center;
  gap: 0.25rem;

  font-size: var(--font-size-small);

  line-height: var(--size-line-height-small);

  color: var(--color-text-tertiary);
}

.unit-dynamic-prize > .total > .entry > .label > .icon {
  width: 0.875rem;
  height: 0.875rem;

  color: var(--color-text-placeholder);
}

.unit-dynamic-prize > .total > .separator {
  border-inline-end-color: var(--color-border-default);
  border-inline-end-width: var(--size-thinnest);
  border-inline-end-style: solid;

  height: 2.5rem;

  @media (width < 48rem) {
    display: none;
  }
}

.unit-dynamic-prize > .total > .note {
  display: inline-flex;
  flex-direction: column;

  flex: 1;

  font-size: var(--font-size-small);

  line-height: var(--size-line-height-small);

  text-align: end;

  color: var(--color-text-tertiary);

  @media (width < 60rem) {
    display: none;
  }
}

.unit-dynamic-prize > .prize-rules {
  display: grid;
  gap: 1rem;
}

.unit-dynamic-prize > .prize-rules.hidden {
  display: none;
}

.unit-dynamic-prize > .prize-rules > .milestones-scroller {
  overflow-x: auto;

  scrollbar-width: none;
}

.unit-dynamic-prize > .prize-rules > .milestones-scroller::-webkit-scrollbar {
  display: none;
}

.unit-milestones {
  display: grid;
  grid-template-columns: var(--value-milestone-header-column) 1fr;
  gap: var(--value-milestone-column-gap);

  position: relative;

  width: 100%;

  min-width: var(--size-trading-volume-progress-width);
}

.unit-milestones > .progress-bar {
  position: absolute;
  /* TODO: There must be better way to align progress-bar's position. */
  top: calc(
    (var(--size-total-prize-entry) / 2)
    + 0.25rem /* Layout's gap size */
    + var(--font-size-mini)
  );

  border-radius: var(--size-radius-rounded);

  width: 100%;
  height: 0.375rem;

  background-color: var(--color-background-trading-volume-progress);

  overflow: hidden;
}

.unit-milestones > .progress-bar > .filled {
  --value-taken-width: calc(var(--value-milestone-header-column) + var(--value-milestone-column-gap));
  --value-available-width: calc(100% - var(--value-taken-width));

  border-radius: inherit;

  width: calc(
    var(--value-taken-width)
    + (var(--value-available-width) * var(--value-progress) / 100)
  );
  height: 100%;

  background-image: linear-gradient(90deg, #637fec 0%, #9166ff 100%);
}

.unit-milestones > .entries {
  position: relative;
}

.unit-milestones > .entries > .unit-milestone {
  position: absolute;
  left: var(--value-horizontal-position);
  transform: translateX(-50%);
}

.unit-milestones > .entries > .unit-milestone:last-of-type {
  transform: translateX(-100%);
}

.unit-milestone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  text-align: center;

  z-index: calc(var(--value-z-index-layer-content) + 0);
}

.unit-milestone > .milestone {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  font-size: var(--font-size-mini);

  line-height: var(--size-line-height-mini);

  color: var(--color-text-tertiary);
}

.unit-milestone:not(.label) > .milestone {
  text-transform: uppercase;
}

.unit-milestone.done:not(:has(~ .unit-milestone.done)) > .milestone {
  color: var(--color-text-primary);
}

.unit-milestone > .total-prize {
  display: grid;
  grid-template-areas: 'stack';
  justify-content: center;
  justify-items: center;
  align-items: center;

  border-color: var(--color-border-total-prize);
  border-radius: var(--size-radius-rounded);
  border-style: solid;
  border-width: 0.125rem;

  width: var(--size-total-prize-entry);
  height: var(--size-total-prize-entry);

  font-size: var(--font-size-mini);
  font-weight: 500;

  line-height: var(--size-line-height-mini);

  text-transform: uppercase;

  color: var(--color-text-primary);
  background-color: color-mix(
    in srgb,
    var(--color-background-total-prize) 20%,
    #12121bcc
  );
}

.unit-milestone > .total-prize > * {
  grid-area: stack;
}

.unit-milestone > .total-prize > .icon {
  width: 1.25rem;
  height: 1.25rem;

  opacity: 0.16;
}

.unit-milestone.done > .total-prize {
  color: var(--color-text-primary);
  background-color: var(--color-background-total-prize);
}

.unit-milestone > .connector {
  border-radius: var(--size-radius-rounded);

  width: 0.125rem;
  height: 0.5rem;

  background-color: var(--color-text-placeholder);
}

.unit-milestone > .prizes {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  margin-block-start: 0.25rem;

  font-size: var(--font-size-mini);

  line-height: var(--size-line-height-mini);

  color: var(--color-text-tertiary);
}

.unit-milestone.done:not(:has(~ .unit-milestone.done)) > .prizes {
  color: var(--color-text-primary);
}

.unit-milestone.label {
  align-items: start;

  text-align: start;
}

.unit-milestone.label > .milestone > .icon {
  color: var(--color-text-placeholder);
}

.unit-milestone.label > .total-prize,
.unit-milestone.label > .connector {
  opacity: 0;
}

.unit-milestone.label > .prizes > .prize {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-milestone.label > .prizes > .prize > .icon {
  color: var(--color-text-placeholder);
}

.unit-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  min-width: 0;
  max-height: fit-content;
}

.unit-meta > .actions {
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);
  border-radius: 0.625rem;

  padding-inline: 0.5rem 0.75rem;
  padding-block: 0.25rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-background-competition-meta);
}

.unit-meta > .actions > .image {
  border-radius: 0.5rem;

  width: 2.25rem;
  height: 2.25rem;

  object-fit: cover;

  background-color: var(--color-background-card);
}

.unit-meta > .actions > .image[src='/img/badges/league-badge-placeholder.png'] {
  object-fit: scale-down;
}

.unit-meta > .actions > .buttons {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.unit-meta > .actions > .buttons > .button {
  padding: 0;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-tertiary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-meta > .actions > .buttons > .button:hover {
  color: var(--color-text-secondary);
}

.unit-meta > .actions > .buttons > .link.edit {
  display: inline-flex;
  justify-content: center;
  align-items: center;

  color: var(--color-text-button-highlight);

  transition: color 250ms var(--transition-timing-base);
}

.unit-meta > .actions > .buttons > .link.edit:hover {
  color: var(--color-text-button-highlight-hover);
}

.unit-meta > .actions > .buttons > .link.edit.hidden {
  display: none;
}

.unit-statistics {
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);
  border-radius: 0.625rem;

  padding-block: 1.25rem 1.5rem;
  padding-inline: 1.75rem;

  flex: 1;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  background-color: var(--color-background-competition-meta);
}

.unit-statistics > .entry {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-statistics > .entry > .term {
  font-size: var(--font-size-medium);
  font-weight: 700;

  color: var(--color-text-tertiary);
}

.unit-statistics > .entry > .details {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  color: var(--color-text-tertiary);
}

.unit-statistics > .entry > .details .icon {
  flex-shrink: 0;
}

.unit-statistics > .entry > .details.host {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.unit-statistics > .entry > .details.host > :where(.user, .wallet) {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-statistics > .entry > .details.host > .user > .name {
  font-size: var(--font-size-base);
  font-weight: 700;

  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  color: var(--color-text-primary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-statistics > .entry > .details.host > .user > .name[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-statistics > .entry > .details.host > .wallet > .connector {
  margin-inline: 0.5rem 0.25rem;

  border-radius: var(--size-radius-rounded);

  width: 0.1875rem;
  height: 0.1875rem;

  flex-shrink: 0;

  background-color: var(--color-background-connector);
}

.unit-statistics > .entry > .details.participant > .enrolled {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.participant > .limit.upper {
  font-size: var(--font-size-small);
  font-weight: 500;
 }

.unit-statistics > .entry > .details.prize {
  flex-direction: column;
  align-items: start;
}

.unit-statistics > .entry > .details.prize > .amount {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.unit-statistics > .entry > .details.prize > .amount > .image {
  width: 1.75rem;
  height: 1.75rem;
}

.unit-statistics > .entry > .details.prize > .amount > .figure {
  font-size: var(--font-size-extra);
  font-weight: 700;

  word-break: break-all;

  color: var(--color-text-primary);
}

.unit-statistics > .entry > .details.prize > .note {
  font-size: var(--font-size-base);
  font-weight: 500;
}
</style>

<style module>
.markdown.arena-description {
  font-size: var(--font-size-base);

  line-height: var(--size-line-height-base);
}

.markdown.arena-description * {
  font-size: inherit;
}

.markdown.arena-description h1,
.markdown.arena-description h2,
.markdown.arena-description h3,
.markdown.arena-description h4,
.markdown.arena-description h5,
.markdown.arena-description h6 {
  margin-block: 0;
}

.markdown.arena-description hr {
  margin-block: 0;
}
</style>
