import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddCompetitionMutation graphql payload
 *
 * @extends {BaseAppGraphqlPayload<typeof AddCompetitionMutationGraphqlPayload, AddCompetitionMutationRequestVariables>}
 */
export default class AddCompetitionMutationGraphqlPayload extends BaseAppGraphqlPayload {
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
 *     totalPrize: string
 *     imageId?: number
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
