import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionParticipant query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionParticipantQueryRequestVariables>}
 */
export default class CompetitionParticipantQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionParticipant ($input: CompetitionParticipantInput!) {
        competitionParticipant (input: $input) {
          participant {
            address {
              address
              name
            }
            status {
              statusId
              name
              phasedAt
            }
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *     address: string
 *   }
 * }} CompetitionParticipantQueryRequestVariables
 */
