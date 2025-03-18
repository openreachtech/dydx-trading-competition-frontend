import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionPrizeRulesMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionPrizeRulesMutationResponseContent>}
 */
export default class UpdateCompetitionPrizeRulesMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `updateCompetitionPrizeRules` value hash.
   *
   * @returns {UpdateCompetitionPrizeRulesMutationResponseContent['updateCompetitionPrizeRules'] | null}
   */
  extractUpdateCompetitionPrizeRulesValueHash () {
    return this.extractContent()
      ?.updateCompetitionPrizeRules
      ?? null
  }

  /**
   * get: competitionId
   *
   * @returns {UpdateCompetitionPrizeRulesMutationResponseContent['updateCompetitionPrizeRules']['competitionId'] | null}
   */
  get competitionId () {
    return this.extractUpdateCompetitionPrizeRulesValueHash()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   updateCompetitionPrizeRules: {
 *     competitionId: number
 *   }
 * }} UpdateCompetitionPrizeRulesMutationResponseContent
 */
