import {
  nextTick,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  SCHEDULE_CATEGORY,
  COMPETITION_PARTICIPANT_STATUS,
  COMPETITION_PRIZE_CATEGORY,
  COMPETITION_STATUS,
} from '~/app/constants'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'
import DynamicPrizeItemContext from './DynamicPrizeItemContext'

const ENROLLMENT_STATUS = {
  AWAITING_DEPOSIT: 'awaitingDeposit',
  ENROLLED: 'enrolled',
  COMPETING: 'competing',
  NOT_REGISTERED: 'notEnrolled',
  NOT_REGISTERED_BUT_FULL: 'notEnrolledButFull',
  NOT_REGISTERED_BUT_ENDED: 'notEnrolledButEnded',
}

const ENROLLMENT_ACTION_TEXT = {
  [ENROLLMENT_STATUS.AWAITING_DEPOSIT]: 'You have enrolled',
  [ENROLLMENT_STATUS.ENROLLED]: 'You have enrolled',
  [ENROLLMENT_STATUS.COMPETING]: 'You have enrolled',
  [ENROLLMENT_STATUS.NOT_REGISTERED]: 'Register now',
  [ENROLLMENT_STATUS.NOT_REGISTERED_BUT_FULL]: 'Max participants reached',
  [ENROLLMENT_STATUS.NOT_REGISTERED_BUT_ENDED]: 'Registration ended',
  DEFAULT: 'Register now',
}

const ENROLLMENT_ACTION_ICON_NAME_HASH = {
  [ENROLLMENT_STATUS.AWAITING_DEPOSIT]: 'heroicons:check-circle',
  [ENROLLMENT_STATUS.ENROLLED]: 'heroicons:check-circle',
  [ENROLLMENT_STATUS.COMPETING]: 'heroicons:check-circle',
  [ENROLLMENT_STATUS.NOT_REGISTERED]: '',
  [ENROLLMENT_STATUS.NOT_REGISTERED_BUT_FULL]: '',
  DEFAULT: '',
}

const ENROLLMENT_ACTION_BUTTON_VARIANT_HASH = /** @type {const} */ ({
  [ENROLLMENT_STATUS.AWAITING_DEPOSIT]: 'neutral',
  [ENROLLMENT_STATUS.ENROLLED]: 'neutral',
  [ENROLLMENT_STATUS.COMPETING]: 'neutral',
  [ENROLLMENT_STATUS.NOT_REGISTERED]: 'primary',
  [ENROLLMENT_STATUS.NOT_REGISTERED_BUT_FULL]: 'primary',
  DEFAULT: 'primary',
})

const ENROLLMENT_ACTION_HASH = {
  UNREGISTER: 'unregister',
}

/**
 * @import { CompetitionEntity } from '~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule'
 */

/**
 * Context class for SectionLeague component.
 *
 * @extends {BaseAppContext<null, PropsType, null>} - Base class.
 */
