import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import UpdateCompetitionOptionsMutationGraphqlPayload from './UpdateCompetitionOptionsMutationGraphqlPayload'
import UpdateCompetitionOptionsMutationGraphqlCapsule from './UpdateCompetitionOptionsMutationGraphqlCapsule'

/**
 * UpdateCompetitionOptions mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class UpdateCompetitionOptionsMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionOptionsMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionOptionsMutationGraphqlCapsule
  }
}
