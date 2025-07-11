import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AppMarkdownViewerContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class AppMarkdownViewerContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AppMarkdownViewerContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    markdownItInstance,
  }) {
    super({
      props,
      componentContext,
    })

    this.markdownItInstance = markdownItInstance
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppMarkdownViewerContext ? X : never} T, X
   * @override
   * @param {AppMarkdownViewerContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    markdownItInstance,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        markdownItInstance,
      })
    )
  }

  /**
   * get: content
   *
   * @returns {string}
   */
  get content () {
    return this.props.content
  }

  /**
   * Render content.
   *
   * @returns {string}
   */
  renderContent () {
    return this.markdownItInstance
      .render(this.content)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   markdownItInstance: ReturnType<typeof import('markdown-it')>
 * }} AppMarkdownViewerContextParams
 */

/**
 * @typedef {AppMarkdownViewerContextParams} AppMarkdownViewerContextFactoryParams
 */

/**
 * @typedef {{
 *   content: string
 * }} PropsType
 */
