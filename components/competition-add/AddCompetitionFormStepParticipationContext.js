import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AddCompetitionFormStepParticipationContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class AddCompetitionFormStepParticipationContext extends BaseFuroContext {
  /**
   * get: validationMessage
   *
   * @returns {PropsType['validationMessage']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }
}

/**
 * @typedef {{
 *   validationMessage: furo.ValidatorHashType['message']
 * }} PropsType
 */
