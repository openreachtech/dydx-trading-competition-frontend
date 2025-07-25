<script>
import {
  defineComponent,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import {
  Icon,
  NuxtLink,
} from '#components'

import AppBadge from '~/components/units/AppBadge.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'

import useWalletStore from '~/stores/wallet'

import SectionProfileOverviewContext from '~/app/vue/contexts/profile/SectionProfileOverviewContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppBadge,
    CopyButton,
    LinkTooltipButton,
  },

  props: {
    addressName: {
      type: String,
      required: true,
    },
    competition: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/profile/SectionProfileOverviewContext.js').Competition>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
    competitionParticipantStatusId: {
      /** @type {import('vue').PropType<number | null>} */
      type: [
        Number,
        null,
      ],
      required: true,
    },
    ranking: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/profile/SectionProfileOverviewContext.js').Ranking>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
  },

  emits: Object.values(SectionProfileOverviewContext.EMIT_EVENT_NAME),

  setup (
    props,
    componentContext
  ) {
    const route = useRoute()
    const walletStore = useWalletStore()

    const args = {
      props,
      componentContext,
      route,
      walletStore,
    }
    const context = SectionProfileOverviewContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <div
      class="inner"
      :class="{
        participating: context.isParticipatingInArena(),
      }"
    >
      <div
        class="unit-basic"
        :class="context.generateBasicDetailsClasses()"
      >
        <span class="label">
          My Profile
        </span>

        <span class="heading">
          <Icon
            name="heroicons:user"
            class="icon"
            size="2.25rem"
          />

          <span>{{ context.addressName }}</span>

          <button
            class="button"
            @click="context.showProfileRenameDialog()"
          >
            <Icon
              name="heroicons:pencil"
              size="1.5rem"
            />
          </button>
        </span>

        <div class="address">
          <span class="content">
            <span class="first-half">
              {{ context.generateAddressFirstHalf() }}
            </span><span>{{ context.generateAddressLastFive() }}</span>
          </span>

          <div class="actions">
            <CopyButton
              :content-to-copy="context.profileAddress"
              icon-size="1.25rem"
            />

            <LinkTooltipButton
              :href="context.generateProfileAddressUrl()"
              aria-label="Go to address on Mintscan"
              target="_blank"
              rel="noopener noreferrer"
              icon-size="1.25rem"
              tooltip-message="View on Mintscan"
            />
          </div>
        </div>
      </div>

      <div
        class="meta"
        :class="{
          hidden: !context.isParticipatingInArena(),
        }"
      >
        <dl class="unit-description">
          <div class="entry">
            <dt class="term">
              Arena Participating
            </dt>

            <dd class="description participation">
              <img
                class="image"
                :src="context.imageUrl"
                :alt="context.generateCompetitionTitle()"
              >

              <span class="title">
                <NuxtLink
                  :to="context.generateCompetitionUrl()"
                  class="link"
                >
                  {{ context.generateCompetitionTitle() }}
                </NuxtLink>
                <AppBadge
                  severity="neutral"
                  class="status"
                  :class="{
                    registered: context.isParticipantRegistered(),
                    active: context.isParticipantActive(),
                    'awaiting-deposit': context.isParticipantAwaitingDeposit(),
                  }"
                >
                  <Icon
                    :name="context.generateParticipantStatusBadgeIcon()"
                    size="0.875rem"
                  />
                  <span>
                    {{ context.generateParticipantStatusBadgeText() }}
                  </span>
                </AppBadge>
              </span>
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Performance Baseline
            </dt>

            <dd class="description baseline">
              {{ context.generatePerformanceBaseline() }}
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              PnL & ROI
            </dt>

            <dd
              class="description profit"
              :class="context.generatePnlClasses()"
            >
              {{ context.generatePnlRoi() }}
            </dd>
          </div>

          <div class="entry">
            <dt class="term">
              Ranking
            </dt>

            <dd class="description ranking">
              <Icon
                name="heroicons:trophy"
                size="1.25rem"
                class="icon"
              />

              <span>{{ context.generateCurrentRank() }}</span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  background-image: linear-gradient(
    180deg,
    rgba(24, 24, 37, 0.00) 0%,
    #181825 46.63%,
    rgba(24, 24, 37, 0.00) 100%
  );
}

