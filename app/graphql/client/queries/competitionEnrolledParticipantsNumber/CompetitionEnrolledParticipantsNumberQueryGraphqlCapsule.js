import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * CompetitionEnrolledParticipantsNumber query graphql capsule.
 *
 * @extends {BaseAppGraphqlCapsule<CompetitionEnrolledParticipantsNumberQueryResponseContent>}
 */
export default class CompetitionEnrolledParticipantsNumberQueryGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `competitionEnrolledParticipantsNumber`.
   *
   * @returns {schema.graphql.CompetitionEnrolledParticipantsNumberResult | null}
   */
  extractCompetitionEnrolledParticipantsNumber () {
    return this.extractContent()
      ?.competitionEnrolledParticipantsNumber
      ?? null
  }

  /**
   * get: enrolledParticipantsNumber
   *
   * @returns {number | null} Number of enrolled participants
   */
  get enrolledParticipantsNumber () {
    return this.extractCompetitionEnrolledParticipantsNumber()
      ?.enrolledParticipantsNumber
      ?? null
  }
}

/**
 * @typedef {{
 *   competitionEnrolledParticipantsNumber: schema.graphql.CompetitionEnrolledParticipantsNumberResult
 * }} CompetitionEnrolledParticipantsNumberQueryResponseContent
 */
