import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AddCompetitionFormStepTimelineContext
 *
 * @extends {BaseFuroContext<null, {}, null>}
 */
export default class AddCompetitionFormStepTimelineContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionFormStepTimelineContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    endDateReactive,
  }) {
    super({
      props,
      componentContext,
    })

    this.endDateReactive = endDateReactive
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionFormStepTimelineContext ? X : never} T, X
   * @override
   * @param {AddCompetitionFormStepTimelineContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    endDateReactive,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        endDateReactive,
      })
    )
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   endDateReactive: {
 *     registration: string
 *     competition: string
 *   }
 * }} AddCompetitionFormStepTimelineContextParams
 */

/**
 * @typedef {AddCompetitionFormStepTimelineContextParams} AddCompetitionFormStepTimelineContextFactoryParams
 */
