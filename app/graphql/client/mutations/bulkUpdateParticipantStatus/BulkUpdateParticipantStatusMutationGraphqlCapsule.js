import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * BulkUpdateParticipantStatus mutation GraphQL capsule.
 *
 * @extends {BaseAppGraphqlCapsule<ResponseContent>}
 */
export default class BulkUpdateParticipantStatusMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract `bulkUpdateParticipantStatus`.
   *
   * @returns {ResponseContent['bulkUpdateParticipantStatus'] | null}
   */
  extractBulkUpdateParticipantStatus () {
    const content = this.extractContent()

    return content
      ?.bulkUpdateParticipantStatus
      ?? null
  }

  /**
   * get: success
   *
   * @returns {boolean}
   */
  get success () {
    return this.extractBulkUpdateParticipantStatus()
      ?.success
      ?? false
  }
}

/**
 * @typedef {{
 *   bulkUpdateParticipantStatus: {
 *     success: boolean
 *   }
 * }} ResponseContent
 */
