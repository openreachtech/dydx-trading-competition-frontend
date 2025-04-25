import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionLimits mutation payload.
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionLimitsMutationRequestVariables>}
 */
export default class UpdateCompetitionLimitsMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetitionLimitsMutation ($input: UpdateCompetitionLimitsInput!) {
        updateCompetitionLimits (input: $input) {
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
 *     participantUpperLimit: number
 *     participantLowerLimit: number
 *     minimumDeposit: string
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} UpdateCompetitionLimitsMutationRequestVariables
 */
