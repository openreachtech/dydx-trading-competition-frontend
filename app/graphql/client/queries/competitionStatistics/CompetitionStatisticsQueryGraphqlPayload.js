import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * Competition Statistics query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionStatisticsQueryRequestVariables>}
 */
export default class CompetitionStatisticsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionStatistics {
        competitionStatistics {
          totalHostedCompetitionsNumber
          totalEnrolledCompetitionParticipantsNumber
          totalPaidOutPrizesUsdAmount
        }
      }
    `
  }
}

/**
 * @typedef {{}} CompetitionStatisticsQueryRequestVariables
 */
