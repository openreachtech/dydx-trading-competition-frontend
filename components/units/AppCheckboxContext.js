import BaseAppContext from '~/app/vue/contexts/BaseAppContext'

/**
 * AppCheckboxContext
 *
 * @extends {BaseAppContext<null, AppCheckboxContextProps, null>} - Base class <Accessor, Props, Emit>
 */
export default class AppCheckboxContext extends BaseAppContext {
  /**
   * Constructor
   *
   * @param {AppCheckboxContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    internalValueRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.internalValueRef = internalValueRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppCheckboxContext ? X : never} T, X
   * @override
   * @param {AppCheckboxContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    internalValueRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        internalValueRef,
      })
    )
  }

  /**
   * @override
   * @returns {Record<string, string>}
   */
  static get EMIT_EVENT_NAME () {
    return {
      UPDATE_MODEL_VALUE: 'update:modelValue',
    }
  }

  /**
   * Get the message.
   *
   * @returns {boolean} Message.
   */
  get modelValue () {
    return this.props.modelValue
  }

  /**
   * Get the indeterminate status.
   *
   * @returns {boolean} Indeterminate status.
   */
  get indeterminate () {
    return this.props.indeterminate
  }

  /**
   * Get the disabled status.
   *
   * @returns {boolean} Disabled status.
   */
  get disabled () {
    return this.props.disabled
  }

  /**
   * Get the label.
   *
   * @returns {string} Label.
   */
  get label () {
    return this.props.label
  }

  /**
   * Setup component
   *
   * @template {X extends AppCheckboxContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent (args = {}) {
    this.watch(
      () => this.modelValue,
      newVal => {
        this.internalValueRef.value = newVal
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * Toggle the checkbox.
   */
  toggle () {
    if (!this.disabled) {
      const newValue = !this.internalValueRef.value

      this.internalValueRef.value = newValue
      this.emit(
        this.EMIT_EVENT_NAME.UPDATE_MODEL_VALUE,
        newValue
      )
    }
  }

  /**
   * Should show indeterminate status.
   *
   * @returns {boolean} Should show indeterminate status.
   */
  shouldShowIndeterminateStatus () {
    return this.indeterminate
      && !this.disabled
      && this.internalValueRef.value
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<AppCheckboxContextProps> & {
 *   internalValueRef: import('vue').Ref<boolean>
 * }} AppCheckboxContextParams
 */

/**
 * @typedef {Omit<AppCheckboxContextParams, FactoryOmittedKeys>} AppCheckboxContextFactoryParams
 */

/**
 * @typedef {'update:modelValue'} FactoryOmittedKeys
 */

/**
 * @typedef {{
 *   modelValue: boolean
 *   indeterminate: boolean
 *   disabled: boolean
 *   label: string
 * }} AppCheckboxContextProps
 */
