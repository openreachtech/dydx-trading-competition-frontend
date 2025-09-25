import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionDynamicPrizeRules query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionDynamicPrizeRulesQueryResponseContent>}
 */
export default class CompetitionDynamicPrizeRulesQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competitionDynamicPrizeRules response content.
   *
   * @returns {schema.graphql.CompetitionDynamicPrizeRulesResult | null}
   */
  extractCompetitionDynamicPrizeRulesValueHash () {
    return this.extractContent()
      ?.competitionDynamicPrizeRules
      ?? null
  }

  /**
   * get: prizeRules
   *
   * @returns {Array<schema.graphql.CompetitionDynamicPrizeRuleSummary>}
   */
  get prizeRules () {
    return this.extractCompetitionDynamicPrizeRulesValueHash()
      ?.prizeRules
      ?? []
  }
}

/**
 * @typedef {{
 *   competitionDynamicPrizeRules: schema.graphql.CompetitionDynamicPrizeRulesResult
 * }} CompetitionDynamicPrizeRulesQueryResponseContent
 */
