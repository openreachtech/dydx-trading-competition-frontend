import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  PAGINATION,
} from '~/app/constants'

/**
 * AddressesSearchBarContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AddressesSearchBarContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddressesSearchBarContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddressesSearchBarContext ? X : never} T, X
   * @override
   * @param {AddressesSearchBarContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /**
   * Search addresses by name.
   *
   * @param {{
   *   query: string
   * }} params - Parameters of this method.
   * @returns {Promise<void>}
   */
  async searchAddressesByName ({
    query,
  }) {
    await this.graphqlClientHash
      .searchAddressesByName
      .invokeRequestOnEvent({
        variables: {
          input: {
            query,
            pagination: {
              limit: PAGINATION.LIMIT,
              offset: 0,
            },
          },
        },
        hooks: this.searchAddressesByNameLauncherHooks,
      })
  }

  /**
   * Normalize name.
   *
   * @param {{
   *   name: string
   * }} params - Parameters.
   * @returns {string} Normalized name.
   */
  normalizeName ({
    name,
  }) {
    return name ?? '----'
  }

  /**
   * Generate address url.
   *
   * @param {{
   *   address: string
   * }} params - Parameters.
   * @returns {string} Address url.
   */
  generateAddressUrl ({
    address,
  }) {
    return `/profiles/${address}`
  }

  /**
   * get: addresses
   *
   * @returns {Addresses}
   */
  get addresses () {
    return this.searchAddressesByNameCapsuleRef.value.addresses
  }

  /**
   * get: searchAddressesByNameCapsuleRef
   *
   * @returns {AddressesSearchBarContext['graphqlClientHash']['searchAddressesByName']['capsuleRef']}
   */
  get searchAddressesByNameCapsuleRef () {
    return this.graphqlClientHash.searchAddressesByName.capsuleRef
  }

  /**
   * get: SearchAddressesByNameLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get searchAddressesByNameLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoading = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false
      },
    }
  }

  /**
   * get: isLoading
   *
   * @returns {boolean} `true` if is loading.
   */
  get isLoading () {
    return this.statusReactive.isLoading
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   statusReactive: StatusReactive
 * }} AddressesSearchBarContextParams
 */

/**
 * @typedef {AddressesSearchBarContextParams} AddressesSearchBarContextFactoryParams
 */

/**
 * @typedef {'searchAddressesByName'} GraphqlClientHashKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */

/**
 * @typedef {import('~/app/graphql/client/queries/searchAddressesByName/SearchAddressesByNameQueryGraphqlCapsule')
 *   .ResponseContent['searchAddressesByName']['addresses']
 * } Addresses
 */
