import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import PutAddressImageMutationGraphqlPayload from './PutAddressImageMutationGraphqlPayload'
import PutAddressImageMutationGraphqlCapsule from './PutAddressImageMutationGraphqlCapsule'

/**
 * PutAddressImage mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class PutAddressImageMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return PutAddressImageMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return PutAddressImageMutationGraphqlCapsule
  }
}
