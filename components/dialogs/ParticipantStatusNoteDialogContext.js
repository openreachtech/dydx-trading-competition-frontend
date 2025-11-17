import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * ParticipantStatusNoteDialogContext
 *
 * @extends {BaseAppContext<null, {}, null>}
 */
export default class ParticipantStatusNoteDialogContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {ParticipantStatusNoteDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    dialogComponentShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.dialogComponentShallowRef = dialogComponentShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ParticipantStatusNoteDialogContext ? X : never} T, X
   * @override
   * @param {ParticipantStatusNoteDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentShallowRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentShallowRef,
      })
    )
  }

  /**
   * Setup component.
   *
   * @template {X extends ParticipantStatusNoteDialogContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.expose(
      this.generateExposeHash()
    )

    return this
  }

  /**
   * Generate expose() hash.
   *
   * @override
   * @returns {{
   *   showDialog: () => void
   *   dismissDialog: () => void
   * }}
   */
  generateExposeHash () {
    return {
      showDialog: () => this.showDialog(),
      dismissDialog: () => this.dismissDialog(),
    }
  }

  /**
   * Show dialog.
   *
   * @returns {void}
   */
  showDialog () {
    this.dialogComponentShallowRef.value
      ?.showDialog()
  }

  /**
   * Dismiss dialog.
   *
   * @returns {void}
   */
  dismissDialog () {
    this.dialogComponentShallowRef.value
      ?.dismissDialog()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   dialogComponentShallowRef: import('vue').ShallowRef<import('~/components/units/AppDialog.vue').default | null>
 * }} ParticipantStatusNoteDialogContextParams
 */

/**
 * @typedef {ParticipantStatusNoteDialogContextParams} ParticipantStatusNoteDialogContextFactoryParams
 */
