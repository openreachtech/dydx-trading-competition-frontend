import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import PutAddressNameMutationGraphqlPayload from './PutAddressNameMutationGraphqlPayload'
import PutAddressNameMutationGraphqlCapsule from './PutAddressNameMutationGraphqlCapsule'

/**
 * PutAddressNameMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class PutAddressNameMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return PutAddressNameMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return PutAddressNameMutationGraphqlCapsule
  }
}
