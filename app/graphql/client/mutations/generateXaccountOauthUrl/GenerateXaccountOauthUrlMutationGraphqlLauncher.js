import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import GenerateXaccountOauthUrlMutationGraphqlPayload from './GenerateXaccountOauthUrlMutationGraphqlPayload'
import GenerateXaccountOauthUrlMutationGraphqlCapsule from './GenerateXaccountOauthUrlMutationGraphqlCapsule'

/**
 * GenerateXaccountOauthUrl mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class GenerateXaccountOauthUrlMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return GenerateXaccountOauthUrlMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return GenerateXaccountOauthUrlMutationGraphqlCapsule
  }
}
