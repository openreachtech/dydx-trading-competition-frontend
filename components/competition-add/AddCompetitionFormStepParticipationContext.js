import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AddCompetitionFormStepParticipationContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class AddCompetitionFormStepParticipationContext extends BaseAppContext {
  /**
   * get: validationMessage
   *
   * @returns {PropsType['validationMessage']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }

  /**
   * get: initialFormValueHash
   *
   * @returns {PropsType['initialFormValueHash']}
   */
  get initialFormValueHash () {
    return this.props.initialFormValueHash
  }

  /**
   * get: initialParticipantLowerLimit
   *
   * @returns {number | null}
   */
  get initialParticipantLowerLimit () {
    return this.initialFormValueHash
      ?.participantLowerLimit
      ?? null
  }

  /**
   * get: initialParticipantUpperLimit
   *
   * @returns {number | null}
   */
  get initialParticipantUpperLimit () {
    return this.initialFormValueHash
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: initialMinimumDeposit
   *
   * @returns {string | null}
   */
  get initialMinimumDeposit () {
    return this.initialFormValueHash
      ?.minimumDeposit
      ?? null
  }
}

/**
 * @typedef {{
 *   validationMessage: furo.ValidatorHashType['message']
 *   initialFormValueHash: InitialFormValueHash | null
 * }} PropsType
 */

/**
 * @typedef {{
 *   participantLowerLimit: number | null
 *   participantUpperLimit: number | null
 *   minimumDeposit: string | null
 * }} InitialFormValueHash
 */
