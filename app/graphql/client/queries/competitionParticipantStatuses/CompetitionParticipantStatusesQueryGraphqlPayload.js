import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * Competition participant statuses query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionParticipantStatusesQueryRequestVariables>}
 */
export default class CompetitionParticipantStatusesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionParticipantStatusesQuery {
        competitionParticipantStatuses {
          statuses {
            description
            name
            statusId
          }
        }
      }
    `
  }
}

/**
 * @typedef {{}} CompetitionParticipantStatusesQueryRequestVariables
 */
