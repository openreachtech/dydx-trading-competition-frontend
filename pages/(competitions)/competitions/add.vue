<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  NuxtLink,
  Icon,
} from '#components'

import {
  definePageMeta,
} from '#imports'

import AppButton from '~/components/units/AppButton.vue'
import AddCompetitionFormSteps from '~/components/competition-add/AddCompetitionFormSteps.vue'
import AddCompetitionFormStepDetails from '~/components/competition-add/AddCompetitionFormStepDetails.vue'
import AddCompetitionFormStepTimeline from '~/components/competition-add/AddCompetitionFormStepTimeline.vue'
import AddCompetitionFormStepParticipation from '~/components/competition-add/AddCompetitionFormStepParticipation.vue'
import AddCompetitionFormStepOptions from '~/components/competition-add/AddCompetitionFormStepOptions.vue'
import AddCompetitionFormStepPrize from '~/components/competition-add/AddCompetitionFormStepPrize.vue'

import AddCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlLauncher'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'

import AddCompetitionFormElementClerk from '~/app/domClerk/AddCompetitionFormElementClerk'

import {
  BASE_PAGE_TITLE,
} from '~/app/constants'

import AddCompetitionPageContext from '~/app/vue/contexts/AddCompetitionPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppButton,
    AddCompetitionFormSteps,
    AddCompetitionFormStepDetails,
    AddCompetitionFormStepTimeline,
    AddCompetitionFormStepParticipation,
    AddCompetitionFormStepOptions,
    AddCompetitionFormStepPrize,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      $furo: {
        pageTitle: `New Arena - ${BASE_PAGE_TITLE}`,
      },
    })

    const addCompetitionGraphqlClient = useGraphqlClient(AddCompetitionMutationGraphqlLauncher)
    const addCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: AddCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: addCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })
    const statusReactive = reactive({
      isLoading: false,
    })
    /** @type {import('vue').Reactive<Record<string, string | null>>} */
    const errorMessageHashReactive = reactive({
      addCompetition: null,
    })

    const args = {
      props,
      componentContext,
      graphqlClientHash: {
        addCompetition: addCompetitionGraphqlClient,
      },
      formClerkHash: {
        addCompetition: addCompetitionFormClerk,
      },
      statusReactive,
      errorMessageHashReactive,
    }
    const context = AddCompetitionPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="inner">
      <NuxtLink
        to="/competitions"
        class="return"
      >
        <Icon
          name="heroicons:arrow-left"
          size="1.5rem"
        />

        <span>Leagues</span>
      </NuxtLink>

      <form
        :ref="context.addCompetitionFormShallowRef"
        class="unit-form"
        @submit.prevent="context.submitForm()"
      >
        <div class="steps">
          <div class="content">
            <AddCompetitionFormStepDetails
              class="step"
              :class="context.generateStepClasses({
                step: 1,
              })"
              :validation-message="context.addCompetitionValidationMessage"
            />

            <AddCompetitionFormStepTimeline
              class="step"
              :class="context.generateStepClasses({
                step: 2,
              })"
              :validation-message="context.addCompetitionValidationMessage"
            />

            <AddCompetitionFormStepParticipation
              class="step"
              :class="context.generateStepClasses({
                step: 3,
              })"
              :validation-message="context.addCompetitionValidationMessage"
            />

            <div
              class="unit-form-group step"
              :class="context.generateStepClasses({
                step: 4,
              })"
            >
              <div class="headline">
                <h2 class="heading">
                  4. Rank & Prize
                </h2>

                <p class="description">
                  Define the total prize pool and how it will be distributed
                </p>
              </div>

              <AddCompetitionFormStepOptions :validation-message="context.addCompetitionValidationMessage" />

              <AddCompetitionFormStepPrize :validation-message="context.addCompetitionValidationMessage" />
            </div>
          </div>

          <div class="unit-actions">
            <AppButton
              appearance="outlined"
              class="button back"
              type="button"
              :disabled="context.shouldDisablePreviousStepButton()"
              @click="context.goToPreviousStep()"
            >
              <Icon
                name="heroicons-outline:chevron-left"
                size="1rem"
              />
            </AppButton>
            <AppButton
              :type="context.generateNextStepButtonType"
              @click="context.goToNextStep({
                mouseEvent: $event,
              })"
            >
              {{ context.generateNextStepButtonLabel() }}
            </AppButton>
          </div>
        </div>

        <AddCompetitionFormSteps
          :current-step="context.currentStepRef.value"
          :steps="context.steps"
          :error-message-hash="context.errorMessageHashReactive"
          @go-to-step="context.goToStep($event)"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

  padding-block-end: 12rem;

  @media (30rem < width) {
    margin-inline: calc(-1 * var(--size-body-padding-inline-desktop));
  }
}

.unit-page > .inner {
  margin-inline: auto;

  padding-inline: var(--size-body-padding-inline-mobile);

  max-width: var(--size-body-max-width);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .inner > .return {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;

  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);

  color: var(--color-text-primary);

  transition: gap 150ms var(--transition-timing-base);
}

.unit-page > .inner > .return:hover {
  gap: 1rem;
}

.unit-form {
  margin-block-start: 2.25rem;

  display: flex;
  flex-direction: column-reverse;
  gap: 2.25rem;

  @media (48rem < width) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;
  }
}

.unit-form > .steps {
  border-radius: 1.25rem;

  padding-block: 1.25rem;
  padding-inline: 1rem;

  background-color: var(--color-background-competition-form-steps);

  @media (30rem < width) {
    padding-inline: 1.25rem;
  }

  @media (48rem < width) {
    padding-inline: 1.75rem;
  }
}

.unit-form > .steps > .content {
  display: grid;
}

.unit-form > .steps > .content > * {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.unit-form > .steps > .content > .step {
  min-width: 0;
}

.unit-form > .steps > .content > .step.hidden {
  visibility: hidden;
}

.unit-form-group:not(.hidden) {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.unit-form-group > .headline > .heading {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);
}

.unit-form-group > .headline > .description {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-form-group > .unit-form:last-of-type {
  flex: 1;
}

.unit-actions {
  margin-block-start: 2.5rem;

  display: flex;
  justify-content: end;
  gap: 1rem;
}

.unit-actions > .button.back {
  padding-block: 0.625rem;
  padding-inline: 0.625rem;
}
</style>
