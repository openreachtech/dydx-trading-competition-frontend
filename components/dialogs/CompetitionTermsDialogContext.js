import AppDialogContext from '~/app/vue/contexts/AppDialogContext'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * CompetitionTermsDialogContext
 *
 * @extends {AppDialogContext}
 */
export default class CompetitionTermsDialogContext extends AppDialogContext {
  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      ...super.EMIT_EVENT_NAME,
      CHECK_ENROLLMENT_ELIGIBILITY: 'checkEnrollmentEligibility',
    }
  }

  /**
   * get: userInterfaceState
   *
   * @returns {CompetitionTermsDialogProps['userInterfaceState'] | null}
   */
  get userInterfaceState () {
    return this.props.userInterfaceState
  }

  /**
   * get: isFetchingCurrentEquity
   *
   * @returns {boolean}
   */
  get isFetchingCurrentEquity () {
    return this.userInterfaceState?.isFetchingCurrentEquity
      ?? false
  }

  /**
   * get: competition
   *
   * @returns {CompetitionTermsDialogProps['competition'] | null}
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: competitionTitle
   *
   * @returns {CompetitionTermsDialogProps['competition']['title'] | null}
   */
  get competitionTitle () {
    return this.competition
      ?.title
      ?? null
  }

  /**
   * get: minimumDeposit
   *
   * @returns {CompetitionTermsDialogProps['competition']['minimumDeposit'] | null}
   */
  get minimumDeposit () {
    return this.competition
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: hostName
   *
   * @returns {CompetitionTermsDialogProps['competition']['host']['name'] | null}
   */
  get hostName () {
    return this.competition
      ?.host
      ?.name
      ?? null
  }

  /**
   * get: schedules
   *
   * @returns {CompetitionTermsDialogProps['competition']['schedules']}
   */
  get schedules () {
    return this.competition
      ?.schedules
      ?? []
  }

  /**
   * get: totalPrize
   *
   * @returns {CompetitionTermsDialogProps['competition']['totalPrize'] | null}
   */
  get totalPrize () {
    return this.competition
      ?.totalPrize
      ?? null
  }

  /**
   * Emit 'checkEnrollmentEligibility` event.
   *
   * @returns {void}
   */
  emitCheckEnrollmentEligibility () {
    this.emit(
      this.EMIT_EVENT_NAME.CHECK_ENROLLMENT_ELIGIBILITY
    )
  }

  /**
   * Normalize registration start date.
   *
   * @returns {string}
   */
  normalizeRegistrationStartDate () {
    const registrationStartDate = this.extractRegistrationStartDate()

    return this.normalizeDate({
      dateString: registrationStartDate,
    })
  }

  /**
   * Normalize registration end date.
   *
   * @returns {string}
   */
  normalizeRegistrationEndDate () {
    const registrationEndDate = this.extractRegistrationEndDate()

    return this.normalizeDate({
      dateString: registrationEndDate,
    })
  }

  /**
   * Extract registration start date.
   *
   * @returns {string | null} Registration start date.
   */
  extractRegistrationStartDate () {
    return this.schedules
      .find(schedule => schedule.category.categoryId === SCHEDULE_CATEGORY.REGISTRATION_START.ID)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Extract registration end date.
   *
   * @returns {string | null} Registration end date.
   */
  extractRegistrationEndDate () {
    return this.schedules
      .find(schedule => schedule.category.categoryId === SCHEDULE_CATEGORY.REGISTRATION_END.ID)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Extract competition start date.
   *
   * @returns {string} Competition start date.
   */
  extractCompetitionStartDate () {
    const competitionStartDate = this.schedules
      .find(schedule => schedule.category.categoryId === SCHEDULE_CATEGORY.COMPETITION_START.ID)
      ?.scheduledDatetime
      ?? null

    return this.normalizeDate({
      dateString: competitionStartDate,
    })
  }

  /**
   * Extract competition end date.
   *
   * @returns {string} Competition end date.
   */
  extractCompetitionEndDate () {
    const competitionEndDate = this.schedules
      .find(schedule => schedule.category.categoryId === SCHEDULE_CATEGORY.COMPETITION_END.ID)
      ?.scheduledDatetime
      ?? null

    return this.normalizeDate({
      dateString: competitionEndDate,
    })
  }

  /**
   * Extract prize distribution date.
   *
   * @returns {string} Prize distribution date.
   */
  extractPrizeDistributionDate () {
    const prizeDistributionDate = this.schedules
      .find(schedule => schedule.category.categoryId === SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID)
      ?.scheduledDatetime
      ?? null

    return this.normalizeDate({
      dateString: prizeDistributionDate,
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
   * Generate dialog's titlte.
   *
   * @returns {string} Dialog's title.
   */
  generateDialogTitle () {
    return `Trading Arena ${this.competitionTitle} Terms and Conditions`
  }
}

/**
 * @typedef {{
 *   userInterfaceState: import('~/app/vue/contexts/CompetitionDetailsPageContext.js').StatusReactive
 *   competition: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity
 * }} CompetitionTermsDialogProps
 */
