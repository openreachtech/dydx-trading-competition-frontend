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
   * @returns {CompetitionEntity | null} Competition object.
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
   * get: schedules
   *
   * @returns {CompetitionEntity['schedules']} Schedules as an array.
   */
  get schedules () {
    return this.extractCompetition()
      ?.schedules
      ?? []
  }

  /**
   * get: prizeRules
   *
   * @returns {CompetitionEntity['prizeRules']} Prize rules as an array.
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
   * @returns {Host | null}
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
}

/**
 * @typedef {{
 *   competition: {
 *     competition: CompetitionEntity
 *   }
 * }} CompetitionQueryResponseContent
 */

/**
 * @typedef {{
 *   competitionId: number
 *   title: string
 *   description: string
 *   participantUpperLimit: number
 *   participantLowerLimit: number
 *   host: Host
 *   totalPrize: number
 *   minimumDeposit: string
 *   minimumTradingVolume: string
 *   imageUrl?: string
 *   schedules: Array<Schedule>
 *   status: Status
 *   prizeRules: Array<PrizeRule>
 *   outcomeCsvUrl?: string
 * }} CompetitionEntity
 */

/**
 * @typedef {{
 *   address: string
 *   name: string
 * }} Host
 */

/**
 * @typedef {{
 *   category: {
 *     categoryId: number
 *     name: string
 *     description: string
 *   }
 *   scheduledDatetime: string
 * }} Schedule
 */

/**
 * @typedef {{
 *   rankFrom: number
 *   rankTo: number
 *   amount: string
 * }} PrizeRule
 */

/**
 * @typedef {{
 *   statusId: number
 *   name: string
 *   phasedAt: string
 * }} Status
 */
