import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

/**
 * CompetitionCancelationDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class CompetitionCancelationDialogContext extends AppDialogContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      UNREGISTER_FROM_COMPETITION: 'unregisterFromCompetition',
    }
  }

  /**
   * get: competitionName
   *
   * @returns {string}
   */
  get competitionName () {
    return this.props.competitionName
  }

  /**
   * get: isUnregisteringFromCompetition
   *
   * @returns {boolean}
   */
  get isUnregisteringFromCompetition () {
    return this.props.isUnregisteringFromCompetition
  }

  /**
   * Unregister from competition.
   *
   * @returns {void}
   */
  unregisterFromCompetition () {
    this.emit(this.EMIT_EVENT_NAME.UNREGISTER_FROM_COMPETITION)
  }
}
