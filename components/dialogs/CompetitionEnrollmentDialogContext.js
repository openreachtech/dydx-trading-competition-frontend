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
   * get: validationMessage
   *
   * @returns {furo.ValidatorHashType['message']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }

  /**
   * get: competition
   *
   * @returns {PropsType['competition']}
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: initialUsername
   *
   * @returns {PropsType['initialUsername']}
   */
  get initialUsername () {
    return this.props.initialUsername
  }

  /**
   * get: errorMessageHash
   *
   * @returns {PropsType['errorMessageHash']}
   */
  get errorMessageHash () {
    return this.props.errorMessageHash
  }

  /**
   * get: minimumDeposit
   *
   * @returns {string | null}
   */
  get minimumDeposit () {
    return this.competition
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: joinCompetitionErrorMessage
   *
   * @returns {string | null}
   */
  get joinCompetitionErrorMessage () {
    return this.errorMessageHash
      ?.joinCompetition
      ?? null
  }

  /**
   * Normalize minimum deposit.
   *
   * @returns {string}
   */
  normalizeMinimumDeposit () {
    if (!this.minimumDeposit) {
      return '--'
    }

    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
    })

    return formatter.format(Number(this.minimumDeposit))
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

/**
 * @typedef {{
 *   competition: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity | null
 *   initialUsername: string | null
 *   validationMessage: furo.ValidatorHashType['message']
 *   errorMessageHash: import('vue').Reactive<
 *     import('~/pages/(competitions)/competitions/[competitionId]/CompetitionDetailsPageMutationContext').ErrorMessageHash
 *   > | null
 * }} PropsType
 */
