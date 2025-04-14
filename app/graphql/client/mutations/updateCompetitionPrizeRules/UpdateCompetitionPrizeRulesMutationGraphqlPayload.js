import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionPrizeRulesMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionPrizeRulesMutationRequestVariables>}
 */
export default class UpdateCompetitionPrizeRulesMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetitionPrizeRules ($input: UpdateCompetitionPrizeRulesInput!) {
        updateCompetitionPrizeRules (input: $input) {
          competitionId
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *     prizeRules: Array<{
 *       rankFrom: number
 *       rankTo: number
 *       amount: string
 *     }>
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} UpdateCompetitionPrizeRulesMutationRequestVariables
 */
