import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionParticipantStatusesQueryGraphqlPayload from './CompetitionParticipantStatusesQueryGraphqlPayload'
import CompetitionParticipantStatusesQueryGraphqlCapsule from './CompetitionParticipantStatusesQueryGraphqlCapsule'

/**
 * CompetitionParticipant query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionParticipantStatusesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionParticipantStatusesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionParticipantStatusesQueryGraphqlCapsule
  }
}
