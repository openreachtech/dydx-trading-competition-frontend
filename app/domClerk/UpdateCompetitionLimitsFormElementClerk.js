import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * UpdateCompetitionLimitsFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof UpdateCompetitionLimitsFormElementClerk, UpdateCompetitionLimitsFormValueHash, SchemaVariableHash>}
 */
export default class UpdateCompetitionLimitsFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      {
        field: 'participantLowerLimit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Must have a lower limit of participants',
      },
      {
        field: 'participantUpperLimit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Must have an upper limit of participants',
      },
      {
        field: 'minimumDeposit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Competition must have a minimum entry balance',
      },
    ]
  }
}

/**
 * @typedef {{}} UpdateCompetitionLimitsFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */
