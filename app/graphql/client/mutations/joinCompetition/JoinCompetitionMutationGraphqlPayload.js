import BaseAppSignatureGraphqlPayload from '~/app/graphql/client/BaseAppSignatureGraphqlPayload'

/**
 * JoinCompetitionMutation graphql payload
 *
 * @extends {BaseAppSignatureGraphqlPayload<JoinCompetitionMutationRequestVariables>}
 */
export default class JoinCompetitionMutationGraphqlPayload extends BaseAppSignatureGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation JoinCompetition ($input: JoinCompetitionInput!) {
        joinCompetition (input: $input) {
          competitionId
        }
      }
    `
  }

  /**
   * Extract filtered variables.
   *
   * @override
   */
  extractFilteredVariables () {
    const variables = super.extractFilteredVariables()

    return /** @type {*} */ ({
      ...variables,
      input: {
        ...variables.input,
        name: variables.input
          .name
          .trim(),
      },
    })
  }
}

/**
 * @typedef {{
 *   input: {
 *     competitionId: number
 *     name: string
 *     signature: {
 *       signDoc: string
 *       signature: string
 *       publicKey: string
 *       address: string
 *     }
 *   }
 * }} JoinCompetitionMutationRequestVariables
 */
