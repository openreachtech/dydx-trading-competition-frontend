import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CompetitionQueryGraphqlPayload from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlPayload'
import CompetitionQueryGraphqlCapsule from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'

/**
 * Competition query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionQueryGraphqlCapsule
  }
}