.unit-section > .inner {
  margin-inline: auto;

  padding-block: 2rem 3.5rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  max-width: var(--size-body-max-width);

  background-image: url('~/assets/img/backgrounds/rectangles.svg');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }

  @media (48rem < width) {
    padding-block: 2rem 5rem;

    flex-direction: row;
    justify-content: space-between;
    gap: 1.5rem;
  }

  @media (60rem < width) {
    padding-block: 6.5rem 5rem;
  }
}

.unit-section > .inner:not(.participating) {
  padding-block-end: 8rem;
}

.unit-section > .inner > .meta.hidden {
  display: none;
}

.unit-basic {
  margin-block-start: 1rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.25rem;

  min-width: 0;
}

.unit-basic > .label {
  display: none;

  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  color: var(--color-text-tertiary);
}

.unit-basic.own-profile > .label {
  display: inline;
}

.unit-basic > .heading {
  display: inline-flex;
  align-items: center;
  gap: 1rem;

  font-size: var(--font-size-extra);
  font-weight: 700;
  line-height: var(--size-line-height-extra);
}

.unit-basic > .heading > .icon {
  color: var(--color-text-tertiary);
}

.unit-basic > .heading > .button {
  border-radius: 100vh;

  padding-block: 0.25rem;
  padding-inline: 0.25rem;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  color: var(--palette-purple);

  transition: color 250ms var(--transition-timing-base);
}

.unit-basic > .heading > .button:hover {
  color: var(--palette-purple-lighter);
}

.unit-basic:not(.own-profile) > .heading > .button {
  display: none;
}

.unit-basic > .address {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-default);

  padding-block: 0.375rem;
  padding-inline: 1rem;

  display: flex;
  gap: 1.5rem;

  /** This is necessary for the text to shrink properly */
  width: 100%;

  font-size: var(--font-size-medium);
  font-weight: 500;

  color: var(--color-text-tertiary);
  background-color: var(--color-background-competition-meta);
}

.unit-basic > .address > .content {
  flex: 1;

  display: flex;

  overflow: hidden;
}

.unit-basic > .address > .content > .first-half {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.unit-basic > .address > .actions {
  display: flex;
  gap: 0.75rem;
}

.unit-description {
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-card);
  border-radius: 0.875rem;

  padding-block: 1.25rem 1.5rem;
  padding-inline: 1.75rem;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  background-color: var(--color-background-competition-meta);

  width: 100%;

  @media (48rem < width) {
    width: 22rem;
  }
}

.unit-description > .entry {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-description > .entry > .term {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-tertiary);
}

.unit-description > .entry > .description.participation {
  display: flex;
  align-items: start;
  gap: 0.75rem;
}

.unit-description > .entry > .description.participation > .title {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.3rem;
}

.unit-description > .entry > .description.participation > .title > .link {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-secondary);
  transition: color 250ms var(--transition-timing-base);
}

.unit-description > .entry > .description.participation > .title > .link[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-description > .entry > .description.participation > .title > .status {
  --color-text-badge: var(--color-text-secondary);

  border-radius: 0.25rem;

  padding-block: var(--size-thinnest);
  padding-inline: 0.375rem 0.5rem;

  gap: 0.375rem;

  color: var(--color-text-badge);
}

.unit-description > .entry > .description.participation > .title > .status.awaiting-deposit {
  --color-text-badge: var(--palette-yellow);
}

.unit-description > .entry > .description.participation > .image {
  border-radius: 0.625rem;

  width: 3.5rem;
  height: 3.5rem;

  background-color: var(--color-background-card);
}

.unit-description > .entry > .description.participation > .image[src='/img/badges/league-badge-placeholder.png'] {
  padding-block: 0.375rem;
  padding-inline: 0.375rem;

  object-fit: scale-down;
}

.unit-description > .entry > .description:where(.baseline, .profit) {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-primary);
}

.unit-description > .entry > .description.profit.increased {
  color: var(--color-text-increased);
}

.unit-description > .entry > .description.profit.decreased {
  color: var(--color-text-decreased);
}

.unit-description > .entry > .description.ranking {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);

  color: var(--color-text-primary);
}

.unit-description > .entry > .description.ranking > .icon {
  color: var(--color-text-tertiary);
}
</style>
