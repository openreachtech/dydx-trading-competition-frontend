import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddressCurrentCompetitionQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<AddressCurrentCompetitionQueryRequestVariables>}
 */
export default class AddressCurrentCompetitionQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query AddressCurrentCompetitionQuery ($input: AddressCurrentCompetitionInput!) {
        addressCurrentCompetition (input: $input) {
          competition {
            competitionId
            title
            description
            participantUpperLimit
            participantLowerLimit
            host {
              address
              name
            }
            totalPrize
            minimumDeposit
            imageUrl
            schedules {
              category {
                categoryId
                name
                description
              }
              scheduledDatetime
            }
            status {
              statusId
              name
              phasedAt
            }
          }
          ranking {
            address {
              address
              name
            }
            performanceBaseline
            ranking
            roi
            pnl
            calculatedAt
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     address: string
 *   }
 * }} AddressCurrentCompetitionQueryRequestVariables
 */
