import {
  useRoute,
} from 'vue-router'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  SCHEDULE_CATEGORY,
  COMPETITION_PARTICIPANT_STATUS,
  COMPETITION_STATUS,
} from '~/app/constants'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

const ENROLLMENT_STATUS = {
  ENROLLED: 'enrolled',
  NOT_ENROLLED: 'notEnrolled',
  NOT_ENROLLED_BUT_FULL: 'notEnrolledButFull',
  ENROLLMENT_CLOSED: 'enrollmentClosed',
}

const ENROLLMENT_ACTION_TEXT = {
  [ENROLLMENT_STATUS.ENROLLED]: 'You have enrolled',
  [ENROLLMENT_STATUS.NOT_ENROLLED]: 'Enroll now',
  [ENROLLMENT_STATUS.NOT_ENROLLED_BUT_FULL]: 'Max participants reached',
  [ENROLLMENT_STATUS.ENROLLMENT_CLOSED]: 'Registration ended',
  DEFAULT: 'Enroll now',
}

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'
 */

const MAX_DESCRIPTION_PREVIEW_LENGTH = 180

/**
 * Context class for SectionLeague component.
 *
 * @extends {BaseFuroContext<null, PropsType, null>} - Base class.
 */
export default class SectionLeagueContext extends BaseFuroContext {
/**
 * Constructor
 *
 * @param {SectionLeagueContextParams} params - Parameters of this constructor.
 */
  constructor ({
    props,
    componentContext,

    walletStore,
    onboardingDialogsComponentRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.walletStore = walletStore
    this.onboardingDialogsComponentRef = onboardingDialogsComponentRef
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SectionLeagueContext ? X : never} T, X
   * @override
   * @param {SectionLeagueContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    walletStore,
    onboardingDialogsComponentRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        onboardingDialogsComponentRef,
        statusReactive,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      SHOW_TERMS_DIALOG: 'show-terms-dialog',
      SHOW_CANCELATION_DIALOG: 'showCancelationDialog',
    }
  }

  /**
   * get: isDescriptionExpanded
   *
   * @returns {boolean}
   */
  get isDescriptionExpanded () {
    return this.statusReactive.isDescriptionExpanded
  }

  /**
   * Extract competition.
   *
   * @returns {PropsType['competition']}
   */
  extractCompetition () {
    return this.props
      .competition
      ?? null
  }

  /**
   * get: participantStatusId
   *
   * @returns {PropsType['participantStatusId']}
   */
  get participantStatusId () {
    return this.props.participantStatusId
  }

  /**
   * get: competitionId
   *
   * @returns {PropsType['competitionId']}
   */
  get competitionId () {
    return this.props.competitionId
  }

  /**
   * get: competitionStatusId
   *
   * @returns {PropsType['competitionStatusId']}
   */
  get competitionStatusId () {
    return this.props.competitionStatusId
  }

  /**
   * get: enrolledParticipantsNumber
   *
   * @returns {PropsType['enrolledParticipantsNumber']}
   */
  get enrolledParticipantsNumber () {
    return this.props.enrolledParticipantsNumber
  }

  /**
   * get: isHostOfCompetition
   *
   * @returns {PropsType['isHostOfCompetition']}
   */
  get isHostOfCompetition () {
    return this.props.isHostOfCompetition
  }

  /**
   * get: isCompetitionFull
   *
   * @returns {PropsType['isCompetitionFull']}
   */
  get isCompetitionFull () {
    return this.props.isCompetitionFull
  }

