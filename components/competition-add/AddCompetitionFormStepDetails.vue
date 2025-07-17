<script>
import {
  defineComponent,
  ref,
  shallowRef,
  reactive,
} from 'vue'

import AppButton from '~/components/units/AppButton.vue'
import AppInput from '~/components/units/AppInput.vue'
import AppTextarea from '~/components/units/AppTextarea.vue'

import {
  useGraphqlClient,
} from '@openreachtech/furo-nuxt'

import UploadImageMutationGraphqlLauncher from '~/app/graphql/client/mutations/uploadImage/UploadImageMutationGraphqlLauncher'

import AddCompetitionFormStepDetailsContext from '~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext'

export default defineComponent({
  components: {
    AppButton,
    AppInput,
    AppTextarea,
  },

  props: {
    validationMessage: {
      /**
       * @type {import('vue').PropType<
       *   import('~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext').PropsType['validationMessage']
       * >}
       */
      type: Object,
      required: true,
    },
    initialFormValueHash: {
      /** @type {import('vue').PropType<import('~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext').PropsType['initialFormValueHash']>} */
      type: [
        Object,
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
    /** @type {import('vue').ShallowRef<HTMLInputElement | null>} */
    const uploadInputShallowRef = shallowRef(null)
    /** @type {import('vue').Ref<string | null>} */
    const imageSourceRef = ref(null)
    /** @type {import('vue').Ref<string | null>} */
    const imageUrlRef = ref(null)
    /** @type {import('~/app/vue/contexts/competition/AddCompetitionFormStepDetailsContext').StatusReactive} */
    const statusReactive = reactive({
      isUploadingImage: false,
    })

    const uploadImageGraphqlClient = useGraphqlClient(UploadImageMutationGraphqlLauncher)
    const args = {
      props,
      componentContext,
      uploadInputShallowRef,
      imageSourceRef,
      imageUrlRef,
      statusReactive,
      graphqlClientHash: {
        uploadImage: uploadImageGraphqlClient,
      },
    }

    const context = AddCompetitionFormStepDetailsContext.create(args)
      .setupComponent()

    return {
      uploadInputShallowRef,
      context,
    }
  },
})
</script>

<template>
  <section class="unit-section">
    <div class="headline">
      <h2 class="heading">
        1. Arena Details
      </h2>

      <p class="description">
        Basic information about your arena
      </p>
    </div>

    <label class="unit-label">
      <span class="label">
        Arena title
      </span>

      <AppInput
        name="title"
        :value="context.initialTitle"
        placeholder="Give your arena a name (max 30 characters)"
        :has-error="Boolean(context.validationMessage.title)"
        :error-message="context.validationMessage.title"
      />
    </label>

    <label class="unit-label">
      <span class="label">
        Description
      </span>

      <AppTextarea
        name="description"
        rows="10"
        :value="context.initialDescription"
        placeholder="Describe your arena (max 250 characters)"
        :has-error="Boolean(context.validationMessage.description)"
        :error-message="context.validationMessage.description"
      />
    </label>

    <div class="unit-badge">
      <label class="label">
        Arena Badge<span class="note">(Optional)</span>
      </label>

      <p class="description">
        An image to represent your arena - which will be displayed to all participants
      </p>

      <div class="uploader">
        <input
          type="text"
          class="input hidden"
          name="imageUrl"
          :value="context.imageUrlRef.value"
        >

        <input
          ref="uploadInputShallowRef"
          type="file"
          accept="image/png, image/jpeg"
          class="input file"
          @change="context.uploadFile({
            changeEvent: $event,
          })"
        >

        <img
          :src="context.generateCompetitionImageUrl()"
          alt="Arena badge"
          class="image"
          @load="context.releaseImageObjectUrl()"
        >

        <div class="actions">
          <span class="notes">
            <span>JPG or PNG</span>
            <span>Max size of 2MB</span>
          </span>

          <AppButton
            appearance="outlined"
            type="button"
            class="button"
            :is-loading="context.isUploadingImage"
            @click="context.chooseFile()"
          >
            Upload
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.unit-section {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.unit-section > .headline > .heading {
  font-size: var(--font-size-medium);
  font-weight: 700;
  line-height: var(--size-line-height-medium);
}

.unit-section > .headline > .description {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.unit-label > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-badge > .label {
  font-size: var(--font-size-base);
  font-weight: 500;

  color: var(--color-text-secondary);
}

.unit-badge > .label > .note {
  margin-inline-start: 0.25rem;

  font-weight: 400;

  color: var(--color-text-tertiary);
}

.unit-badge > .description {
  margin-block-start: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-secondary);
}

.unit-badge > .uploader {
  margin-block-start: 1.25rem;

  display: flex;
  gap: 1rem;
}

.unit-badge > .uploader > .input.file {
  display: none;
}

.unit-badge > .uploader > .image {
  border-radius: 0.875rem;

  width: 7rem;
  height: 7rem;

  object-fit: cover;

  background-color: var(--color-background-skeleton);
}

/* Don't fit placeholder image. */
.unit-badge > .uploader > .image[src='/img/badges/league-badge-placeholder.png'] {
  object-fit: none;
}

.unit-badge > .uploader > .actions {
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 1.25rem;
}

.unit-badge > .uploader > .actions > .notes {
  display: inline-flex;
  flex-direction: column;
  gap: 0.25rem;

  font-size: var(--font-size-small);

  color: var(--color-text-tertiary);
}

.unit-badge > .uploader > .actions > .button {
  padding-inline: 2rem;

  justify-content: center;

  text-align: center;
}

.input.hidden {
  display: none;
}
</style>
