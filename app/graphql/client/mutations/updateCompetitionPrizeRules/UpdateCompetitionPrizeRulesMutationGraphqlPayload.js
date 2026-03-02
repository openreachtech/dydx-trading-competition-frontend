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
 *   input: schema.graphql.UpdateCompetitionPrizeRulesInput
 * }} UpdateCompetitionPrizeRulesMutationRequestVariables
 */
