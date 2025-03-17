import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const MAX_PRIZE_RULE_COUNT = 6

/**
 * AddCompetitionFormStepPrizeContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AddCompetitionFormStepPrizeContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionFormStepPrizeContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    prizeRulesRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.prizeRulesRef = prizeRulesRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionFormStepPrizeContext ? X : never} T, X
   * @override
   * @param {AddCompetitionFormStepPrizeContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    prizeRulesRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        prizeRulesRef,
      })
    )
  }

  /**
   * Add another prize rule.
   *
   * @returns {void}
   */
  addPrizeRule () {
    if (this.prizeRulesRef.value.length >= MAX_PRIZE_RULE_COUNT) {
      return
    }

    const previousRuleIndex = this.prizeRulesRef.value.length - 1
    const previousRankTo = this.prizeRulesRef.value[previousRuleIndex].rankTo

    this.prizeRulesRef.value.push({
      rankFrom: Number(previousRankTo) + 1,
      rankTo: Number(previousRankTo) + 1,
      amount: '0',
      isRankRange: false,
    })
  }

  /**
   * Remove a prize rule.
   *
   * @param {{
   *   index: number
   * }} params - Parameters.
   * @return {void}
   */
  removePrizeRule ({
    index,
  }) {
    this.prizeRulesRef.value.splice(index, 1)
  }

  /**
   * Change input value.
   *
   * @template {keyof PrizeRule} T
   * @param {{
   *   index: number
   *   key: T
   *   newValue: PrizeRule[T]
   * }} params - Parameters.
   * @returns {void}
   */
  updateInputValue ({
    index,
    key,
    newValue,
  }) {
    this.prizeRulesRef.value[index][key] = newValue
  }

  /**
   * Toggle rank range.
   *
   * @param {{
   *   index: number
   * }} params - Parameters.
   * @returns {void}
   */
  toggleRankRange ({
    index,
  }) {
    this.prizeRulesRef.value[index].isRankRange = !this.prizeRulesRef.value[index].isRankRange
  }

  /**
   * Wheter to allow adding more rules or not.
   *
   * @returns {boolean}
   */
  shouldProhibitMoreRules () {
    return this.prizeRulesRef.value.length >= MAX_PRIZE_RULE_COUNT
  }

  /**
   * Generate rank range classes.
   *
   * @param {{
   *   prizeRule: PrizeRule
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateRankRangeClasses ({
    prizeRule,
  }) {
    return {
      range: prizeRule.isRankRange,
    }
  }

  /**
   * Generate range-toggle button classes.
   *
   * @param {{
   *   prizeRule: PrizeRule
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateToggleButtonClasses ({
    prizeRule,
  }) {
    return {
      range: prizeRule.isRankRange,
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<{}> & {
 *   prizeRulesRef: import('vue').Ref<Array<PrizeRule>>
 * }} AddCompetitionFormStepPrizeContextParams
 */

/**
 * @typedef {AddCompetitionFormStepPrizeContextParams} AddCompetitionFormStepPrizeContextFactoryParams
 */

/**
 * @typedef {{
 *   rankFrom: number
 *   rankTo: number
 *   amount: string
 *   isRankRange: boolean
 * }} PrizeRule
 */
