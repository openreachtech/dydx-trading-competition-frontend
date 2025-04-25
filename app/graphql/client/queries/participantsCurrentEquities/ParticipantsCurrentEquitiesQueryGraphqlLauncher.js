import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import ParticipantsCurrentEquitiesQueryGraphqlPayload from './ParticipantsCurrentEquitiesQueryGraphqlPayload'
import ParticipantsCurrentEquitiesQueryGraphqlCapsule from './ParticipantsCurrentEquitiesQueryGraphqlCapsule'

/**
 * ParticipantsCurrentEquities query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class ParticipantsCurrentEquitiesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return ParticipantsCurrentEquitiesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return ParticipantsCurrentEquitiesQueryGraphqlCapsule
  }
}
