import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * AddCompetitionFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof AddCompetitionFormElementClerk, AddCompetitionFormValueHash, SchemaVariableHash>}
 */
export default class AddCompetitionFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
      // Step 1: Details
      {
        field: 'title',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Title can not be empty',
      },
      {
        field: 'description',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Please provide a description',
      },

      // Step 2: Timeline
      {
        field: 'schedules',
        /**
         * @type {(
         *   it: Schedules,
         *   valueHash: Record<string, *>
         * ) => boolean}
         */
        ok: (it, valueHash) => this.validateRequiredSchedules({
          schedules: it,
        }),
        message: 'Must at least provide schedule for registration and competition periods',
      },
      {
        field: 'schedules',
        /** @type {(it: Array<schema.graphql.CompetitionScheduleInput>, valueHash: Record<string, *>) => boolean} */
        ok: (it, valueHash) => this.isValidSchedules({
          schedules: it,
        }),
        message: 'Schedule must follow the following timeline: Registration Start → Competition Start → Registration End → Competition End → Prize Distribution.',
      },

      // Step 3: Participation
      {
        field: 'participantLowerLimit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Must have a lower limit of participants',
      },
      {
        field: 'participantUpperLimit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Must have an upper limit of participants',
      },
      {
        field: 'minimumDeposit',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        // TODO: Reword 'competition' to 'arena'.
        message: 'Competition must have a minimum entry balance',
      },
      {
        field: 'minimumTradingVolume',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Arena must have a minimum trading volume',
      },

      // Step 4: Rank & Prize
      {
        field: 'prizeRules',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it.length !== 0,
        message: 'Must provide prize rules',
      },
      {
        field: 'prizeRules',
        /**
         * @type {(
         *   it: PrizeRules,
         *   valueHash: Record<string, *>
         * ) => boolean}
         */
        ok: (it, valueHash) => it.every(rule => Number(rule.amount) > 0),
        message: 'Prize amount must be greater than 0',
      },
      {
        field: 'totalPrize',
        /** @type {furo.ValidationRule} */
        ok: (it, valueHash) => it,
        message: 'Total prize must be provided',
      },
    ]
  }

  /**
   * Check if the provided schedule is valid.
   *
   * @param {{
   *   schedules: Array<schema.graphql.CompetitionScheduleInput>
   * }} params - Parameters.
   * @returns {boolean}
   */
  static isValidSchedules ({
    schedules,
  }) {
    return schedules
      .map(it => ({
        ...it,
        scheduledDate: new Date(it.scheduledDatetime),
      }))
      .toSorted((scheduleA, scheduleB) =>
        scheduleA.scheduledDate.getTime() - scheduleB.scheduledDate.getTime()
      )
      .every((it, index) => {
        const expectedOrder = Object.values(SCHEDULE_CATEGORY)
          .find(category => category.ID === it.categoryId)
          ?.ORDER
          ?? null

        const actualOrder = index + 1

        return expectedOrder === actualOrder
      })
  }

  /**
   * Validate the required schedules.
   *
   * @param {{
   *   schedules: Schedules
   * }} params - Parameters.
   * @returns {boolean}
   */
  static validateRequiredSchedules ({
    schedules,
  }) {
    // TODO: This logic is not entirely correct. The spec should be:
    // - The array has at least 4 members (registration start, late registration end, competition start, competition end)
    // - Prize distribution schedule is optional. However, should update the form to omit the field if input value is empty.
    const requiredScheduleIds = [
      SCHEDULE_CATEGORY.REGISTRATION_START.ID,
      SCHEDULE_CATEGORY.LATE_REGISTRATION_END.ID,
      SCHEDULE_CATEGORY.COMPETITION_START.ID,
      SCHEDULE_CATEGORY.COMPETITION_END.ID,
      SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
    ]

    return schedules.length >= 4
      && schedules.every(schedule => requiredScheduleIds.includes(schedule.categoryId))
  }
}

/**
 * @typedef {{}} AddCompetitionFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlPayload'
 * ).AddCompetitionMutationRequestVariables['input']['schedules']} Schedules
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/mutations/addCompetition/AddCompetitionMutationGraphqlPayload'
 * ).AddCompetitionMutationRequestVariables['input']['prizeRules']} PrizeRules
 */
