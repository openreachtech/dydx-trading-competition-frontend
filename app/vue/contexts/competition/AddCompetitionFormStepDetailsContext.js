import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AddCompetitionFormStepDetailsContext
 *
 * @extends {BaseFuroContext<null>}
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
    imageIdRef,
    statusReactive,
    graphqlClientHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.uploadInputShallowRef = uploadInputShallowRef
    this.imageSourceRef = imageSourceRef
    this.imageIdRef = imageIdRef
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
    imageIdRef,
    imageSourceRef,
    statusReactive,
    graphqlClientHash,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        uploadInputShallowRef,
        imageIdRef,
        imageSourceRef,
        statusReactive,
        graphqlClientHash,
      })
    )
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
   * get: imageId
   *
   * @returns {number | null}
   */
  get imageId () {
    return this.uploadImageCapsuleRef.value.imageId
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
        this.imageIdRef.value = capsule.imageId

        this.statusReactive.isUploadingImage = false
      },
    }
  }

  /**
   * Revoke the image's object URL after it is loaded.
   *
   * @param {{
   *   objectUrl: string
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   uploadInputShallowRef: import('vue').ShallowRef<HTMLInputElement | null>
 *   imageSourceRef: import('vue').Ref<string>
 *   imageIdRef: import('vue').Ref<number | null>
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
