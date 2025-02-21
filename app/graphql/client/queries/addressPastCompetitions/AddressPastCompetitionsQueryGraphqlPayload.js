import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * AddressPastCompetitionsQuery graphql payload
 *
 * @extends {BaseAppGraphqlPayload<typeof AddressPastCompetitionsQueryGraphqlPayload, AddressPastCompetitionsQueryRequestVariables>}
 */
export default class AddressPastCompetitionsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query AddressPastCompetitionsQuery ($input: AddressPastCompetitionsInput!) {
        addressPastCompetitions (input: $input) {
          competitions {
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
              image
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
            rank
            prize
            roi
            pnl
          }
          pagination {
            totalCount
            limit
            offset
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
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} AddressPastCompetitionsQueryRequestVariables
 */
