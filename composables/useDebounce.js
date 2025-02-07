/**
 * Debounce execution of a function.
 *
 * @param {{
 *   callback: Function
 *   timeInMs?: number
 * }} callback
 * @returns {(...args: Array<any>) => void} Debounced function.
 */
export function useDebounce ({
  callback,
  timeInMs = 300,
}) {
  /** @type {{ current: ReturnType<typeof setTimeout> | null }} */
  const timerRef = {
    current: null,
  }

  /**
   * Debounced function.
   *
   * @param {Array<any>} args
   * @returns {void}
   */
  return (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      callback(...args)
    }, timeInMs)
  }
}
