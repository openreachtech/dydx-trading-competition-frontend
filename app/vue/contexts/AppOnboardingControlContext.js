import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppOnboardingControlContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AppOnboardingControlContext extends BaseFuroContext {
  /**
   * Show wallet selection dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default
   * }} params - Parameters.
   * @returns {void}
   */
  showWalletSelectionDialog ({
    dialogElement,
  }) {
    dialogElement.showDialog()
  }
}
