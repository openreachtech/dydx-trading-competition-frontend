import BaseFilteredFormElementClerk from '~/app/domClerk/BaseFilteredFormElementClerk'

import {
  SCHEDULE_CATEGORY,
} from '~/app/constants'

/**
 * UpdateCompetitionSchedulesFormElementClerk.
 *
 * @extends {BaseFilteredFormElementClerk<typeof UpdateCompetitionSchedulesFormElementClerk, UpdateCompetitionSchedulesFormValueHash, SchemaVariableHash>}
 */
export default class UpdateCompetitionSchedulesFormElementClerk extends BaseFilteredFormElementClerk {
  /** @override */
  static get rules () {
    /**
     * @type {Array<furo.FieldValidatorFactoryParams>}
     */
    return [
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
        message: 'Schedule must follow the following timeline: Registration Start → Competition Start → Late Registration End → Competition End → Prize Distribution.',
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

    const validSchedules = schedules.filter(it => it.scheduledDatetime)

    return validSchedules.length >= 4
      && validSchedules.every(schedule => requiredScheduleIds.includes(schedule.categoryId))
  }
}

/**
 * @typedef {{}} UpdateCompetitionSchedulesFormValueHash
 */

/**
 * @typedef {{}} SchemaVariableHash
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/mutations/updateCompetitionSchedules/UpdateCompetitionSchedulesMutationGraphqlPayload'
 * ).UpdateCompetitionSchedulesMutationRequestVariables['input']['schedules']} Schedules
 */
