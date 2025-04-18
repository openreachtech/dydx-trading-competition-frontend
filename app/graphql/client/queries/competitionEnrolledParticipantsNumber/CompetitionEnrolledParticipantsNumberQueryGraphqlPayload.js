import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionEnrolledParticipantsNumber query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionEnrolledParticipantsNumberQueryRequestVariables>}
 */
export default class CompetitionEnrolledParticipantsNumberQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionEnrolledParticipantsNumberQuery ($input: CompetitionEnrolledParticipantsNumberInput!) {
        competitionEnrolledParticipantsNumber (input: $input) {
          enrolledParticipantsNumber
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *   }
 * }} CompetitionEnrolledParticipantsNumberQueryRequestVariables
 */