  /**
   * Normalize enrolled participants number.
   *
   * @returns {string}
   */
  normalizeEnrolledParticipantsNumber () {
    return this.normalizeNumber({
      value: this.enrolledParticipantsNumber,
    })
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
   * get: imageUrl
   *
   * @returns {CompetitionEntity['imageUrl'] | null}
   */
  get imageUrl () {
    return this.extractCompetition()
      ?.imageUrl
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
   * Normalize participant upper limit.
   *
   * @returns {string}
   */
  normalizeParticipantUpperLimit () {
    return this.normalizeNumber({
      value: this.participantUpperLimit,
    })
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
    if (!this.description) {
      return '----'
    }

    if (
      !this.hasDescriptionExceededPreviewLength()
      || this.isDescriptionExpanded
    ) {
      return this.description
    }

    return `${this.description.slice(0, MAX_DESCRIPTION_PREVIEW_LENGTH)}...`
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
   * Generate profile's url.
   *
   * @returns {string} Profile's URL.
   */
  generateProfileUrl () {
    return this.hostAddress
      ? `/profiles/${this.hostAddress}`
      : ''
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
    return this.imageUrl
      ?? '/img/badges/league-badge-placeholder.png'
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
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZoneName: 'short',
    })

    return dateFormatter.format(date)
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
   * @todo Put this method inside BaseAppContext
   */
  normalizeNumber ({
    value,
    options = {},
  }) {
    if (value === null) {
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

  /**
   * Generate league detail CSS classes.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateLeagueDetailClasses () {
    return {
      'expandable-description': this.hasDescriptionExceededPreviewLength(),
    }
  }

  /**
   * Generate CSS classes for host badge.
   *
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generateHostBadgeClasses () {
    return {
      hidden: !this.isHostOfCompetition,
    }
  }

  /**
   * Generate CSS classes for competition edit button.
   *
   * @returns {import('vue').HTMLAttributes['class']}
   */
  generateCompetitionEditButtonClasses () {
    return {
      hidden: !this.isHostOfCompetition,
    }
  }

  /**
   * Generate description expansion button label.
   *
   * @returns {string}
   */
  generateDescriptionExpansionButtonLabel () {
    return this.isDescriptionExpanded
      ? 'Show less'
      : 'See more'
  }

  /**
   * Generate content for enroll button.
   *
   * @returns {string}
   */
  generateEnrollButtonLabel () {
    const enrollmentStatus = this.generateEnrollmentStatus()

    return ENROLLMENT_ACTION_TEXT[enrollmentStatus]
      ?? ENROLLMENT_ACTION_TEXT.DEFAULT
  }

  /**
   * Generate enroll button variant.
   *
   * @returns {'primary' | 'neutral'}
   */
  generateEnrollButtonVariant () {
    const enrollmentStatus = this.generateEnrollmentStatus()

    if (enrollmentStatus === ENROLLMENT_STATUS.ENROLLED) {
      return 'neutral'
    }

    return 'primary'
  }

  /**
   * Generate CSS classes for enrollment button.
   *
   * @returns {Record<string, boolean>}
   */
  generateEnrollButtonClasses () {
    const enrollmentStatus = this.generateEnrollmentStatus()

    return {
      enrolled: enrollmentStatus === ENROLLMENT_STATUS.ENROLLED,
    }
  }

  /**
   * Whether to disable enroll button or not.
   *
   * @returns {boolean}
   */
  shouldDisableEnrollButton () {
    const enrollmentStatus = this.generateEnrollmentStatus()

    return [
      ENROLLMENT_STATUS.NOT_ENROLLED_BUT_FULL,
      ENROLLMENT_STATUS.ENROLLMENT_CLOSED,
    ]
      .includes(enrollmentStatus)
  }

  /**
   * Generate enrollment status.
   *
   * @returns {(typeof ENROLLMENT_STATUS)[keyof typeof ENROLLMENT_STATUS]}
   */
  generateEnrollmentStatus () {
    const enrollmentStatusCases = this.generateEnrollmentStatusCases()
    const matchedCase = enrollmentStatusCases.find(it => it.checker())

    if (!matchedCase) {
      return ENROLLMENT_STATUS.NOT_ENROLLED
    }

    return matchedCase.result
  }

  /**
   * Generate cases for `enrollmentStatus`
   *
   * @returns {Array<EnrollmentStatusCase>}
   */
  generateEnrollmentStatusCases () {
    return [
      {
        checker: () => this.hasEnrolled(),
        result: ENROLLMENT_STATUS.ENROLLED,
      },
      {
        checker: () => this.isEnrollmentClosed(),
        result: ENROLLMENT_STATUS.ENROLLMENT_CLOSED,
      },
      {
        checker: () => this.isCompetitionFull,
        result: ENROLLMENT_STATUS.NOT_ENROLLED_BUT_FULL,
      },
    ]
  }

  /**
   * Check if the participant has enrolled.
   *
   * @returns {boolean}
   */
  hasEnrolled () {
    if (this.participantStatusId === null) {
      return false
    }

    return [
      COMPETITION_PARTICIPANT_STATUS.REGISTERED.ID,
      COMPETITION_PARTICIPANT_STATUS.ACTIVE.ID,
      COMPETITION_PARTICIPANT_STATUS.COMPLETED.ID,
    ]
      .includes(this.participantStatusId)
  }

  /**
   * Check if enrollment is closed.
   *
   * @returns {boolean}
   */
  isEnrollmentClosed () {
    if (this.competitionStatusId === null) {
      return false
    }

    return [
      COMPETITION_STATUS.REGISTRATION_ENDED.ID,
      COMPETITION_STATUS.IN_PROGRESS.ID,
      COMPETITION_STATUS.COMPLETED.ID,
      COMPETITION_STATUS.CANCELED.ID,
    ]
      .includes(this.competitionStatusId)
  }

  /**
   * Whether description is expandable or not.
   *
   * @returns {boolean} `true` if description is long enough to be expandable.
   */
  hasDescriptionExceededPreviewLength () {
    if (!this.description) {
      return false
    }

    return this.description.length > MAX_DESCRIPTION_PREVIEW_LENGTH
  }

  /**
   * Initiate action dialog. Open the correct dialog based on enrollment status.
   *
   * @returns {void}
   */
  initiateActionDialog () {
    const enrollmentStatus = this.generateEnrollmentStatus()

    if (enrollmentStatus === ENROLLMENT_STATUS.ENROLLED) {
      this.showCancelationDialog()

      return
    }

    this.showTermsDialog()
  }

  /**
   * Show cancelation dialog.
   *
   * @returns {void}
   */
  showCancelationDialog () {
    this.emit(this.EMIT_EVENT_NAME.SHOW_CANCELATION_DIALOG)
  }

  /**
   * Show terms dialog.
   *
   * @returns {void}
   */
  showTermsDialog () {
    if (!this.onboardingDialogsComponentRef.value) {
      return
    }

    if (!this.walletStore.walletStoreRef.value.sourceAccount.address) {
      this.onboardingDialogsComponentRef.value.showWalletSelectionDialog()

      return
    }

    if (!this.walletStore.walletStoreRef.value.localWallet.address) {
      this.onboardingDialogsComponentRef.value.showKeyDerivationDialog()

      return
    }

    this.emit(this.EMIT_EVENT_NAME.SHOW_TERMS_DIALOG)
  }

  /**
   * Toggle description expansion.
   *
   * @returns {void}
   */
  toggleDescriptionExpansion () {
    this.statusReactive.isDescriptionExpanded = !this.isDescriptionExpanded
  }

  /**
   * Check if the current period is the registration period.
   *
   * @param {{
   *   startDateId: number
   *   endDateId: number
   * }} params - Parameters.
   * @returns {boolean}
   */
  isTargetPeriodById ({
    startDateId,
    endDateId,
  }) {
    const now = new Date()
    const start = this.extractScheduleById({
      id: startDateId,
    })
    const end = this.extractScheduleById({
      id: endDateId,
    })

    if (
      start !== null
      && end !== null
    ) {
      return now >= new Date(start)
        && now <= new Date(end)
    }

    if (start !== null) {
      return now >= new Date(start)
    }

    if (end !== null) {
      return now <= new Date(end)
    }

    return false
  }

  /**
   * Extract schedule by id.
   *
   * @param {{
   *   id: number
   * }} params - Parameters.
   * @returns {string | null}
   */
  extractScheduleById ({
    id,
  }) {
    return this.schedules
      .find(it => it.category.categoryId === id)
      ?.scheduledDatetime
      ?? null
  }

  /**
   * Generate URL of competition edit page.
   *
   * @returns {string}
   */
  generateCompetitionEditUrl () {
    return this.competitionId === null
      ? ''
      : `/competitions/${this.competitionId}/edit`
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   onboardingDialogsComponentRef: import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>
 *   statusReactive: import('vue').Reactive<{
 *     isDescriptionExpanded: boolean
 *   }>
 * }} SectionLeagueContextParams
 */

/**
 * @typedef {SectionLeagueContextParams} SectionLeagueContextFactoryParams
 */

/**
 * @typedef {{
 *   competition: CompetitionEntity | null
 *   participantStatusId: number | null
 *   competitionId: number | null
 *   competitionStatusId: number | null
 *   enrolledParticipantsNumber: number | null
 *   isHostOfCompetition: boolean
 *   isCompetitionFull: boolean
 * }} PropsType
 */

/**
 * @typedef {{
 *   checker: () => boolean
 *   result: string
 * }} EnrollmentStatusCase
 */
