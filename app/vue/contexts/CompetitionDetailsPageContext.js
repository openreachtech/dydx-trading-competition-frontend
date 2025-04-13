import {
  onMounted,
} from 'vue'

import {
  useRoute,
} from '#imports'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  COMPETITION_STATUS,
  PAGINATION,
} from '~/app/constants'

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
    leaderboardEntriesRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.leaderboardEntriesRef = leaderboardEntriesRef
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
    leaderboardEntriesRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        walletStore,
        graphqlClientHash,
        leaderboardEntriesRef,
        statusReactive,
      })
    )
  }

  /**
   * Generate leaderboard header entries.
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  generateLeaderboardHeaderEntries () {
    if (this.competitionStatusId === null) {
      return []
    }

    const headerEntryHash = {
      [COMPETITION_STATUS.CANCELED.ID]: [],
      // [COMPETITION_STATUS.CREATED.ID]: this.competitionParticipantHeaderEntries,
      // [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: this.competitionParticipantHeaderEntries,
      [COMPETITION_STATUS.IN_PROGRESS.ID]: this.ongoingLeaderboardHeaderEntries,
      // [COMPETITION_STATUS.COMPLETED.ID]: this.finalOutcomeHeaderEntries,
    }

    return headerEntryHash[this.competitionStatusId]
      ?? []
  }

  /**
   * get: ongoingLeaderboardHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get ongoingLeaderboardHeaderEntries () {
    return [
      {
        key: 'ongoing-rank',
        label: 'Rank',
      },
      {
        key: 'ongoing-name',
        label: 'Name',
      },
      {
        key: 'ongoing-address',
        label: 'Address',
      },
      {
        key: 'ongoing-pnl',
        label: 'PnL',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'ongoing-baseline',
        label: 'Performance Baseline',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'ongoing-roi',
        label: 'ROI',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /** @override */
  setupComponent () {
    const route = useRoute()
    const { competitionId } = route.params

    onMounted(async () => {
      await this.graphqlClientHash
        .competition
        .invokeRequestOnEvent({
          variables: {
            input: {
              competitionId: Number(competitionId),
            },
          },
          hooks: this.competitionLauncherHooks,
        })

      await this.fetchLeaderboardEntries()
    })

    this.watch(
      () => this.extractCurrentPage(),
      async () => {
        await this.fetchLeaderboardEntries()
      }
    )

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
   * Fetch leaderboard entries.
   *
   * @returns {Promise<void>}
   */
  async fetchLeaderboardEntries () {
    if (this.competitionStatusId === null) {
      return
    }

    // TODO: Add remaining fetch logic for each competition state.
    const fetchFunctionHash = {
      [COMPETITION_STATUS.CANCELED.ID]: null,
      // [COMPETITION_STATUS.CREATED.ID]: () => this.fetchCompetitionParticipants(),
      // [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: () => this.fetchCompetitionParticipants(),
      [COMPETITION_STATUS.IN_PROGRESS.ID]: () => this.fetchOngoingLeaderboard(),
      // [COMPETITION_STATUS.COMPLETED.ID]: () => this.fetchFinalOutcome(),
    }

    await fetchFunctionHash[this.competitionStatusId]?.()
  }

  /**
   * Fetch ongoing leaderboard.
   *
   * @returns {Promise<void>}
   */
  async fetchOngoingLeaderboard () {
    await this.graphqlClientHash
      .competitionLeaderboard
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
            pagination: {
              limit: PAGINATION.LIMIT,
              offset: (this.extractCurrentPage() - 1) * PAGINATION.LIMIT,
            },
          },
        },
        hooks: this.competitionLeaderboardLauncherHooks,
      })
  }

  /**
   * Extract competition ID.
   *
   * @returns {number | null} Competition ID.
   */
  extractCompetitionId () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId
    const competitionId = Number(competitionIdParam)

    return isNaN(competitionId)
      ? null
      : competitionId
  }

  /**
   * Extract current page.
   *
   * @returns {number} Current page.
   */
  extractCurrentPage () {
    const currentPageQuery = Array.isArray(this.route.query.leaderboardPage)
      ? this.route.query.leaderboardPage[0]
      : this.route.query.leaderboardPage
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
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
   * get: competitionLeaderboardLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionLeaderboardLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingLeaderboard = true

        return false
      },
      /**
       * @type {(
       *   capsule: import('~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule').default
       * ) => Promise<void>}
       */
      // @ts-expect-error: The exact type of capsule is unknown to afterRequest. Should be resolved in newer version of furo-nuxt.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingLeaderboard = false

        this.leaderboardEntriesRef.value = this.normalizeOngoingLeaderboardEntries({
          rankings: capsule.rankings,
        })
      },
    }
  }

  /**
   * Normalize ongoing leaderboard entries.
   *
   * @param {{
   *   rankings: import(
   *     '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'
   *   ).ResponseContent['competitionLeaderboard']['rankings']
   * }} params - Parameters.
   * @returns {Array<NormalizedOngoingLeaderboardEntry>}
   */
  normalizeOngoingLeaderboardEntries ({
    rankings,
  }) {
    return rankings.map(it => ({
      rank: it.ranking,
      name: it.address.name ?? '----',
      address: it.address.address,
      baseline: it.performanceBaseline,
      roi: it.roi,
      pnl: it.pnl,
    }))
  }

  /**
   * get: isLoadingLeaderboard
   *
   * @returns {boolean}
   */
  get isLoadingLeaderboard () {
    return this.statusReactive.isLoadingLeaderboard
  }

  /**
   * get: leaderboardEntries
   *
   * @returns {LeaderboardEntries}
   */
  get leaderboardEntries () {
    return this.leaderboardEntriesRef.value
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
   * get: competitionLeaderboardCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule').default}
   */
  get competitionLeaderboardCapsule () {
    return this.graphqlClientHash.competitionLeaderboard.capsuleRef.value
  }

  /**
   * get: competitionFinalOutcomeCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default}
   */
  get competitionFinalOutcomeCapsule () {
    return this.graphqlClientHash.competitionLeaderboard.capsuleRef.value
  }

  /**
   * Generate leaderboard pagination result.
   *
   * @returns {PaginationResult}
   */
  generateLeaderboardPaginationResult () {
    const fallbackPaginationResult = {
      totalRecords: 0,
      limit: 0,
    }

    if (this.competitionStatusId === null) {
      return fallbackPaginationResult
    }

    // TODO: Fulfill cosresponding pagination result for each competition state.
    const paginationResultHash = {
      [COMPETITION_STATUS.CANCELED.ID]: fallbackPaginationResult,
      // [COMPETITION_STATUS.CREATED.ID]: this.generateParticipantsPaginationResut(),
      // [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: this.generateParticipantsPaginationResut(),
      [COMPETITION_STATUS.IN_PROGRESS.ID]: this.generateOngoingLeaderboardPaginationResult(),
      // [COMPETITION_STATUS.COMPLETED.ID]: this.generateFinalOutcomePaginationResult(),
    }

    return paginationResultHash[this.competitionStatusId]
      ?? fallbackPaginationResult
  }

  /**
   * Generate ongoing leaderboard pagination result.
   *
   * @returns {PaginationResult}
   */
  generateOngoingLeaderboardPaginationResult () {
    const limit = this.competitionLeaderboardCapsule
      .limit
      ?? 0
    const totalRecords = this.competitionLeaderboardCapsule
      .totalCount
      ?? 0

    return {
      limit,
      totalRecords,
    }
  }

  /**
   * Extract last leaderboard update timestamp.
   *
   * @returns {string | null} ISO string or `null` if unknown.
   */
  extractLastLeaderboardUpdateTimestamp () {
    if (this.competitionStatusId === null) {
      return null
    }

    const timestampHash = {
      [COMPETITION_STATUS.CANCELED.ID]: null,
      // [COMPETITION_STATUS.CREATED.ID]: this.extractLastParticipantPhasedAt(),
      // [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: this.extractLastParticipantPhasedAt(),
      [COMPETITION_STATUS.IN_PROGRESS.ID]: this.extractLastOngoingLeaderboardCalculatedAt(),
      // [COMPETITION_STATUS.COMPLETED.ID]: this.extractLastOutcomeCalculatedAt(),
    }

    return timestampHash[this.competitionStatusId]
      ?? null
  }

  /**
   * Extract last leaderboard calculated at.
   *
   * @returns {string | null} ISO string or `null` if unknown.
   */
  extractLastOngoingLeaderboardCalculatedAt () {
    return this.competitionLeaderboardCapsule
      .rankings
      .at(0)
      ?.calculatedAt
      ?? null
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
 *   leaderboardEntriesRef: import('vue').Ref<LeaderboardEntries>
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *     addressName: GraphqlClient
 *     competitionLeaderboard: GraphqlClient
 *     competitionFinalOutcome: GraphqlClient
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
 *   isLoadingLeaderboard: boolean
 * }} StatusReactive
 */

/**
 * @typedef {Array<NormalizedOngoingLeaderboardEntry>} LeaderboardEntries
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */

/**
 * @typedef {{
 *   rank: number
 *   name: string
 *   address: string
 *   baseline: number
 *   roi: number
 *   pnl: number
 * }} NormalizedOngoingLeaderboardEntry
 */
