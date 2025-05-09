import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  ORDINAL_SUFFIX_HASH,
  SCHEDULE_ID_GROUP,
} from '~/app/constants'

/**
 * HostedCompetitionDetailsContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class HostedCompetitionDetailsContext extends BaseFuroContext {
  /**
   * get: competition
   *
   * @returns {PropsType['competition']}
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: host
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Host | null}
   */
  get host () {
    return this.competition
      ?.host
      ?? null
  }

  /**
   * get: hostName
   *
   * @returns {string | null}
   */
  get hostName () {
    return this.host
      ?.name
      ?? null
  }

  /**
   * get: hostAddress
   *
   * @returns {string | null}
   */
  get hostAddress () {
    return this.host
      ?.address
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {number | null}
   */
  get participantUpperLimit () {
    return this.competition
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: participantLowerLimit
   *
   * @returns {number | null}
   */
  get participantLowerLimit () {
    return this.competition
      ?.participantLowerLimit
      ?? null
  }

  /**
   * get: totalPrize
   *
   * @returns {number | null}
   */
  get totalPrize () {
    return this.competition
      ?.totalPrize
      ?? null
  }

  /**
   * get: minimumDeposit
   *
   * @returns {string | null}
   */
  get minimumDeposit () {
    return this.competition
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: prizeRules
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').PrizeRule>}
   */
  get prizeRules () {
    return this.competition
      ?.prizeRules
      ?? []
  }

  /**
   * get: status
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Status | null}
   */
  get status () {
    return this.competition
      ?.status
      ?? null
  }

  /**
   * get: image
   *
   * @returns {string | null}
   */
  get image () {
    return this.competition
      ?.image
      ?? null
  }

  /**
   * get: description
   *
   * @returns {string | null}
   */
  get description () {
    return this.competition
      ?.description
      ?? null
  }

  /**
   * get: schedules
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Schedule>}
   */
  get schedules () {
    return this.competition
      ?.schedules
      ?? []
  }

  /**
   * Generate displayed host name.
   *
   * @returns {string}
   */
  generateDisplayedHostName () {
    return this.hostName
      ?? '----'
  }

  /**
   * Generate host address URL on Mintscan/
   *
   * @returns {string}
   */
  generateHostMintscanUrl () {
    return this.hostAddress
      ? `https://www.mintscan.io/dydx/address/${this.hostAddress}`
      : ''
  }

  /**
   * Generate displayed host address.
   *
   * @returns {string}
   */
  generateDisplayedHostAddress () {
    if (this.hostAddress === null) {
      return '----'
    }

    return this.shortenAddress({
      address: this.hostAddress,
    })
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address: string
   * }} params - Parameters
   * @returns {string} Shortened address.
   */
  shortenAddress ({
    address,
  }) {
    if (address.length <= 12) {
      return address
    }

    const firstSevenCharacters = address.slice(0, 7)
    const lastFiveCharacters = address.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Generate displayed participation limit.
   *
   * @returns {string}
   */
  generateDisplayedParticipationLimit () {
    if (
      this.participantLowerLimit === null
      || this.participantUpperLimit === null
    ) {
      return '?? - ??'
    }

    return `${this.participantLowerLimit} - ${this.participantUpperLimit}`
  }

  /**
   * Generate displayed entry balance.
   *
   * @returns {string}
   */
  generateDisplayedEntryBalance () {
    if (this.minimumDeposit === null) {
      return '---- USDC'
    }

    return `${this.minimumDeposit} USDC`
  }

  /**
   * Generate displayed description.
   *
   * @returns {string}
   */
  generateDisplayedDescription () {
    return this.description
      ?? '----'
  }

  /**
   * Generate displayed total prize.
   *
   * @returns {string}
   */
  generateDisplayedTotalPrize () {
    if (this.totalPrize === null) {
      return '----'
    }

    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
      style: 'currency',
      currency: 'USD',
    })

    return formatter.format(
      this.totalPrize
    )
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
      return `${rank}${ORDINAL_SUFFIX_HASH.OTHER}`
    }

    const lastDigit = /** @type {keyof typeof ORDINAL_SUFFIX_HASH} */ (rank % 10)
    const suffix = ORDINAL_SUFFIX_HASH[lastDigit]
      ?? ORDINAL_SUFFIX_HASH.OTHER

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

  /**
   * Generate schedule groups.
   *
   * @returns {ScheduleGroups} Schedule groups.
   */
  generateScheduleGroups () {
    const registrationSchedules = this.generateRegistrationSchedules()
    const competitionSchedules = this.generateCompetitionSchedules()
    const prizeDistributeSchedules = this.generatePrizeDistributeSchedules()

    return [
      {
        title: 'Registration Stage',
        timeline: this.extractTimeline({
          schedules: registrationSchedules,
        }),
      },
      {
        title: 'Competition Stage',
        timeline: this.extractTimeline({
          schedules: competitionSchedules,
        }),
      },
      {
        title: 'Reward Distribution',
        timeline: this.extractTimeline({
          schedules: prizeDistributeSchedules,
        }),
      },

    ]
  }

  /**
   * @param {{
   *   schedules: Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Schedule>
   * }} params - Parameters.
   * @returns {import('~/components/units/AppTimeline.vue').Timeline}
   */
  extractTimeline ({
    schedules,
  }) {
    return schedules.map(it => ({
      timestamp: it.scheduledDatetime,
    }))
  }

  /**
   * Generate registration schedules.
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Schedule>} Registration schedules.
   */
  generateRegistrationSchedules () {
    return this.schedules.filter(
      it => SCHEDULE_ID_GROUP.REGISTRATION.includes(it.category?.categoryId)
    )
  }

  /**
   * Generate competition schedules.
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Schedule>} Competition schedules.
   */
  generateCompetitionSchedules () {
    return this.schedules.filter(
      it => SCHEDULE_ID_GROUP.COMPETITION.includes(it.category?.categoryId)
    )
  }

  /**
   * Generate prize distribution schedules.
   *
   * @returns {Array<import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').Schedule>} Prize distribution schedules.
   */
  generatePrizeDistributeSchedules () {
    return this.schedules.filter(
      it => SCHEDULE_ID_GROUP.PRIZE_DISTRIBUTE.includes(it.category?.categoryId)
    )
  }

  /**
   * Normalize timestamp.
   *
   * @param {{
   *   timestamp: string
   * }} params - Parameters.
   * @returns {string} Normalized timestamp.
   */
  normalizeTimestamp ({
    timestamp,
  }) {
    if (!timestamp) {
      return '----'
    }

    const date = new Date(timestamp)
    const formatter = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    return formatter.format(date)
  }
}

/**
 * @typedef {{
 *   competition: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity | null
 * }} PropsType
 */

/**
 * @typedef {{
 *   label: string
 *   amount: string
 * }} NormalizedPrizeRule
 */

/**
 * @typedef {Array<{
 *   title: string
 *   timeline: import('~/components/units/AppTimeline.vue').Timeline
 * }>} ScheduleGroups
 */
