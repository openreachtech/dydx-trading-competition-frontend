import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionCurrentDynamicPrizeRule query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionCurrentDynamicPrizeRuleQueryRequestVariables>}
 */
export default class CompetitionCurrentDynamicPrizeRuleQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionCurrentDynamicPrizeRuleQuery ($input: CompetitionCurrentDynamicPrizeRuleInput!) {
        competitionCurrentDynamicPrizeRule (input: $input) {
          currentTradingVolumeUsd
          currentDynamicPrizeRule {
            targetTradingVolumeUsd
            competitionPrizeCategory {
              categoryId
              name
              description
            }
            rankFrom
            rankTo
            amount
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *   }
 * }} CompetitionCurrentDynamicPrizeRuleQueryRequestVariables
 */
