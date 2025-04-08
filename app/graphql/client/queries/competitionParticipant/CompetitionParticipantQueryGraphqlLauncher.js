import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionParticipantQueryGraphqlPayload from './CompetitionParticipantQueryGraphqlPayload'
import CompetitionParticipantQueryGraphqlCapsule from './CompetitionParticipantQueryGraphqlCapsule'

/**
 * CompetitionParticipant query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompetitionParticipantQueryGraphqlLauncher>}
 */
export default class CompetitionParticipantQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionParticipantQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionParticipantQueryGraphqlCapsule
  }
}
