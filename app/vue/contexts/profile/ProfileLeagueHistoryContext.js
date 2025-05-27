import {
  useRoute,
} from 'vue-router'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

import {
  PAGINATION,
} from '~/app/constants'

import CompetitionBadgeContext from '~/app/vue/contexts/badges/CompetitionBadgeContext'

/**
 * ProfileLeagueHistoryContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class ProfileLeagueHistoryContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {ProfileLeagueHistoryContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    statusReactive,
    graphqlClientHash,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.statusReactive = statusReactive
    this.graphqlClientHash = graphqlClientHash
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof ProfileLeagueHistoryContext ? X : never} T, X
   * @override
   * @param {ProfileLeagueHistoryContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusReactive,
    graphqlClientHash,
  }) {
    const route = this.generateRoute()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        statusReactive,
        graphqlClientHash,
      })
    )
  }

  /**
   * Generate route.
   *
   * @returns {ReturnType<typeof useRoute>} Route object.
   */
  static generateRoute () {
    return useRoute()
  }

  /**
   * Setup component context.
   *
   * @template {X extends ProfileLeagueHistoryContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.route.query.leaguePage,
      async () => {
        await this.graphqlClientHash
          .addressPastCompetitions
          .invokeRequestOnEvent(this.addressPastCompetitionsDefaultVariables)
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * get: addressPastCompetitionsCapsuleRef
   *
   * @returns {import('vue').Ref<ProfileLeagueHistoryContext['graphqlClientHash']['addressPastCompetitions']['capsuleRef']>}
   */
  get addressPastCompetitionsCapsuleRef () {
    return this.graphqlClientHash.addressPastCompetitions.capsuleRef
  }

  /**
   * get: addressPastCompetitionsDefaultVariables
   *
   * @returns {{
   *   variables: import(
   *     '~/app/graphql/client/queries/addressPastCompetitions/AddressPastCompetitionsQueryGraphqlPayload'
   *   ).AddressPastCompetitionsQueryRequestVariables
   * }}
   */
  get addressPastCompetitionsDefaultVariables () {
    const address = Array.isArray(this.route.params.address)
      ? this.route.params.address[0]
      : this.route.params.address
    const normalizedLeaguePage = Number(this.route.query.leaguePage)
    const currentPage = isNaN(normalizedLeaguePage)
      ? 1
      : normalizedLeaguePage

    return {
      variables: {
        input: {
          address,
          pagination: {
            limit: PAGINATION.LIMIT,
            offset: (currentPage - 1) * PAGINATION.LIMIT,
          },
        },
      },
    }
  }

  /**
   * get: addressPastCompetitionsLauncherHooks
   *
   * @returns {furo.GraphqlLauncherHooks} Launcher hooks.
   */
  get addressPastCompetitionsLauncherHooks () {
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
   * get: paginationResult
   *
   * @returns {PaginationResult} Pagination object.
   */
  get paginationResult () {
    return {
      limit: PAGINATION.LIMIT,
      totalRecords: this.addressPastCompetitionsCapsuleRef.value
        .totalCount
        ?? 0,
    }
  }

  /**
   * get: tableHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>} Header entries.
   */
  get tableHeaderEntries () {
    return [
      {
        label: 'League Title',
        key: 'title',
      },
      {
        label: 'Ranking',
        key: 'rank',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        label: 'Prize',
        key: 'prize',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        label: 'PnL($)/ROI',
        key: 'profit',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        key: 'baseline',
        label: 'Performance Baseline',
        columnOptions: {
          textAlign: 'end',
        },
      },
      {
        label: 'State',
        key: 'status',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * get: competitions
   *
   * @returns {Competitions} Competitions.
   */
  get competitions () {
    return this.addressPastCompetitionsCapsuleRef.value.competitions
  }

  /**
   * Generate table entries.
   *
   * @returns {Array<TableEntry>} Table entries.
   */
  generateTableEntries () {
    return this.competitions.map(it => ({
      competitionId: it.competition.competitionId,
      title: it.competition.title,
      imageUrl: it.competition.imageUrl ?? '',
      rank: it.rank,
      baseline: it.performanceBaseline,
      prize: it.prize,
      profit: {
        roi: it.roi,
        pnl: it.pnl,
      },
      status: it.competition.status,
    }))
  }

  /**
   * Generate competition URL.
   *
   * @param {{
   *   competitionId: number
   * }} params - Parameters.
   * @returns {string}
   */
  generateCompetitionUrl ({
    competitionId,
  }) {
    return `/competitions/${competitionId}`
  }

  /**
   * Normalize performance baseline.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string} Normalized performance baseline.
   */
  normalizePerformanceBaseline ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsPerformanceBaseline()
  }

  /**
   * Normalize PnL.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string}
   */
  normalizePnl ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsPnl()
  }

  /**
   * Normalize ROI.
   *
   * @param {{
   *   figure: number
   * }} params - Parameters.
   * @returns {string}
   */
  normalizeRoi ({
    figure,
  }) {
    return FinancialMetricNormalizer.create({
      figure,
    })
      .normalizeAsRoi()
  }

  /**
   * Generate badge severity based on status.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateSeverityReturnType} Badge severity.
   */
  generateStatusSeverity ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateSeverity()
  }

  /**
   * Generate badge description based on status.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {string} Badge description.
   */
  generateStatusDescription ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateDescription()
  }

  /**
   * Generate status icon name.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {import('~/app/vue/contexts/badges/CompetitionBadgeContext').GenerateIconNameReturnType} Icon name.
   */
  generateStatusIconName ({
    statusId,
  }) {
    const badgeContext = CompetitionBadgeContext.create({
      statusId,
    })

    return badgeContext.generateIconName()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   statusReactive: StatusReactive
 *   route: ReturnType<typeof useRoute>
 * }} ProfileLeagueHistoryContextParams
 */

/**
 * @typedef {'addressPastCompetitions'} GraphqlClientHashKeys
 */

/**
 * @typedef {Omit<ProfileLeagueHistoryContextParams, FactoryOmittedKeys>} ProfileLeagueHistoryContextFactoryParams
 */

/**
 * @typedef {'route'} FactoryOmittedKeys
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
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} PaginationResult
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/queries/addressPastCompetitions/AddressPastCompetitionsQueryGraphqlCapsule'
 * ).AddressPastCompetitionsQueryResponseContent['addressPastCompetitions']['competitions']} Competitions
 */

/**
 * @typedef {{
 *   competitionId: number
 *   title: string
 *   imageUrl: string
 *   rank: number
 *   baseline: number
 *   prize: string
 *   profit: {
 *     roi: number
 *     pnl: number
 *   }
 *   status: {
 *     statusId: number
 *     name: string
 *     phasedAt: string // ISO string
 *   }
 * }} TableEntry
 */
