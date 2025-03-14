import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  useRoute,
} from '#imports'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'
 */

/**
 * Context class for SectionLeague component.
 *
 * @extends {BaseFuroContext<null>} - Base class.
 */
export default class SectionLeagueContext extends BaseFuroContext {
  /**
   * Extract competition.
   *
   * @returns {CompetitionEntity | null}
   */
  extractCompetition () {
    return this.props
      .competition
      ?? null
  }

  /**
   * get: competitionStatus
   *
   * @returns {CompetitionEntity['status'] | null}
   */
  get competitionStatus () {
    return this.extractCompetition()
      ?.status
      ?? null
  }

  /**
   * get: title
   *
   * @returns {CompetitionEntity['title'] | null}
   */
  get title () {
    return this.extractCompetition()
      ?.title
      ?? null
  }

  /**
   * get: description
   *
   * @returns {CompetitionEntity['description'] | null}
   */
  get description () {
    return this.extractCompetition()
      ?.description
      ?? null
  }

  /**
   * get: image
   *
   * @returns {CompetitionEntity['image'] | null}
   */
  get image () {
    return this.extractCompetition()
      ?.image
      ?? null
  }

  /**
   * get: minimumDeposit
   *
   * @returns {CompetitionEntity['minimumDeposit'] | null}
   */
  get minimumDeposit () {
    return this.extractCompetition()
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: totalPrize
   *
   * @returns {CompetitionEntity['totalPrize'] | null}
   */
  get totalPrize () {
    return this.extractCompetition()
      ?.totalPrize
      ?? null
  }

  /**
   * get: host
   *
   * @returns {CompetitionEntity['host'] | null}
   */
  get host () {
    return this.extractCompetition()
      ?.host
      ?? null
  }

  /**
   * get: hostAddress
   *
   * @returns {string | null} The host's wallet address.
   */
  get hostAddress () {
    return this.host
      ?.address
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {CompetitionEntity['participantUpperLimit'] | null}
   */
  get participantUpperLimit () {
    return this.extractCompetition()
      ?.participantUpperLimit
      ?? null
  }

  /**
   * get: participantLowerLimit
   *
   * @returns {CompetitionEntity['participantLowerLimit'] | null}
   */
  get participantLowerLimit () {
    return this.extractCompetition()
      ?.participantLowerLimit
      ?? null
  }

  /**
   * get: schedules
   *
   * @returns {CompetitionEntity['schedules']}
   */
  get schedules () {
    return this.extractCompetition()
      ?.schedules
      ?? []
  }

  /**
   * Normalize title.
   *
   * @returns {string} Normalized title.
   */
  normalizeTitle () {
    return this.title
      ?? '----'
  }

  /**
   * Normalize description.
   *
   * @returns {string} Normalized description.
   */
  normalizeDescription () {
    return this.description
      ?? '----'
  }

  /**
   * Generate host's name
   *
   * @returns {string}
   */
  generateHostName () {
    return this.host
      ?.name
      ?? '--'
  }

  /**
   * Generate host's address
   *
   * @returns {string} The host's wallet address.
   */
  generateHostAddress () {
    const { address } = this.host ?? {}

    if (!address) {
      return '--'
    }

    return this.shortenAddress({
      address,
    })
  }

  /**
   * Generate host's address url.
   *
   * @returns {string | null} The host's wallet address URL on Mintscan.
   */
  generateHostAddressUrl () {
    const { address } = this.host ?? {}

    if (!address) {
      return null
    }

    return `https://www.mintscan.io/dydx/address/${address}`
  }

  /**
   * Generate badge severity.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateBadgeSeverity () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateSeverity()
  }

  /**
   * Generate badge description.
   *
   * @returns {string} Badge description.
   */
  generateBadgeDescription () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateDescription()
  }

  /**
   * Generate icon name for badge.
   *
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateBadgeIconName () {
    const { statusId } = this.competitionStatus ?? {}
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateIconName()
  }

  /**
   * Generate image url.
   *
   * @returns {string} Image URL
   */
  generateImageUrl () {
    return this.image ?? ''
  }

  /**
   * Generate competition URL.
   *
   * @returns {string} Competition URL.
   */
  generateCompetitionUrl () {
    const route = useRoute()
    const { origin: urlOrigin } = window.location

    const competitionUrl = `${urlOrigin}${route.path}`

    return competitionUrl
  }

  /**
   * Extract start date.
   *
   * @returns {string | null} Start date.
   */
  extractStartDate () {
    return this.schedules.find(it => it.category.categoryId === SCHEDULE_CATEGORY.COMPETITION_START.ID)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Extract end date.
   *
   * @returns {string | null} End date.
   */
  extractEndDate () {
    return this.schedules.find(it => it.category.categoryId === SCHEDULE_CATEGORY.COMPETITION_END.ID)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Normalize start date.
   *
   * @returns {string} Normalized start date.
   */
  normalizeStartDate () {
    return this.normalizeDate({
      dateString: this.extractStartDate(),
    })
  }

  /**
   * Normalize end date.
   *
   * @returns {string} Normalized end date.
   */
  normalizeEndDate () {
    return this.normalizeDate({
      dateString: this.extractEndDate(),
    })
  }

  /**
   * Normalize date.
   *
   * @param {{
   *   dateString: string | null
   * }} params - Parameters.
   * @returns {string} Normalized date.
   */
  normalizeDate ({
    dateString,
  }) {
    if (!dateString) {
      return '--/--/--'
    }

    const date = new Date(dateString)

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    })
    const hourFormatter = new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'UTC',
    })

    return `${dateFormatter.format(date)}-${hourFormatter.format(date)} UTC`
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
   * Normalize minimum deposit.
   *
   * @returns {string} Normalized minimum deposit.
   */
  normalizeMinimumDeposit () {
    const normalizedFigure = this.normalizeNumber({
      value: this.minimumDeposit,
    })

    return `${normalizedFigure} USDC`
  }

  /**
   * Normalize number.
   *
   * @param {{
   *   value: number | null
   *   options?: Intl.NumberFormatOptions
   * }} params - Parameters.
   * @returns {string} Normalized number string.
   */
  normalizeNumber ({
    value,
    options = {},
  }) {
    if (!value) {
      return '--'
    }

    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
      ...options,
    })

    return formatter.format(value)
  }

  /**
   * Normalize currency.
   *
   * @param {{
   *   value: number | null
   *   options?: Intl.NumberFormatOptions
   * }} params - Parameters.
   * @returns {string} Normalized currency string.
   */
  normalizeCurrency ({
    value,
    options = {},
  }) {
    return this.normalizeNumber({
      value,
      options: {
        style: 'currency',
        currency: 'USD',
        ...options,
      },
    })
  }
}
