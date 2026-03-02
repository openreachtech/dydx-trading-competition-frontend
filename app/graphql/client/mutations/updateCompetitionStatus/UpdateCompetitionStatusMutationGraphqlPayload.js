import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionStatusMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionStatusMutationRequestVariables>}
 */
export default class UpdateCompetitionStatusMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetitionStatus ($input: UpdateCompetitionStatusInput!) {
        updateCompetitionStatus (input: $input) {
          competitionId
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.UpdateCompetitionStatusInput
 * }} UpdateCompetitionStatusMutationRequestVariables
 */
