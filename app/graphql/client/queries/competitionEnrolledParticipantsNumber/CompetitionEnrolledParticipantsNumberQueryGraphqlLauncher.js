import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionEnrolledParticipantsNumberQueryGraphqlPayload from './CompetitionEnrolledParticipantsNumberQueryGraphqlPayload'
import CompetitionEnrolledParticipantsNumberQueryGraphqlCapsule from './CompetitionEnrolledParticipantsNumberQueryGraphqlCapsule'

/**
 * CompetitionEnrolledParticipantsNumber query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionEnrolledParticipantsNumberQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionEnrolledParticipantsNumberQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionEnrolledParticipantsNumberQueryGraphqlCapsule
  }
}
