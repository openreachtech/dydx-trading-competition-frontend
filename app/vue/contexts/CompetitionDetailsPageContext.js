import {
  onMounted,
} from 'vue'

import {
  useRoute,
} from 'vue-router'

import {
  useHead,
} from '@unhead/vue'

import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import {
  BASE_PAGE_TITLE,
  COMPETITION_STATUS,
  PAGINATION,
} from '~/app/constants'

/**
 * Context class for `pages/competitions/[competitionId]` page.
 *
 * @extends {BaseAppContext<null>}
 */
export default class CompetitionDetailsPageContext extends BaseAppContext {
  /**
   * Constructor.
   *
   * @param {CompetitionDetailsPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    toastStore,
    walletStore,
    graphqlClientHash,
    fetcherHash,
    leaderboardEntriesRef,
    topThreeLeaderboardEntriesRef,
    competitionCancelationDialogRef,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.toastStore = toastStore
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.fetcherHash = fetcherHash
    this.leaderboardEntriesRef = leaderboardEntriesRef
    this.topThreeLeaderboardEntriesRef = topThreeLeaderboardEntriesRef
    this.competitionCancelationDialogRef = competitionCancelationDialogRef
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
    toastStore,
    walletStore,
    graphqlClientHash,
    fetcherHash,
    leaderboardEntriesRef,
    topThreeLeaderboardEntriesRef,
    competitionCancelationDialogRef,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        toastStore,
        walletStore,
        graphqlClientHash,
        fetcherHash,
        leaderboardEntriesRef,
        topThreeLeaderboardEntriesRef,
        competitionCancelationDialogRef,
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
        key: 'participantEquity',
        label: 'Equity',
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

  /**
   * get: metricLeaderboardHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get metricLeaderboardHeaderEntries () {
    return [
      {
        key: 'name',
        label: 'Name',
      },
      {
        key: 'address',
        label: 'Address',
      },
      {
        key: 'makerVolume',
        label: 'Maker Volume',
      },
      {
        key: 'takerVolume',
        label: 'Taker Volume',
      },
      {
        key: 'totalVolume',
        label: 'Total Volume',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Setup component context.
   *
   * @template {X extends CompetitionDetailsPageContext ? X : never} T, X
   * @override
   * @this {T}
   */
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

      // Top three and leaderboard invoke the same query.
      // Make sure top three runs first to receive correct pagination result.
      await this.fetchTopThreeLeaderboardEntries()

