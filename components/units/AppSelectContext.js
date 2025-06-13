import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * Props context class for AppSelect component.
 *
 * @extends {BaseFuroContext<null, AppSelectContextProps, null>} - Base class <Accessor, Props, Emit>
 */
export default class AppSelectContext extends BaseFuroContext {
  /**
   * Constructor.
   *
   * @param {AppSelectContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,
    statusReactive,
    containerElementShallowRef,
    selectedValueRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.statusReactive = statusReactive
    this.containerElementShallowRef = containerElementShallowRef
    this.selectedValueRef = selectedValueRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof AppSelectContext ? X : never} T, X
   * @override
   * @param {AppSelectContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} - An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    statusReactive,
    containerElementShallowRef,
    selectedValueRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        statusReactive,
        containerElementShallowRef,
        selectedValueRef,
      })
    )
  }

  /**
   * get: EMIT_EVENT_NAME
   *
   * @override
   * @returns {Record<string, string>} Name for event to select item.
   */
  static get EMIT_EVENT_NAME () {
    return {
      UPDATE_MODEL_VALUE: 'update:modelValue',
    }
  }

  /**
   * get: items
   *
   * @returns {Array<SelectOption>} Items.
   */
  get items () {
    return this.props.items ?? []
  }

  /**
   * get: isDisabled
   *
   * @returns {boolean} `true` if is disabled.
   */
  get isDisabled () {
    return this.props.isDisabled
  }

  /**
   * get: isOpenSelect
   *
   * @returns {boolean} `true` if is open select.
   */
  get isOpenSelect () {
    return this.statusReactive.isOpenSelect
  }

  /**
   * get: placeholder
   *
   * @returns {string} Placeholder.
   */
  get placeholder () {
    return this.props.placeholder
  }

  /**
   * get: modelValue
   *
   * @returns {string} Model value.
   */
  get modelValue () {
    return this.props.modelValue
  }

  /**
   * get: isLoading
   *
   * @returns {boolean} `true` if is loading.
   */
  get isLoading () {
    return this.props.isLoading
  }

  /**
   * get: position
   *
   * @returns {AppSelectContextProps['position']}
   */
  get position () {
    return this.props.position
  }

  /**
   * get: containerElement
   *
   * @returns {HTMLDivElement | null}
   */
  get containerElement () {
    return this.containerElementShallowRef.value
  }

  /**
   * Setup component.
   *
   * @template {X extends AppSelectContext ? X : never} T, X
   * @override
   * @this {T}
   */
  setupComponent () {
    this.watch(
      () => this.modelValue,
      newValue => {
        if (newValue !== this.selectedValueRef.value) {
          this.selectedValueRef.value = newValue
        }
      },
      {
        immediate: true,
      }
    )

    return this
  }

  /**
   * Generate style for dropdown.
   *
   * @returns {import('vue').HTMLAttributes['style']}
   */
  generateDropdownStyle () {
    if (this.containerElement === null) {
      return {}
    }

    const containerRect = this.containerElement.getBoundingClientRect()

    const topOffset = containerRect.bottom + window.scrollY
    const insetInline = this.generateInsetInline()

    return {
      insetBlockStart: `${(topOffset / 16) + 0.25}rem`,
      ...insetInline,
    }
  }

  /**
   * Generate `insetInline`.
   *
   * @returns {Record<string, string>}
   */
  generateInsetInline () {
    if (this.containerElement === null) {
      return {
        insetInlineStart: '0',
      }
    }

    const containerRect = this.containerElement.getBoundingClientRect()

    const leftOffset = containerRect.left + window.scrollX
    if (this.position === 'left') {
      return {
        insetInlineStart: `${(leftOffset / 16)}rem`,
        insetInlineEnd: 'auto',
      }
    }

    const rightOffset = window.innerWidth - containerRect.right + window.scrollX

    return {
      insetInlineStart: 'auto',
      insetInlineEnd: `${(rightOffset / 16)}rem`,
    }
  }

  /**
   * Close select.
   */
  closeSelect () {
    this.statusReactive.isOpenSelect = false
  }

  /**
   * Open select.
   */
  openSelect () {
    this.statusReactive.isOpenSelect = true
  }

  /**
   * Toggle select.
   */
  toggleSelect () {
    this.statusReactive.isOpenSelect = !this.isOpenSelect
  }

  /**
   * Generate class for container.
   *
   * @returns {string} Class for container.
   */
  generateContainerClass () {
    return this.isOpenSelect
      ? 'opened'
      : 'closed'
  }

  /**
   * Generate class for item.
   *
   * @param {{
   *   selectedOption: SelectOption
   * }} params - Parameters of this method.
   * @returns {Array<string | Record<string, string | boolean>>} Class for item.
   */
  generateItemClass ({
    selectedOption,
  }) {
    const isSelected = selectedOption.value === this.modelValue

    return [
      {
        selected: isSelected,
        disabled: selectedOption.isDisabled ?? false,
      },
      selectedOption.class ?? '',
    ]
  }

  /**
   * Select item.
   *
   * @param {{
   *   selectedOption: SelectOption
   * }} params - Parameters of this method.
   */
  selectOption ({
    selectedOption,
  }) {
    this.statusReactive.isOpenSelect = false
    this.selectedValueRef.value = selectedOption.value

    this.emit(this.EMIT_EVENT_NAME.UPDATE_MODEL_VALUE, selectedOption.value)
  }

  /**
   * Generate label by value.
   *
   * @returns {string} Label.
   */
  generateSelectedLabel () {
    return this.items
      .find(it => it.value === this.selectedValueRef.value)?.label
      ?? ''
  }

  /**
   * Generate icon name by value.
   *
   * @returns {string} Icon name.
   */
  generateSelectedIconName () {
    return this.items
      .find(it => it.value === this.selectedValueRef.value)?.iconName
      ?? this.props?.iconName
      ?? ''
  }
}

/**
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext.js').BaseFuroContextParams & {
 *   props: AppSelectContextProps
 *   statusReactive: AppSelectStatusReactive
 *   containerElementShallowRef: import('vue').ShallowRef<HTMLDivElement | null>
 *   selectedValueRef: import('vue').Ref<string>
 * }} AppSelectContextParams
 */

/**
 * @typedef {AppSelectContextParams} AppSelectContextFactoryParams
 */

/**
 * @typedef {import('vue').Reactive<{
 *   isOpenSelect: boolean
 * }>} AppSelectStatusReactive
 */

/**
 * @typedef {{
 *   label: string
 *   value: string
 *   iconName?: string
 *   isDisabled?: boolean
 *   class?: string
 * }} SelectOption
 */

/**
 * @typedef {{
 *   modelValue: string
 *   items: Array<SelectOption>
 *   isDisabled: boolean
 *   placeholder: string
 *   isLoading: boolean
 *   iconName: string
 *   position: 'left' | 'right'
 * }} AppSelectContextProps
 */
