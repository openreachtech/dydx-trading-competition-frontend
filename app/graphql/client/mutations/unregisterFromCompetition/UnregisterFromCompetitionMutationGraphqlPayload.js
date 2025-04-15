import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UnregisterFromCompetition mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<UnregisterFromCompetitionMutationRequestVariables>}
 */
export default class UnregisterFromCompetitionMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UnregisterFromCompetitionMutation ($input: UnregisterFromCompetitionInput!) {
        unregisterFromCompetition (input: $input) {
          competitionId
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} UnregisterFromCompetitionMutationRequestVariables
 */
