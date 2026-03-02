import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * BulkUpdateParticipantStatus mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<BulkUpdateParticipantStatusMutationRequestVariables>}
 */
export default class BulkUpdateParticipantStatusMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation BulkUpdateParticipantStatusMutation ($input: BulkUpdateParticipantStatusInput!) {
        bulkUpdateParticipantStatus (input: $input) {
          success
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: schema.graphql.BulkUpdateParticipantStatusInput
 * }} BulkUpdateParticipantStatusMutationRequestVariables
 */
