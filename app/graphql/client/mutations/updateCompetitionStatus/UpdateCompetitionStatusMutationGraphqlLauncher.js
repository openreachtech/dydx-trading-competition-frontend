import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import UpdateCompetitionStatusMutationGraphqlPayload from './UpdateCompetitionStatusMutationGraphqlPayload'
import UpdateCompetitionStatusMutationGraphqlCapsule from './UpdateCompetitionStatusMutationGraphqlCapsule'

/**
 * UpdateCompetitionStatusMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof UpdateCompetitionStatusMutationGraphqlLauncher>}
 */
export default class UpdateCompetitionStatusMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionStatusMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionStatusMutationGraphqlCapsule
  }
}
