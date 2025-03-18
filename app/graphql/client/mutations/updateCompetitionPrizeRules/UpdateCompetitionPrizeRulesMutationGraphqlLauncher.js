import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import UpdateCompetitionPrizeRulesMutationGraphqlPayload from './UpdateCompetitionPrizeRulesMutationGraphqlPayload'
import UpdateCompetitionPrizeRulesMutationGraphqlCapsule from './UpdateCompetitionPrizeRulesMutationGraphqlCapsule'

/**
 * UpdateCompetitionPrizeRulesMutation graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof UpdateCompetitionPrizeRulesMutationGraphqlLauncher>}
 */
export default class UpdateCompetitionPrizeRulesMutationGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return UpdateCompetitionPrizeRulesMutationGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return UpdateCompetitionPrizeRulesMutationGraphqlCapsule
  }
}
