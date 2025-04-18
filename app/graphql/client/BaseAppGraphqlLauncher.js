import {
  BaseGraphqlLauncher,
} from '@openreachtech/furo'

import graphqlConfig from '~/app/graphql/graphql.config'

/**
 * Base class for all app graphql launchers.
 *
 * @extends {BaseGraphqlLauncher}
 */
export default class BaseAppGraphqlLauncher extends BaseGraphqlLauncher {
  /** @override */
  static get graphqlConfig () {
    return /** @type {*} */ (
      graphqlConfig
    )
  }
}

/**
 * @typedef {furo.BaseGraphqlLauncherFactoryParams} BaseAppGraphqlLauncherFactoryParams
 */
