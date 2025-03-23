import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import FinancialMetricNormalizer from '~/app/FinancialMetricNormalizer'

/**
 * SectionProfileOverviewContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class SectionProfileOverviewContext extends BaseFuroContext {
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
      UPDATE_USERNAME: 'updateUsername',
    }
  }

  /**
   * get: isRenaming
   *
   * @returns {boolean}
   */
  get isRenaming () {
    return this.props.isRenaming
  }

  /**
   * get: addressName
   *
   * @returns {string} Address name.
   */
  get addressName () {
    return this.props.addressName
  }

  /**
   * get: competition
   *
   * @returns {Competition} Wallet address.
   */
  get competition () {
    return this.props.competition
  }

  /**
   * get: ranking
   *
   * @returns {Ranking} Wallet address.
   */
  get ranking () {
    return this.props.ranking
  }

  /**
   * get: image
   *
   * @returns {string} Image URL.
   */
  get image () {
    return this.competition
      ?.image
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
   * get: profileAddress
   *
   * @returns {string} Profile address.
   */
  get profileAddress () {
    return Array.isArray(this.route.params.address)
      ? this.route.params.address[0]
      : this.route.params.address
  }

  /**
   * Update username.
   *
   * @param {{
   *   formElement: HTMLFormElement
   * }} params - Parameters.
   * @returns {void}
   */
  updateUsername ({
    formElement,
  }) {
    this.emit(
      this.EMIT_EVENT_NAME.UPDATE_USERNAME,
      {
        formElement,
      }
    )
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
   * Generate host address url.
   *
   * @returns {string} Host address url.
   */
  generateHostAddressUrl () {
    return this.profileAddress
      ? `https://www.mintscan.io/dydx/address/${this.profileAddress}`
      : '#'
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
    if (!this.profileAddress) {
      return '--'
    }

    return this.profileAddress
      .slice(0, -5)
  }

  /**
   * Generate address last five.
   *
   * @returns {string} Address last five.
   */
  generateAddressLastFive () {
    if (!this.profileAddress) {
      return '--'
    }

    return this.profileAddress
      .slice(-5)
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   walletStore: import('~/stores/wallet').WalletStore
 *   route: ReturnType<import('#imports').useRoute>
 * }} SectionProfileOverviewContextParams
 */

/**
 * @typedef {SectionProfileOverviewContextParams} SectionProfileOverviewContextFactoryParams
 */
