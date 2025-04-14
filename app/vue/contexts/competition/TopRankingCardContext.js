import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

const TOP_PLACEMENT_HASH = /** @type {const} */ ({
  1: '1st',
  2: '2nd',
  3: '3rd',
})

const TROPHY_IMAGE_URL_HASH = /** @type {const} */ ({
  1: '/img/trophies/trophy-gold.svg',
  2: '/img/trophies/trophy-diamond.svg',
  3: '/img/trophies/trophy-emerald.svg',
})

/**
 * TopRankingCardContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class TopRankingCardContext extends BaseFuroContext {
  /**
   * get: rankDetails
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').RankingTableEntry | null}
   */
  get rankDetails () {
    return this.props.rankDetails
      ?? null
  }

  /**
   * get: rank.
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').RankingTableEntry['rank'] | null}
   */
  get rank () {
    return this.rankDetails
      ?.rank
      ?? null
  }

  /**
   * get: address.
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').RankingTableEntry['address'] | null}
   */
  get address () {
    return this.rankDetails
      ?.address
      ?? null
  }

  /**
   * get: pnl.
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').RankingTableEntry['pnl'] | null}
   */
  get pnl () {
    return this.rankDetails
      ?.pnl
      ?? null
  }

  /**
   * get: roi.
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').RankingTableEntry['roi'] | null}
   */
  get roi () {
    return this.rankDetails
      ?.roi
      ?? null
  }

  /**
   * get: prize.
   *
   * @returns {import('~/app/vue/contexts/competition/SectionLeaderboardContext').TopRanker['prize'] | null}
   */
  get prize () {
    return this.rankDetails
      ?.prize
      ?? null
  }

  /**
   * Generate name.
   *
   * @returns {string}
   */
  generateName () {
    return this.rankDetails
      ?.name
      ?? '----'
  }

  /**
   * Normalize address.
   *
   * @returns {string}
   */
  normalizeAddress () {
    return this.rankDetails
      ?.address
      ?? '----'
  }

  /**
   * Generate ROI.
   *
   * @returns {string}
   */
  generateRoi () {
    return FinancialMetricNormalizer.create({
      figure: this.roi,
    })
      .normalizeAsRoi()
  }

  /**
   * Generate PnL.
   *
   * @returns {string}
   */
  generatePnl () {
    return FinancialMetricNormalizer.create({
      figure: this.pnl,
    })
      .normalizeAsPnl()
  }

  /**
   * Generate Prize.
   *
   * @returns {string}
   */
  generatePrize () {
    if (this.prize === null) {
      return '--'
    }

    return `$${this.prize}`
  }

  /**
   * Generate top placement label.
   *
   * @returns {string} Placement label.
   */
  generateTopPlacementLabel () {
    if (!this.rank) {
      return '--'
    }

    const placementKey = /** @type {keyof typeof TOP_PLACEMENT_HASH} */ (
      this.rank
    )

    return TOP_PLACEMENT_HASH[placementKey]
      ?? `${this.rank}th`
  }

  /**
   * Generate trophy image URL.
   *
   * @returns {string} Image URL.
   */
  generateTrophyImageUrl () {
    if (!this.rank) {
      return ''
    }

    const rankKey = /** @type {keyof typeof TROPHY_IMAGE_URL_HASH} */ (
      this.rank
    )

    return TROPHY_IMAGE_URL_HASH[rankKey]
      ?? ''
  }

  /**
   * Generate host's address url.
   *
   * @returns {string} The host's wallet address URL on Mintscan.
   */
  generateAddressUrl () {
    return this.address
      ? `https://www.mintscan.io/dydx/address/${this.address}`
      : '#'
  }

  /**
   * Generate profile's url.
   *
   * @returns {string} Profile's URL.
   */
  generateProfileUrl () {
    return this.address
      ? `/profiles/${this.address}`
      : ''
  }

  /**
   * Shorten wallet address.
   *
   * @returns {string} Shortened address.
   */
  generateShortenedAddress () {
    const normalizedAddress = this.normalizeAddress()

    if (normalizedAddress.length <= 12) {
      return normalizedAddress
    }

    const firstSevenCharacters = normalizedAddress.slice(0, 7)
    const lastFiveCharacters = normalizedAddress.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Generate card classes.
   *
   * @returns {Array<string | Record<string, boolean>>} Card classes.
   */
  generateCardClasses () {
    return [
      `top-${this.rank}`,
    ]
  }
}
