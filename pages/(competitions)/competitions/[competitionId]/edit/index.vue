<script>
import {
  defineComponent,
  ref,
  shallowRef,
  reactive,
} from 'vue'

import {
  NuxtLink,
  Icon,
} from '#components'

import AppButton from '~/components/units/AppButton.vue'
import AddCompetitionFormSteps from '~/components/competition-add/AddCompetitionFormSteps.vue'
import AddCompetitionFormStepDetails from '~/components/competition-add/AddCompetitionFormStepDetails.vue'
import AddCompetitionFormStepTimeline from '~/components/competition-add/AddCompetitionFormStepTimeline.vue'
import AddCompetitionFormStepParticipation from '~/components/competition-add/AddCompetitionFormStepParticipation.vue'
import AddCompetitionFormStepPrize from '~/components/competition-add/AddCompetitionFormStepPrize.vue'

import {
  definePageMeta,
} from '#imports'

import {
  useRoute,
} from 'vue-router'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'
import useAppFormClerk from '~/composables/useAppFormClerk'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'
import UpdateCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/updateCompetition/UpdateCompetitionMutationGraphqlLauncher'
import UpdateCompetitionSchedulesMutationGraphqlLauncher from '~/app/graphql/client/mutations/updateCompetitionSchedules/UpdateCompetitionSchedulesMutationGraphqlLauncher'
import UpdateCompetitionLimitsMutationGraphqlLauncher from '~/app/graphql/client/mutations/updateCompetitionLimits/UpdateCompetitionLimitsMutationGraphqlLauncher'
import UpdateCompetitionPrizeRulesMutationGraphqlLauncher from '~/app/graphql/client/mutations/updateCompetitionPrizeRules/UpdateCompetitionPrizeRulesMutationGraphqlLauncher'

import UpdateCompetitionFormElementClerk from '~/app/domClerk/UpdateCompetitionFormElementClerk'
import UpdateCompetitionSchedulesFormElementClerk from '~/app/domClerk/UpdateCompetitionSchedulesFormElementClerk'
import UpdateCompetitionLimitsFormElementClerk from '~/app/domClerk/UpdateCompetitionLimitsFormElementClerk'
import UpdateCompetitionPrizeRulesFormElementClerk from '~/app/domClerk/UpdateCompetitionPrizeRulesFormElementClerk'

import CompetitionDetailsEditFetcher from './CompetitionDetailsEditFetcher'

