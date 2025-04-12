import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Context class for `pages/competitions/[competitionId]` page.
 *
 * @extends {BaseFuroContext<null>}
 */
export default class CompetitionDetailsPageContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {CompetitionDetailsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    walletStore,
    graphqlClientHash,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.statusReactive = statusReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CompetitionDetailsPageContext ? X : never} T, X
   * @override
   * @param {CompetitionDetailsPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    walletStore,
    graphqlClientHash,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        walletStore,
        graphqlClientHash,
        statusReactive,
      })
    )
  }

  /** @override */
  setupComponent () {
    const route = useRoute()
    const { competitionId } = route.params

    this.graphqlClientHash
      .competition
      .invokeRequestOnMounted({
        variables: {
          input: {
            competitionId: Number(competitionId),
          },
        },
        hooks: this.competitionLauncherHooks,
      })

    this.graphqlClientHash
      .addressName
      .invokeRequestOnMounted({
        variables: {
          input: {
            address: this.walletStore.walletStoreRef.value.localWallet.address,
          },
        },
      })

    this.watch(
      () => this.walletStore.walletStoreRef.value.localWallet.address,
      async newAddress => {
        await this.graphqlClientHash
          .addressName
          .invokeRequestOnEvent({
            variables: {
              input: {
                address: newAddress,
              },
            },
          })
      }
    )

    return this
  }

  /**
   * get: competitionLauncherHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get competitionLauncherHooks () {
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
   * get: competition
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity}
   */
  get competition () {
    return this.competitionCapsuleRef.value
      .extractCompetition()
  }

  /**
   * get: competitionStatusId
   *
   * @returns {number | null}
   */
  get competitionStatusId () {
    return this.competitionCapsuleRef.value
      .statusId
  }

  /**
   * get: addressName
   *
   * @returns {string | null}
   */
  get addressName () {
    return this.addressNameCapsuleRef.value.name
  }

  /**
   * get: schedules
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['schedules']}
   */
  get schedules () {
    return this.competitionCapsuleRef.value
      .schedules
  }

  /**
   * get: prizeRules
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['prizeRules']}
   */
  get prizeRules () {
    return this.competitionCapsuleRef.value
      .prizeRules
  }

  /**
   * get: competitionCapsuleRef
   *
   * @returns {CompetitionDetailsPageContextParams['graphqlClientHash']['competition']['capsuleRef']}
   */
  get competitionCapsuleRef () {
    return this.graphqlClientHash.competition.capsuleRef
  }

  /**
   * get: addressNameCapsuleRef
   *
   * @returns {CompetitionDetailsPageContextParams['graphqlClientHash']['addressName']['capsuleRef']}
   */
  get addressNameCapsuleRef () {
    return this.graphqlClientHash.addressName.capsuleRef
  }

  /**
   * Show wallet selection dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  showDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.showDialog()
  }

  /**
   * Dismiss wallet selection dialog.
   *
   * @param {{
   *   dialogElement: import('~/components/units/AppDialog.vue').default | null
   * }} params - Parameters.
   * @returns {void}
   */
  dismissDialog ({
    dialogElement,
  }) {
    if (!dialogElement) {
      return
    }

    dialogElement.dismissDialog()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *     addressName: GraphqlClient
 *   }
 *   statusReactive: StatusReactive
 * }} CompetitionDetailsPageContextParams
 */

/**
 * @typedef {CompetitionDetailsPageContextParams} CompetitionDetailsPageContextFactoryParams
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */
