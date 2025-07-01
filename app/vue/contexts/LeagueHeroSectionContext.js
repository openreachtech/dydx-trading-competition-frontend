import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * LeagueHeroSectionContext
 *
 * @extends {BaseAppContext<null>}
 */
export default class LeagueHeroSectionContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {LeagueHeroSectionContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    router,
    walletStore,
    onboardingDialogsComponentRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.router = router
    this.walletStore = walletStore
    this.onboardingDialogsComponentRef = onboardingDialogsComponentRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof LeagueHeroSectionContext ? X : never} T, X
   * @override
   * @param {LeagueHeroSectionContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    router,
    walletStore,
    onboardingDialogsComponentRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        router,
        walletStore,
        onboardingDialogsComponentRef,
      })
    )
  }

  /**
   * get: competitionStatisticsCapsule
   *
   * @returns {PropsType['competitionStatisticsCapsule'] | null} Competition statistics capsule.
   */
  get competitionStatisticsCapsule () {
    return this.props.competitionStatisticsCapsule
  }

  /**
   * get: totalHostedCompetitionsNumber
   *
   * @returns {number | null} Total number of hosted competitions.
   */
  get totalHostedCompetitionsNumber () {
    return this.competitionStatisticsCapsule
      ?.totalHostedCompetitionsNumber
      ?? null
  }

  /**
   * get: totalEnrolledCompetitionParticipantsNumber
   *
   * @returns {number | null} Total number of enrolled competition participants.
   */
  get totalEnrolledCompetitionParticipantsNumber () {
    return this.competitionStatisticsCapsule
      ?.totalEnrolledCompetitionParticipantsNumber
      ?? null
  }

  /**
   * get: totalPaidOutPrizesUsdAmount
   *
   * @returns {string | null} Total amount of paid out prizes in USD.
   */
  get totalPaidOutPrizesUsdAmount () {
    return this.competitionStatisticsCapsule
      ?.totalPaidOutPrizesUsdAmount
      ?? null
  }

  /**
   * Generate `totalHostedCompetitionsNumber`.
   *
   * @returns {string} Total number of hosted competitions.
   */
  generateTotalHostedCompetitionsNumber () {
    return this.formatNumber({
      value: this.totalHostedCompetitionsNumber,
    })
  }

  /**
   * Generate `totalEnrolledCompetitionParticipantsNumber`.
   *
   * @returns {string} Total number of enrolled competition participants.
   */
  generateTotalEnrolledCompetitionParticipantsNumber () {
    return this.formatNumber({
      value: this.totalEnrolledCompetitionParticipantsNumber,
    })
  }

  /**
   * Generate `totalPaidOutPrizesUsdAmount`.
   *
   * @returns {string} Total amount of paid out prizes in USD.
   */
  generateTotalPaidOutPrizesUsdAmount () {
    return this.formatNumber({
      value: this.totalPaidOutPrizesUsdAmount,
      options: {
        style: 'currency',
        currency: 'USD',
      },
    })
  }

  /**
   * Host a new league.
   *
   * @returns {Promise<void>}
   */
  async hostLeague () {
    if (!this.onboardingDialogsComponentRef.value) {
      return
    }

    if (!this.walletStore.walletStoreRef.value.sourceAccount.address) {
      this.onboardingDialogsComponentRef.value.showWalletSelectionDialog()

      return
    }

    if (!this.walletStore.walletStoreRef.value.localWallet.address) {
      this.onboardingDialogsComponentRef.value.showKeyDerivationDialog()

      return
    }

    await this.router.push('/competitions/add')
  }

  /**
   * Format number.
   *
   * @param {{
   *   value: string | number | null
   *   options?: Intl.NumberFormatOptions
   *   fallbackValue?: string
   * }} params - Parameters.
   * @returns {string} Formatted number string.
   */
  formatNumber ({
    value,
    options = {},
    fallbackValue = '--',
  }) {
    if (
      value === null
      || value === undefined
    ) {
      return fallbackValue
    }

    const parsedValue = typeof value === 'string'
      ? parseFloat(value)
      : value

    if (isNaN(parsedValue)) {
      return fallbackValue
    }

    const formatter = new Intl.NumberFormat('en-US', {
      trailingZeroDisplay: 'stripIfInteger',
      ...options,
    })

    return formatter.format(parsedValue)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   router: ReturnType<import('vue-router').useRouter>
 *   walletStore: import('~/stores/wallet').WalletStore
 *   onboardingDialogsComponentRef: import('vue').Ref<import('~/components/dialogs/OnboardingDialogs.vue').default | null>
 * }} LeagueHeroSectionContextParams
 */

/**
 * @typedef {LeagueHeroSectionContextParams} LeagueHeroSectionContextFactoryParams
 */

/**
 * @typedef {{
 *   competitionStatisticsCapsule: import('~/app/graphql/client/queries/competitionStatistics/CompetitionStatisticsQueryGraphqlCapsule').default
 * }} PropsType
 */
