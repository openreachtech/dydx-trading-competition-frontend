import BaseAppGraphqlLauncher from '~/app/graphql/client/BaseAppGraphqlLauncher'
import SearchAddressesByNameQueryGraphqlPayload from '~/app/graphql/client/queries/searchAddressesByName/SearchAddressesByNameQueryGraphqlPayload'
import SearchAddressesByNameQueryGraphqlCapsule from '~/app/graphql/client/queries/searchAddressesByName/SearchAddressesByNameQueryGraphqlCapsule'

/**
 * SearchAddressesByNameQuery graphql launcher
 *
 * @extends {BaseAppGraphqlLauncher}
 */
export default class SearchAddressesByNameQueryGraphqlLauncher extends BaseAppGraphqlLauncher {
  /** @override */
  static get Payload () {
    return SearchAddressesByNameQueryGraphqlPayload
  }

  /** @override */
  static get Capsule () {
    return SearchAddressesByNameQueryGraphqlCapsule
  }
}
