import {
  FuroButtonDialogContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppDialogContext
 *
 * @extends {FuroButtonDialogContext}
 */
export default class AppDialogContext extends FuroButtonDialogContext {
  /**
   * get: title
   *
   * @returns {string} Dialog's title.
   */
  get title () {
    return this.props.title
  }

  /**
   * Generate default header classes.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateDefaultHeaderClasses () {
    return {
      'no-title': this.title === null,
    }
  }
}
