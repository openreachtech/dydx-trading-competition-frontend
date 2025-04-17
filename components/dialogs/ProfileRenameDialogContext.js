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
      UPDATE_USERNAME: 'updateUsername',
    }
  }

  /**
   * get: isRenaming
   *
   * @returns {boolean}
   */
  get isRenaming () {
    return this.props.isRenaming
  }

  /**
   * get: initialUsername
   *
   * @returns {string}
   */
  get initialUsername () {
    return this.props.initialUsername
  }

  /**
   * get: errorMessage
   *
   * @returns {string | null}
   */
  get errorMessage () {
    return this.props.errorMessage
  }

  /**
   * Submit form.
   *
   * @param {{
   *   formElement: HTMLFormElement | null
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async submitForm ({
    formElement,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME.UPDATE_USERNAME,
      {
        formElement,
      }
    )
  }
}
