import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * Competitions query payload.
 *
 * @extends {BaseAppGraphqlPayload<CompetitionQueryRequestVariables>}
 */
export default class CompetitionQueryGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      query CompetitionQuery ($input: CompetitionInput!) {
        competition (input: $input) {
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
            prizeRules {
              rankFrom
              rankTo
              amount
            }
          }
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *   }
 * }} CompetitionQueryRequestVariables
 */
