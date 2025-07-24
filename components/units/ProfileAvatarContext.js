import {
  onUnmounted,
} from 'vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ProfileAvatarContext
 *
 * @extends {BaseFuroContext<null, PropsType, EmitEventUnionType>}
 */
export default class ProfileAvatarContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ProfileAvatarContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    inputElementShallowRef,
    localImageSourceRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.inputElementShallowRef = inputElementShallowRef
    this.localImageSourceRef = localImageSourceRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ProfileAvatarContext ? X : never} T, X
   * @override
   * @param {ProfileAvatarContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    inputElementShallowRef,
    localImageSourceRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        inputElementShallowRef,
        localImageSourceRef,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      UPLOAD_IMAGE: 'uploadImage',
    }
  }

  /**
   * get: inputName
   *
   * @returns {PropsType['inputName']}
   */
  get inputName () {
    return this.props.inputName
  }

  /**
   * get: alt
   *
   * @returns {PropsType['alt']}
   */
  get alt () {
    return this.props.alt
  }

  /**
   * get: isUploadingImage
   *
   * @returns {PropsType['isUploadingImage']}
   */
  get isUploadingImage () {
    return this.props.isUploadingImage
  }

  /**
   * get: defaultImageUrl
   *
   * @returns {PropsType['defaultImageUrl']}
   */
  get defaultImageUrl () {
    return this.props.defaultImageUrl
  }

  /**
   * Setup component.
   *
   * @template {X extends ProfileAvatarContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    onUnmounted(() => {
      this.releaseImageObjectUrl({
        imageSource: this.localImageSourceRef.value,
      })
    })

    return this
  }

  /**
   * Handle input event on change.
   *
   * @param {{
   *   changeEvent: Event
   * }} params - Parameters.
   * @returns {void}
   */
  onInputChange ({
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

    const [firstFile] = files

    this.localImageSourceRef.value = URL.createObjectURL(firstFile)

    this.emit(
      this.EMIT_EVENT_NAME.UPLOAD_IMAGE,
      {
        file: firstFile,
      }
    )
  }

  /**
   * Revoke the image's object URL after it is loaded.
   *
   * @param {{
   *   imageSource: string | null
   * }} params - Parameters.
   * @returns {void}
   */
  releaseImageObjectUrl ({
    imageSource,
  }) {
    if (!imageSource) {
      return
    }

    URL.revokeObjectURL(imageSource)
  }

  /**
   * Generate the avatar image URL.
   *
   * @returns {string}
   */
  generateAvatarImageUrl () {
    if (this.localImageSourceRef.value) {
      return this.localImageSourceRef.value
    }

    if (!this.defaultImageUrl) {
      return ''
    }

    return this.defaultImageUrl
  }

  /**
   * Select file by triggering the input element.
   *
   * @returns {void}
   */
  selectFile () {
    this.inputElementShallowRef
      .value
      ?.click()
  }

  /**
   * Whether the component is containing an image or not.
   *
   * @returns {boolean}
   */
  containsImage () {
    return Boolean(this.generateAvatarImageUrl())
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   inputElementShallowRef: import('vue').ShallowRef<HTMLInputElement | null>
 *   localImageSourceRef: import('vue').Ref<string | null>
 * }} ProfileAvatarContextParams
 */

/**
 * @typedef {ProfileAvatarContextParams} ProfileAvatarContextFactoryParams
 */

/**
 * @typedef {{
 *   inputName: string
 *   alt: string
 *   isUploadingImage: boolean
 *   defaultImageUrl: string | null
 * }} PropsType
 */

/**
 * @typedef {'uploadImage'} EmitEventUnionType
 */
