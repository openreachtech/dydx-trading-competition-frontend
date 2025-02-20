import {
  shallowRef,
} from 'vue'

import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * AddCompetitionPageContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class AddCompetitionPageContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionPageContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    graphqlClientHash,
    formClerkHash,
    statusReactive,
    addCompetitionFormShallowRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.graphqlClientHash = graphqlClientHash
    this.formClerkHash = formClerkHash
    this.statusReactive = statusReactive
    this.addCompetitionFormShallowRef = addCompetitionFormShallowRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionPageContext ? X : never} T, X
   * @override
   * @param {AddCompetitionPageContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    formClerkHash,
    graphqlClientHash,
    statusReactive,
  }) {
    const addCompetitionFormShallowRef = this.generateAddCompetitionFormShallowRef()

    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        graphqlClientHash,
        formClerkHash,
        statusReactive,
        addCompetitionFormShallowRef,
      })
    )
  }

  /**
   * Generate addCompetition form shallow ref.
   *
   * @returns {import('vue').ShallowRef<HTMLFormElement | null>}
   */
  static generateAddCompetitionFormShallowRef () {
    return shallowRef(null)
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams & {
 *   graphqlClientHash: Record<GraphqlClientHashKeys, GraphqlClient>
 *   formClerkHash: Record<GraphqlClientHashKeys, AppFormClerk>
 *   statusReactive: StatusReactive
 *   addCompetitionFormShallowRef: import('vue').ShallowRef<HTMLFormElement | null>
 * }} AddCompetitionPageContextParams
 */

/**
 * @typedef {Omit<AddCompetitionPageContextParams, FactoryOmittedKeys>} AddCompetitionPageContextFactoryParams
 */

/**
 * @typedef {'addCompetition'} GraphqlClientHashKeys
 */

/**
 * @typedef {'addCompetitionFormShallowRef'} FactoryOmittedKeys
 */

/**
 * @typedef {ReturnType<import('@openreachtech/furo-nuxt').useGraphqlClient>} GraphqlClient
 */

/**
 * @typedef {ReturnType<import('~/composables/useAppFormClerk').default>} AppFormClerk
 */

/**
 * @typedef {{
 *   isLoading: boolean
 * }} StatusReactive
 */
