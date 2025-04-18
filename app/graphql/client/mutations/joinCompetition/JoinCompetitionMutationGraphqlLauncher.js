import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import JoinCompetitionMutationGraphqlPayload from './JoinCompetitionMutationGraphqlPayload'
import JoinCompetitionMutationGraphqlCapsule from './JoinCompetitionMutationGraphqlCapsule'

/**
 * JoinCompetitionMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class JoinCompetitionMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return JoinCompetitionMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return JoinCompetitionMutationGraphqlCapsule
  }
}
