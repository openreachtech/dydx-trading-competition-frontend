import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

/**
 * ProfileRenameDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class ProfileRenameDialogContext extends AppDialogContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      ...super.EMIT_EVENT_NAME,
      RENAME: 'rename',
    }
  }

  /**
   * Submit form.
   *
   * @returns {Promise<void>}
   */
  async submitForm () {
    this.emit(this.EMIT_EVENT_NAME.RENAME)
  }
}
