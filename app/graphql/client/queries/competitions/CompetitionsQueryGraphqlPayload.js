import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * Competitions query payload.
 *
 * @extends {BaseAppGraphqlPayload<typeof CompetitionsQueryGraphqlPayload, CompetitionsQueryRequestVariables>}
 */
export default class CompetitionsQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionsQuery ($input: CompetitionsInput!) {
        competitions (input: $input) {
          competitions {
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
 *     title?: string
 *     statusId?: number
 *     hostAddress?: string
 *     pagination: {
 *       limit: number
 *       offset: number
 *       sort?: {
 *         targetColumn: string
 *         orderBy: string
 *       }
 *     }
 *   }
 * }} CompetitionsQueryRequestVariables
 */
