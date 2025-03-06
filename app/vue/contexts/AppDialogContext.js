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
   * Generate title classes.
   *
   * @returns {Record<string, boolean>} Title classes.
   */
  generateTitleClasses () {
    return {
      hidden: this.title === null,
    }
  }
}
