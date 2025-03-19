import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * JoinCompetitionFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof JoinCompetitionFormElementClerk, JoinCompetitionFormValueHash, SchemaVariableHash>}
 */
export default class JoinCompetitionFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      {
        field: 'name',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Username can not be empty.',
      },
      {
        field: 'competitionId',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Competition ID does not exist.',
      },
    ]
  }
}

/**
 * @typedef {{}} JoinCompetitionFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */
