import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * ParticipantsCurrentEquities query payload.
 *
 * @extends {BaseAppGraphqlPayload<ParticipantsCurrentEquitiesQueryRequestVariables>}
 */
export default class ParticipantsCurrentEquitiesQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query ParticipantsCurrentEquitiesQuery ($input: ParticipantsCurrentEquitiesInput!) {
        participantsCurrentEquities (input: $input) {
          equities {
            competitionParticipantId
            equity
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.ParticipantsCurrentEquitiesInput
 * }} ParticipantsCurrentEquitiesQueryRequestVariables
 */
