import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const FALLBACK_COMPETITION_IMAGE_URL = '/img/badges/league-badge-placeholder.png'

/**
 * AddCompetitionFormStepDetailsContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class AddCompetitionFormStepDetailsContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionFormStepDetailsContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    uploadInputShallowRef,
    imageSourceRef,
    imageUrlRef,
    statusReactive,
    graphqlClientHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.uploadInputShallowRef = uploadInputShallowRef
    this.imageSourceRef = imageSourceRef
    this.imageUrlRef = imageUrlRef
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionFormStepDetailsContext ? X : never} T, X
   * @override
   * @param {AddCompetitionFormStepDetailsContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    uploadInputShallowRef,
    imageUrlRef,
    imageSourceRef,
    statusReactive,
    graphqlClientHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        uploadInputShallowRef,
        imageUrlRef,
        imageSourceRef,
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * get: validationMessage
   *
   * @returns {PropsType['validationMessage']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }

  /**
   * get: initialFormValueHash
   *
   * @returns {PropsType['initialFormValueHash']}
   */
  get initialFormValueHash () {
    return this.props.initialFormValueHash
  }

  /**
   * get: initialTitle
   *
   * @returns {string | null}
   */
  get initialTitle () {
    return this.initialFormValueHash
      ?.title
      ?? null
  }

  /**
   * get: initialDescription
   *
   * @returns {string | null}
   */
  get initialDescription () {
    return this.initialFormValueHash
      ?.description
      ?? null
  }

  /**
   * get: initialCompetitionImageUrl
   *
   * @returns {string | null}
   */
  get initialCompetitionImageUrl () {
    return this.initialFormValueHash
      ?.competitionImageUrl
      ?? null
  }

  /**
   * get: imageSource
   *
   * @returns {string | null}
   */
  get imageSource () {
    return this.imageSourceRef.value
  }

  /**
   * Generate competition image URL.
   *
   * @returns {string}
   */
  generateCompetitionImageUrl () {
    if (this.imageSource) {
      return this.imageSource
    }

    if (this.initialCompetitionImageUrl) {
      return this.initialCompetitionImageUrl
    }

    return FALLBACK_COMPETITION_IMAGE_URL
  }

  /**
   * get: isUploadingImage
   *
   * @returns {boolean}
   */
  get isUploadingImage () {
    return this.statusReactive.isUploadingImage
  }

  /**
   * get: uploadImageCapsuleRef
   *
   * @returns {import('vue').Ref<import('~/app/graphql/client/mutations/uploadImage/UploadImageMutationGraphqlCapsule').default>}
   */
  get uploadImageCapsuleRef () {
    return this.graphqlClientHash.uploadImage.capsuleRef
  }

  /**
   * get: imageUrl
   *
   * @returns {string | null}
   */
  get imageUrl () {
    return this.uploadImageCapsuleRef.value.imageUrl
  }

  /**
   * Upload file.
   *
   * @param {{
   *   changeEvent: Event
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async uploadFile ({
    changeEvent,
  }) {
    if (!(changeEvent.target instanceof HTMLInputElement)) {
      return
    }

    const {
      files,
    } = changeEvent.target

    if (!files) {
      return
    }

    await this.graphqlClientHash
      .uploadImage
      .invokeRequestOnEvent({
        variables: {
          input: {
            file: files[0],
          },
        },
        // @ts-expect-error - Error because hooks is using `any` type. Should be fixed upstream.
        hooks: this.uploadImageLauncherHooks,
      })

    this.imageSourceRef.value = URL.createObjectURL(files[0])
  }

  /**
   * get: uploadImageLauncherHooks
   *
   * @returns {Pick<furo.GraphqlLauncherHooks, 'beforeRequest'> & {
   *   afterRequest: (capsule: import('~/app/graphql/client/mutations/uploadImage/UploadImageMutationGraphqlCapsule').default) => Promise<void>
   * }} Launcher hooks.
   */
  get uploadImageLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUploadingImage = true

        return false
      },
      afterRequest: async capsule => {
        this.imageUrlRef.value = capsule.imageUrl

        this.statusReactive.isUploadingImage = false
      },
    }
  }

  /**
   * Revoke the image's object URL after it is loaded.
   *
   * @param {{
   *   objectUrl: string | null
   * }} params - Parameters.
   * @returns {void}
   */
  releaseImageObjectUrl ({
    objectUrl,
  }) {
    if (!objectUrl) {
      return
    }

    URL.revokeObjectURL(objectUrl)
  }

  /**
   * Choose file.
   *
   * @returns {void}
   */
  chooseFile () {
    if (!this.uploadInputShallowRef.value) {
      return
    }

    this.uploadInputShallowRef.value.click()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   uploadInputShallowRef: import('vue').ShallowRef<HTMLInputElement | null>
 *   imageSourceRef: import('vue').Ref<string | null>
 *   imageUrlRef: import('vue').Ref<string | null>
 *   statusReactive: StatusReactive
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 * }} AddCompetitionFormStepDetailsContextParams
 */

/**
 * @typedef {'uploadImage'} GraphqlClientHashKeys
 */

/**
 * @typedef {AddCompetitionFormStepDetailsContextParams} AddCompetitionFormStepDetailsContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {import('vue').Reactive<{
 *   isUploadingImage: boolean
 * }>} StatusReactive
 */

/**
 * @typedef {{
 *   validationMessage: furo.ValidatorHashType['message']
 *   initialFormValueHash: InitialFormValueHash | null
 * }} PropsType
 */

/**
 * @typedef {{
 *   title: string | null
 *   description: string | null
 *   competitionImageUrl?: string | null
 * }} InitialFormValueHash
 */
