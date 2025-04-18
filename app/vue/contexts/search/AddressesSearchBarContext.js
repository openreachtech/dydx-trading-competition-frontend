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
  async searchAddresses ({
    query,
  }) {
    await this.graphqlClientHash
      .searchAddresses
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
        hooks: this.searchAddressesLauncherHooks,
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
    return this.searchAddressesCapsuleRef.value.addresses
  }

  /**
   * get: searchAddressesCapsuleRef
   *
   * @returns {AddressesSearchBarContext['graphqlClientHash']['searchAddresses']['capsuleRef']}
   */
  get searchAddressesCapsuleRef () {
    return this.graphqlClientHash.searchAddresses.capsuleRef
  }

  /**
   * get: searchAddressesLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get searchAddressesLauncherHooks () {
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
 * @typedef {'searchAddresses'} GraphqlClientHashKeys
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
 * @typedef {Array<import('~/app/graphql/client/queries/searchAddresses/SearchAddressesQueryGraphqlCapsule').Address>} Addresses
 */
