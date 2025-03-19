import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

/**
 * PutAddressNameFormElementClerk
 *
 * @extends {BaseFilteredFormElementClerk<typeof PutAddressNameFormElementClerk, PutAddressNameFormElementClerkFormValueHash, SchemaVariableHash>}
 */
export default class PutAddressNameFormElementClerk extends BaseFilteredFormElementClerk {
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
    ]
  }
}

/**
 * @typedef {{
 *   name: string
 * }} PutAddressNameFormElementClerkFormValueHash
 */

/**
 * @typedef {{
 *   name: string
 * }} SchemaVariableHash
 */
