import {
  ref,
} from 'vue'

/**
 * Use form clerk.
 * Receive <form> clerk class and invoke request function.
 *
 * @param {{
 *   FormElementClerk: typeof import('@openreachtech/furo').BaseFormElementClerk<*, *, *>
 *   invokeRequestWithFormValueHash: (args: {
 *     valueHash: furo.FormValueHashType
 *     options?: RequestInit
 *     hooks?: furo.GraphqlLauncherHooks
 *   }) => Promise<void>
 * }} params - Parameters.
 * @returns {{
 *   validationRef: import('vue').Ref<furo.ValidatorHashType>
 *   submitForm: (params: {
 *     formElement: HTMLFormElement
 *     hooks?: furo.GraphqlLauncherHooks
 *     options?: RequestInit
 *   }) => Promise<boolean>
 *   validateForm: (params: {
 *     formElement: HTMLFormElement
 *   }) => boolean
 * }}
 */
export default function useAppFormClerk ({
  FormElementClerk,
  invokeRequestWithFormValueHash,
}) {
  /**
   * @type {import('vue').Ref<furo.ValidatorHashType>}
   */
  const validationRef = ref({
    valid: {},
    invalid: {},
    messages: {},
    message: {},
  })

  return {
    validationRef,
    submitForm,
    validateForm,
  }

  /**
   * Submit form.
   *
   * @param {{
   *   formElement: HTMLFormElement
   *   hooks?: furo.GraphqlLauncherHooks
   *   options?: RequestInit
   * }} params - Parameters.
   * @returns {Promise<boolean>} true: Invoke request.
   */
  async function submitForm ({
    formElement,
    hooks,
    options,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    validationRef.value = formElementClerk.generateValidationHash()

    // Skip #launchRequest(), if invalid value hash of <form>.
    if (formElementClerk.isInvalid()) {
      return false
    }

    const valueHash = formElementClerk.extractValueHash()

    await invokeRequestWithFormValueHash({
      valueHash,
      hooks,
      options,
    })

    return true
  }

  /**
   * Validate form.
   *
   * @param {{
   *   formElement: HTMLFormElement
   * }} args - Arguments.
   * @returns {boolean}
   */
  function validateForm ({
    formElement,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    validationRef.value = formElementClerk.generateValidationHash()

    if (formElementClerk.isInvalid()) {
      return false
    }

    return true
  }
}
