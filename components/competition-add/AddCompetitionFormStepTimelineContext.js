import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * AddCompetitionFormStepTimelineContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class AddCompetitionFormStepTimelineContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionFormStepTimelineContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    endDateReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.endDateReactive = endDateReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionFormStepTimelineContext ? X : never} T, X
   * @override
   * @param {AddCompetitionFormStepTimelineContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    endDateReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        endDateReactive,
      })
    )
  }

  /**
   * get: validationMessage
   *
   * @returns {PropsType['validationMessage']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }

  /**
   * get: initialFormValueHash
   *
   * @returns {PropsType['initialFormValueHash']}
   */
  get initialFormValueHash () {
    return this.props.initialFormValueHash
  }

  /**
   * get: initialSchedules
   *
   * @returns {Array<Schedule>}
   */
  get initialSchedules () {
    return this.initialFormValueHash
      ?.schedules
      ?? []
  }

  /**
   * Generate timeline.
   *
   * @returns {Timeline}
   */
  generateTimeline () {
    return [
      {
        iconName: 'heroicons:rocket-launch-solid',
        title: 'Registration Period',
        startDateInputId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
        endDateInputId: SCHEDULE_CATEGORY.LATE_REGISTRATION_END.ID,
        initialStartDate: this.extractInitialRegistrationStartDate(),
        initialEndDate: this.extractInitialRegistrationEndDate(),
        note: '(automatically set to one day before Competition Stage start date)',
      },
      {
        shouldHideIcon: true,
        iconName: 'heroicons:rocket-launch-solid',
        title: 'Competition Period',
        startDateInputId: SCHEDULE_CATEGORY.COMPETITION_START.ID,
        endDateInputId: SCHEDULE_CATEGORY.COMPETITION_END.ID,
        initialStartDate: this.extractInitialCompetitionStartDate(),
        initialEndDate: this.extractInitialCompetitionEndDate(),
        note: '(automatically set to one day before Reward Distribution start date)',
      },
      {
        iconName: 'heroicons:flag-solid',
        title: 'Reward Distribution',
        startDateInputId: SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
        initialStartDate: this.extractInitialPrizeDistributeDate(),
      },
    ]
  }

  /**
   * Extract initial date.
   *
   * @param {{
   *   scheduleCategoryId: number
   * }} params - Parameters.
   * @returns {string | null}
   */
  extractInitialDate ({
    scheduleCategoryId,
  }) {
    const schedule = this.initialSchedules.find(
      it => it.category.categoryId === scheduleCategoryId
    )

    if (!schedule) {
      return null
    }

    return schedule.scheduledDatetime
  }

  /**
   * Extract initial registration start date.
   *
   * @returns {string | null}
   */
  extractInitialRegistrationStartDate () {
    return this.extractInitialDate({
      scheduleCategoryId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
    })
  }

  /**
   * Extract initial registration end date.
   *
   * @returns {string | null}
   */
  extractInitialRegistrationEndDate () {
    return this.extractInitialDate({
      scheduleCategoryId: SCHEDULE_CATEGORY.REGISTRATION_END.ID,
    })
  }

  /**
   * Extract initial competition start date.
   *
   * @returns {string | null}
   */
  extractInitialCompetitionStartDate () {
    return this.extractInitialDate({
      scheduleCategoryId: SCHEDULE_CATEGORY.COMPETITION_START.ID,
    })
  }

  /**
   * Extract initial competition end date.
   *
   * @returns {string | null}
   */
  extractInitialCompetitionEndDate () {
    return this.extractInitialDate({
      scheduleCategoryId: SCHEDULE_CATEGORY.COMPETITION_END.ID,
    })
  }

  /**
   * Extract initial prize distribution date.
   *
   * @returns {string | null}
   */
  extractInitialPrizeDistributeDate () {
    return this.extractInitialDate({
      scheduleCategoryId: SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
    })
  }

  /**
   * Generate CSS classes for a phase.
   *
   * @param {{
   *   phase: Phase
   * }} params - Parameters.
   * @returns {Record<string, boolean>} CSS classes.
   */
  generatePhaseClasses ({
    phase,
  }) {
    return {
      'hide-icon': phase.shouldHideIcon === true,
      'hide-end-date': !phase.endDateInputId,
    }
  }

  /**
   * Generate CSS classes for error message.
   *
   * @param {{
   *   fieldName: keyof PropsType['validationMessage']
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateErrorMessageClasses ({
    fieldName,
  }) {
    return {
      hidden: !this.validationMessage[fieldName],
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   endDateReactive: {
 *     registration: string
 *     competition: string
 *   }
 * }} AddCompetitionFormStepTimelineContextParams
 */

/**
 * @typedef {AddCompetitionFormStepTimelineContextParams} AddCompetitionFormStepTimelineContextFactoryParams
 */

/**
 * @typedef {Array<Phase>} Timeline
 */

/**
 * @typedef {{
 *   shouldHideIcon?: boolean
 *   iconName: string
 *   title: string
 *   startDateInputId: number
 *   endDateInputId?: number
 *   initialStartDate: string | null
 *   initialEndDate?: string | null
 *   note?: string
 * }} Phase
 */

/**
 * @typedef {{
 *   validationMessage: furo.ValidatorHashType['message']
 *   initialFormValueHash: InitialFormValueHash | null
 * }} PropsType
 */

/**
 * @typedef {{
 *   schedules: Array<Schedule>
 * }} InitialFormValueHash
 */

/**
 * @typedef {{
 *   category: {
 *     categoryId: number
 *     name: string
 *     description: string
 *   }
 *   scheduledDatetime: string
 * }} Schedule
 */
