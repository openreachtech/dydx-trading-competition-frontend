import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import AddCompetitionMutationGraphqlPayload from '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlPayload'
import AddCompetitionMutationGraphqlCapsule from '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlCapsule'

/**
 * AddCompetitionMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class AddCompetitionMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return AddCompetitionMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return AddCompetitionMutationGraphqlCapsule
  }
}
