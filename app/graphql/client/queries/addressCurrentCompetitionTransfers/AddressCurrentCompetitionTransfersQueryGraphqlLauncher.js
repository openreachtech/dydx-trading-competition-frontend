import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import AddressCurrentCompetitionTransfersQueryGraphqlCapsule from '~/app/graphql/client/queries/addressCurrentCompetitionTransfers/AddressCurrentCompetitionTransfersQueryGraphqlCapsule'
import AddressCurrentCompetitionTransfersQueryGraphqlPayload from '~/app/graphql/client/queries/addressCurrentCompetitionTransfers/AddressCurrentCompetitionTransfersQueryGraphqlPayload'

/**
 * AddressCurrentCompetitionTransfersQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class AddressCurrentCompetitionTransfersQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddressCurrentCompetitionTransfersQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddressCurrentCompetitionTransfersQueryGraphqlCapsule
  }
}
