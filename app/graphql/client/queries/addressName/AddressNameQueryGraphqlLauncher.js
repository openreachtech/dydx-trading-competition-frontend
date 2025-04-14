import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import AddressNameQueryGraphqlPayload from './AddressNameQueryGraphqlPayload'
import AddressNameQueryGraphqlCapsule from './AddressNameQueryGraphqlCapsule'

/**
 * AddressNameQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof AddressNameQueryGraphqlLauncher>}
 */
export default class AddressNameQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddressNameQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddressNameQueryGraphqlCapsule
  }
}
