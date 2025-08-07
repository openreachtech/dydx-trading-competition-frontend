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
 *   input: {
 *     title: string
 *     description: string
 *     minimumDeposit: string
 *     minimumTradingVolume: string
 *     totalPrize: string
 *     imageUrl?: string
 *     participantUpperLimit: number
 *     participantLowerLimit: number
 *     schedules: Array<{
 *       categoryId: number
 *       scheduledDatetime: string // ISO string
 *     }>
 *     prizeRules: Array<{
 *       rankFrom: number
 *       rankTo: number
 *       amount: string
 *     }>
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} AddCompetitionMutationRequestVariables
 */
