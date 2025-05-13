import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * UpdateCompetitionFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof UpdateCompetitionFormElementClerk, UpdateCompetitionFormValueHash, SchemaVariableHash>}
 */
export default class UpdateCompetitionFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      {
        field: 'title',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Title can not be empty',
      },
      {
        field: 'description',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Please provide a description',
      },
    ]
  }
}

/**
 * @typedef {{}} UpdateCompetitionFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */
