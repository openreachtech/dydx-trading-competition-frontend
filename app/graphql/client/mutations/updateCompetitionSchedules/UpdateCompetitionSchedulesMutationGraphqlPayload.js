import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * UpdateCompetitionSchedulesMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<UpdateCompetitionSchedulesMutationRequestVariables>}
 */
export default class UpdateCompetitionSchedulesMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UpdateCompetitionSchedules ($input: UpdateCompetitionSchedulesInput!) {
        updateCompetitionSchedules (input: $input) {
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
 *     schedules: Array<{
 *       categoryId: number
 *       scheduledDatetime: string
 *     }>
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} UpdateCompetitionSchedulesMutationRequestVariables
 */
