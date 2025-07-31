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
import AppButton from '~/components/units/AppButton.vue'
import CopyButton from '~/components/buttons/CopyButton.vue'
import LinkTooltipButton from '~/components/buttons/LinkTooltipButton.vue'
import ProfileAvatar from '~/components/units/ProfileAvatar.vue'

import useWalletStore from '~/stores/wallet'

import SectionProfileOverviewContext from '~/app/vue/contexts/profile/SectionProfileOverviewContext'

export default defineComponent({
  components: {
    Icon,
    NuxtLink,
    AppBadge,
    AppButton,
    CopyButton,
    LinkTooltipButton,
    ProfileAvatar,
  },

  props: {
    addressProfile: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/profile/SectionProfileOverviewContext').PropsType['addressProfile']
       * >}
       */
      type: [
        Object,
        null,
      ],
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
    userInterfaceState: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/profile/SectionProfileOverviewContext').PropsType['userInterfaceState']>} */
      type: [
        Object,
        null,
      ],
      required: false,
      default: null,
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

        <div class="details">
          <ProfileAvatar
            :default-image-url="context.addressImageUrl"
            :is-uploading-image="context.isUploadingAvatar"
            @upload-image="context.emitUploadImage({
              file: $event.file,
            })"
          />

          <div class="profile">
            <div
              class="unit-profile name"
              :class="{
                'own-profile': context.isOwnProfile(),
              }"
            >
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
            </div>

            <div class="unit-profile address">
              <span class="content">
                <span class="first-half">
                  {{ context.generateAddressFirstHalf() }}
                </span><span>{{ context.generateAddressLastFive() }}</span>
              </span>

              <div class="actions">
                <CopyButton
                  :content-to-copy="context.address"
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
        </div>

        <div
          class="unit-oauth x"
          :class="{
            connected: context.hasConnectedXAccount(),
          }"
        >
          <AppButton
            variant="neutral"
            class="button connect"
            :is-loading="context.isGeneratingXaccountOauthUrl"
            @click="context.emitConnectXAccount()"
          >
            <img
              src="~/assets/img/logos/x-logo.svg"
              alt=""
              class="icon"
              aria-hidden="true"
            >
            <span>Connect X account</span>
          </AppButton>

          <div class="account">
            <div class="details">
              <img
                src="~/assets/img/logos/x-logo.svg"
                alt=""
                class="icon"
                aria-hidden="true"
              >
              <span class="username">
                {{ context.xAccountUserName }}
              </span>
            </div>
            <AppButton
              variant="neutral"
              class="button disconnect"
            >
              Disconnect
            </AppButton>
          </div>
        </div>
      </div>

      <div
        class="unit-current-arena"
        :class="{
          hidden: !context.isParticipatingInArena(),
        }"
      >
        <div class="header">
          <span class="heading">Participating</span>
        </div>

        <div class="statistics">
          <div class="participation">
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
          </div>

          <dl class="unit-descriptions arena">
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
                Performance Baseline
              </dt>

              <dd class="description baseline">
                {{ context.generatePerformanceBaseline() }}
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
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  --color-text-x-username: var(--palette-purple-lighter);

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

    gap: 3rem;
  }

  @media (60rem < width) {
    padding-block: 6.5rem 5rem;
  }
}

.unit-section > .inner:not(.participating) {
  padding-block-end: 8rem;
}

