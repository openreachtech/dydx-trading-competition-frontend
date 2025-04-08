import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * Competition Statistics query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionStatisticsQueryResponseContent>}
 */
export default class CompetitionStatisticsQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract competition statistics response content.
   *
   * @returns {CompetitionStatisticsQueryResponseContent['competitionStatistics'] | null} Competition statistics response content
   */
  extractCompetitionStatistics () {
    return this.extractContent()
      ?.competitionStatistics
      ?? null
  }

  /**
   * get: totalHostedCompetitionsNumber
   *
   * @returns {number | null} Total number of hosted competitions
   */
  get totalHostedCompetitionsNumber () {
    return this.extractCompetitionStatistics()
      ?.totalHostedCompetitionsNumber
      ?? null
  }

  /**
   * get: totalEnrolledCompetitionParticipantsNumber
   *
   * @returns {number | null} Total number of enrolled competition participants
   */
  get totalEnrolledCompetitionParticipantsNumber () {
    return this.extractCompetitionStatistics()
      ?.totalEnrolledCompetitionParticipantsNumber
      ?? null
  }

  /**
   * get: totalPaidOutPrizesUsdAmount
   *
   * @returns {string | null} Total amount of paid out prizes in USD
   */
  get totalPaidOutPrizesUsdAmount () {
    return this.extractCompetitionStatistics()
      ?.totalPaidOutPrizesUsdAmount
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionStatistics: {
 *     totalHostedCompetitionsNumber: number
 *     totalEnrolledCompetitionParticipantsNumber: number
 *     totalPaidOutPrizesUsdAmount: string
 *   }
 * }} CompetitionStatisticsQueryResponseContent
 */
