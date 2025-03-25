import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * SectionPrizeRulesContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class SectionPrizeRulesContext extends BaseFuroContext {
  /**
   * get: prizeRules
   *
   * @returns {PropsType['prizeRules']}
   */
  get prizeRules () {
    return this.props.prizeRules
  }
}

/**
 * @typedef {{
 *   prizeRules: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['prizeRules']
 * }} PropsType
 */
