<script>
import {
  defineComponent,
  reactive,
} from 'vue'

import {
  NuxtLink,
  Icon,
} from '#components'

import AddCompetitionFormSteps from '~/components/competition-add/AddCompetitionFormSteps.vue'
import AddCompetitionFormStepDetails from '~/components/competition-add/AddCompetitionFormStepDetails.vue'

import AddCompetitionMutationGraphqlLauncher from '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlLauncher'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import useAppFormClerk from '~/composables/useAppFormClerk'

import AddCompetitionFormElementClerk from '~/app/domClerk/AddCompetitionFormElementClerk'

import AddCompetitionPageContext from '~/app/vue/contexts/AddCompetitionPageContext'

export default defineComponent({
  components: {
    NuxtLink,
    Icon,
    AddCompetitionFormSteps,
    AddCompetitionFormStepDetails,
  },

  setup (
    props,
    componentContext
  ) {
    const addCompetitionGraphqlClient = useGraphqlClient(AddCompetitionMutationGraphqlLauncher)
    const addCompetitionFormClerk = useAppFormClerk({
      FormElementClerk: AddCompetitionFormElementClerk,
      invokeRequestWithFormValueHash: addCompetitionGraphqlClient.invokeRequestWithFormValueHash,
    })
    const statusReactive = reactive({
      isLoading: false,
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
      <NuxtLink to="/competitions"
        class="return"
      >
        <Icon name="heroicons:arrow-left"
          size="1.5rem"
        />

        <span>Leagues</span>
      </NuxtLink>

      <form class="unit-form">
        <div class="steps">
          <AddCompetitionFormStepDetails :class="context.generateStepClasses({ step: 1 })" />
        </div>

        <AddCompetitionFormSteps :current-step="context.currentStepRef.value"
          @go-to-step="context.goToStep($event)"
        />
      </form>
    </div>
  </div>
</template>

<style scoped>
.unit-page {
  margin-inline: calc(-1 * var(--size-body-padding-inline-mobile));

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

.unit-form > .steps > .step.hidden {
  display: none;
}
</style>
