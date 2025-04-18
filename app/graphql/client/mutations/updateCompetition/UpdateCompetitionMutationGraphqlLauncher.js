import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import UpdateCompetitionMutationGraphqlPayload from './UpdateCompetitionMutationGraphqlPayload'
import UpdateCompetitionMutationGraphqlCapsule from './UpdateCompetitionMutationGraphqlCapsule'

/**
 * UpdateCompetitionMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class UpdateCompetitionMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionMutationGraphqlCapsule
  }
}
