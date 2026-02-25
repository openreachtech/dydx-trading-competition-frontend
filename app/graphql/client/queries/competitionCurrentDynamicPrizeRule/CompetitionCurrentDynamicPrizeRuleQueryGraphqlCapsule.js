import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionCurrentDynamicPrizeRule query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionCurrentDynamicPrizeRuleQueryResponseContent>}
 */
export default class CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competitionCurrentDynamicPrizeRule response content.
   *
   * @returns {CompetitionCurrentDynamicPrizeRuleQueryResponseContent['competitionCurrentDynamicPrizeRule'] | null}
   */
  extractCompetitionCurrentDynamicPrizeRuleValueHash () {
    return this.extractContent()
      ?.competitionCurrentDynamicPrizeRule
      ?? null
  }

  /**
   * get: currentTradingVolumeUsd
   *
   * @returns {string | null}
   */
  get currentTradingVolumeUsd () {
    return this.extractCompetitionCurrentDynamicPrizeRuleValueHash()
      ?.currentTradingVolumeUsd
      ?? null
  }

  /**
   * get: currentDynamicPrizeRule
   *
   * @returns {Array<schema.graphql.CompetitionDynamicPrizeRule>}
   * @todo: Should be plural "rules", but keeping the same with Backend for now.
   */
  get currentDynamicPrizeRule () {
    return this.extractCompetitionCurrentDynamicPrizeRuleValueHash()
      ?.currentDynamicPrizeRule
      ?? []
  }
}

/**
 * @typedef {{
 *   competitionCurrentDynamicPrizeRule: schema.graphql.CompetitionCurrentDynamicPrizeRuleResult
 * }} CompetitionCurrentDynamicPrizeRuleQueryResponseContent
 */
