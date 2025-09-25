import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  AVAILABLE_SORT_COLUMN,
  SORT_DIRECTION_OPTION,
} from '~/app/constants'

/**
 * AddCompetitionFormStepOptionsContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class AddCompetitionFormStepOptionsContext extends BaseFuroContext {
  /**
   * Constructor
   *
   * @param {AddCompetitionFormStepOptionsContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    sortOptionRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.sortOptionRef = sortOptionRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AddCompetitionFormStepOptionsContext ? X : never} T, X
   * @override
   * @param {AddCompetitionFormStepOptionsContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    sortOptionRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        sortOptionRef,
      })
    )
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
   * get: initialLeaderboardSortOption
   *
   * @returns {schema.graphql.SortOption | null}
   */
  get initialLeaderboardSortOption () {
    return this.initialFormValueHash
      ?.leaderboardSortOption
      ?? null
  }

  /**
   * get: isEditMode
   *
   * @returns {PropsType['isEditMode']}
   */
  get isEditMode () {
    return this.props.isEditMode
  }

  /**
   * get: selectedTargetColumn
   *
   * @returns {string}
   */
  get selectedTargetColumn () {
    return this.sortOptionRef.value.targetColumn
  }

  /**
   * get: selectedOrderBy
   *
   * @returns {string}
   */
  get selectedOrderBy () {
    return this.sortOptionRef.value.orderBy
  }

  /**
   * get: leaderboardSortOptions
   *
   * @returns {Array<import('~/components/units/AppSelectContext').SelectOption>}
   */
  get leaderboardSortOptions () {
    return [
      {
        label: 'PnL',
        value: 'pnl',
      },
      {
        label: 'ROI',
        value: 'roi',
      },
    ]
  }

  /**
   * Setup component.
   *
   * @template {X extends AddCompetitionFormStepOptionsContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.initialLeaderboardSortOption,
      newInitialLeaderboardSortOption => {
        if (!newInitialLeaderboardSortOption) {
          return
        }

        const {
          orderBy,
          targetColumn,
        } = newInitialLeaderboardSortOption

        this.sortOptionRef.value.orderBy = orderBy
        this.sortOptionRef.value.targetColumn = targetColumn
      }
    )

    return this
  }

  /**
   * Update `targetColumn` in sort option.
   *
   * @param {{
   *   targetColumn: string
   * }} params - Parameters.
   * @returns {void}
   */
  updateSortTargetColumn ({
    targetColumn,
  }) {
    this.sortOptionRef.value.targetColumn = targetColumn
  }

  /**
   * Extract initial leaderboard sort option.
   *
   * @returns {schema.graphql.SortOption}
   */
  extractInitialLeaderboardSortOption () {
    const defaultValue = {
      targetColumn: AVAILABLE_SORT_COLUMN.PNL,
      orderBy: SORT_DIRECTION_OPTION.DESC,
    }

    return this.initialFormValueHash
      ?.leaderboardSortOption
      ?? defaultValue
  }

  /**
   * Generate input name for orderBy.
   *
   * @returns {string}
   */
  generateOrderByInputName () {
    const sortOptionInputName = this.generateSortOptionInputName()

    return `${sortOptionInputName}.orderBy`
  }

  /**
   * Generate input name for targetColumn.
   *
   * @returns {string}
   */
  generateTargetColumnInputName () {
    const sortOptionInputName = this.generateSortOptionInputName()

    return `${sortOptionInputName}.targetColumn`
  }

  /**
   * Generate input name for sort option.
   *
   * @returns {string}
   */
  generateSortOptionInputName () {
    if (this.isEditMode) {
      return 'defaultLeaderboardSortOption'
    }

    return 'leaderboardSortOption'
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   sortOptionRef: import('vue').Ref<schema.graphql.SortOption>
 * }} AddCompetitionFormStepOptionsContextParams
 */

/**
 * @typedef {AddCompetitionFormStepOptionsContextParams} AddCompetitionFormStepOptionsContextFactoryParams
 */

/**
 * @typedef {{
 *   initialFormValueHash: InitialFormValueHash | null
 *   isEditMode: boolean
 * }} PropsType
 */

/**
 * @typedef {{
 *   leaderboardSortOption: schema.graphql.SortOption
 * }} InitialFormValueHash
 */
