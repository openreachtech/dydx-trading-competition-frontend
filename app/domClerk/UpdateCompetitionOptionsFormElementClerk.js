import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * UpdateCompetitionPrizeRulesFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof UpdateCompetitionPrizeRulesFormElementClerk, UpdateCompetitionPrizeRulesFormValueHash, SchemaVariableHash>}
 */
export default class UpdateCompetitionPrizeRulesFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return []
  }
}

/**
 * @typedef {{}} UpdateCompetitionPrizeRulesFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */
