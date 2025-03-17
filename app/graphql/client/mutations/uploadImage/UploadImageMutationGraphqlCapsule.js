import BaseAppGraphqlCapsule from '~/app/graphql/client/BaseAppGraphqlCapsule'

/**
 * UploadImageMutation graphql capsule
 *
 * @extends {BaseAppGraphqlCapsule<UploadImageMutationResponseContent>}
 */
export default class UploadImageMutationGraphqlCapsule extends BaseAppGraphqlCapsule {
  /**
   * Extract upload image value hash.
   *
   * @returns {UploadImageMutationResponseContent['uploadImage'] | null}
   */
  extractUploadImageValueHash () {
    return this.extractContent()
      ?.uploadImage
      ?? null
  }

  /**
   * get: imageId
   *
   * @returns {UploadImageMutationResponseContent['uploadImage']['imageId'] | null}
   */
  get imageId () {
    return this.extractUploadImageValueHash()
      ?.imageId
      ?? null
  }

  /**
   * get: contentType
   *
   * @returns {UploadImageMutationResponseContent['uploadImage']['contentType'] | null}
   */
  get contentType () {
    return this.extractUploadImageValueHash()
      ?.contentType
      ?? null
  }

  /**
   * get: image
   *
   * @returns {UploadImageMutationResponseContent['uploadImage']['image'] | null}
   */
  get image () {
    return this.extractUploadImageValueHash()
      ?.image
      ?? null
  }
}

/**
 * @typedef {{
 *   uploadImage: {
 *     imageId: number
 *     contentType: string
 *     image: string
 *   }
 * }} UploadImageMutationResponseContent
 */
