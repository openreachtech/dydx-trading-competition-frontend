import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import AddressPastCompetitionsQueryGraphqlPayload from '~/app/graphql/client/queries/addressPastCompetitions/AddressPastCompetitionsQueryGraphqlPayload'
import AddressPastCompetitionsQueryGraphqlCapsule from '~/app/graphql/client/queries/addressPastCompetitions/AddressPastCompetitionsQueryGraphqlCapsule'

/**
 * AddressPastCompetitionsQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof AddressPastCompetitionsQueryGraphqlLauncher>}
 */
export default class AddressPastCompetitionsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddressPastCompetitionsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddressPastCompetitionsQueryGraphqlCapsule
  }
}
