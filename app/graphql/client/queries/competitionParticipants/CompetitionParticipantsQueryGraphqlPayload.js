import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * CompetitionParticipants query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionParticipantsQueryRequestVariables>}
 */
export default class CompetitionParticipantsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionParticipantsQuery ($input: CompetitionParticipantsInput!) {
        competitionParticipants (input: $input) {
          myParticipation {
            competitionParticipantId
            address {
              address
              name
            }
            status {
              statusId
              name
              phasedAt
            }
            equity
          }
          participants {
            competitionParticipantId
            address {
              address
              name
            }
            status {
              statusId
              name
              phasedAt
            }
            equity
          }
          pagination {
            totalCount
            limit
            offset
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.CompetitionParticipantsInput
 * }} CompetitionParticipantsQueryRequestVariables
 */
