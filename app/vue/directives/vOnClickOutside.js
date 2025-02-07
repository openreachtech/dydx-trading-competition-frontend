/** @type {import('vue').ObjectDirective} */
export const vOnClickOutside = {
  mounted (
    element,
    binding
  ) {
    const clearClickOutsideListener = handleClickOutside({
      targetElement: element,
      callback: binding.value,
    })

    Object.assign(element, {
      __clearClickOutsideListener: clearClickOutsideListener,
    })
  },
  unmounted (element) {
    element.__clearClickOutsideListener()
  },
}

/**
 * Handle click outside.
 *
 * @param {{
 *   targetElement: HTMLElement
 *   callback: (mouseEvent: MouseEvent) => void
 * }} params - Parameters.
 * @returns {() => void} Clear function.
 */
function handleClickOutside ({
  targetElement,
  callback,
}) {
  if (!document) {
    return noop
  }

  document.addEventListener('click', listener)

  /**
   * Clear event listener.
   *
   * @returns {void}
   */
  function clearEventListener () {
    document.removeEventListener('click', listener)
  }

  /**
   * Event listener.
   *
   * @param {MouseEvent} mouseEvent - Mouse event.
   * @returns {void}
   */
  function listener (mouseEvent) {
    if (!targetElement) {
      return
    }

    const isHidden = window.getComputedStyle(targetElement).display === 'none'

    if (isHidden) {
      return
    }

    const isTargetIncluded = mouseEvent.composedPath()
      .includes(targetElement)

    if (
      targetElement === mouseEvent.target
      || isTargetIncluded
    ) {
      return
    }

    callback(mouseEvent)
  }

  return clearEventListener
}

/**
 * Noop. Intended to do nothing.
 *
 * @returns {void}
 */
function noop () {
  // Does nothing.
}
