import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import UnregisterFromCompetitionMutationGraphqlPayload from './UnregisterFromCompetitionMutationGraphqlPayload'
import UnregisterFromCompetitionMutationGraphqlCapsule from './UnregisterFromCompetitionMutationGraphqlCapsule'

/**
 * UnregisterFromCompetition mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class UnregisterFromCompetitionMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UnregisterFromCompetitionMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UnregisterFromCompetitionMutationGraphqlCapsule
  }
}
