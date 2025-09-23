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
   * @returns {Array<CompetitionDynamicPrizeRule>}
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
 *   competitionCurrentDynamicPrizeRule: {
 *     currentTradingVolumeUsd: string
 *     currentDynamicPrizeRule: Array<CompetitionDynamicPrizeRule>
 *   }
 * }} CompetitionCurrentDynamicPrizeRuleQueryResponseContent
 */

/**
 * @typedef {{
 *   targetTradingVolumeUsd: string
 *   competitionPrizeCategory: {
 *     categoryId: number
 *     name: string
 *     description: string
 *   }
 *   rankFrom: number
 *   rankTo: number
 *   amount: string
 * }} CompetitionDynamicPrizeRule
 */

/**
 * @typedef {{
 *   categoryId: number
 *   name: string
 *   description: string
 * }} CompetitionPrizeCategory
 */