      await this.fetchLeaderboardEntries()
    })

    this.fetchCompetitionTradingMetricsOnMounted()

    this.watch(
      () => this.extractCurrentPage(),
      async () => {
        await this.fetchLeaderboardEntries()
      }
    )

    this.watch(
      () => this.extractCurrentPage({
        pageParamKey: 'volumeLeaderboardPage',
      }),
      async () => {
        await this.fetchCompetitionTradingMetricsOnEvent()
      }
    )

    this.watch(
      () => this.competitionTitle,
      () => {
        if (this.competitionTitle === null) {
          return
        }

        useHead({
          title: `${this.competitionTitle} - ${BASE_PAGE_TITLE}`,
        })
      }
    )

    this.graphqlClientHash
      .competitionParticipant
      .invokeRequestOnMounted({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
            address: this.localWalletAddress,
          },
        },
        hooks: this.competitionParticipantLauncherHooks,
      })

    this.watch(
      () => this.localWalletAddress,
      async () => {
        await this.graphqlClientHash
          .competitionParticipant
          .invokeRequestOnEvent({
            variables: {
              input: {
                competitionId: this.extractCompetitionId(),
                address: this.localWalletAddress,
              },
            },
            hooks: this.competitionParticipantLauncherHooks,
          })
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

    this.graphqlClientHash
      .competitionEnrolledParticipantsNumber
      .invokeRequestOnMounted({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
          },
        },
        hooks: this.competitionEnrolledParticipantsNumberLauncherHooks,
      })

    return this
  }

  /**
   * Fetch competition participant.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionParticipant () {
    await this.graphqlClientHash
      .competitionParticipant
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
            address: this.localWalletAddress,
          },
        },
        hooks: this.competitionParticipantLauncherHooks,
      })
  }

  /**
   * Fetch competition enrolled participants number.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionEnrolledParticipantsNumber () {
    await this.graphqlClientHash
      .competitionEnrolledParticipantsNumber
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
          },
        },
        hooks: this.competitionEnrolledParticipantsNumberLauncherHooks,
      })
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
   * Fetch top three leaderboard entries.
   *
   * @returns {Promise<void>}
   */
  async fetchTopThreeLeaderboardEntries () {
    if (this.competitionStatusId === null) {
      return
    }

    const fetchFunctionHash = {
      [COMPETITION_STATUS.CANCELED.ID]: null,
      [COMPETITION_STATUS.CREATED.ID]: null,
      [COMPETITION_STATUS.REGISTRATION_ENDED.ID]: null,
      [COMPETITION_STATUS.IN_PROGRESS.ID]: () => this.fetchOngoingTopThree(),
      [COMPETITION_STATUS.COMPLETED.ID]: () => this.fetchTopThreeFinalOutcome(),
    }

    await fetchFunctionHash[this.competitionStatusId]?.()
  }

  /**
   * Fetch ongoing top three.
   *
   * @returns {Promise<void>}
   */
  async fetchOngoingTopThree () {
    await this.graphqlClientHash
      .competitionLeaderboard
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
            pagination: {
              limit: 3,
              offset: 0,
            },
          },
        },
        hooks: this.ongoingTopThreeLauncherHooks,
      })
  }

  /**
   * Fetch top three in the final outcome.
   *
   * @returns {Promise<void>}
   */
  async fetchTopThreeFinalOutcome () {
    await this.graphqlClientHash
      .competitionFinalOutcome
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
            pagination: {
              limit: 3,
              offset: 0,
            },
          },
        },
        hooks: this.topThreeFinalOutcomeLauncherHooks,
      })
  }

  /**
   * Fetch `competitionTradingMetrics` on mounted.
   *
   * @returns {void}
   */
  fetchCompetitionTradingMetricsOnMounted () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return
    }

    const valueHash = this.generateCompetitionTradingMetricsValueHash()
    if (!valueHash) {
      return
    }

    this.fetcherHash
      .competitionTradingMetrics
      .fetchCompetitionTradingMetricsOnMounted({
        valueHash,
      })
  }

  /**
   * Fetch `competitionTradingMetrics` on event.
   *
   * @returns {Promise<void>}
   */
  async fetchCompetitionTradingMetricsOnEvent () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return
    }

    const valueHash = this.generateCompetitionTradingMetricsValueHash()
    if (!valueHash) {
      return
    }

    await this.fetcherHash
      .competitionTradingMetrics
      .fetchCompetitionTradingMetricsOnEvent({
        valueHash,
      })
  }

  /**
   * Generate value hash for `competitionTradingMetrics` fetcher method.
   *
   * @returns {import('~/app/graphql/client/queries/competitionTradingMetrics/CompetitionTradingMetricsQueryGraphqlPayload').CompetitionTradingMetricsQueryRequestVariables['input'] | null}
   */
  generateCompetitionTradingMetricsValueHash () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return null
    }

    const currentPage = this.extractCurrentPage({
      pageParamKey: 'volumeLeaderboardPage',
    })

    const offset = this.calculatePaginationOffset({
      limit: PAGINATION.LIMIT,
      currentPage,
    })

    return {
      competitionId,
      pagination: {
        limit: PAGINATION.LIMIT,
        offset,
      },
    }
  }

  /**
   * Generate entries of metric leaderboard.
   *
   * @returns {Array<MetricLeaderboardEntry>}
   */
  generateMetricLeaderboardEntries () {
    return this.fetcherHash.competitionTradingMetrics
      .competitionTradingMetricsCapsule
      .metrics
      .map(it => ({
        name: it.address.name,
        address: it.address.address,
        makerFees: it.makerFees,
        takerFees: it.takerFees,
        totalFees: it.totalFees,
        makerVolume: it.makeVolume,
        takerVolume: it.takerVolume,
        totalVolume: it.totalVolume,
      }))
  }

  /**
   * Generate refetch hash. Have to be arrow function to conserve `this` scope.
   *
   * @returns {RefetchHash}
   */
  generateRefetchHash () {
    return {
      competitionParticipant: () => this.fetchCompetitionParticipant(),
      leaderboardEntries: () => this.fetchLeaderboardEntries(),
      competitionEnrolledParticipantsNumber: () => this.fetchCompetitionEnrolledParticipantsNumber(),
    }
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
   * @param {{
   *   pageParamKey?: 'pnlLeaderboardPage' | 'volumeLeaderboardPage'
   * }} [params] - Parameters.
   * @returns {number} Current page.
   */
  extractCurrentPage ({
    pageParamKey = 'pnlLeaderboardPage',
  } = {}) {
    const currentPageQuery = Array.isArray(this.route.query[pageParamKey])
      ? this.route.query[pageParamKey].at(0)
      : this.route.query[pageParamKey]
    const currentPage = Number(currentPageQuery)

    return isNaN(currentPage)
      ? 1
      : currentPage
  }

  /**
   * Calculate pagination offset.
   *
   * @param {{
   *   limit: number
   *   currentPage: number | null
   * }} params - Parameters.
   * @returns {number}
   */
  calculatePaginationOffset ({
    limit,
    currentPage,
  }) {
    if (currentPage === null) {
      return 0
    }

    return (currentPage - 1) * limit
  }

  /**
   * Unregister from competition
   *
   * @returns {Promise<void>}
   */
  async unregisterFromCompetition () {
    await this.graphqlClientHash
      .unregisterFromCompetition
      .invokeRequestOnEvent({
        variables: {
          input: {
            competitionId: this.extractCompetitionId(),
          },
        },
        hooks: this.unregisterFromCompetitionLauncherHooks,
      })
  }

  /**
   * get: localWalletAddress
   *
   * @returns {string | null}
   */
  get localWalletAddress () {
    return this.walletStore
      .walletStoreRef
      .value
      .localWallet
      .address
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
   * get: unregisterFromCompetitionLauncherHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get unregisterFromCompetitionLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isUnregisteringFromCompetition = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isUnregisteringFromCompetition = false

        this.dismissDialog({
          dialogElement: this.competitionCancelationDialog,
        })

        const successMessage = this.competitionTitle
          ? `You have successfully unregistered from "${this.competitionTitle}" arena`
          : 'You have successfully unregistered from this arena'

        this.toastStore.add({
          message: successMessage,
          iconName: 'heroicons:arrow-uturn-left',
          color: 'success',
        })

        // TODO: Move mutation logic to mutation context.
        await Promise.allSettled([
          this.graphqlClientHash
            .competitionParticipant
            .invokeRequestOnEvent({
              variables: {
                input: {
                  competitionId: this.extractCompetitionId(),
                  address: this.localWalletAddress,
                },
              },
              hooks: this.competitionParticipantLauncherHooks,
            }),
          this.fetchLeaderboardEntries(),
          this.fetchCompetitionEnrolledParticipantsNumber(),
        ])
      },
    }
  }

  /**
   * get: competitionParticipantLauncherHooks.
   *
   * @returns {furo.GraphqlLauncherHooks} - Launcher hooks.
   */
  get competitionParticipantLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingParticipant = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingParticipant = false
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
   * get: competitionEnrolledParticipantsNumberLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get competitionEnrolledParticipantsNumberLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingEnrolledParticipantsNumber = true

        return false
      },
      afterRequest: async capsule => {
        this.statusReactive.isLoadingEnrolledParticipantsNumber = false
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
       *   capsule: import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default
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
      participantEquity: it.equity,
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
   *   outcomes: Array<import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome>
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
   * get: ongoingTopThreeLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get ongoingTopThreeLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingTopThree = true

        return false
      },
      /**
       * @type {(
       *   capsule: import('~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule').default
       * ) => Promise<void>}
       */
      // @ts-expect-error: The exact type of capsule is unknown to afterRequest. Should be resolved in newer version of furo-nuxt.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingTopThree = false

        this.topThreeLeaderboardEntriesRef.value = this.normalizeOngoingTopThree({
          rankings: capsule.rankings,
        })
      },
    }
  }

  /**
   * get: topThreeFinalOutcomeLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get topThreeFinalOutcomeLauncherHooks () {
    return {
      beforeRequest: async payload => {
        this.statusReactive.isLoadingTopThree = true

        return false
      },
      /**
       * @type {(
       *   capsule: import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default
       * ) => Promise<void>}
       * @todo: Fix import path of this capsule. It should be in `queries` directory.
       */
      // @ts-expect-error: The exact type of capsule is unknown to afterRequest. Should be resolved in newer version of furo-nuxt.
      afterRequest: async capsule => {
        this.statusReactive.isLoadingTopThree = false

        this.topThreeLeaderboardEntriesRef.value = this.normalizeTopThreeFinalOutcome({
          outcomes: capsule.outcomes,
        })
      },
    }
  }

  /**
   * Normalize ongoing top three.
   *
   * @param {{
   *   rankings: import(
   *     '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'
   *   ).ResponseContent['competitionLeaderboard']['rankings']
   * }} params - Parameters.
   * @returns {TopThreeLeaderboardEntries}
   */
  normalizeOngoingTopThree ({
    rankings,
  }) {
    const firstThree = rankings.slice(0, 3)
    if (firstThree.length === 0) {
      return []
    }

    return firstThree
      .map(it => ({
        rank: it.ranking,
        name: it.address.name ?? '----',
        address: it.address.address,
        roi: it.roi,
        pnl: it.pnl,
        prize: null,
      }))
  }

  /**
   * Normalize top three in the final outcome.
   *
   * @param {{
   *   outcomes: Array<import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome>
   * }} params - Parameters.
   * @returns {TopThreeLeaderboardEntries}
   */
  normalizeTopThreeFinalOutcome ({
    outcomes,
  }) {
    const firstThree = outcomes.slice(0, 3)
    if (firstThree.length === 0) {
      return []
    }

    return firstThree
      .map(it => ({
        rank: it.ranking,
        name: it.address.name,
        address: it.address.address,
        roi: it.roi,
        pnl: it.pnl,
        prize: it.prizeUsdAmount,
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
   * get: isLoadingCompetitionTradingMetrics
   *
   * @returns {boolean}
   */
  get isLoadingCompetitionTradingMetrics () {
    return this.statusReactive.isLoadingCompetitionTradingMetrics
  }

  /**
   * get: isLoadingParticipant
   *
   * @returns {boolean}
   */
  get isLoadingParticipant () {
    return this.statusReactive.isLoadingParticipant
  }

  /**
   * get: isLoadingEnrolledParticipantsNumber
   *
   * @returns {boolean}
   */
  get isLoadingEnrolledParticipantsNumber () {
    return this.statusReactive.isLoadingEnrolledParticipantsNumber
  }

  /**
   * get: isUnregisteringFromCompetition
   *
   * @returns {boolean}
   */
  get isUnregisteringFromCompetition () {
    return this.statusReactive.isUnregisteringFromCompetition
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
   * get: topThreeLeaderboardEntries
   *
   * @returns {TopThreeLeaderboardEntries}
   */
  get topThreeLeaderboardEntries () {
    return this.topThreeLeaderboardEntriesRef.value
  }

  /**
   * get: competitionCancelationDialog
   *
   * @returns {import('~/components/units/AppDialog.vue').default | null}
   */
  get competitionCancelationDialog () {
    return this.competitionCancelationDialogRef.value
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
   * get: competitionHost
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['host'] | null}
   */
  get competitionHost () {
    return this.competition
      ?.host
      ?? null
  }

  /**
   * get: competitionHostAddress
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['host']['address'] | null}
   */
  get competitionHostAddress () {
    return this.competitionHost
      ?.address
      ?? null
  }

  /**
   * get: competitionHostName
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').CompetitionEntity['host']['name'] | null}
   */
  get competitionHostName () {
    return this.competitionHost
      ?.name
      ?? null
  }

  /**
   * get: participantUpperLimit
   *
   * @returns {number | null}
   */
  get participantUpperLimit () {
    return this.competitionCapsuleRef.value
      .participantUpperLimit
  }

  /**
   * get: participantLowerLimit
   *
   * @returns {number | null}
   */
  get participantLowerLimit () {
    return this.competitionCapsuleRef.value
      .participantLowerLimit
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
   * get: competitionTitle
   *
   * @returns {string | null}
   */
  get competitionTitle () {
    return this.competitionCapsuleRef
      .value
      .title
  }

  /**
   * get: competitionOutcomeCsvUrl
   *
   * @returns {string | null}
   */
  get competitionOutcomeCsvUrl () {
    return this.competitionCapsuleRef
      .value
      .outcomeCsvUrl
  }

  /**
   * get: participantStatusId
   *
   * @returns {number | null}
   */
  get participantStatusId () {
    return this.competitionParticipantCapsule
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
   * @returns {import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').default}
   */
  get competitionFinalOutcomeCapsule () {
    return this.graphqlClientHash
      .competitionFinalOutcome
      .capsuleRef
      .value
  }

  /**
   * get: competitionEnrolledParticipantsNumberCapsule
   *
   * @returns {import('~/app/graphql/client/queries/competitionEnrolledParticipantsNumber/CompetitionEnrolledParticipantsNumberQueryGraphqlCapsule').default}
   */
  get competitionEnrolledParticipantsNumberCapsule () {
    return this.graphqlClientHash
      .competitionEnrolledParticipantsNumber
      .capsuleRef
      .value
  }

  /**
   * get: enrolledParticipantsNumber
   *
   * @returns {number | null}
   */
  get enrolledParticipantsNumber () {
    return this.competitionEnrolledParticipantsNumberCapsule
      .enrolledParticipantsNumber
  }

  /**
   * Check if current user is the competition's host.
   *
   * @returns {boolean}
   */
  isHostOfCompetition () {
    if (
      this.competitionHostAddress === null
      && this.localWalletAddress === null
    ) {
      return false
    }

    return this.competitionHostAddress === this.localWalletAddress
  }

  /**
   * Check if the competition is full.
   *
   * @returns {boolean}
   */
  isCompetitionFull () {
    if (
      this.enrolledParticipantsNumber === null
      || this.participantUpperLimit === null
    ) {
      return false
    }

    return this.enrolledParticipantsNumber >= this.participantUpperLimit
  }

  /**
   * get: unregisterFromCompetitionCapsule
   *
   * @returns {import('~/app/graphql/client/mutations/unregisterFromCompetition/UnregisterFromCompetitionMutationGraphqlCapsule').default}
   */
  get unregisterFromCompetitionCapsule () {
    return this.graphqlClientHash
      .unregisterFromCompetition
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
   * Generate pagination result for competition trading metrics.
   *
   * @returns {PaginationResult}
   */
  generateMetricLeaderboardPaginationResult () {
    const limit = this.fetcherHash
      .competitionTradingMetrics
      .competitionTradingMetricsCapsule
      .limit
      ?? 0
    const totalRecords = this.fetcherHash
      .competitionTradingMetrics
      .competitionTradingMetricsCapsule
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
 *   toastStore: import('~/stores/toast').ToastStore
 *   walletStore: import('~/stores/wallet').WalletStore
 *   leaderboardEntriesRef: import('vue').Ref<LeaderboardEntries>
 *   topThreeLeaderboardEntriesRef: import('vue').Ref<TopThreeLeaderboardEntries>
 *   competitionCancelationDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   graphqlClientHash: {
 *     competition: GraphqlClient
 *     addressName: GraphqlClient
 *     competitionParticipant: GraphqlClient
 *     competitionLeaderboard: GraphqlClient
 *     competitionFinalOutcome: GraphqlClient
 *     competitionParticipants: GraphqlClient
 *     competitionEnrolledParticipantsNumber: GraphqlClient
 *     unregisterFromCompetition: GraphqlClient
 *   }
 *   fetcherHash: {
 *     competitionTradingMetrics: import('~/pages/(competitions)/competitions/[competitionId]/CompetitionTradingMetricsFetcher').default
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
 *   isLoadingCompetitionTradingMetrics: boolean
 *   isLoadingTopThree: boolean
 *   isLoadingParticipant: boolean
 *   isLoadingEnrolledParticipantsNumber: boolean
 *   isUnregisteringFromCompetition: boolean
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

/**
 * @typedef {Array<NormalizedTopThreeLeaderboardEntry>} TopThreeLeaderboardEntries
 */

/**
 * @typedef {{
 *   rank: number
 *   name: string
 *   address: string
 *   pnl: number
 *   roi: number
 *   prize: string | null
 * }} NormalizedTopThreeLeaderboardEntry
 */

/**
 * @typedef {{
 *   name: string
 *   address: string
 *   makerFees: number
 *   takerFees: number
 *   totalFees: number
 *   makerVolume: number
 *   takerVolume: number
 *   totalVolume: number
 * }} MetricLeaderboardEntry
 */

/**
 * @typedef {Record<RefetchHashKeys, () => Promise<void>>} RefetchHash
 */

/**
 * @typedef {'competitionParticipant'
 *   | 'leaderboardEntries'
 *   | 'competitionEnrolledParticipantsNumber'
 * } RefetchHashKeys
 */
