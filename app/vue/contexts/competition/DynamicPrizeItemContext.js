export default class DynamicPrizeItemContext {
  /**
   * Constructor
   *
   * @param {DynamicPrizeItemContextParams} params - Parameters.
   */
  constructor ({
    tradingVolumeMilestone,
    prizes,
    currentTradingVolume,
    maximumPrizeAmount,
  }) {
    this.tradingVolumeMilestone = tradingVolumeMilestone
    this.prizes = prizes
    this.currentTradingVolume = currentTradingVolume
    this.maximumPrizeAmount = maximumPrizeAmount
  }

  /**
   * Factory method.
   *
   * @template {X extends typeof DynamicPrizeItemContext ? X : never} T, X
   * @param {DynamicPrizeItemContextFactoryParams} params - Parameters.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    tradingVolumeMilestone,
    prizes,
    currentTradingVolume,
    maximumPrizeAmount,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        tradingVolumeMilestone,
        prizes,
        currentTradingVolume,
        maximumPrizeAmount,
      })
    )
  }

  /**
   * Extract prize amount.
   *
   * @param {{
   *   categoryId: number
   * }} params - Parameters.
   * @returns {number}
   */
  extractPrizeAmount ({
    categoryId,
  }) {
    const prizeAmount = this.prizes
      .find(prize => prize.competitionPrizeCategory.categoryId === categoryId)
      ?.totalCategoryPrizeAmount
      ?? null

    if (!prizeAmount) {
      return 0
    }

    return parseFloat(prizeAmount)
  }

  /**
   * Calculate horizontal position.
   *
   * @returns {string}
   */
  calculateHorizontalPosition () {
    if (!this.maximumPrizeAmount) {
      return '0%'
    }

    const percentage = this.tradingVolumeMilestone / this.maximumPrizeAmount * 100

    return `${percentage}%`
  }

  /**
   * Calculate the total prize of a milestone.
   *
   * @returns {number}
   */
  calculateTotalPrize () {
    return this.prizes.reduce((accumulator, prize) => {
      const parsedTotalPrizeAmount = parseFloat(prize.totalCategoryPrizeAmount)

      return accumulator + parsedTotalPrizeAmount
    }, 0)
  }

  /**
   * Check if current competition has reached this milestone.
   *
   * @returns {boolean}
   */
  hasReachedMilestone () {
    return this.currentTradingVolume >= this.tradingVolumeMilestone
  }
}

/**
 * @typedef {{
 *   tradingVolumeMilestone: number
 *   prizes: Array<PickedDynamicPrizeRuleSummary>
 *   currentTradingVolume: number
 *   maximumPrizeAmount: number
 * }} DynamicPrizeItemContextParams
 */

/**
 * @typedef {DynamicPrizeItemContextParams} DynamicPrizeItemContextFactoryParams
 */

/**
 * @typedef {Pick<schema.graphql.CompetitionDynamicPrizeRuleSummary, 'competitionPrizeCategory' | 'totalCategoryPrizeAmount'>} PickedDynamicPrizeRuleSummary
 */
