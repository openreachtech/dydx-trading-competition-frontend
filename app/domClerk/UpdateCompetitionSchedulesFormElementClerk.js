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
        ok: (it, valueHash) => {
          const requiredScheduleIds = [
            SCHEDULE_CATEGORY.REGISTRATION_START.ID,
            SCHEDULE_CATEGORY.LATE_REGISTRATION_END.ID,
            SCHEDULE_CATEGORY.COMPETITION_START.ID,
            SCHEDULE_CATEGORY.COMPETITION_END.ID,
            SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
          ]

          return it.length >= 4
            && it.every(schedule => requiredScheduleIds.includes(schedule.categoryId))
        },
        message: 'Must at least provide schedule for registration and competition periods',
      },
    ]
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
