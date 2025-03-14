import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * AddCompetitionFormStepTimelineContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class AddCompetitionFormStepTimelineContext extends BaseFuroContext {
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
   * Generate timeline.
   *
   * @returns {Timeline}
   */
  generateTimeline () {
    return [
      {
        iconName: 'heroicons:rocket-launch-solid',
        title: 'Registration Stage',
        startDateInputId: SCHEDULE_CATEGORY.REGISTRATION_START.ID,
        endDateInputId: SCHEDULE_CATEGORY.REGISTRATION_END.ID,
        endDateExtractionKey: 'registration',
        note: '(automatically set to one day before Competition Stage start date)',
      },
      {
        shouldHideIcon: true,
        iconName: 'heroicons:rocket-launch-solid',
        title: 'Competition Stage',
        startDateInputId: SCHEDULE_CATEGORY.COMPETITION_START.ID,
        endDateInputId: SCHEDULE_CATEGORY.COMPETITION_END.ID,
        endDateSelectionKey: 'registration',
        endDateExtractionKey: 'competition',
        note: '(automatically set to one day before Reward Distribution start date)',
      },
      {
        iconName: 'heroicons:flag-solid',
        title: 'Reward Distribution',
        endDateSelectionKey: 'competition',
        startDateInputId: SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
      },
    ]
  }

  /**
   * Set end date value.
   *
   * @param {{
   *   key: Phase['endDateSelectionKey']
   *   date: string
   * }} params - Parameters.
   * @returns {void}
   */
  selectEndDateValue ({
    key,
    date,
  }) {
    if (!key) {
      return
    }

    const selectedDate = new Date(date)
    selectedDate.setDate(selectedDate.getDate() - 1)

    const oneDayBefore = selectedDate.toISOString()
      .split('T')
      .at(0)
      ?? ''

    this.endDateReactive[key] = oneDayBefore
  }

  /**
   * Extract end date value.
   *
   * @param {{
   *   key: Phase['endDateExtractionKey']
   * }} params - Parameters
   * @returns {string}
   */
  extractEndDateValue ({
    key,
  }) {
    if (!key) {
      return ''
    }

    return this.endDateReactive[key]
  }

  /**
   * Normalize displayed date.
   *
   * @param {{
   *   key: Phase['endDateExtractionKey']
   * }} params - Parameters.
   * @returns {string}
   */
  normalizeDisplayedDate ({
    key,
  }) {
    const dateValue = this.extractEndDateValue({
      key,
    })

    if (!dateValue) {
      return '----/--/--'
    }

    const dateInstance = new Date(dateValue)
    const formatter = new Intl.DateTimeFormat('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      timeZone: 'UTC',
    })

    return formatter.format(dateInstance)
      .replace(/-/gu, '/')
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
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
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
 *   endDateSelectionKey?: keyof AddCompetitionFormStepTimelineContextParams['endDateReactive']
 *   endDateExtractionKey?: keyof AddCompetitionFormStepTimelineContextParams['endDateReactive']
 *   note?: string
 * }} Phase
 */
