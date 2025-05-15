import {
  onMounted,
  onBeforeUnmount,
} from 'vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppToastContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class AppToastContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppToastContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    toastStore,
    isRunningRef,
    progressBarElementShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.toastStore = toastStore
    this.isRunningRef = isRunningRef
    this.progressBarElementShallowRef = progressBarElementShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppToastContext ? X : never} T, X
   * @override
   * @param {AppToastContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    toastStore,
    isRunningRef,
    progressBarElementShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        toastStore,
        isRunningRef,
        progressBarElementShallowRef,
      })
    )
  }

  /**
   * get: id
   *
   * @returns {symbol}
   */
  get id () {
    return this.props.id
  }

  /**
   * get: title
   *
   * @returns {string | null}
   */
  get title () {
    return this.props.title
  }

  /**
   * get: message
   *
   * @returns {string}
   */
  get message () {
    return this.props.message
  }

  /**
   * get: color
   *
   * @returns {import('~/stores/toast').ToastColors}
   */
  get color () {
    return this.props.color
  }

  /**
   * get: timeout
   *
   * @returns {number}
   */
  get timeout () {
    return this.props.timeout
  }

  /**
   * get: shouldHideProgressBar
   *
   * @returns {boolean}
   */
  get shouldHideProgressBar () {
    return this.props.shouldHideProgressBar
  }

  /**
   * get: shouldPauseOnHover
   *
   * @returns {boolean}
   */
  get shouldPauseOnHover () {
    return this.props.shouldPauseOnHover
  }

  /**
   * get: iconName
   *
   * @returns {string}
   */
  get iconName () {
    return this.props.iconName
  }

  /**
   * get: isRunning
   *
   * @returns {boolean}
   */
  get isRunning () {
    return this.isRunningRef.value
  }

  /**
   * get: progressBarElement
   *
   * @returns {HTMLDivElement | null}
   */
  get progressBarElement () {
    return this.progressBarElementShallowRef.value
  }

  /**
   * Setup component.
   *
   * @template {X extends AppToastContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    onMounted(() => {
      if (!this.progressBarElement) {
        return
      }

      this.progressBarElement.addEventListener(
        'animationend',
        () => this.dismissToast()
      )
    })

    onBeforeUnmount(() => {
      if (!this.progressBarElement) {
        return
      }

      this.progressBarElement.removeEventListener(
        'animationend',
        () => this.dismissToast()
      )
    })

    return this
  }

  /**
   * Dismiss toast.
   *
   * @returns {void}
   */
  dismissToast () {
    this.toastStore.dismiss({
      id: this.id,
    })
  }

  /**
   * Handle event on mouseenter.
   *
   * @param {{
   *   mouseEvent: MouseEvent
   * }} params - Parameters.
   * @returns {void}
   */
  onMouseEnter ({
    mouseEvent,
  }) {
    if (!this.shouldPauseOnHover) {
      return
    }

    this.isRunningRef.value = false
  }

  /**
   * Handle event on mouseleave.
   *
   * @param {{
   *   mouseEvent: MouseEvent
   * }} params - Parameters.
   * @returns {void}
   */
  onMouseLeave ({
    mouseEvent,
  }) {
    if (this.isRunning) {
      return
    }

    this.isRunningRef.value = true
  }

  /**
   * Generate `animationPlayState` for progress bar.
   *
   * @returns {'running' | 'paused'}
   */
  generateProgressBarAnimationPlayState () {
    return this.isRunning
      ? 'running'
      : 'paused'
  }

  /**
   * Generate `visibility` for progress bar.
   *
   * @returns {'hidden' | 'visible'}
   */
  generateProgressBarVisibility () {
    return this.shouldHideProgressBar
      ? 'hidden'
      : 'visible'
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   toastStore: import('~/stores/toast').ToastStore
 *   isRunningRef: import('vue').Ref<boolean>
 *   progressBarElementShallowRef: import('vue').ShallowRef<HTMLDivElement | null>
 * }} AppToastContextParams
 */

/**
 * @typedef {AppToastContextParams} AppToastContextFactoryParams
 */

/**
 * @typedef {Required<import('~/stores/toast').ExtendedToast>} PropsType
 */
