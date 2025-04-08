import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionFinalOutcomeQueryGraphqlPayload from './CompetitionFinalOutcomeQueryGraphqlPayload'
import CompetitionFinalOutcomeQueryGraphqlCapsule from './CompetitionFinalOutcomeQueryGraphqlCapsule'

/**
 * CompetitionFinalOutcome query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompetitionFinalOutcomeQueryGraphqlLauncher>}
 */
export default class CompetitionFinalOutcomeQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionFinalOutcomeQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionFinalOutcomeQueryGraphqlCapsule
  }
}
