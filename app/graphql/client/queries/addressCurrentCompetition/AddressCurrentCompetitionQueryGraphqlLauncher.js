import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import AddressCurrentCompetitionQueryGraphqlCapsule from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule'
import AddressCurrentCompetitionQueryGraphqlPayload from '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlPayload'

/**
 * AddressCurrentCompetitionQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class AddressCurrentCompetitionQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddressCurrentCompetitionQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddressCurrentCompetitionQueryGraphqlCapsule
  }
}
