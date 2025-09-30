<script>
import {
  defineComponent,
  ref,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppDialog from '~/components/units/AppDialog.vue'

import CompetitionTermsDialogContext from './CompetitionTermsDialogContext'

export default defineComponent({
  components: {
    AppButton,
    AppDialog,
  },

  props: {
    competition: {
      /** @type {import('vue').PropType<import('./CompetitionTermsDialogContext').CompetitionTermsDialogProps['competition']>} */
      type: [
        Object,
        null,
      ],
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    // Actual value is `AppDialog` but type declaration is `FuroDialog`.
    /** @type {import('vue').Ref<import('@openreachtech/furo-nuxt/lib/components/FuroDialog.vue').default | null>} */
    const dialogComponentRef = ref(null)

    const args = {
      props,
      componentContext,
      dialogComponentRef,
    }
    const context = CompetitionTermsDialogContext.create(args)
      .setupComponent()

    return {
      dialogComponentRef,
      context,
    }
  },
})
</script>

<template>
  <AppDialog
    ref="dialogComponentRef"
    :title="context.generateDialogTitle()"
    class="unit-dialog"
  >
    <template #contents>
      <div class="unit-contents">
        <section class="section">
          <h4 class="heading">
            Eligibility Requirements
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                To be eligible to participate in the trading arena, participants (“Participants”) need
                to comply with each and all of the following requirements: Participants must be natural persons
                with full legal capacity and over eighteen (18) years of age.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                The minimum initial equity required to participate is <span class="highlight">{{ context.minimumDeposit }}</span>.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Competition Details
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Registration period: <span class="highlight">
                  {{ context.extractRegistrationStartDate() }}
                </span> to <span class="highlight">
                  {{ context.extractRegistrationEndDate() }}
                </span>.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Trading period: <span class="highlight">
                  {{ context.extractCompetitionStartDate() }}
                </span> to <span class="highlight">
                  {{ context.extractCompetitionEndDate() }}
                </span>.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                The total reward pool for the trading arena will be <span class="highlight">{{ context.totalPrize }}</span>.
                Prizes will be distributed in USDC only.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Prize Structure
          </h4>

          <ul class="unit-list">
            <!-- <li class="entry">
              <span class="bullet" />

              Prizes will be allocated as follows: {{ prizeRules }}.</li> -->
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                The hourly performance of eligible Participants will be verified by tracking the activity
                on their respective dYdX Chain wallet addresses that they used to participate in the trading arena.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Winner Announcement and Prize Distribution
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Winners will be announced after <span class="highlight">{{ context.extractCompetitionEndDate() }}</span>.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Prizes will be distributed on <span class="highlight">{{ context.extractPrizeDistributionDate() }}</span>. Winners will not be able
                to assign the right to receive prizes to any third parties.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Terms and Conditions
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                By entering or participating in the trading arena, each Participant represents and warrants
                that they have read, and agree to comply with, the dydx.trade user interface terms of use
                (available here: <a
                  class="link"
                  href="https://dydx.trade/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                >https://dydx.trade/terms</a>), to the extent applicable to them. Failure or inability
                to comply with these terms will imply the ineligibility of a Participant to participate in this
                competition and to receive a prize.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                This trading arena is in no way associated with 𝕏 or any social media channels.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                This trading arena is being organised and coordinated by <span class="highlight">{{ context.hostName }}</span> independently.
                <span class="highlight">{{ context.hostName }}</span> is not affiliated with, or acting on behalf or as an agent of, any other person
                or entity, including any entities involved in the dYdX ecosystem.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                This trading arena is being organised for entertainment purposes only. Nothing relating
                to the organisation of this trading arena shall be regarded as financial or investment advice.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Rights and Restrictions
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                <span class="highlight">{{ context.hostName }}</span> reserves the right to disqualify any Participants immediately due to any improper behaviours
                (including wash trading, false trading, self-dealing or trades that display any attributes of market manipulation).
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                <span class="highlight">{{ context.hostName }}</span> reserves the right to cancel or amend the trading arena or the applicable terms and
                conditions at its sole discretion at any time and for whatever reason.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                <span class="highlight">{{ context.hostName }}</span> reserves the right to retweet, repost, or use the image or video entries (at the moment,
                and in the future) related to the trading arena as shared by Participants for its own marketing purposes.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Participants who violate the terms and conditions of this trading arena may be barred from entering
                subsequent social media contests and trading arenas in the future.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                The decisions of <span class="highlight">{{ context.hostName }}</span> on all matters relating to the trading arena and the prizes
                shall be final and binding on all Participants.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Disclaimers and Limitations
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                By participating in the trading arena, Participants agree to release and hold harmless <span class="highlight">{{ context.hostName }}</span>,
                the trading platform (i.e., dYdX), their affiliated entities and their directors, officers and employees
                from any and all liabilities, losses, or damages incurred as a result of or arising from the trading, the
                trading arena and/or the awarding of the prizes.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Participants residing in sanctioned regions (including the Crimea region, Cuba, Iran, North Korea, and Syria),
                the USA, the UK or Canada are not eligible to participate in this competition and will not be eligible to receive a prize.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                If the terms and conditions of the trading arena are translated into a language other than English,
                then the English version of the terms and conditions shall prevail wherever any inconsistency arises.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Participants acknowledge that responsibility for prize distribution lies solely with the competition captain,
                and by participating, they are trusting the captain to fulfill distribution obligations.
              </p>
            </li>
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Participants understand that trading with leverage carries significant risk, and their deposited margin may
                be partially or completely lost as a result of trading activities during the competition.
              </p>
            </li>
          </ul>
        </section>

        <section class="section">
          <h4 class="heading">
            Risk Warning
          </h4>

          <ul class="unit-list">
            <li class="entry">
              <span class="bullet" />

              <p class="content">
                Remember! Crypto-assets can be highly volatile and trading crypto-assets involves risk of loss,
                particularly when using leverage. Investment into crypto-assets may not be regulated and may not
                be adequate for retail investors. Do your own research and due diligence before engaging in any
                activity involving crypto-assets.
              </p>
            </li>
          </ul>
        </section>

        <div class="unit-actions">
          <AppButton
            class="button"
            @click="context.emitCheckEnrollmentEligibility()"
          >
            Agree and Join competition
          </AppButton>

          <AppButton
            variant="muted"
            class="button"
            @click="context.dismissDialog()"
          >
            Cancel
          </AppButton>
        </div>
      </div>
    </template>
  </AppDialog>
</template>

<style scoped>
.unit-dialog {
  margin-inline: var(--size-body-padding-inline-mobile);

  max-width: 70rem;
  max-height: 80%;

  @media (30rem < width) {
    /* NOTE: It seems like `<dialog>` rely on margin-inline: auto to align center. */
    margin-inline: auto;
  }
}

.unit-contents {
  padding-block-start: 0.25rem;
  padding-inline-end: 0.75rem;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  overflow-y: auto;
}

.unit-contents > .section {
  margin-block-start: 0;
}

.unit-contents > .section > .heading {
  font-size: var(--font-size-large);
  font-weight: 700;

  color: var(--color-text-primary);
}

.unit-list {
  margin-block-start: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);

  color: var(--color-text-tertiary);
}

.unit-list > .entry {
  margin-inline-start: 0.5rem;

  display: flex;
  gap: 0.5rem;
}

.unit-list > .entry > .content > .highlight {
  font-weight: 500;

  color: var(--color-text-highlight-purple);
}

.unit-list > .entry > .content > .link {
  font-weight: 500;

  text-decoration: underline;

  color: var(--color-text-secondary);

  transition: color 250ms var(--transition-timing-base);
}

.unit-list > .entry > .content > .link:hover {
  color: var(--color-text-primary)
}

.unit-list > .entry > .bullet {
  margin-block-start: 0.5rem;

  border-radius: 100vh;

  flex-shrink: 0;

  height: 0.5rem;
  width: 0.5rem;

  background-color: var(--color-text-highlight-purple);
}

.unit-actions {
  position: sticky;
  bottom: 0;

  padding-block-start: 0.75rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;

  background-color: var(--color-background-dialog);

  @media (30rem < width) {
    flex-direction: row;
  }
}

.unit-actions::before {
  content: '';

  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;

  height: 1rem;

  background-image: linear-gradient(
    to top,
    var(--color-background-dialog),
    transparent
  );
}

.unit-actions > .button {
  justify-content: center;

  text-align: center;
}
</style>
