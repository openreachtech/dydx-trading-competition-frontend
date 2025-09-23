import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionDynamicPrizeRulesQueryGraphqlPayload from './CompetitionDynamicPrizeRulesQueryGraphqlPayload'
import CompetitionDynamicPrizeRulesQueryGraphqlCapsule from './CompetitionDynamicPrizeRulesQueryGraphqlCapsule'

/**
 * CompetitionDynamicPrizeRules query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionDynamicPrizeRulesQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionDynamicPrizeRulesQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionDynamicPrizeRulesQueryGraphqlCapsule
  }
}
