import {
  computed,
} from 'vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

const MAX_PRIZE_RULE_COUNT = 6

/**
 * AddCompetitionFormStepPrizeContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
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
    totalPrizeComputed,
  }) {
    super({
      props,
      componentContext,
    })

    this.prizeRulesRef = prizeRulesRef
    this.totalPrizeComputed = totalPrizeComputed
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
    const totalPrizeComputed = this.generateTotalPrizeComputed({
      prizeRulesRef,
    })

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        prizeRulesRef,
        totalPrizeComputed,
      })
    )
  }

  /**
   * Generate total prize computed.
   *
   * @param {{
   *   prizeRulesRef: import('vue').Ref<Array<PrizeRule>>
   * }} params - Parameters.
   * @returns {import('vue').ComputedRef<string>} Normalized total prize.
   */
  static generateTotalPrizeComputed ({
    prizeRulesRef,
  }) {
    return computed(() => {
      const totalAmount = this.calculateTotalPrize({
        prizeRulesRef,
      })

      const formatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        currency: 'USD',
      })
      const normalizedTotalPrize = formatter.format(totalAmount)

      return `${normalizedTotalPrize} USDC`
    })
  }

  /**
   * Calculate total prize.
   *
   * @param {{
   *   prizeRulesRef: import('vue').Ref<Array<PrizeRule>>
   * }} params - Parameters.
   * @returns {number}
   */
  static calculateTotalPrize ({
    prizeRulesRef,
  }) {
    const amounts = prizeRulesRef.value.map(prizeRule => {
      const amount = parseFloat(prizeRule.amount)
      const multiplier = prizeRule.rankTo - prizeRule.rankFrom + 1

      return amount * multiplier
    })
    const totalAmount = amounts.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    )

    return totalAmount
  }

  /**
   * Setup component.
   *
   * @template {X extends AddCompetitionFormStepPrizeContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      // This array always starts empty. We only invoke one-time watcher if it is no longer empty.
      () => this.initialPrizeRules.length,
      () => {
        this.syncInitialPrizeRules()
      },
      {
        once: true,
      }
    )

    return this
  }

  /**
   * get: validationMessage
   *
   * @returns {PropsType['validationMessage']}
   */
  get validationMessage () {
    return this.props.validationMessage
  }

  /**
   * get: initialFormValueHash
   *
   * @returns {PropsType['initialFormValueHash']}
   */
  get initialFormValueHash () {
    return this.props.initialFormValueHash
  }

  /**
   * get: initialPrizeRules
   *
   * @returns {Array<PrizeRule>}
   */
  get initialPrizeRules () {
    return this.initialFormValueHash
      ?.prizeRules
      ?? []
  }

  /**
   * get: shouldOmitTotalPrize
   *
   * @returns {PropsType['shouldOmitTotalPrize']}
   */
  get shouldOmitTotalPrize () {
    return this.props.shouldOmitTotalPrize
  }

  /**
   * Sync initial prize rules when prop changes.
   *
   * @returns {void}
   */
  syncInitialPrizeRules () {
    this.prizeRulesRef.value = this.initialPrizeRules
  }

  /**
   * Calculate total prize.
   *
   * @returns {number}
   */
  calculateTotalPrize () {
    // @ts-expect-error - Generic type T is not aware of derived property.
    return this.Ctor.calculateTotalPrize({
      prizeRulesRef: this.prizeRulesRef,
    })
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

  /**
   * Generate CSS classes for error message.
   *
   * @param {{
   *   fieldName: keyof PropsType['validationMessage']
   * }} params - Parameters.
   * @returns {Record<string, boolean>}
   */
  generateErrorMessageClasses ({
    fieldName,
  }) {
    return {
      hidden: !this.validationMessage[fieldName],
    }
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   prizeRulesRef: import('vue').Ref<Array<PrizeRule>>
 *   totalPrizeComputed: import('vue').ComputedRef<string>
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

/**
 * @typedef {{
 *   validationMessage: furo.ValidatorHashType['message']
 *   initialFormValueHash: InitialFormValueHash | null
 *   shouldOmitTotalPrize: boolean
 * }} PropsType
 */

/**
 * @typedef {{
 *   prizeRules: Array<PrizeRule>
 * }} InitialFormValueHash
 */
