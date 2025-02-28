import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SearchAddressByNameQueryGraphqlPayload from '~/app/graphql/client/queries/searchAddressByName/SearchAddressByNameQueryGraphqlPayload'
import SearchAddressByNameQueryGraphqlCapsule from '~/app/graphql/client/queries/searchAddressByName/SearchAddressByNameQueryGraphqlCapsule'

/**
 * SearchAddressByNameQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher<typeof SearchAddressByNameQueryGraphqlLauncher>}
 */
export default class SearchAddressByNameQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SearchAddressByNameQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SearchAddressByNameQueryGraphqlCapsule
  }
}
