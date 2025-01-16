import {
  BaseFormElementClerk,
} from '@openreachtech/furo'

/**
 * Clerk class of sign-up form element.
 *
 * @extends {BaseFormElementClerk<typeof SignInFormElementClerk, SignUpFormValueHash, SchemaVariableHash>}
 */
export default class SignInFormElementClerk extends BaseFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // email
      {
        field: 'email',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'email must be set',
      },
      {
        field: 'email',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) =>
          !it || /^[^@]+@[^@]+\.[^@]+$/u.test(it),
        message: 'email must be valid',
      },

      // password
      {
        field: 'password',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'password must be set',
      },
    ]
  }
}

/**
 * @typedef {{
 *   email: string
 *   password: string
 * }} SignUpFormValueHash
 */

/**
 * @typedef {{
 *   email: string
 *   password: string
 * }} SchemaVariableHash
 */
