import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import UpdateCompetitionLimitsMutationGraphqlPayload from './UpdateCompetitionLimitsMutationGraphqlPayload'
import UpdateCompetitionLimitsMutationGraphqlCapsule from './UpdateCompetitionLimitsMutationGraphqlCapsule'

/**
 * UpdateCompetitionLimits mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class UpdateCompetitionLimitsMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionLimitsMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionLimitsMutationGraphqlCapsule
  }
}
