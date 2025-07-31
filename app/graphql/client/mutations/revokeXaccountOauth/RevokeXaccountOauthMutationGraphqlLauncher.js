import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import RevokeXaccountOauthMutationGraphqlPayload from './RevokeXaccountOauthMutationGraphqlPayload'
import RevokeXaccountOauthMutationGraphqlCapsule from './RevokeXaccountOauthMutationGraphqlCapsule'

/**
 * RevokeXaccountOauth mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class RevokeXaccountOauthMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return RevokeXaccountOauthMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return RevokeXaccountOauthMutationGraphqlCapsule
  }
}
