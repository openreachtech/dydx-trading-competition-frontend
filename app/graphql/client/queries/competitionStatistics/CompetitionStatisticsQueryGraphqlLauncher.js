import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionStatisticsQueryGraphqlPayload from './CompetitionStatisticsQueryGraphqlPayload'
import CompetitionStatisticsQueryGraphqlCapsule from './CompetitionStatisticsQueryGraphqlCapsule'

/**
 * Competition Statistics query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompetitionStatisticsQueryGraphqlLauncher>}
 */
export default class CompetitionStatisticsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionStatisticsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionStatisticsQueryGraphqlCapsule
  }
}
