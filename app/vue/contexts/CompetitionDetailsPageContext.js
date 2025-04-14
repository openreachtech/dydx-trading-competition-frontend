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
      [COMPETITION_STATUS.CREATED.ID]: this.competitionParticipantHeaderEntries,
      [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: this.competitionParticipantHeaderEntries,
      [COMPETITION_STATUS.IN_PROGRESS.ID]: this.ongoingLeaderboardHeaderEntries,
      [COMPETITION_STATUS.COMPLETED.ID]: this.leaderboardFinalOutcomeHeaderEntries,
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
        key: 'ongoingRank',
        label: 'Rank',
      },
      {
        key: 'ongoingName',
        label: 'Name',
      },
      {
        key: 'ongoingAddress',
        label: 'Address',
      },
      {
        key: 'ongoingPnl',
        label: 'PnL',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'ongoingBaseline',
        label: 'Performance Baseline',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'ongoingRoi',
        label: 'ROI',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: competitionParticipantHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get competitionParticipantHeaderEntries () {
    return [
      {
        key: 'participantName',
        label: 'Name',
      },
      {
        key: 'participantAddress',
        label: 'Address',
      },
      {
        key: 'participantStatus',
        label: 'Status',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: leaderboardFinalOutcomeHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get leaderboardFinalOutcomeHeaderEntries () {
    return [
      {
        key: 'outcomeRank',
        label: 'Rank',
      },
      {
        key: 'outcomeName',
        label: 'Name',
      },
      {
        key: 'outcomeAddress',
        label: 'Address',
      },
      {
        key: 'outcomePnl',
        label: 'PnL',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'outcomeBaseline',
        label: 'Performance Baseline',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'outcomeRoi',
        label: 'ROI',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'outcomePrize',
        label: 'Prize',
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

    const fetchFunctionHash = {
      [COMPETITION_STATUS.CANCELED.ID]: null,
      [COMPETITION_STATUS.CREATED.ID]: () => this.fetchCompetitionParticipants(),
      [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: () => this.fetchCompetitionParticipants(),
      [COMPETITION_STATUS.IN_PROGRESS.ID]: () => this.fetchOngoingLeaderboard(),
      [COMPETITION_STATUS.COMPLETED.ID]: () => this.fetchLeaderboardFinalOutcome(),
    }

    await fetchFunctionHash[this.competitionStatusId]?.()
  }

  /**
   * Fetch competition participants.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionParticipants () {
    await this.graphqlClientHash
      .competitionParticipants
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
        hooks: this.competitionParticipantsLauncherHooks,
      })
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
   * Fetch leaderboard final outcome.
   *
   * @returns {Promise<void>}
   */
  async fetchLeaderboardFinalOutcome () {
    await this.graphqlClientHash
      .competitionFinalOutcome
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
        hooks: this.competitionFinalOutcomeLauncherHooks,
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
   * get: competitionParticipantsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionParticipantsLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingLeaderboard = true

        return false
      },
      /**
       * @type {(
       *   capsule: import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').default
       * ) => Promise<void>}
       */
      // @ts-expect-error: The exact type of capsule is unknown to afterRequest. Should be resolved in newer version of furo-nuxt.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingLeaderboard = false

        this.leaderboardEntriesRef.value = this.normalizeCompetitionParticipantEntries({
          participants: capsule.participants,
        })
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
   * get: competitionFinalOutcomeLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionFinalOutcomeLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingLeaderboard = true

        return false
      },
      /**
       * @type {(
       *   capsule: import('~/app/graphql/client/mutations/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default
       * ) => Promise<void>}
       * @todo: Fix import path of this capsule. It should be in `queries` directory.
       */
      // @ts-expect-error: The exact type of capsule is unknown to afterRequest. Should be resolved in newer version of furo-nuxt.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingLeaderboard = false

        this.leaderboardEntriesRef.value = this.normalizeLeaderboardFinalOutcomeEntries({
          outcomes: capsule.outcomes,
        })
      },
    }
  }

  /**
   * Normalize competition participant entries.
   *
   * @param {{
   *   participants: Array<import(
   *     '~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule'
   *   ).Participant>
   * }} params - Parameters.
   * @returns {Array<NormalizedCompetitionParticipantEntry>}
   */
  normalizeCompetitionParticipantEntries ({
    participants,
  }) {
    return participants.map(it => ({
      participantName: it.address.name,
      participantAddress: it.address.address,
      participantStatus: it.status,
    }))
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
      ongoingRank: it.ranking,
      ongoingName: it.address.name ?? '----',
      ongoingAddress: it.address.address,
      ongoingBaseline: it.performanceBaseline,
      ongoingRoi: it.roi,
      ongoingPnl: it.pnl,
    }))
  }

  /**
   * Normalize leaderboard final outcome entries.
   *
   * @param {{
   *   outcomes: Array<import('~/app/graphql/client/mutations/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome>
   * }} params - Parameters.
   * @returns {Array<NormalizedLeaderboardFinalOutcomeEntry>}
   */
  normalizeLeaderboardFinalOutcomeEntries ({
    outcomes,
  }) {
    return outcomes.map(it => ({
      outcomeRank: it.ranking,
      outcomeName: it.address.name,
      outcomeAddress: it.address.address,
      outcomeBaseline: it.performanceBaseline,
      outcomePnl: it.pnl,
      outcomeRoi: it.roi,
      outcomePrize: it.prizeUsdAmount,
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
   * get: competitionParticipantCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipant/CompetitionParticipantQueryGraphqlCapsule').default}
   */
  get competitionParticipantCapsule () {
    return this.graphqlClientHash
      .competitionParticipant
      .capsuleRef
      .value
  }

  /**
   * get: competitionParticipantsCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').default}
   */
  get competitionParticipantsCapsule () {
    return this.graphqlClientHash
      .competitionParticipants
      .capsuleRef
      .value
  }

  /**
   * get: competitionLeaderboardCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule').default}
   */
  get competitionLeaderboardCapsule () {
    return this.graphqlClientHash
      .competitionLeaderboard
      .capsuleRef
      .value
  }

  /**
   * get: competitionFinalOutcomeCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default}
   */
  get competitionFinalOutcomeCapsule () {
    return this.graphqlClientHash
      .competitionFinalOutcome
      .capsuleRef
      .value
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

    const paginationResultHash = {
      [COMPETITION_STATUS.CANCELED.ID]: fallbackPaginationResult,
      [COMPETITION_STATUS.CREATED.ID]: this.generateCompetitionParticipantsPaginationResult(),
      [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: this.generateCompetitionParticipantsPaginationResult(),
      [COMPETITION_STATUS.IN_PROGRESS.ID]: this.generateOngoingLeaderboardPaginationResult(),
      [COMPETITION_STATUS.COMPLETED.ID]: this.generateLeaderboardFinalOutcomePaginationResult(),
    }

    return paginationResultHash[this.competitionStatusId]
      ?? fallbackPaginationResult
  }

  /**
   * Generate competition participants pagination result.
   *
   * @returns {PaginationResult}
   */
  generateCompetitionParticipantsPaginationResult () {
    const limit = this.competitionParticipantsCapsule
      .limit
      ?? 0
    const totalRecords = this.competitionParticipantsCapsule
      .totalCount
      ?? 0

    return {
      limit,
      totalRecords,
    }
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
   * Generate leaderboard final outcome pagination result.
   *
   * @returns {PaginationResult}
   */
  generateLeaderboardFinalOutcomePaginationResult () {
    const limit = this.competitionFinalOutcomeCapsule
      .limit
      ?? 0
    const totalRecords = this.competitionFinalOutcomeCapsule
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
 *     competitionParticipant: GraphqlClient
 *     competitionLeaderboard: GraphqlClient
 *     competitionFinalOutcome: GraphqlClient
 *     competitionParticipants: GraphqlClient
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
 * @typedef {Array<NormalizedOngoingLeaderboardEntry>
 *   | Array<NormalizedLeaderboardFinalOutcomeEntry>
 *   | Array<NormalizedCompetitionParticipantEntry>
 * } LeaderboardEntries
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */

/**
 * @typedef {{
 *   participantName: string
 *   participantAddress: string
 *   participantStatus: {
 *     statusId: number
 *     name: string
 *     phasedAt: string // ISO string.
 *   }
 * }} NormalizedCompetitionParticipantEntry
 */

/**
 * @typedef {{
 *   ongoingRank: number
 *   ongoingName: string
 *   ongoingAddress: string
 *   ongoingBaseline: number
 *   ongoingRoi: number
 *   ongoingPnl: number
 * }} NormalizedOngoingLeaderboardEntry
 */

/**
 * @typedef {{
 *   outcomeRank: number
 *   outcomeName: string
 *   outcomeAddress: string
 *   outcomePnl: number
 *   outcomeRoi: number
 *   outcomeBaseline: number
 *   outcomePrize: string
 * }} NormalizedLeaderboardFinalOutcomeEntry
 */
