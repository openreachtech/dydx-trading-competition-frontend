import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import SearchAddressesQueryGraphqlPayload from './SearchAddressesQueryGraphqlPayload'
import SearchAddressesQueryGraphqlCapsule from './SearchAddressesQueryGraphqlCapsule'

/**
 * SearchAddresses query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SearchAddressesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SearchAddressesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SearchAddressesQueryGraphqlCapsule
  }
}
