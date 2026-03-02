import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Competitions query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionsQueryResponseContent>}
 */
export default class CompetitionsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competitions.
   *
   * @returns {CompetitionsQueryResponseContent['competitions']['competitions']} An array of competition.
   */
  extractCompetitions () {
    const content = this.extractContent()

    return content
      ?.competitions
      ?.competitions
      ?? []
  }

  /**
   * Extract pagination.
   *
   * @returns {CompetitionsQueryResponseContent['competitions']['pagination'] | null}
   */
  extractPagination () {
    const context = this.extractContent()

    return context
      ?.competitions
      ?.pagination
      ?? null
  }

  /**
   * get: totalCount
   *
   * @returns {CompetitionsQueryResponseContent['competitions']['pagination']['totalCount'] | null}
   */
  get totalCount () {
    return this.extractPagination()
      ?.totalCount
      ?? null
  }
}

/**
 * @typedef {{
 *   competitions: schema.graphql.CompetitionsResult
 * }} CompetitionsQueryResponseContent
 */
