import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import AddressProfileQueryGraphqlPayload from './AddressProfileQueryGraphqlPayload'
import AddressProfileQueryGraphqlCapsule from './AddressProfileQueryGraphqlCapsule'

/**
 * AddressProfile query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class AddressProfileQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddressProfileQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddressProfileQueryGraphqlCapsule
  }
}
