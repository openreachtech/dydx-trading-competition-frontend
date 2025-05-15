import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * ToastContainerContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class ToastContainerContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ToastContainerContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    toastStore,
  }) {
    super({
      props,
      componentContext,
    })

    this.toastStore = toastStore
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ToastContainerContext ? X : never} T, X
   * @override
   * @param {ToastContainerContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    toastStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        toastStore,
      })
    )
  }

  /**
   * get: toasts
   *
   * @returns {Array<import('~/stores/toast').ExtendedToast>}
   */
  get toasts () {
    return this.toastStore
      .toastStateRef
      .value
      .toasts
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   toastStore: ReturnType<import('~/stores/toast').default>
 * }} ToastContainerContextParams
 */

/**
 * @typedef {ToastContainerContextParams} ToastContainerContextFactoryParams
 */

/**
 * @typedef {import('vue').Reactive<Record<string, boolean>>} StatusReactive
 */
