import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Competition query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionQueryResponseContent>}
 */
export default class CompetitionQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competition.
   *
   * @returns {schema.graphql.Competition | null} Competition object.
   */
  extractCompetition () {
    const content = this.extractContent()

    return content
      ?.competition
      ?.competition
      ?? null
  }

  /**
   * get: title
   *
   * @returns {string | null}
   */
  get title () {
    return this.extractCompetition()
      ?.title
      ?? null
  }

  /**
   * get: description
   *
   * @returns {string | null}
   */
  get description () {
    return this.extractCompetition()
      ?.description
      ?? null
  }

  /**
   * get: imageUrl
   *
   * @returns {string | null}
   */
  get imageUrl () {
    return this.extractCompetition()
      ?.imageUrl
      ?? null
  }

  /**
   * get: minimumDeposit
   *
   * @returns {string | null}
   */
  get minimumDeposit () {
    return this.extractCompetition()
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: minimumTradingVolume
   *
   * @returns {string | null}
   */
  get minimumTradingVolume () {
    return this.extractCompetition()
      ?.minimumTradingVolume
      ?? null
  }

  /**
   * get: schedules
   *
   * @returns {Array<schema.graphql.CompetitionSchedule>} Schedules as an array.
   */
  get schedules () {
    return this.extractCompetition()
      ?.schedules
      ?? []
  }

  /**
   * get: prizeRules
   *
   * @returns {Array<schema.graphql.CompetitionPrizeRule>} Prize rules as an array.
   */
  get prizeRules () {
    return this.extractCompetition()
      ?.prizeRules
      ?? []
  }

  /**
   * get: statusId
   *
   * @returns {number | null}
   */
  get statusId () {
    return this.extractCompetition()
      ?.status
      ?.statusId
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {number | null}
   */
  get participantUpperLimit () {
    return this.extractCompetition()
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: participantLowerLimit
   *
   * @returns {number | null}
   */
  get participantLowerLimit () {
    return this.extractCompetition()
      ?.participantLowerLimit
      ?? null
  }

  /**
   * get: host
   *
   * @returns {schema.graphql.AddressSummary | null}
   */
  get host () {
    return this.extractCompetition()
      ?.host
      ?? null
  }

  /**
   * get: hostAddress
   *
   * @returns {string | null}
   */
  get hostAddress () {
    return this.host
      ?.address
      ?? null
  }

  /**
   * get: hostName
   *
   * @returns {string | null}
   */
  get hostName () {
    return this.host
      ?.name
      ?? null
  }

  /**
   * get: outcomeCsvUrl
   *
   * @returns {string | null}
   */
  get outcomeCsvUrl () {
    return this.extractCompetition()
      ?.outcomeCsvUrl
      ?? null
  }

  /**
   * get: defaultLeaderboardSortOption
   *
   * @returns {schema.graphql.SortOption | null}
   */
  get defaultLeaderboardSortOption () {
    return this.extractCompetition()
      ?.defaultLeaderboardSortOption
      ?? null
  }
}

/**
 * @typedef {{
 *   competition: schema.graphql.CompetitionResult
 * }} CompetitionQueryResponseContent
 */
