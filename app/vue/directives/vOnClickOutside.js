/**
 * @satisfies {Partial<CSSStyleDeclaration>}
 */
const HIDDEN_STYLE = /** @type {const} */ ({
  display: 'none',
  visibility: 'hidden',
  opacity: '0',
  width: '0px',
  height: '0px',
})

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

    if (
      isHidden({
        style: window.getComputedStyle(targetElement),
      })
    ) {
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
 * Check if an element is hidden.
 *
 * @param {{
 *   style: CSSStyleDeclaration
 * }} params - Parameters.
 * @returns {boolean} `true` if considered hidden.
 */
function isHidden ({
  style,
}) {
  const hiddenStyleProperties = /** @type {Array<HiddenStyleProperty>} */ (
    Object.keys(HIDDEN_STYLE)
  )

  return hiddenStyleProperties
    .some(property => style[property] === HIDDEN_STYLE[property])
}

/**
 * Noop. Intended to do nothing.
 *
 * @returns {void}
 */
function noop () {
  // Does nothing.
}

/**
 * @typedef {keyof typeof HIDDEN_STYLE} HiddenStyleProperty
 */
