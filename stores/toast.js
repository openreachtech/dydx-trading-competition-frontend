import {
  useState,
} from '#imports'

/**
 * Use `toast` store.
 *
 * @returns {ToastStore}
 */
export default function useToastStore () {
  /** @type {ToastState} */
  const defaultToastState = {
    toasts: [],
  }

  const toastStateRef = useState('toast', () => defaultToastState)

  return {
    toastStateRef,
    add,
    dismiss,
  }

  /**
   * Add a toast notification.
   *
   * @param {Toast} toast
   * @returns {void}
   */
  function add (toast) {
    const newToast = {
      ...toast,
      id: Symbol('toast-id'),
    }

    toastStateRef.value
      .toasts
      .push(newToast)
  }

  /**
   * Dismiss a toast notification.
   *
   * @param {{
   *   id: symbol
   * }} params - Paramters.
   * @returns {void}
   */
  function dismiss ({
    id,
  }) {
    const indexOfTarget = toastStateRef.value
      .toasts
      .findIndex(toast => toast.id === id)

    toastStateRef.value
      .toasts
      .splice(indexOfTarget, 1)
  }
}

/**
 * @typedef {{
 *   toastStateRef: import('vue').Ref<ToastState>
 *   add: (toast: Toast) => void
 *   dismiss: (params: {
 *     id: symbol
 *   }) => void
 * }} ToastStore
 */

/**
 * @typedef {{
 *   toasts: Array<ExtendedToast>
 * }} ToastState
 */

/**
 * @typedef {{
 *   message: string
 *   color: ToastColors
 *   timeout?: number
 *   shouldHideProgressBar?: boolean
 *   shouldPauseOnHover?: boolean
 *   iconName?: string
 * }} Toast
 */

/**
 * @typedef {Toast & {
 *   id: symbol
 * }} ExtendedToast
 */

/**
 * @typedef {'neutral'
 *   | 'success'
 *   | 'error'
 *   | 'warning'
 *   | 'info'
 * } ToastColors
 */
