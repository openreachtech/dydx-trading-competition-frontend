import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  RANK_POSITION_SUFFIX_HASH,
} from '~/app/constants'

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

  /**
   * Normalize prize rules.
   *
   * @returns {Array<NormalizedPrizeRule>}
   */
  normalizePrizeRules () {
    return this.prizeRules
      .map(prizeRule => ({
        label: this.generateRankLabel({
          rankFrom: prizeRule.rankFrom,
          rankTo: prizeRule.rankTo,
        }),
        amount: this.normalizePrize({
          prizeAmount: prizeRule.amount,
        }),
      }))
  }

  /**
   * Generate rank label.
   *
   * @param {{
   *   rankFrom: number
   *   rankTo: number
   * }} params - Parameters.
   * @returns {string}
   */
  generateRankLabel ({
    rankFrom,
    rankTo,
  }) {
    const normalizedRankFrom = this.generateRankPosition({
      rank: rankFrom,
    })

    if (rankFrom === rankTo) {
      return `Rank ${normalizedRankFrom}`
    }

    const normalizedRankTo = this.generateRankPosition({
      rank: rankTo,
    })

    return `Rank ${normalizedRankFrom} - ${normalizedRankTo}`
  }

  /**
   * Generate rank position.
   *
   * @param {{
   *   rank: number
   * }} params - Parameters.
   * @returns {string}
   */
  generateRankPosition ({
    rank,
  }) {
    const lastTwoDigits = rank % 100

    if (
      lastTwoDigits >= 11
      && lastTwoDigits <= 13
    ) {
      return `${rank}${RANK_POSITION_SUFFIX_HASH.OTHER}`
    }

    const lastDigit = /** @type {keyof typeof RANK_POSITION_SUFFIX_HASH} */ (rank % 10)
    const suffix = RANK_POSITION_SUFFIX_HASH[lastDigit]
      ?? RANK_POSITION_SUFFIX_HASH.OTHER

    return `${rank}${suffix}`
  }

  /**
   * Normalize prize.
   *
   * @param {{
   *   prizeAmount: string
   * }} params - Parameters.
   * @returns {string} Normalized prize.
   */
  normalizePrize ({
    prizeAmount,
  }) {
    const amountInNumber = Number(prizeAmount)
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      trailingZeroDisplay: 'stripIfInteger',
    })

    return formatter.format(amountInNumber)
  }
}

/**
 * @typedef {{
 *   prizeRules: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['prizeRules']
 * }} PropsType
 */

/**
 * @typedef {{
 *   label: string
 *   amount: string
 * }} NormalizedPrizeRule
 */
