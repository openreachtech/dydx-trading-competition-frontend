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
          participants {
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
 *   input: {
 *     competitionId: number
 *     statusId?: number
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         limit: number
 *         offset: number
 *       }
 *     }
 *   }
 * }} CompetitionParticipantsQueryRequestVariables
 */
