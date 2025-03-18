import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * AddCompetitionFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof AddCompetitionFormElementClerk, AddCompetitionFormValueHash, SchemaVariableHash>}
 */
export default class AddCompetitionFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return []
  }
}

/**
 * @typedef {{}} AddCompetitionFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */
