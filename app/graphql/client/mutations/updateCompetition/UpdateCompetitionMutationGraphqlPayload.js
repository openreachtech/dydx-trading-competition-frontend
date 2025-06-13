import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionMutationRequestVariables>}
 */
export default class UpdateCompetitionMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetition ($input: UpdateCompetitionInput!) {
        updateCompetition (input: $input) {
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
 *     title: string
 *     description: string
 *     minimumDeposit: string
 *     totalPrize: string
 *     imageUrl?: string
 *     participantLowerLimit: number
 *     participantUpperLimit: number
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} UpdateCompetitionMutationRequestVariables
 */
