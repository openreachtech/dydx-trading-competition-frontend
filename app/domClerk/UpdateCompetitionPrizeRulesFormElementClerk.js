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
    return [
      {
        field: 'prizeRules',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it.length !== 0,
        message: 'Must provide prize rules',
      },
      {
        field: 'prizeRules',
        /**
         * @type {(
         *   it: PrizeRules,
         *   valueHash: Record<string, *>
         * ) => boolean}
         */
        ok: (it, valueHash) => it.every(rule => Number(rule.amount) > 0),
        message: 'Prize amount must be greater than 0',
      },
      {
        field: 'totalPrize',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Total prize must be provided',
      },
    ]
  }
}

/**
 * @typedef {{}} UpdateCompetitionPrizeRulesFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/mutations/updateCompetitionPrizeRules/UpdateCompetitionPrizeRulesMutationGraphqlPayload'
 * ).UpdateCompetitionPrizeRulesMutationRequestVariables['input']['prizeRules']} PrizeRules
 */
