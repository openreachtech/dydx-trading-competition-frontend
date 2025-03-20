import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

/**
 * CompetitionEnrollmentDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class CompetitionEnrollmentDialogContext extends AppDialogContext {
  /**
   * Constructor
   *
   * @param {CompetitionEnrollmentDialogContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    dialogComponentRef,
    route,
  }) {
    super({
      props,
      componentContext,
      dialogComponentRef,
    })

    this.route = route
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionEnrollmentDialogContext ? X : never} T, X
   * @override
   * @param {CompetitionEnrollmentDialogContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    dialogComponentRef,
    route,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        dialogComponentRef,
        route,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      JOIN_COMPETITION: 'joinCompetition',
    }
  }

  /**
   * Generate competition id.
   *
   * @returns {string}
   */
  generateCompetitionId () {
    return Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
  }

  /**
   * Submit form.
   *
   * @param {{
   *   formElement: HTMLFormElement | null
   * }} params - Parameters.
   * @returns {void}
   */
  submitForm ({
    formElement,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME.JOIN_COMPETITION,
      {
        formElement,
      }
    )
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/concretes/FuroButtonDialogContext').FuroButtonDialogContextParams & {
 *   route: ReturnType<import('#imports').useRoute>
 * }} CompetitionEnrollmentDialogContextParams
 */

/**
 * @typedef {CompetitionEnrollmentDialogContextParams} CompetitionEnrollmentDialogContextFactoryParams
 */
