import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * CopyButtonContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class CopyButtonContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {CopyButtonContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    statusReactive,
    tooltipTimer,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusReactive = statusReactive
    this.tooltipTimer = tooltipTimer
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof CopyButtonContext ? X : never} T, X
   * @override
   * @param {CopyButtonContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusReactive,
    tooltipTimer,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        statusReactive,
        tooltipTimer,
      })
    )
  }

  /**
   * get: tooltipMessage
   *
   * @returns {string}
   */
  get tooltipMessage () {
    return this.props.tooltipMessage
  }

  /**
   * get: tooltipActiveMessage
   *
   * @returns {string}
   */
  get tooltipActiveMessage () {
    return this.props.tooltipActiveMessage
  }

  /**
   * get: iconName
   *
   * @returns {string}
   */
  get iconName () {
    return this.props.iconName
  }

  /**
   * get: iconSize
   *
   * @returns {string}
   */
  get iconSize () {
    return this.props.iconSize
  }

  /**
   * get: contentToCopy
   *
   * @returns {string}
   */
  get contentToCopy () {
    return this.props.contentToCopy
  }

  /**
   * get: isDisplayingTooltip
   *
   * @returns {boolean}
   */
  get isDisplayingTooltip () {
    return this.statusReactive.isDisplayingTooltip
  }

  /**
   * Copy content to clipboard.
   *
   * @returns {Promise<void>}
   */
  async copyContent () {
    await navigator.clipboard.writeText(this.contentToCopy)

    this.statusReactive.isDisplayingTooltip = true
    this.tooltipTimer.startTimer()
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   statusReactive: StatusReactive
 *   tooltipTimer: import('~/app/vue/TimerClerk').default
 * }} CopyButtonContextParams
 */

/**
 * @typedef {CopyButtonContextParams} CopyButtonContextFactoryParams
 */

/**
 * @typedef {{
 *   isDisplayingTooltip: boolean
 * }} StatusReactive
 */
