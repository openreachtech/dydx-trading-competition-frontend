import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionParticipantsQueryGraphqlPayload from './CompetitionParticipantsQueryGraphqlPayload'
import CompetitionParticipantsQueryGraphqlCapsule from './CompetitionParticipantsQueryGraphqlCapsule'

/**
 * CompetitionParticipants query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompetitionParticipantsQueryGraphqlLauncher>}
 */
export default class CompetitionParticipantsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionParticipantsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionParticipantsQueryGraphqlCapsule
  }
}