import CompetitionDetailsEditPageContext from './CompetitionDetailsEditPageContext'
import CompetitionDetailsEditMutationContext from './CompetitionDetailsEditMutationContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AppButton,
    AddCompetitionFormSteps,
    AddCompetitionFormStepDetails,
    AddCompetitionFormStepTimeline,
    AddCompetitionFormStepParticipation,
    AddCompetitionFormStepPrize,
  },

  setup (
    props,
    componentContext
  ) {
    definePageMeta({
      middleware: [
        'competition-edit-permission',
      ],
    })

    const route = useRoute()

    const currentStepRef = ref(1)
    const statusReactive = reactive({
      isLoadingInitialValue: true,
      isUpdatingCompetition: false,
      isUpdatingCompetitionSchedules: false,
      isUpdatingCompetitionLimits: false,
      isUpdatingCompetitionPrizeRules: false,
    })

    const competitionGraphqlClient = useGraphqlClient(CompetitionQueryGraphqlLauncher)
    const competitionDetailsEditFetcherArgs = {
      route,
      graphqlClientHash: {
        competition: competitionGraphqlClient,
      },
      statusReactive,
    }
    const competitionDetailsEditFetcher = CompetitionDetailsEditFetcher.create(competitionDetailsEditFetcherArgs)

    const args = {
      props,
      componentContext,
      route,
      fetcherHash: {
        competitionDetailsEdit: competitionDetailsEditFetcher,
      },
      currentStepRef,
      statusReactive,
    }
    const context = CompetitionDetailsEditPageContext.create(args)
      .setupComponent()

    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const updateCompetitionFormShallowRef = shallowRef(null)
    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const updateCompetitionSchedulesFormShallowRef = shallowRef(null)
    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const updateCompetitionLimitsFormShallowRef = shallowRef(null)
    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const updateCompetitionPrizeRulesFormShallowRef = shallowRef(null)

    const updateCompetitionGraphqlClient = useGraphqlClient(UpdateCompetitionMutationGraphqlLauncher)
    const updateCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: UpdateCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: updateCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })
    const updateCompetitionSchedulesGraphqlClient = useGraphqlClient(UpdateCompetitionSchedulesMutationGraphqlLauncher)
    const updateCompetitionSchedulesFormClerk = useAppFormClerk({
      FormElementClerk: UpdateCompetitionSchedulesFormElementClerk,
      invokeRequestWithFormValueHash: updateCompetitionSchedulesGraphqlClient.invokeRequestWithFormValueHash,
    })
    const updateCompetitionLimitsGraphqlClient = useGraphqlClient(UpdateCompetitionLimitsMutationGraphqlLauncher)
    const updateCompetitionLimitsFormClerk = useAppFormClerk({
      FormElementClerk: UpdateCompetitionLimitsFormElementClerk,
      invokeRequestWithFormValueHash: updateCompetitionLimitsGraphqlClient.invokeRequestWithFormValueHash,
    })
    const updateCompetitionPrizeRulesGraphqlClient = useGraphqlClient(UpdateCompetitionPrizeRulesMutationGraphqlLauncher)
    const updateCompetitionPrizeRulesFormClerk = useAppFormClerk({
      FormElementClerk: UpdateCompetitionPrizeRulesFormElementClerk,
      invokeRequestWithFormValueHash: updateCompetitionPrizeRulesGraphqlClient.invokeRequestWithFormValueHash,
    })

    const mutationArgs = {
      props,
      componentContext,
      route,
      graphqlClientHash: {
        updateCompetition: updateCompetitionGraphqlClient,
        updateCompetitionSchedules: updateCompetitionSchedulesGraphqlClient,
        updateCompetitionLimits: updateCompetitionLimitsGraphqlClient,
        updateCompetitionPrizeRules: updateCompetitionPrizeRulesGraphqlClient,
      },
      formClerkHash: {
        updateCompetition: updateCompetitionFormClerk,
        updateCompetitionSchedules: updateCompetitionSchedulesFormClerk,
        updateCompetitionLimits: updateCompetitionLimitsFormClerk,
        updateCompetitionPrizeRules: updateCompetitionPrizeRulesFormClerk,
      },
      fetcherHash: {
        competition: competitionDetailsEditFetcher,
      },
      updateCompetitionFormShallowRef,
      updateCompetitionSchedulesFormShallowRef,
      updateCompetitionLimitsFormShallowRef,
      updateCompetitionPrizeRulesFormShallowRef,
      statusReactive,
    }
    const mutationContext = CompetitionDetailsEditMutationContext.create(mutationArgs)
      .setupComponent()

    return {
      context,
      mutationContext,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="header">
      <NuxtLink
        :to="context.generateCompetitionDetailsUrl()"
        aria-label="Go back to competition details"
        class="link back"
      >
        <Icon
          name="heroicons:arrow-left"
          size="1.5rem"
        />
      </NuxtLink>
      <span class="heading">
        Edit League
      </span>
    </div>

    <div class="unit-form-container">
      <div class="steps">
        <form
          :ref="mutationContext.updateCompetitionFormShallowRef"
          class="unit-form step"
          :class="context.generateStepClasses({
            step: 1,
          })"
          @submit.prevent="mutationContext.submitFormUpdateCompetition()"
        >
          <input
            type="number"
            class="input hidden"
            name="competitionId"
            :value="mutationContext.extractCompetitionIdFromRoute()"
          >
          <AddCompetitionFormStepDetails
            :validation-message="mutationContext.updateCompetitionValidationMessage"
            :initial-form-value-hash="context.generateStepDetailsInitialValueHash()"
            class="controls"
          />
          <AppButton
            type="submit"
            class="button submit"
            :is-loading="mutationContext.isUpdatingCompetition"
          >
            Save changes
          </AppButton>
        </form>

        <form
          :ref="mutationContext.updateCompetitionSchedulesFormShallowRef"
          class="unit-form step"
          :class="context.generateStepClasses({
            step: 2,
          })"
          @submit.prevent="mutationContext.submitFormUpdateCompetitionSchedules()"
        >
          <input
            type="number"
            class="input hidden"
            name="competitionId"
            :value="mutationContext.extractCompetitionIdFromRoute()"
          >
          <AddCompetitionFormStepTimeline
            :validation-message="mutationContext.updateCompetitionSchedulesValidationMessage"
            :initial-form-value-hash="context.generateStepTimelineInitialValueHash()"
            class="controls"
          />
          <AppButton
            type="submit"
            class="button submit"
            :is-loading="mutationContext.isUpdatingCompetitionSchedules"
          >
            Save changes
          </AppButton>
        </form>

        <form
          :ref="mutationContext.updateCompetitionLimitsFormShallowRef"
          class="unit-form step"
          :class="context.generateStepClasses({
            step: 3,
          })"
          @submit.prevent="mutationContext.submitFormUpdateCompetitionLimits()"
        >
          <input
            type="number"
            class="input hidden"
            name="competitionId"
            :value="mutationContext.extractCompetitionIdFromRoute()"
          >
          <AddCompetitionFormStepParticipation
            :validation-message="mutationContext.updateCompetitionLimitsValidationMessage"
            :initial-form-value-hash="context.generateStepParticipationInitialValueHash()"
            class="controls"
          />
          <AppButton
            type="submit"
            class="button submit"
            :is-loading="mutationContext.isUpdatingCompetitionLimits"
          >
            Save changes
          </AppButton>
        </form>

        <form
          :ref="mutationContext.updateCompetitionPrizeRulesFormShallowRef"
          class="unit-form step"
          :class="context.generateStepClasses({
            step: 4,
          })"
          @submit.prevent="mutationContext.submitFormUpdateCompetitionPrizeRules()"
        >
          <input
            type="number"
            class="input hidden"
            name="competitionId"
            :value="mutationContext.extractCompetitionIdFromRoute()"
          >
          <AddCompetitionFormStepPrize
            :validation-message="mutationContext.updateCompetitionPrizeRulesValidationMessage"
            :initial-form-value-hash="context.generateStepPrizeInitialValueHash()"
            should-omit-total-prize
            class="controls"
          />
          <AppButton
            type="submit"
            class="button submit"
            :is-loading="mutationContext.isUpdatingCompetitionPrizeRules"
          >
            Save changes
          </AppButton>
        </form>
      </div>

      <AddCompetitionFormSteps
        :current-step="context.currentStep"
        :steps="context.steps"
        @go-to-step="context.goToStep($event)"
      />
    </div>
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: auto;

  max-width: var(--size-body-max-width);

  padding-block-end: 12rem;
  padding-inline: var(--size-body-padding-inline-mobile);

  @media (30rem < width) {
    padding-inline: var(--size-body-padding-inline-desktop);
  }
}

.unit-page > .header {
  display: flex;
  align-items: center;
  gap: 0.75rem;

  color: var(--color-text-primary);
}

.unit-page > .header > .link {
  color: inherit;
}

.unit-page > .header > .link.back {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.unit-page > .header > .heading {
  font-size: var(--font-size-large);
  font-weight: 500;
  line-height: var(--size-line-height-large);
}

.unit-form-container {
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

.unit-form-container > .steps {
  display: grid;

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

.unit-form-container > .steps > * {
  grid-row: 1 / -1;
  grid-column: 1 / -1;
}

.unit-form-container > .steps > .step.hidden {
  visibility: hidden;
}

.unit-form {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.unit-form > .input.hidden {
  display: none;
}

.unit-form > .controls {
  flex: 1;
}

.unit-form > .button.submit {
  margin-block-start: 2.5rem;

  align-self: end;
}
</style>
