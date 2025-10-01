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
  BASE_INDEXER_URL,
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
    router,
    toastStore,
    walletStore,
    graphqlClientHash,
    fetcherHash,
    currentEquityRef,
    leaderboardEntriesRef,
    topThreeLeaderboardEntriesRef,
    competitionTermsDialogRef,
    competitionEnrollmentDialogRef,
    competitionCancelationDialogRef,
    enrollmentVerificationDialogShallowRef,
    errorMessageHashReactive,
    statusReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
    this.toastStore = toastStore
    this.walletStore = walletStore
    this.graphqlClientHash = graphqlClientHash
    this.fetcherHash = fetcherHash
    this.currentEquityRef = currentEquityRef
    this.leaderboardEntriesRef = leaderboardEntriesRef
    this.topThreeLeaderboardEntriesRef = topThreeLeaderboardEntriesRef
    this.competitionTermsDialogRef = competitionTermsDialogRef
    this.competitionEnrollmentDialogRef = competitionEnrollmentDialogRef
    this.competitionCancelationDialogRef = competitionCancelationDialogRef
    this.enrollmentVerificationDialogShallowRef = enrollmentVerificationDialogShallowRef
    this.errorMessageHashReactive = errorMessageHashReactive
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
    router,
    toastStore,
    walletStore,
    graphqlClientHash,
    fetcherHash,
    currentEquityRef,
    leaderboardEntriesRef,
    topThreeLeaderboardEntriesRef,
    competitionTermsDialogRef,
    competitionEnrollmentDialogRef,
    competitionCancelationDialogRef,
    enrollmentVerificationDialogShallowRef,
    errorMessageHashReactive,
    statusReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
        toastStore,
        walletStore,
        graphqlClientHash,
        fetcherHash,
        currentEquityRef,
        leaderboardEntriesRef,
        topThreeLeaderboardEntriesRef,
        competitionTermsDialogRef,
        competitionEnrollmentDialogRef,
        competitionCancelationDialogRef,
        enrollmentVerificationDialogShallowRef,
        errorMessageHashReactive,
        statusReactive,
      })
    )
  }

  /**
   * get: fetchCurrentEquityErrorMessage
   *
   * @returns {string | null}
   */
  get fetchCurrentEquityErrorMessage () {
    return this.errorMessageHashReactive.fetchCurrentEquity
  }

  /**
   * get: currentEquity
   *
   * @returns {number | null}
   */
  get currentEquity () {
    return this.currentEquityRef.value
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
        columnOptions: {
          width: '8%',
        },
      },
      {
        key: 'ongoingName',
        label: 'Name',
        columnOptions: {
          width: '19%',
        },
      },
      {
        key: 'ongoingAddress',
        label: 'Address',
        columnOptions: {
          width: '16%',
        },
      },
      {
        key: 'ongoingPnl',
        label: 'PnL',
        columnOptions: {
          width: '16%',
          textAlign: 'end',
        },
        isSortable: true,
      },
      {
        key: 'ongoingBaseline',
        label: 'Performance Baseline',
        columnOptions: {
          width: '16%',
          textAlign: 'end',
        },
      },
      {
        key: 'ongoingRoi',
        label: 'ROI',
        columnOptions: {
          width: '12%',
          textAlign: 'end',
        },
        isSortable: true,
      },
      {
        key: 'ongoingTotalVolume',
        label: 'Total Volume',
        columnOptions: {
          width: '13%',
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
        columnOptions: {
          width: '20%',
        },
      },
      {
        key: 'participantAddress',
        label: 'Address',
        columnOptions: {
          width: '45%',
        },
      },
      {
        key: 'participantEquity',
        label: 'Equity',
        columnOptions: {
          width: '15%',
        },
      },
      {
        key: 'participantStatus',
        label: 'Status',
        columnOptions: {
          width: '20%',
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
        columnOptions: {
          width: '8%',
        },
      },
      {
        key: 'outcomeName',
        label: 'Name',
        columnOptions: {
          width: '20%',
        },
      },
      {
        key: 'outcomeAddress',
        label: 'Address',
        columnOptions: {
          width: '16%',
        },
      },
      {
        key: 'outcomePnl',
        label: 'PnL',
        columnOptions: {
          width: '16%',
          textAlign: 'end',
        },
      },
      {
        key: 'outcomeBaseline',
        label: 'Performance Baseline',
        columnOptions: {
          width: '16%',
          textAlign: 'end',
        },
      },
      {
        key: 'outcomeRoi',
        label: 'ROI',
        columnOptions: {
          width: '16%',
          textAlign: 'end',
        },
      },
      {
        key: 'outcomePrize',
        label: 'Prize',
        columnOptions: {
          width: '8%',
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
        columnOptions: {
          width: '20%',
        },
      },
      {
        key: 'address',
        label: 'Address',
        columnOptions: {
          width: '20%',
        },
      },
      {
        key: 'makerVolume',
        label: 'Maker Volume',
        columnOptions: {
          width: '20%',
          textAlign: 'end',
        },
      },
      {
        key: 'takerVolume',
        label: 'Taker Volume',
        columnOptions: {
          width: '20%',
          textAlign: 'end',
        },
      },
      {
        key: 'totalVolume',
        label: 'Total Volume',
        columnOptions: {
          width: '20%',
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
      [
        () => this.extractCurrentPage(),
        () => this.localWalletAddress,
      ],
      async () => {
        await this.fetchLeaderboardEntries()
      }
    )

    this.watch(
      () => this.extractOngoingLeaderboardSortFromRoute(),
      async (newSortOption, oldSortOption) => {
        // TODO: Vue's watcher triggers on all query parameter changes, not just sort changes.
        // The manual comparison below prevents unnecessary leaderboard fetches.
        // Consider using a more specific watcher or computed property to track only sort changes.
        if (!newSortOption || !oldSortOption) {
          return
        }

        const isSameSortOption = newSortOption.targetColumn === oldSortOption.targetColumn
          && newSortOption.orderBy === oldSortOption.orderBy

        if (isSameSortOption) {
          return
        }

        // Must fetch top three first to have correct pagination result.
        await this.fetchOngoingTopThree()
        await this.fetchOngoingLeaderboard()
      },
      {
        deep: true,
      }
    )

    this.watch(
      [
        () => this.extractCurrentPage({
          pageParamKey: 'volumeLeaderboardPage',
        }),
        () => this.localWalletAddress,
      ],
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
        this.resetCurrentEquity()

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
    const variables = this.generateFetchCompetitionParticipantsVariables()
    if (!variables) {
      return
    }

    await this.graphqlClientHash
      .competitionParticipants
      .invokeRequestOnEvent({
        variables,
        hooks: this.competitionParticipantsLauncherHooks,
      })
  }

  /**
   * Generate variables for `fetchCompetitionParticipants`
   *
   * @returns {furo.GraphqlRequestVariables | null}
   */
  generateFetchCompetitionParticipantsVariables () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return null
    }

    const requiredInput = {
      competitionId,
      pagination: {
        limit: PAGINATION.LIMIT,
        offset: (this.extractCurrentPage() - 1) * PAGINATION.LIMIT,
      },
    }

    if (!this.localWalletAddress) {
      return {
        input: requiredInput,
      }
    }

    return {
      input: {
        ...requiredInput,
        address: this.localWalletAddress,
      },
    }
  }

  /**
   * Fetch ongoing leaderboard.
   *
   * @returns {Promise<void>}
   */
  async fetchOngoingLeaderboard () {
    const variables = this.generateFetchOngoingLeaderboardVariables()
    if (!variables) {
      return
    }

    await this.graphqlClientHash
      .competitionLeaderboard
      .invokeRequestOnEvent({
        variables,
        hooks: this.competitionLeaderboardLauncherHooks,
      })
  }

  /**
   * Generate variables for `fetchOngoingLeaderboard`
   *
   * @returns {furo.GraphqlRequestVariables | null}
   */
  generateFetchOngoingLeaderboardVariables () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return null
    }

    const requiredInput = {
      competitionId,
      pagination: this.generateOngoingLeaderboardPaginationInput(),
    }

    if (!this.localWalletAddress) {
      return {
        input: requiredInput,
      }
    }

    return {
      input: {
        ...requiredInput,
        address: this.localWalletAddress,
      },
    }
  }

  /**
   * Generate pagination input for ongoing leaderboard.
   *
   * @returns {import(
   *   '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlPayload'
   * ).CompetitionLeaderboardQueryRequestVariables['input']['pagination']}
   */
  generateOngoingLeaderboardPaginationInput () {
    const pagination = {
      limit: PAGINATION.LIMIT,
      offset: (this.extractCurrentPage() - 1) * PAGINATION.LIMIT,
    }
    const sort = this.extractOngoingLeaderboardSortFromRoute()

    if (!sort) {
      // If there is no active sort option, use server-side default sorting configuration.
      return pagination
    }

    return {
      ...pagination,
      sort,
    }
  }

  /**
   * Fetch leaderboard final outcome.
   *
   * @returns {Promise<void>}
   */
  async fetchLeaderboardFinalOutcome () {
    const variables = this.generateFetchLeaderboardFinalOutcomeVariables()
    if (!variables) {
      return
    }

    await this.graphqlClientHash
      .competitionFinalOutcome
      .invokeRequestOnEvent({
        variables,
        hooks: this.competitionFinalOutcomeLauncherHooks,
      })
  }

  /**
   * Generate variables for `fetchLeaderboardFinalOutcome`
   *
   * @returns {furo.GraphqlRequestVariables | null}
   */
  generateFetchLeaderboardFinalOutcomeVariables () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return null
    }

    const requiredInput = {
      competitionId,
      pagination: {
        limit: PAGINATION.LIMIT,
        offset: (this.extractCurrentPage() - 1) * PAGINATION.LIMIT,
      },
    }

    if (!this.localWalletAddress) {
      return {
        input: requiredInput,
      }
    }

    return {
      input: {
        ...requiredInput,
        address: this.localWalletAddress,
      },
    }
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
    const variables = this.generateFetchOngoingTopThreeVariables()
    if (!variables) {
      return
    }

    await this.graphqlClientHash
      .competitionLeaderboard
      .invokeRequestOnEvent({
        variables,
        hooks: this.ongoingTopThreeLauncherHooks,
      })
  }

  /**
   * Generate variables for `fetchOngoingLeaderboard`
   *
   * @returns {furo.GraphqlRequestVariables | null}
   */
  generateFetchOngoingTopThreeVariables () {
    const competitionId = this.extractCompetitionId()
    if (competitionId === null) {
      return null
    }

    const requiredInput = {
      competitionId,
      pagination: this.generateOngoingTopThreePaginationInput(),
    }

    if (!this.localWalletAddress) {
      return {
        input: requiredInput,
      }
    }

    return {
      input: {
        ...requiredInput,
        address: this.localWalletAddress,
      },
    }
  }

  /**
   * Generate pagination input for ongoing leaderboard.
   *
   * @returns {import(
   *   '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlPayload'
   * ).CompetitionLeaderboardQueryRequestVariables['input']['pagination']}
   */
  generateOngoingTopThreePaginationInput () {
    const pagination = {
      limit: 3,
      offset: 0,
    }
    const sort = this.extractOngoingLeaderboardSortFromRoute()

    if (!sort) {
      // If there is no active sort option, use server-side default sorting configuration.
      return pagination
    }

    return {
      ...pagination,
      sort,
    }
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

    const requiredInput = {
      competitionId,
      pagination: {
        limit: PAGINATION.LIMIT,
        offset,
      },
    }

    if (!this.localWalletAddress) {
      return requiredInput
    }

    return {
      ...requiredInput,
      address: this.localWalletAddress,
    }
  }

  /**
   * Generate entries of metric leaderboard.
   *
   * @returns {Array<MetricLeaderboardEntry>}
   */
  generateMetricLeaderboardEntries () {
    const {
      myMetric,
      metrics,
    } = this.fetcherHash
      .competitionTradingMetrics
      .competitionTradingMetricsCapsule

    const formattedMetrics = metrics.map(it => this.formatMetricLeaderboardEntry({
      entry: it,
    }))

    if (!myMetric) {
      return formattedMetrics
    }

    const isInLeaderboard = metrics.some(it =>
      it.address.address === myMetric.address.address
    )
    if (isInLeaderboard) {
      return formattedMetrics
    }

    const myFormattedMetric = this.formatMetricLeaderboardEntry({
      entry: myMetric,
    })

    const sortedEntries = [
      ...formattedMetrics,
      myFormattedMetric,
    ]
      .toSorted((entryA, entryB) => entryB.totalVolume - entryA.totalVolume)

    const metricSeparatorEntry = {
      name: '',
      address: '',
      totalVolume: 0,
      isSeparator: true,
    }

    const myEntryIndex = sortedEntries.findIndex(it =>
      it.address === myFormattedMetric.address
    )

    return this.insertLeaderboardSeparatorEntry({
      entries: sortedEntries,
      separatorEntry: metricSeparatorEntry,
      myEntryIndex,
    })
  }

  /**
   * Format metric leaderboard entry.
   *
   * @param {{
   *   entry: import('~/app/graphql/client/queries/competitionTradingMetrics/CompetitionTradingMetricsQueryGraphqlCapsule').TradingMetric
   * }} params - Parameters.
   * @returns {MetricLeaderboardEntry}
   */
  formatMetricLeaderboardEntry ({
    entry,
  }) {
    return {
      name: entry.address.name,
      address: entry.address.address,
      makerFees: entry.makerFees,
      takerFees: entry.takerFees,
      totalFees: entry.totalFees,
      makerVolume: entry.makeVolume,
      takerVolume: entry.takerVolume,
      totalVolume: entry.totalVolume,
    }
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
   * Check enrollment eligibility.
   *
   * @returns {Promise<void>}
   */
  async checkEnrollmentEligibility () {
    await this.fetchCurrentEquity()

    this.dismissCompetitionTermsDialog()

    if (this.hasSufficientEquity()) {
      this.showCompetitionEnrollmentDialog()

      return
    }

    this.showEnrollmentVerificationDialog()
  }

  /**
   * Check if the user has sufficient equity.
   *
   * @returns {boolean}
   */
  hasSufficientEquity () {
    if (
      this.minimumDeposit === null
      || this.currentEquity === null
    ) {
      return false
    }

    const numericMinimumDeposit = parseFloat(this.minimumDeposit)

    return this.currentEquity >= numericMinimumDeposit
  }

  /**
   * Reset current equity.
   *
   * @returns {void}
   */
  resetCurrentEquity () {
    this.currentEquityRef.value = null
  }

  /**
   * Fetch current equity of user.
   *
   * @param {{
   *   afterRequestCallback?: (...args: any[]) => any | Promise<any>
   * }} [params] - Parameters.
   * @returns {Promise<void>}
   */
  async fetchCurrentEquity ({
    afterRequestCallback,
  } = {}) {
    const resourceUrl = this.generateFetchCurrentEquityResourceUrl()
    if (resourceUrl === null) {
      return
    }

    this.statusReactive.isFetchingCurrentEquity = true

    const fetchOptionHash = this.generateFetchCurrentEquityOptionHash()

    try {
      const response = await fetch(resourceUrl, fetchOptionHash)

      if (!response.ok) {
        /** @type {FetchCurrentEquityErrorResponse} */
        const {
          errors,
        } = await response.json()

        this.errorMessageHashReactive.fetchCurrentEquity = errors.at(0)
          ?.msg
          ?? null

        return
      }

      const currentEquity = await response.json()

      this.currentEquityRef.value = currentEquity.subaccount.equity
    } catch (error) {
      this.errorMessageHashReactive.fetchCurrentEquity = this.resolveErrorMessage({
        error,
      })
    } finally {
      this.statusReactive.isFetchingCurrentEquity = false

      await afterRequestCallback?.()
    }
  }

  /**
   * Generate resource URL to fetch current equity.
   *
   * @returns {string | null}
   */
  generateFetchCurrentEquityResourceUrl () {
    if (this.localWalletAddress === null) {
      return null
    }

    const parentSubaccountNumber = 0

    return `${BASE_INDEXER_URL}/addresses/${this.localWalletAddress}/parentSubaccountNumber/${parentSubaccountNumber}`
  }

  /**
   * Generate fetch option hash to fetch current equity.
   *
   * @returns {RequestInit}
   */
  generateFetchCurrentEquityOptionHash () {
    return {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
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
   * Extract ongoing leaderboard's sort option from URL.
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').SortOption | null}
   */
  extractOngoingLeaderboardSortFromRoute () {
    const {
      leaderboardSort,
    } = this.route.query

    const sortOption = Array.isArray(leaderboardSort)
      ? leaderboardSort.at(0)
      : leaderboardSort

    if (!sortOption) {
      return this.defaultLeaderboardSortOption
    }

    const decodedSortOption = decodeURIComponent(sortOption)
    const [targetColumn, orderBy] = decodedSortOption.split(':')
    const normalizedTargetColumn = targetColumn
      .replace(/^ongoing/u, '')
      .toLowerCase()

    return {
      targetColumn: normalizedTargetColumn,
      orderBy,
    }
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
      /**
       * @type {(capsule: import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').default) => Promise<void>}
       */
      // @ts-expect-error: Upstream type mismatched. Should be fixed in newer furo-nuxt versions.
      afterRequest: async capsule => {
        this.statusReactive.isLoading = false

        if (capsule.hasError()) {
          return
        }

        if (this.extractOngoingLeaderboardSortFromRoute()) {
          return
        }

        if (!capsule.defaultLeaderboardSortOption) {
          return
        }

        const {
          targetColumn,
          orderBy,
        } = capsule.defaultLeaderboardSortOption

        const normalizedTargetColumn = `ongoing${this.toCapitalizedCase({
          string: targetColumn,
        })}`

        await this.router.replace({
          query: {
            ...this.route.query,
            leaderboardSort: encodeURIComponent(`${normalizedTargetColumn}:${orderBy}`),
          },
        })
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
          myParticipation: capsule.myParticipation,
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
          myRanking: capsule.myRanking,
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
          myOutcome: capsule.myOutcome,
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
   *   myParticipation: import(
   *     '~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule'
   *   ).Participant | null
   * }} params - Parameters.
   * @returns {Array<NormalizedCompetitionParticipantEntry>}
   */
  normalizeCompetitionParticipantEntries ({
    participants,
    myParticipation,
  }) {
    const formattedParticipants = participants.map(it => this.formatCompetitionParticipantEntry({
      entry: it,
    }))

    if (myParticipation === null) {
      return formattedParticipants
    }

    const formattedMyParticipation = this.formatCompetitionParticipantEntry({
      entry: myParticipation,
    })
    const filteredParticipants = formattedParticipants
      .filter(it => it.participantAddress !== formattedMyParticipation.participantAddress)

    return [
      formattedMyParticipation,
      ...filteredParticipants,
    ]
  }

  /**
   * Format competition participant entry.
   *
   * @param {{
   *   entry: import(
   *     '~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule'
   *   ).Participant
   * }} params - Parameters.
   * @returns {NormalizedCompetitionParticipantEntry}
   */
  formatCompetitionParticipantEntry ({
    entry,
  }) {
    return {
      participantName: entry.address.name,
      participantAddress: entry.address.address,
      participantEquity: entry.equity,
      participantStatus: entry.status,
    }
  }

  /**
   * Normalize ongoing leaderboard entries.
   *
   * @param {{
   *   rankings: import(
   *     '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'
   *   ).ResponseContent['competitionLeaderboard']['rankings']
   *   myRanking: import(
   *     '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'
   *   ).CompetitionRanking | null
   * }} params - Parameters.
   * @returns {Array<NormalizedOngoingLeaderboardEntry>}
   */
  normalizeOngoingLeaderboardEntries ({
    rankings,
    myRanking,
  }) {
    const formattedRankings = rankings.map(it => this.formatOngoingLeaderboardEntry({
      entry: it,
    }))

    if (myRanking === null) {
      return formattedRankings
    }

    const isInCurrentLeaderboard = rankings.some(it => it.ranking === myRanking.ranking)
    if (isInCurrentLeaderboard) {
      return formattedRankings
    }

    const formattedMyRanking = this.formatOngoingLeaderboardEntry({
      entry: myRanking,
    })

    const sortedEntries = [
      ...formattedRankings,
      formattedMyRanking,
    ]
      .toSorted((entryA, entryB) => entryA.ongoingRank - entryB.ongoingRank)

    const ongoingSeparatorEntry = {
      ongoingRank: 0,
      ongoingName: '----',
      ongoingAddress: '----',
      ongoingBaseline: 0,
      ongoingRoi: 0,
      ongoingPnl: 0,
      ongoingTotalVolume: 0,
      isSeparator: true,
    }

    const myRankingIndex = sortedEntries.findIndex(it =>
      it.ongoingRank === formattedMyRanking.ongoingRank
    )

    return this.insertLeaderboardSeparatorEntry({
      entries: sortedEntries,
      separatorEntry: ongoingSeparatorEntry,
      myEntryIndex: myRankingIndex,
    })
  }

  /**
   * Format ongoing leaderboard entry.
   *
   * @param {{
   *   entry: import(
   *     '~/app/graphql/client/queries/competitionLeaderboard/CompetitionLeaderboardQueryGraphqlCapsule'
   *   ).CompetitionRanking
   * }} params - Parameters.
   * @returns {NormalizedOngoingLeaderboardEntry}
   */
  formatOngoingLeaderboardEntry ({
    entry,
  }) {
    return {
      ongoingRank: entry.ranking,
      ongoingName: entry.address.name ?? '----',
      ongoingAddress: entry.address.address,
      ongoingBaseline: entry.performanceBaseline,
      ongoingRoi: entry.roi,
      ongoingPnl: entry.pnl,
      ongoingTotalVolume: entry.totalVolume,
    }
  }

  /**
   * Normalize leaderboard final outcome entries.
   *
   * @param {{
   *   outcomes: Array<import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome>
   *   myOutcome: import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome | null
   * }} params - Parameters.
   * @returns {Array<NormalizedLeaderboardFinalOutcomeEntry>}
   */
  normalizeLeaderboardFinalOutcomeEntries ({
    outcomes,
    myOutcome,
  }) {
    const formattedOutcomeEntries = outcomes.map(it => this.formatLeaderboardFinalOutcomeEntry({
      entry: it,
    }))

    if (myOutcome === null) {
      return formattedOutcomeEntries
    }

    const isInCurrentLeaderboard = outcomes.some(it => it.ranking === myOutcome.ranking)
    if (isInCurrentLeaderboard) {
      return formattedOutcomeEntries
    }

    const myFormattedOutcome = this.formatLeaderboardFinalOutcomeEntry({
      entry: myOutcome,
    })

    const sortedEntries = [
      ...formattedOutcomeEntries,
      myFormattedOutcome,
    ]
      .toSorted((entryA, entryB) => entryA.outcomeRank - entryB.outcomeRank)

    const outcomeSeparatorEntry = {
      outcomeRank: 0,
      outcomeName: '----',
      outcomeAddress: '----',
      outcomeBaseline: 0,
      outcomePnl: 0,
      outcomeRoi: 0,
      outcomePrize: '0',
      isSeparator: true,
    }

    const myOutcomeIndex = sortedEntries.findIndex(it =>
      it.outcomeRank === myFormattedOutcome.outcomeRank
    )

    return this.insertLeaderboardSeparatorEntry({
      entries: sortedEntries,
      separatorEntry: outcomeSeparatorEntry,
      myEntryIndex: myOutcomeIndex,
    })
  }

  /**
   * Format leaderboard final outcome entry.
   *
   * @param {{
   *   entry: import('~/app/graphql/client/queries/competitionFinalOutcome/CompetitionFinalOutcomeQueryGraphqlCapsule').Outcome
   * }} params - Parameters.
   * @returns {NormalizedLeaderboardFinalOutcomeEntry}
   */
  formatLeaderboardFinalOutcomeEntry ({
    entry,
  }) {
    return {
      outcomeRank: entry.ranking,
      outcomeName: entry.address.name,
      outcomeAddress: entry.address.address,
      outcomeBaseline: entry.performanceBaseline,
      outcomePnl: entry.pnl,
      outcomeRoi: entry.roi,
      outcomePrize: entry.prizeUsdAmount,
    }
  }

  /**
   * Insert leaderboard separator entry.
   *
   * @template {LeaderboardEntryUnion | MetricLeaderboardEntry} T
   * @param {{
   *   entries: Array<T>
   *   separatorEntry: T
   *   myEntryIndex: number
   * }} params - Parameters.
   * @returns {Array<T>}
   */
  insertLeaderboardSeparatorEntry ({
    entries,
    separatorEntry,
    myEntryIndex,
  }) {
    if (myEntryIndex === 0) {
      return [
        ...entries.slice(0, 1),
        separatorEntry,
        ...entries.slice(1),
      ]
    }

    return [
      ...entries.slice(0, myEntryIndex),
      separatorEntry,
      ...entries.slice(myEntryIndex),
    ]
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
   * get: isFetchingCurrentEquity
   *
   * @returns {boolean}
   */
  get isFetchingCurrentEquity () {
    return this.statusReactive.isFetchingCurrentEquity
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
   * get: minimumDeposit
   *
   * @returns {string | null}
   */
  get minimumDeposit () {
    return this.competition
      ?.minimumDeposit
      ?? null
  }

  /**
   * get: defaultLeaderboardSortOption
   *
   * @returns {import('~/app/graphql/client/queries/competition/CompetitionQueryGraphqlCapsule').SortOption | null}
   */
  get defaultLeaderboardSortOption () {
    return this.competitionCapsuleRef
      .value
      .defaultLeaderboardSortOption
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
   * Dismiss competition terms dialog.
   *
   * @returns {void}
   */
  dismissCompetitionTermsDialog () {
    this.competitionTermsDialogRef.value
      ?.dismissDialog()
  }

  /**
   * Show enrollment verification dialog.
   *
   * @returns {void}
   */
  showEnrollmentVerificationDialog () {
    this.enrollmentVerificationDialogShallowRef.value
      ?.showDialog()
  }

  /**
   * Show competition enrollment dialog.
   *
   * @returns {void}
   */
  showCompetitionEnrollmentDialog () {
    this.competitionEnrollmentDialogRef.value
      ?.showDialog()
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

  /**
   * Resolve error message.
   *
   * @param {{
   *   error: unknown
   * }} params - Parameters.
   * @returns {string}
   */
  resolveErrorMessage ({
    error,
  }) {
    if (error instanceof Error) {
      return error.message
    }

    if (typeof error !== 'string') {
      return 'Unknown error'
    }

    return error
  }

  /**
   * Capitalize a string.
   *
   * @param {{
   *   string: string
   * }} params - Parameters.
   * @returns {string}
   */
  toCapitalizedCase ({
    string,
  }) {
    const firstLetter = string.charAt(0)
    const remainingLetters = string.slice(1)

    return `${firstLetter.toUpperCase()}${remainingLetters}`
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   toastStore: import('~/stores/toast').ToastStore
 *   walletStore: import('~/stores/wallet').WalletStore
 *   currentEquityRef: import('vue').Ref<number | null>
 *   leaderboardEntriesRef: import('vue').Ref<LeaderboardEntries>
 *   topThreeLeaderboardEntriesRef: import('vue').Ref<TopThreeLeaderboardEntries>
 *   competitionTermsDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   competitionEnrollmentDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   competitionCancelationDialogRef: import('vue').Ref<import('~/components/units/AppDialog.vue').default | null>
 *   enrollmentVerificationDialogShallowRef: import('vue').ShallowRef<import('~/components/dialogs/EnrollmentVerificationDialog.vue').default | null>
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
 *   errorMessageHashReactive: import('vue').Reactive<ErrorMessageHash>
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
 *   isFetchingCurrentEquity: boolean
 *   isLoading: boolean
 *   isLoadingCompetitionCurrentDynamicPrizeRule: boolean
 *   isLoadingCompetitionDynamicPrizeRules: boolean
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
 * @typedef {NormalizedOngoingLeaderboardEntry
 *   | NormalizedLeaderboardFinalOutcomeEntry
 *   | NormalizedCompetitionParticipantEntry
 * } LeaderboardEntryUnion
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
 *   participantEquity: number
 *   participantStatus: {
 *     statusId: number
 *     name: string
 *     phasedAt: string // ISO string.
 *   }
 *   isSeparator?: boolean
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
 *   ongoingTotalVolume: number
 *   isSeparator?: boolean
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
 *   isSeparator?: boolean
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
 *   isSeparator?: boolean
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

/**
 * @typedef {{
 *   fetchCurrentEquity: string | null
 * }} ErrorMessageHash
 */

/**
 * @typedef {{
 *   errors: Array<{
 *     msg: string
 *   }>
 * }} FetchCurrentEquityErrorResponse
 */
