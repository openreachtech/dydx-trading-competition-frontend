import {
  FuroOffCanvasMenuLayoutContext,
} from '@openreachtech/furo-nuxt'

/**
 * Context class for Off Canvas Menu Layout.
 */
export default class AppOffCanvasMenuLayoutContext extends FuroOffCanvasMenuLayoutContext {
  /**
   * Close search panel.
   *
   * @returns {void}
   */
  closeSearchPanel () {
    this.rootElement
      ?.['classList']
      .remove('open-search')
  }

  /**
   * Toggle search panel.
   *
   * @returns {void}
   */
  clickToggleSearchPanel () {
    this.rootElement
      ?.['classList']
      .toggle('open-search')
  }

  /**
   * Is showed search panel.
   *
   * @returns {boolean} `true` if search panel is showed.
   */
  isShowedSearchPanel () {
    return this.rootElement
      ?.['classList']
      .contains('open-search')
      ?? false
  }

  /**
   * Handle click on backdrop.
   *
   * @returns {void}
   */
  handleBackdropClick () {
    if (this.isShowedNavigation()) {
      this.closeNavigation()
    }

    if (this.isShowedSearchPanel()) {
      this.closeSearchPanel()
    }
  }
}