.unit-basic {
  margin-block-start: 1rem;

  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1.25rem;
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

.unit-basic > .details {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.unit-basic > .details > .profile {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.unit-oauth.x > .button.connect {
  padding-block: 0.38rem;
  padding-inline: 0.56rem 0.75rem;
}

.unit-oauth.x > .button.connect > .icon,
.unit-oauth.x > .account > .details > .icon {
  width: 1.5rem;
  height: 1.5rem;
}

.unit-oauth.x > .account {
  display: flex;
  gap: 0.5rem;

  border-radius: 0.5rem;

  padding-block: 0.25rem;
  padding-inline: 0.25rem;

  background-color: var(--color-background-button-muted);
}

.unit-oauth.x > .account > .details {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding-block: 0.25rem;
  padding-inline: 0.5rem;
}

.unit-oauth.x > .account > .details {
  font-weight: 500;

  color: var(--color-text-x-username);
}

.unit-oauth.x > .account > .button.disconnect {
  padding-block: 0.38rem;
  padding-inline: 0.56rem 0.75rem;
}

.unit-oauth.x.connected > .button.connect {
  display: none;
}

.unit-oauth.x:not(.connected) > .account {
  display: none;
}

/* User profile's name and edit button. */
.unit-profile.name {
  display: flex;
  align-items: center;
  gap: 1rem;

  font-size: var(--font-size-extra);
  font-weight: 700;
  line-height: var(--size-line-height-extra);
}

.unit-profile.name > .button {
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

.unit-profile.name > .button:hover {
  color: var(--palette-purple-lighter);
}

.unit-profile.name:not(.own-profile) > .button {
  display: none;
}

/* User profile's local wallet address. */
.unit-profile.address {
  border-radius: 0.5rem;
  border-width: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-default);

  padding-block: 0.375rem;
  padding-inline: 1rem;

  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1.5rem;

  font-size: var(--font-size-medium);
  font-weight: 500;

  color: var(--color-text-tertiary);
  background-color: var(--color-background-competition-meta);
}

.unit-profile.address > .content {
  flex: 1;

  display: flex;

  overflow: hidden;
}

.unit-profile.address > .content > .first-half {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.unit-profile.address > .actions {
  display: flex;
  gap: 0.75rem;
}

/* Current arena that the user is participating in. */
.unit-current-arena {
  --value-gradient-meta: 180deg, var(--palette-layer-1), var(--palette-layer-2);
  --value-gradient-border-meta: 180deg, var(--palette-purple), transparent;

  --box-shadow-meta: 0 -0.25rem 1.25rem 0 var(--palette-purple-faded);

  box-shadow: var(--box-shadow-meta);

  border-width: 0.1rem;
  border-style: solid;
  border-color: transparent;
  border-radius: 0.875rem;

  padding-block: 0.75rem 2rem;
  padding-inline: 1.25rem;

  background: linear-gradient(var(--value-gradient-meta)) padding-box,
    linear-gradient(var(--value-gradient-border-meta)) border-box;
}

.unit-current-arena.hidden {
  display: none;
}

.unit-current-arena > .header > .heading {
  font-weight: 500;

  color: var(--color-text-tertiary);
}

/* Statistics of current arena. */
.unit-current-arena > .statistics {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  margin-block-start: 1rem;

  @media (48rem < width) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (60rem < width) {
    grid-template-columns: 2fr repeat(3, 1fr);
  }
}

.unit-current-arena > .statistics > .participation {
  display: flex;
  align-items: start;
  gap: 0.75rem;
}

.unit-current-arena > .statistics > .participation > .title {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}

.unit-current-arena > .statistics > .participation > .title > .link {
  font-size: var(--font-size-base);
  font-weight: 700;

  color: var(--color-text-secondary);
  transition: color 250ms var(--transition-timing-base);
}

.unit-current-arena > .statistics > .participation > .title > .link[href]:hover {
  color: var(--color-text-highlight-purple);
}

.unit-current-arena > .statistics > .participation > .title > .status {
  --color-text-badge: var(--color-text-secondary);

  border-radius: 0.25rem;

  padding-block: var(--size-thinnest);
  padding-inline: 0.375rem 0.5rem;

  gap: 0.375rem;

  color: var(--color-text-badge);
}

.unit-current-arena > .statistics > .participation > .title > .status.awaiting-deposit {
  --color-text-badge: var(--palette-yellow);
}

.unit-current-arena > .statistics > .participation > .image {
  border-radius: 0.625rem;

  width: 3.5rem;
  height: 3.5rem;

  background-color: var(--color-background-card);
}

.unit-current-arena > .statistics > .participation > .image[src='/img/badges/league-badge-placeholder.png'] {
  padding-block: 0.375rem;
  padding-inline: 0.375rem;

  object-fit: scale-down;
}

/* Arena descriptions */
.unit-descriptions.arena {
  display: contents;
}

.unit-descriptions.arena > .entry > .term {
  margin-block-end: 0.5rem;

  font-weight: 500;

  color: var(--color-text-tertiary);
}

.unit-descriptions.arena > .entry > .description {
  font-size: var(--font-size-medium);
  font-weight: 700;

  line-height: var(--size-line-height-medium);

  color: var(--color-text-primary);
}

.unit-descriptions.arena > .entry > .description.profit.increased {
  color: var(--color-text-increased);
}

.unit-descriptions.arena > .entry > .description.profit.decreased {
  color: var(--color-text-decreased);
}

.unit-descriptions.arena > .entry > .description.ranking {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.unit-descriptions.arena > .entry > .description.ranking > .icon {
  color: var(--color-text-tertiary);
}
</style>
