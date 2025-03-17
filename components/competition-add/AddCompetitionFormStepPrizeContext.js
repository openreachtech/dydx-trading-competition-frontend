import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

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