export default class SectionLeagueContext extends BaseAppContext {
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
    descriptionElementShallowRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.walletStore = walletStore
    this.onboardingDialogsComponentRef = onboardingDialogsComponentRef
    this.descriptionElementShallowRef = descriptionElementShallowRef
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
    descriptionElementShallowRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        walletStore,
        onboardingDialogsComponentRef,
        descriptionElementShallowRef,
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
   * Setup component.
   *
   * @template {X extends SectionLeagueContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.description,
      () => {
        nextTick(() => {
          this.statusReactive.isDescriptionExpandable = this.descriptionElementScrollHeight > this.descriptionElementClientHeight
        })
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * get: isDescriptionExpandable
   *
   * @returns {boolean}
   */
  get isDescriptionExpandable () {
    return this.statusReactive.isDescriptionExpandable
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
   * get: descriptionElement
   *
   * @returns {HTMLDivElement | null}
   */
  get descriptionElement () {
    return this.descriptionElementShallowRef.value
  }

  /**
   * get: descriptionElementScrollHeight
   *
   * @returns {number}
   */
  get descriptionElementScrollHeight () {
    if (this.descriptionElement === null) {
      return 0
    }

    return this.descriptionElement.scrollHeight
  }

  /**
   * get: descriptionElementClientHeight
   *
   * @returns {number}
   */
  get descriptionElementClientHeight () {
    if (this.descriptionElement === null) {
      return 0
    }

    return this.descriptionElement.clientHeight
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
   * get: currentTradingVolumeUsd
   *
   * @returns {PropsType['currentTradingVolumeUsd']}
   */
  get currentTradingVolumeUsd () {
    return this.props.currentTradingVolumeUsd
  }

  /**
   * get: dynamicPrizeRules
   *
   * @returns {PropsType['dynamicPrizeRules']}
   */
  get dynamicPrizeRules () {
    return this.props.dynamicPrizeRules
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
    return this.formatNumber({
      value: this.enrolledParticipantsNumber,
      options: {
        trailingZeroDisplay: 'stripIfInteger',
      },
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
   * get: minimumTradingVolume
   *
   * @returns {CompetitionEntity['minimumTradingVolume'] | null}
   */
  get minimumTradingVolume () {
    return this.extractCompetition()
      ?.minimumTradingVolume
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
    return this.formatNumber({
      value: this.participantUpperLimit,
      options: {
        trailingZeroDisplay: 'stripIfInteger',
      },
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
   * get: outcomeCsvUrl
   *
   * @returns {string | null}
   */
  get outcomeCsvUrl () {
    return this.extractCompetition()
      ?.outcomeCsvUrl
      ?? null
  }

  /**
   * get: dynamicPrizeCategories
   *
   * @returns {Array<{
   *   id: number
   *   label: string
   *   iconName: string
   * }>}
   */
  get dynamicPrizeCategories () {
    return [
      {
        id: COMPETITION_PRIZE_CATEGORY.TRADING_VOLUME.ID,
        label: 'Volume Prize',
        iconName: 'heroicons:chart-bar-square-solid',
      },
      {
        id: COMPETITION_PRIZE_CATEGORY.ROI.ID,
        label: 'ROI Prize',
        iconName: 'heroicons:receipt-percent-solid',
      },
      {
        id: COMPETITION_PRIZE_CATEGORY.PNL.ID,
        label: 'PnL Prize',
        iconName: 'heroicons:presentation-chart-line-solid',
      },
      {
        id: COMPETITION_PRIZE_CATEGORY.BONUS.ID,
        label: 'Bonus Prize',
        iconName: 'heroicons:gift-solid',
      },
    ]
  }

  /**
   * Create an array of `DynamicPrizeItemContext` instances.
   *
   * @returns {Array<DynamicPrizeItemContext>}
   */
  createDynamicPrizeItemContexts () {
    const prizeRules = this.normalizeDynamicPrizeRules()
    const maximumPrizeAmount = this.extractMaximumPrizeAmount()
    const currentTradingVolume = this.normalizeCurrentTradingVolumeUsd()

    return prizeRules.map(it => DynamicPrizeItemContext.create({
      tradingVolumeMilestone: it.tradingVolumeMilestone,
      prizes: it.prizes,
      currentTradingVolume,
      maximumPrizeAmount,
    }))
  }

  /**
   * Create a Date instance of current time.
   *
   * @returns {Date}
   */
  createCurrentDatetime () {
    return new Date()
  }

  /**
   * Generate available prize categories.
   *
   * @returns {Array<{
   *   id: number
   *   label: string
   *   iconName: string
   * }>}
   */
  generateAvailablePrizeCategories () {
    const availablePrizeCategoryIds = this.extractAvailablePrizeCategoryIds()

    return this.dynamicPrizeCategories.filter(category =>
      availablePrizeCategoryIds.includes(category.id)
    )
  }

  /**
   * Extract the available prize category ids.
   *
   * @returns {Array<number>}
   */
  extractAvailablePrizeCategoryIds () {
    const categoryIds = this.dynamicPrizeRules.map(category =>
      category.competitionPrizeCategory.categoryId
    )

    const categoryIdSet = new Set(categoryIds)

    return [...categoryIdSet]
  }

  /**
   * Calculate progress of trading volume.
   *
   * @returns {number}
   */
  calculateTradingVolumeProgress () {
    const maximumPrizeAmount = this.extractMaximumPrizeAmount()
    if (!maximumPrizeAmount) {
      return 0
    }

    const currentTradingVolume = this.normalizeCurrentTradingVolumeUsd()
    const percentage = currentTradingVolume / maximumPrizeAmount * 100

    return Math.min(percentage, 100)
  }

  /**
   * Normalize current trading volume.
   *
   * @returns {number}
   */
  normalizeCurrentTradingVolumeUsd () {
    if (!this.currentTradingVolumeUsd) {
      return 0
    }

    const parsedCurrentTradingVolume = parseFloat(this.currentTradingVolumeUsd)
    if (isNaN(parsedCurrentTradingVolume)) {
      return 0
    }

    return parsedCurrentTradingVolume
  }

  /**
   * Extract the maximum prize amount.
   *
   * @returns {number}
   */
  extractMaximumPrizeAmount () {
    const sortedPrizeRules = this.dynamicPrizeRules.toSorted((ruleA, ruleB) =>
      parseFloat(ruleA.targetTradingVolumeUsd) - parseFloat(ruleB.targetTradingVolumeUsd)
    )
    const maximumPrizeAmount = sortedPrizeRules.at(-1)
      ?.targetTradingVolumeUsd

    if (!maximumPrizeAmount) {
      return 0
    }

    return parseFloat(maximumPrizeAmount)
  }

  /**
   * Generate normalized dynamic prize rule object.
   *
   * @returns {Array<NormalizedDynamicPrizeRule>}
   */
  normalizeDynamicPrizeRules () {
    /**
     * @type {{
     *   [tradingVolumeMilestone: string]: Array<PickedDynamicPrizeRuleSummary>
     * }}
     */
    const initialValue = {}

    const dynamicPrizeRuleHash = this.dynamicPrizeRules.reduce((accumulator, rule) => {
      const {
        competitionPrizeCategory,
        targetTradingVolumeUsd,
        totalCategoryPrizeAmount,
      } = rule

      const currentMilestoneValue = accumulator[targetTradingVolumeUsd] ?? []

      return {
        ...accumulator,
        [targetTradingVolumeUsd]: [
          ...currentMilestoneValue,
          {
            competitionPrizeCategory,
            totalCategoryPrizeAmount,
          },
        ],
      }
    }, initialValue)

    return Object.entries(dynamicPrizeRuleHash)
      .map(([key, value]) => ({
        tradingVolumeMilestone: parseFloat(key),
        prizes: value,
      }))
      .toSorted((ruleA, ruleB) => ruleA.tradingVolumeMilestone - ruleB.tradingVolumeMilestone)
  }

  /**
   * Check if dynamic prize rules are empty or not.
   *
   * @returns {boolean}
   */
  hasNoDynamicPrizeRules () {
    if (!this.dynamicPrizeRules) {
      return true
    }

    return this.dynamicPrizeRules.length === 0
  }

  /**
   * Select enroll option.
   *
   * @param {{
   *   optionValue: string
   * }} params - Parameters.
   * @returns {void}
   */
  selectEnrollOption ({
    optionValue,
  }) {
    if (
      optionValue === ENROLLMENT_ACTION_HASH.UNREGISTER
      && !this.disablesUnregisterButton()
    ) {
      this.showCancelationDialog()
    }
  }

  /**
   * Generate enroll select options.
   *
   * @returns {Array<import('~/components/units/AppSelectContext.js').SelectOption>}
   */
  generateEnrollSelectOptions () {
    return [
      {
        label: 'Unregister',
        value: ENROLLMENT_ACTION_HASH.UNREGISTER,
        iconName: 'heroicons:user-minus-solid',
        class: 'option unregister',
        isDisabled: this.disablesUnregisterButton(),
      },
    ]
  }

  /**
   * Check if we should disable unregister button or not.
   *
   * @returns {boolean}
   */
  disablesUnregisterButton () {
    if (this.hasCompetitionStarted()) {
      return true
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    const hasRegistered = [
      ENROLLMENT_STATUS.AWAITING_DEPOSIT,
      ENROLLMENT_STATUS.ENROLLED,
    ]
      .includes(enrollmentStatus)

    return !hasRegistered
  }

  /**
   * Format minimum trading volume.
   *
   * @returns {string}
   */
  formatMinimumTradingVolume () {
    const formattedMinimumTradingVolume = this.formatNumber({
      value: this.minimumTradingVolume,
    })

    return `${formattedMinimumTradingVolume} USDC`
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

    return this.description
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

    return this.shortenWalletAddress({
      address,
    })
  }

  /**
   * Generate host's address url.
   *
   * @returns {string} The host's wallet address URL on Mintscan.
   */
  generateHostAddressUrl () {
    const { address } = this.host ?? {}

    if (!address) {
      return ''
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
   * Format currentTradingVolumeUsd.
   *
   * @returns {string}
   */
  formatCurrentTradingVolumeUsd () {
    return this.formatNumber({
      value: this.currentTradingVolumeUsd,
      options: {
        style: 'currency',
        currency: 'USD',
      },
    })
  }

  /**
   * Format totalPrize.
   *
   * @returns {string}
   */
  formatTotalPrize () {
    return this.formatNumber({
      value: this.totalPrize,
    })
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
   * Normalize minimum deposit.
   *
   * @returns {string} Normalized minimum deposit.
   */
  normalizeMinimumDeposit () {
    const normalizedFigure = this.formatNumber({
      value: this.minimumDeposit,
      options: {
        trailingZeroDisplay: 'stripIfInteger',
      },
    })

    return `${normalizedFigure} USDC`
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
    return this.formatNumber({
      value,
      options: {
        style: 'currency',
        currency: 'USD',
        trailingZeroDisplay: 'stripIfInteger',
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
      'expandable-description': this.isDescriptionExpandable,
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
   * Check if we should hide registration caption.
   *
   * @returns {boolean}
   */
  shouldHideRegistrationCaption () {
    if (this.competitionStatusId === null) {
      return true
    }

    return [
      COMPETITION_STATUS.CANCELED.ID,
      COMPETITION_STATUS.COMPLETED.ID,
    ]
      .includes(this.competitionStatusId)
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
    if (this.competitionStatusId === COMPETITION_STATUS.CANCELED.ID) {
      return 'Arena canceled'
    }

    if (this.competitionStatusId === COMPETITION_STATUS.COMPLETED.ID) {
      return 'Download full result'
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    return ENROLLMENT_ACTION_TEXT[enrollmentStatus]
      ?? ENROLLMENT_ACTION_TEXT.DEFAULT
  }

  /**
   * Generate enroll button variant.
   *
   * @returns {'neutral' | 'muted' | 'primary'}
   */
  generateEnrollButtonVariant () {
    if (this.competitionStatusId === COMPETITION_STATUS.CANCELED.ID) {
      return 'muted'
    }

    if (this.competitionStatusId === COMPETITION_STATUS.COMPLETED.ID) {
      return 'neutral'
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    return ENROLLMENT_ACTION_BUTTON_VARIANT_HASH[enrollmentStatus]
      ?? ENROLLMENT_ACTION_BUTTON_VARIANT_HASH.DEFAULT
  }

  /**
   * Whether to disable enroll button or not.
   *
   * @returns {boolean}
   */
  shouldDisableEnrollButton () {
    if (this.competitionStatusId === COMPETITION_STATUS.CANCELED.ID) {
      return true
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    return [
      ENROLLMENT_STATUS.AWAITING_DEPOSIT,
      ENROLLMENT_STATUS.ENROLLED,
      ENROLLMENT_STATUS.NOT_REGISTERED_BUT_FULL,
      ENROLLMENT_STATUS.NOT_REGISTERED_BUT_ENDED,
      ENROLLMENT_STATUS.COMPETING,
    ]
      .includes(enrollmentStatus)
  }

  /**
   * Generate icon name of enroll button.
   *
   * @returns {string}
   */
  generateEnrollButtonIconName () {
    if (this.competitionStatusId === COMPETITION_STATUS.CANCELED.ID) {
      return 'heroicons:x-mark'
    }

    if (this.competitionStatusId === COMPETITION_STATUS.COMPLETED.ID) {
      return 'heroicons:arrow-down-tray'
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    return ENROLLMENT_ACTION_ICON_NAME_HASH[enrollmentStatus]
      ?? ENROLLMENT_ACTION_ICON_NAME_HASH.DEFAULT
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
      return ENROLLMENT_STATUS.NOT_REGISTERED
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
        checker: () => this.isAwaitingDeposit(),
        result: ENROLLMENT_STATUS.AWAITING_DEPOSIT,
      },
      {
        checker: () => this.hasEnrolled() && this.hasCompetitionStarted(),
        result: ENROLLMENT_STATUS.COMPETING,
      },
      {
        checker: () => this.hasEnrolled(),
        result: ENROLLMENT_STATUS.ENROLLED,
      },
      {
        checker: () => this.hasRegistrationEnded(),
        result: ENROLLMENT_STATUS.NOT_REGISTERED_BUT_ENDED,
      },
      {
        checker: () => this.isCompetitionFull,
        result: ENROLLMENT_STATUS.NOT_REGISTERED_BUT_FULL,
      },
    ]
  }

  /**
   * Check if we are waiting for the participant to deposit.
   *
   * @returns {boolean}
   */
  isAwaitingDeposit () {
    if (this.participantStatusId === null) {
      return false
    }

    return this.participantStatusId === COMPETITION_PARTICIPANT_STATUS.AWAITING_DEPOSIT.ID
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
      COMPETITION_PARTICIPANT_STATUS.REGISTRATION_SUCCESS.ID,
      COMPETITION_PARTICIPANT_STATUS.ACTIVE.ID,
      COMPETITION_PARTICIPANT_STATUS.COMPLETED.ID,
    ]
      .includes(this.participantStatusId)
  }

  /**
   * Check if the competition has started.
   *
   * @returns {boolean}
   */
  hasCompetitionStarted () {
    if (this.competitionStatusId === null) {
      return false
    }

    return [
      COMPETITION_STATUS.IN_PROGRESS.ID,
      COMPETITION_STATUS.COMPLETED.ID,
    ]
      .includes(this.competitionStatusId)
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
      COMPETITION_STATUS.IN_PROGRESS.ID,
      COMPETITION_STATUS.COMPLETED.ID,
      COMPETITION_STATUS.CANCELED.ID,
    ]
      .includes(this.competitionStatusId)
  }

  /**
   * Check if registration period has ended.
   *
   * @returns {boolean}
   */
  hasRegistrationEnded () {
    const endDate = this.extractAvailableRegistrationEndDate()

    if (!endDate) {
      return false
    }

    const now = this.createCurrentDatetime()

    return now > endDate
  }

  /**
   * Extract available registration end date.
   *
   * @returns {Date | null}
   */
  extractAvailableRegistrationEndDate () {
    const lateRegistrationDate = this.extractLateRegistrationEndDate()

    if (!lateRegistrationDate) {
      return this.extractRegistrationEndDate()
    }

    return lateRegistrationDate
  }

  /**
   * Extract registration end date.
   *
   * @returns {Date | null}
   */
  extractRegistrationEndDate () {
    return this.extractScheduleByCategoryId({
      categoryId: SCHEDULE_CATEGORY.REGISTRATION_END.ID,
    })
  }

  /**
   * Extract late registration end date.
   *
   * @returns {Date | null}
   */
  extractLateRegistrationEndDate () {
    return this.extractScheduleByCategoryId({
      categoryId: SCHEDULE_CATEGORY.LATE_REGISTRATION_END.ID,
    })
  }

  /**
   * Extract schedule timestamp based on category id.
   *
   * @param {{
   *   categoryId: number
   * }} params - Parameters.
   * @returns {Date | null}
   */
  extractScheduleByCategoryId ({
    categoryId,
  }) {
    const dateString = this.schedules
      .find(it => it.category.categoryId === categoryId)
      ?.scheduledDatetime
      ?? null

    if (!dateString) {
      return null
    }

    return new Date(dateString)
  }

  /**
   * Process primary action of enroll button.
   *
   * @returns {void}
   */
  processPrimaryAction () {
    if (this.competitionStatusId === COMPETITION_STATUS.COMPLETED.ID) {
      this.downloadOutcomeCsv()

      return
    }

    const enrollmentStatus = this.generateEnrollmentStatus()

    if (enrollmentStatus === ENROLLMENT_STATUS.NOT_REGISTERED) {
      this.showTermsDialog()
    }
  }

  /**
   * Download outcome CSV.
   *
   * @returns {Promise<void>}
   */
  async downloadOutcomeCsv () {
    if (this.outcomeCsvUrl === null) {
      return
    }

    const response = await fetch(this.outcomeCsvUrl)
    const fileBlob = await response.blob()
    const blobURL = URL.createObjectURL(fileBlob)

    const link = document.createElement('a')

    const filename = this.extractOutcomeCsvFilename({
      response,
    })

    link.href = blobURL
    link.download = filename

    link.click()

    URL.revokeObjectURL(blobURL)
  }

  /**
   * Extract outcome CSV filename.
   *
   * @param {{
   *   response: Response
   * }} params - Parameters.
   * @returns {string} Filename.
   */
  extractOutcomeCsvFilename ({
    response,
  }) {
    const fallbackFilename = 'outcome.csv'

    const contentDisposition = response.headers.get('Content-Disposition')
    if (!contentDisposition) {
      return fallbackFilename
    }

    // Extract filename from Content-Disposition header
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/ui
    const matchedFilenames = contentDisposition.match(filenameRegex)

    if (!matchedFilenames) {
      return fallbackFilename
    }

    // Index 0 is the full match, index 1 is the filename.
    const firstMatchedFilename = matchedFilenames.at(1)

    return firstMatchedFilename
      ? firstMatchedFilename.replace(/['"]/ug, '')
      : fallbackFilename
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
    const now = this.createCurrentDatetime()
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
 *   descriptionElementShallowRef: import('vue').ShallowRef<HTMLDivElement | null>
 *   statusReactive: import('vue').Reactive<{
 *     isDescriptionExpandable: boolean
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
 *   currentTradingVolumeUsd: string | null
 *   dynamicPrizeRules: Array<schema.graphql.CompetitionDynamicPrizeRuleSummary>
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

/**
 * @typedef {{
 *   tradingVolumeMilestone: number
 *   prizes: Array<PickedDynamicPrizeRuleSummary>
 * }} NormalizedDynamicPrizeRule
 */

/**
 * @typedef {Pick<schema.graphql.CompetitionDynamicPrizeRuleSummary, 'competitionPrizeCategory' | 'totalCategoryPrizeAmount'>} PickedDynamicPrizeRuleSummary
 */
