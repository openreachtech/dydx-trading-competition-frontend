import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import BulkUpdateParticipantStatusMutationGraphqlPayload from './BulkUpdateParticipantStatusMutationGraphqlPayload'
import BulkUpdateParticipantStatusMutationGraphqlCapsule from './BulkUpdateParticipantStatusMutationGraphqlCapsule'

/**
 * BulkUpdateParticipantStatus mutation graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class BulkUpdateParticipantStatusMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return BulkUpdateParticipantStatusMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return BulkUpdateParticipantStatusMutationGraphqlCapsule
  }
}
