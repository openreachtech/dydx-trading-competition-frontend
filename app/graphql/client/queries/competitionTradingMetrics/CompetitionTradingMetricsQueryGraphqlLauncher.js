import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionTradingMetricsQueryGraphqlPayload from './CompetitionTradingMetricsQueryGraphqlPayload'
import CompetitionTradingMetricsQueryGraphqlCapsule from './CompetitionTradingMetricsQueryGraphqlCapsule'

/**
 * `competitionTradingMetrics` query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionTradingMetricsQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionTradingMetricsQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionTradingMetricsQueryGraphqlCapsule
  }
}
