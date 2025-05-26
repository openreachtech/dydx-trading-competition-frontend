import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

/**
 * UploadImageMutation graphql payload
 *
 * @extends {BaseAppGraphqlPayload<UploadImageMutationRequestVariables>}
 */
export default class UploadImageMutationGraphqlPayload extends BaseAppGraphqlPayload {
  /** @override */
  static get document () {
    return /* GraphQL */ `
      mutation UploadImage ($input: UploadImageInput!) {
        uploadImage (input: $input) {
          imageId
          contentType
          image
          imageUrl
        }
      }
    `
  }
}

/**
 * @typedef {{
 *   input: {
 *     file: File
 *   }
 * }} UploadImageMutationRequestVariables
 */
