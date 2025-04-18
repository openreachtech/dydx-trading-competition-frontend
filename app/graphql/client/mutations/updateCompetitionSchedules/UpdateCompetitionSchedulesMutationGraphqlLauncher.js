import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import UpdateCompetitionSchedulesMutationGraphqlPayload from './UpdateCompetitionSchedulesMutationGraphqlPayload'
import UpdateCompetitionSchedulesMutationGraphqlCapsule from './UpdateCompetitionSchedulesMutationGraphqlCapsule'

/**
 * UpdateCompetitionSchedulesMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class UpdateCompetitionSchedulesMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionSchedulesMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionSchedulesMutationGraphqlCapsule
  }
}
