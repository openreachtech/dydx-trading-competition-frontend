import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'

import CompetitionCurrentDynamicPrizeRuleQueryGraphqlPayload from './CompetitionCurrentDynamicPrizeRuleQueryGraphqlPayload'
import CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule from './CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule.js'

/**
 * CompetitionCurrentDynamicPrizeRule query graphql launcher.
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class CompetitionCurrentDynamicPrizeRuleQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionCurrentDynamicPrizeRuleQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionCurrentDynamicPrizeRuleQueryGraphqlCapsule
  }
}
