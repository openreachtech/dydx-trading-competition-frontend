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
        ok: (it, valueHash) => {
          // TODO: This logic is not entirely correct. The spec should be:
          // - The array has at least 4 members (registration start, registration end, competition start, competition end)
          // - Prize distribution schedule is optional. However, should update the form to omit the field if input value is empty.
          const requiredScheduleIds = [
            SCHEDULE_CATEGORY.REGISTRATION_START.ID,
            SCHEDULE_CATEGORY.REGISTRATION_END.ID,
            SCHEDULE_CATEGORY.COMPETITION_START.ID,
            SCHEDULE_CATEGORY.COMPETITION_END.ID,
            SCHEDULE_CATEGORY.PRIZE_DISTRIBUTE.ID,
          ]

          return it.length >= 4
            && it.every(schedule => requiredScheduleIds.includes(schedule.categoryId))
        },
        message: 'Must at least provide schedule for registration and competition periods',
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
        message: 'Competition must have a minimum entry balance',
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
