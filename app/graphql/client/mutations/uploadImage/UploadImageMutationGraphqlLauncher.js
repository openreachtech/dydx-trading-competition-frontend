import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import UploadImageMutationGraphqlPayload from './UploadImageMutationGraphqlPayload'
import UploadImageMutationGraphqlCapsule from './UploadImageMutationGraphqlCapsule'

/**
 * UploadImageMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof UploadImageMutationGraphqlLauncher>}
 */
export default class UploadImageMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UploadImageMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UploadImageMutationGraphqlCapsule
  }
}
