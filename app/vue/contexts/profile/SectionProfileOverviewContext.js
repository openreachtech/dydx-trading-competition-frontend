import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

import {
  COMPETITION_PARTICIPANT_STATUS,
} from '~/app/constants'

/**
 * SectionProfileOverviewContext
 *
 * @extends {BaseAppContext<null, PropsType, null>}
 */
export default class SectionProfileOverviewContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {SectionProfileOverviewContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    walletStore,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.walletStore = walletStore
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof SectionProfileOverviewContext ? X : never} T, X
   * @override
   * @param {SectionProfileOverviewContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    walletStore,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        walletStore,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      CONNECT_X_ACCOUNT: 'connectXAccount',
      DISCONNECT_X_ACCOUNT: 'disconnectXAccount',
      SHOW_PROFILE_RENAME_DIALOG: 'showProfileRenameDialog',
      UPLOAD_IMAGE: 'uploadImage',
    }
  }

  /**
   * get: addressProfile
   *
   * @returns {PropsType['addressProfile']}
   */
  get addressProfile () {
    return this.props.addressProfile
  }

  /**
   * get: address
   *
   * @returns {string | null}
   */
  get address () {
    return this.addressProfile
      ?.address
      ?? '----'
  }

  /**
   * get: addressName
   *
   * @returns {string | null}
   */
  get addressName () {
    return this.addressProfile
      ?.name
      ?? '----'
  }

  /**
   * get: addressImageUrl
   *
   * @returns {string | null}
   */
  get addressImageUrl () {
    return this.addressProfile
      ?.addressImageUrl
      ?? ''
  }

  /**
   * get: xAccountUserName
   *
   * @returns {string | null}
   */
  get xAccountUserName () {
    return this.addressProfile
      ?.xAccountUserName
      ?? null
  }

  /**
   * get: competition
   *
   * @returns {PropsType['competition']} Wallet address.
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: competitionParticipantStatusId
   *
   * @returns {PropsType['competitionParticipantStatusId']}
   */
  get competitionParticipantStatusId () {
    return this.props.competitionParticipantStatusId
  }

  /**
   * get: competitionId
   *
   * @returns {number | null} Competition ID.
   */
  get competitionId () {
    return this.competition
      ?.competitionId
      ?? null
  }

  /**
   * get: ranking
   *
   * @returns {PropsType['ranking']} Wallet address.
   */
  get ranking () {
    return this.props.ranking
  }

  /**
   * get: userInterfaceState
   *
   * @returns {PropsType['userInterfaceState']}
   */
  get userInterfaceState () {
    return this.props.userInterfaceState
  }

  /**
   * get: imageUrl
   *
   * @returns {string} Image URL.
   */
  get imageUrl () {
    return this.competition
      ?.imageUrl
      ?? '/img/badges/league-badge-placeholder.png'
  }

  /**
   * get: hostAddress
   *
   * @returns {string | null} Wallet address.
   */
  get hostAddress () {
    return this.competition
      ?.host
      ?.address
      ?? null
  }

  /**
   * get: roi
   *
   * @returns {number | null} ROI.
   */
  get roi () {
    return this.ranking
      ?.roi
      ?? null
  }

  /**
   * get: PnL
   *
   * @returns {number | null} PnL.
   */
  get pnl () {
    return this.ranking
      ?.pnl
      ?? null
  }

  /**
   * get: performanceBaseline
   *
   * @returns {number | null} performanceBaseline.
   */
  get performanceBaseline () {
    return this.ranking
      ?.performanceBaseline
      ?? null
  }

  /**
   * get: isGeneratingXaccountOauthUrl
   *
   * @returns {boolean}
   */
  get isGeneratingXaccountOauthUrl () {
    return this.userInterfaceState
      ?.isGeneratingXaccountOauthUrl
      ?? false
  }

  /**
   * get: isRevokingXaccountOauth
   *
   * @returns {boolean}
   */
  get isRevokingXaccountOauth () {
    return this.userInterfaceState
      ?.isRevokingXaccountOauth
      ?? false
  }

  /**
   * get: isUploadingAvatar
   *
   * @returns {boolean}
   */
  get isUploadingAvatar () {
    return this.userInterfaceState
      ?.isUploadingAvatar
      ?? false
  }

  /**
   * Whether is one's own profile or not.
   *
   * @returns {boolean} `true` if it is the user's own profile.
   */
  isOwnProfile () {
    const userAddress = this.walletStore.walletStoreRef.value
      .localWallet
      .address
    const urlWalletAddress = this.route.params.address

    if (
      !userAddress
      || !urlWalletAddress
    ) {
      return false
    }

    return urlWalletAddress === userAddress
  }

  /**
   * Check if the user is participating in an arena.
   *
   * @returns {boolean}
   */
  isParticipatingInArena () {
    return this.competitionId !== null
  }

  /**
   * Generate PnL and ROI.
   *
   * @returns {string} PnL and ROI.
   */
  generatePnlRoi () {
    const normalizedPnl = FinancialMetricNormalizer.create({
      figure: this.pnl,
    })
      .normalizeAsPnl()
    const normalizedRoi = FinancialMetricNormalizer.create({
      figure: this.roi,
    })
      .normalizeAsRoi()

    return `${normalizedPnl} (${normalizedRoi})`
  }

  /**
   * Normalize performance baseline.
   *
   * @returns {string} Normalized performance baseline.
   */
  generatePerformanceBaseline () {
    return FinancialMetricNormalizer.create({
      figure: this.performanceBaseline,
    })
      .normalizeAsPerformanceBaseline()
  }

  /**
   * Generate basic details CSS classes.
   *
   * @returns {Record<string, boolean>} CSS classes.
   */
  generateBasicDetailsClasses () {
    return {
      'own-profile': this.isOwnProfile(),
    }
  }

  /**
   * Generate PnL classes.
   *
   * @returns {Record<string, boolean>} PnL classes.
   */
  generatePnlClasses () {
    const normalizedRoi = Number(this.roi)

    return {
      increased: Boolean(this.roi) && normalizedRoi > 0,
      decreased: Boolean(this.roi) && normalizedRoi < 0,
    }
  }

  /**
   * Generate competition URL.
   *
   * @returns {string} Competition URL.
   */
  generateCompetitionUrl () {
    if (!this.competitionId) {
      return ''
    }

    return `/competitions/${this.competitionId}`
  }

  /**
   * Normalize host name.
   *
   * @returns {string} Host name.
   */
  generateHostName () {
    return this.competition
      ?.host
      ?.name
      ?? '----'
  }

  /**
   * Generate competition title.
   *
   * @returns {string} Competition title.
   */
  generateCompetitionTitle () {
    return this.competition
      ?.title
      ?? '----'
  }

  /**
   * Generate profile address url.
   *
   * @returns {string} Profile address url.
   */
  generateProfileAddressUrl () {
    if (!this.address) {
      return '#'
    }

    return `https://www.mintscan.io/dydx/address/${this.address}`
  }

  /**
   * Generate current rank.
   *
   * @returns {string} Current rank.
   */
  generateCurrentRank () {
    const currentRank = this.ranking?.ranking
    if (!currentRank) {
      return '--'
    }

    return `#${currentRank}`
  }

  /**
   * Generate address first half.
   *
   * @returns {string} Address first half.
   */
  generateAddressFirstHalf () {
    if (!this.address) {
      return '--'
    }

    return this.address
      .slice(0, -5)
  }

  /**
   * Generate address last five.
   *
   * @returns {string} Address last five.
   */
  generateAddressLastFive () {
    if (!this.address) {
      return '--'
    }

    return this.address
      .slice(-5)
  }

  /**
   * Generate profile URL for X account.
   *
   * @returns {string}
   */
  generateXProfileUrl () {
    if (!this.xAccountUserName) {
      return ''
    }

    return `https://x.com/${this.xAccountUserName}`
  }

  /**
   * Show `profileRenameDialog`
   *
   * @returns {void}
   */
  showProfileRenameDialog () {
    this.emit(this.EMIT_EVENT_NAME.SHOW_PROFILE_RENAME_DIALOG)
  }

  /**
   * Generate icon for participant status badge.
   *
   * @returns {string} Icon name.
   */
  generateParticipantStatusBadgeIcon () {
    if (this.isParticipantActive()) {
      return 'heroicons:user'
    }

    return 'heroicons:user-solid'
  }

  /**
   * Generate participant status badge text.
   *
   * @returns {string}
   */
  generateParticipantStatusBadgeText () {
    const cases = this.generateParticipantStatusBadgeTextCases()
    const matchedCase = cases.find(it => it.checker())

    if (!matchedCase) {
      return '--'
    }

    return matchedCase.result
  }

  /**
   * Generate cases for participant status badge text.
   *
   * @returns {Array<{
   *   checker: () => boolean
   *   result: string
   * }>}
   */
  generateParticipantStatusBadgeTextCases () {
    return [
      {
        checker: () => this.isParticipantRegistered(),
        result: 'Registered',
      },
      {
        checker: () => this.isParticipantActive(),
        result: 'Active',
      },
      {
        checker: () => this.isParticipantAwaitingDeposit(),
        result: 'Waiting Deposit',
      },
    ]
  }

  /**
   * Check if the participant is registered.
   *
   * @returns {boolean}
   */
  isParticipantRegistered () {
    return this.competitionParticipantStatusId === COMPETITION_PARTICIPANT_STATUS.REGISTERED.ID
  }

  /**
   * Check if the participant is active in the arena.
   *
   * @returns {boolean}
   */
  isParticipantActive () {
    return this.competitionParticipantStatusId === COMPETITION_PARTICIPANT_STATUS.ACTIVE.ID
  }

  /**
   * Check if the participant status is awaiting deposit.
   *
   * @returns {boolean}
   */
  isParticipantAwaitingDeposit () {
    return this.competitionParticipantStatusId === COMPETITION_PARTICIPANT_STATUS.AWAITING_DEPOSIT.ID
  }

  /**
   * Check if the user has connected their X account.
   *
   * @returns {boolean}
   */
  hasConnectedXAccount () {
    return Boolean(this.xAccountUserName)
  }

  /**
   * Emit 'connectXAccount' event.
   *
   * @returns {void}
   */
  emitConnectXAccount () {
    if (!this.isOwnProfile()) {
      return
    }

    this.emit(
      this.EMIT_EVENT_NAME.CONNECT_X_ACCOUNT
    )
  }

  /**
   * Emit 'disconnectXAccount' event.
   *
   * @returns {void}
   */
  emitDisconnectXAccount () {
    if (!this.isOwnProfile()) {
      return
    }

    this.emit(
      this.EMIT_EVENT_NAME.DISCONNECT_X_ACCOUNT
    )
  }

  /**
   * Emit 'uploadImage' event.
   *
   * @param {{
   *   file: File
   * }} params - Parameters.
   * @returns {void}
   */
  emitUploadImage ({
    file,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME.UPLOAD_IMAGE,
      {
        file,
      }
    )
  }
}

/**
 * @typedef {import(
 *   '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule'
 * ).AddressCurrentCompetitionQueryResponseContent['addressCurrentCompetition']['competition']} Competition
 */

/**
 * @typedef {import(
 *   '~/app/graphql/client/queries/addressCurrentCompetition/AddressCurrentCompetitionQueryGraphqlCapsule'
 * ).AddressCurrentCompetitionQueryResponseContent['addressCurrentCompetition']['ranking']} Ranking
 */

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   route: ReturnType<import('#imports').useRoute>
 * }} SectionProfileOverviewContextParams
 */

/**
 * @typedef {SectionProfileOverviewContextParams} SectionProfileOverviewContextFactoryParams
 */

/**
 * @typedef {{
 *   addressProfile: import('~/app/graphql/client/queries/addressProfile/AddressProfileQueryGraphqlCapsule').AddressProfile | null
 *   competition: Competition | null
 *   competitionParticipantStatusId: number | null
 *   ranking: Ranking | null
 *   userInterfaceState: import('~/app/vue/contexts/profile/ProfileDetailsPageContext').StatusReactive | null
 * }} PropsType
 */
