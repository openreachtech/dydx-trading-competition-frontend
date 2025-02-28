import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import CompetitionLeaderboardQueryGraphqlPayload from '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlPayload'
import CompetitionLeaderboardQueryGraphqlCapsule from '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'

/**
 * CompetitionLeaderboardQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof CompetitionLeaderboardQueryGraphqlLauncher>}
 */
export default class CompetitionLeaderboardQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return CompetitionLeaderboardQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return CompetitionLeaderboardQueryGraphqlCapsule
  }
}
