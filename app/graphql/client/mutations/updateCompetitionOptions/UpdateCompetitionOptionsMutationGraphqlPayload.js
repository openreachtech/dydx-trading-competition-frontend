import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionOptions mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionOptionsMutationRequestVariables>}
 */
export default class UpdateCompetitionOptionsMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetitionOptionsMutation ($input: UpdateCompetitionOptionsInput!) {
        updateCompetitionOptions (input: $input) {
          success
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.UpdateCompetitionOptionsInput
 * }} UpdateCompetitionOptionsMutationRequestVariables
 */
