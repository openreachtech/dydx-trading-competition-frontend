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
export default {
  mounted (
    element,
    binding
  ) {
    const clearClickOutsideListener = handleClickOutside({
      targetElement: element,
      callback: binding.value,
    })

    // TODO (FIXME): There is disallowed code to re-assign arguments of function.
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
export function handleClickOutside ({
  targetElement,
  callback,
}) {
  if (!document) {
    return noop
  }

  const listener = createListener({
    targetElement,
    callback,
  })

  document.addEventListener('mousedown', listener)

  const listenerCleaner = createListenerCleaner({
    listener,
  })

  return listenerCleaner
}

/**
 * Create listener.
 *
 * @param {{
 *   targetElement: HTMLElement
 *   callback: (mouseEvent: MouseEvent) => void
 * }} params - Parameters.
 * @returns {(mouseEvent: MouseEvent) => void} Listener function.
 */
export function createListener ({
  targetElement,
  callback,
}) {
  return listener

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

    if (
      hasNoDimension({
        targetElement,
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
}

/**
 * Create listener cleaner.
 *
 * @param {{
 *   listener: (mouseEvent: MouseEvent) => void
 * }} params - Parameters.
 * @returns {() => void} Cleaner function.
 */
export function createListenerCleaner ({
  listener,
}) {
  return cleaner

  /**
   * Clear event listener.
   *
   * @returns {void}
   */
  function cleaner () {
    document.removeEventListener('mousedown', listener)
  }
}

/**
 * Check if an element is hidden.
 *
 * @param {{
 *   style: CSSStyleDeclaration
 * }} params - Parameters.
 * @returns {boolean} `true` if considered hidden.
 */
export function isHidden ({
  style,
}) {
  const hiddenStyleProperties = /** @type {Array<HiddenStyleProperty>} */ (
    Object.keys(HIDDEN_STYLE)
  )

  return hiddenStyleProperties
    .some(property => style[property] === HIDDEN_STYLE[property])
}

/**
 * Check if the inner size of an element is zero.
 *
 * @param {{
 *   targetElement: HTMLElement
 * }} params - Parameters.
 * @returns {boolean} `true` if has no dimension.
 */
export function hasNoDimension ({
  targetElement,
}) {
  const {
    clientWidth,
    clientHeight,
  } = targetElement

  return clientHeight === 0
    || clientWidth === 0
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
