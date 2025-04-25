import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionLimits mutation GraphQL capsule.
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionLimitsMutationResponseContent>}
 */
export default class UpdateCompetitionLimitsMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `updateCompetitionLimits`.
   *
   * @returns {UpdateCompetitionLimitsMutationResponseContent['updateCompetitionLimits'] | null} Update competition limits response content
   */
  extractUpdateCompetitionLimits () {
    return this.extractContent()
      ?.updateCompetitionLimits
      ?? null
  }

  /**
   * get: competitionId.
   *
   * @returns {number | null} Competition ID
   */
  get competitionId () {
    return this.extractUpdateCompetitionLimits()
      ?.competitionId
      ?? null
  }
}

/**
 * @typedef {{
 *   updateCompetitionLimits: {
 *     competitionId: number
 *   }
 * }} UpdateCompetitionLimitsMutationResponseContent
 */
