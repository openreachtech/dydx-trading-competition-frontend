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
  useRoute,
} from 'vue-router'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import CompetitionQueryGraphqlLauncher from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlLauncher'

import CompetitionDetailsEditFetcher from './CompetitionDetailsEditFetcher'

import CompetitionDetailsEditPageContext from './CompetitionDetailsEditPageContext'

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
    const route = useRoute()

    const currentStepRef = ref(1)
    /** @type {import('vue').ShallowRef<HTMLFormElement | null>} */
    const editCompetitionFormShallowRef = shallowRef(null)
    const statusReactive = reactive({
      isLoadingInitialValue: true,
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
      editCompetitionFormShallowRef,
    }
    const context = CompetitionDetailsEditPageContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div class="unit-page">
    <div class="header">
      <NuxtLink :to="context.generateCompetitionDetailsUrl()"
        aria-label="Go back to competition details"
        class="link back"
      >
        <Icon name="heroicons:arrow-left"
          size="1.5rem"
        />
      </NuxtLink>
      <span class="heading">
        Edit League
      </span>
    </div>

    <form class="unit-form">
      <div class="steps">
        <div class="content">
          <AddCompetitionFormStepDetails class="step"
            :class="context.generateStepClasses({
              step: 1,
            })"
            :validation-message="{}"
          />

          <AddCompetitionFormStepTimeline class="step"
            :class="context.generateStepClasses({
              step: 2,
            })"
            :validation-message="{}"
          />

          <AddCompetitionFormStepParticipation class="step"
            :class="context.generateStepClasses({
              step: 3,
            })"
            :validation-message="{}"
          />

          <AddCompetitionFormStepPrize class="step"
            :class="context.generateStepClasses({
              step: 4,
            })"
            :validation-message="{}"
          />
        </div>

        <div class="actions">
          <AppButton appearance="outlined"
            class="button back"
            type="button"
          >
            <Icon name="heroicons-outline:chevron-left"
              size="1rem"
            />
          </AppButton>
          <AppButton>
            Save changes
          </AppButton>
        </div>
      </div>

      <AddCompetitionFormSteps :current-step="context.currentStep"
        :steps="context.steps"
      />
    </form>
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

.unit-form > .steps > .content > .step.hidden {
  visibility: hidden;
}

.unit-form > .steps > .actions {
  margin-block-start: 2.5rem;

  display: flex;
  justify-content: end;
  gap: 1rem;
}

.unit-form > .steps > .actions > .button.back {
  padding-block: 0.625rem;
  padding-inline: 0.625rem;
}
</style>
