import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
    return this.rankDetails
      ?.roi
      ?? '--'
  }

  /**
   * Generate PnL.
   *
   * @returns {string}
   */
  generatePnl () {
    return this.rankDetails
      ?.pnl
      ?? '--'
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
