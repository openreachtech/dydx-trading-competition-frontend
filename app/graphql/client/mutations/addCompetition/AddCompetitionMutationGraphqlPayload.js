import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * AddCompetitionMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<AddCompetitionMutationRequestVariables>}
 */
export default class AddCompetitionMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation AddCompetitionMutation ($input: AddCompetitionInput!) {
        addCompetition (input: $input) {
          competitionId
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.AddCompetitionInput
 * }} AddCompetitionMutationRequestVariables
 */
