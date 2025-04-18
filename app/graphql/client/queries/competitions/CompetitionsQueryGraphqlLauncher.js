import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CompetitionsQueryGraphqlPayload from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlPayload'
import CompetitionsQueryGraphqlCapsule from '~/app/graphql/client/queries/competitions/CompetitionsQueryGraphqlCapsule'

/**
 * Competitions query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionsQueryGraphqlCapsule
  }
}
