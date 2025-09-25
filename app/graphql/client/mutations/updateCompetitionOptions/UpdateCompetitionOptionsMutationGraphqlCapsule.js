import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UpdateCompetitionOptions mutation graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<UpdateCompetitionOptionsMutationResponseContent>}
 */
export default class UpdateCompetitionOptionsMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract updateCompetitionOptions response content.
   *
   * @returns {schema.graphql.UpdateCompetitionOptionsResult | null}
   */
  extractUpdateCompetitionOptionsValueHash () {
    return this.extractContent()
      ?.updateCompetitionOptions
      ?? null
  }

  /**
   * get: success
   *
   * @returns {boolean}
   */
  get success () {
    return this.extractUpdateCompetitionOptionsValueHash()
      ?.success
      ?? false
  }
}

/**
 * @typedef {{
 *   updateCompetitionOptions: schema.graphql.UpdateCompetitionOptionsResult
 * }} UpdateCompetitionOptionsMutationResponseContent
 */
