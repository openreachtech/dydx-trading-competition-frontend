import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionDynamicPrizeRules query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionDynamicPrizeRulesQueryRequestVariables>}
 */
export default class CompetitionDynamicPrizeRulesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionDynamicPrizeRulesQuery ($input: CompetitionDynamicPrizeRulesInput!) {
        competitionDynamicPrizeRules (input: $input) {
          prizeRules {
            targetTradingVolumeUsd
            competitionPrizeCategory {
              categoryId
              name
              description
            }
            totalCategoryPrizeAmount
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.CompetitionDynamicPrizeRulesInput
 * }} CompetitionDynamicPrizeRulesQueryRequestVariables
 */
