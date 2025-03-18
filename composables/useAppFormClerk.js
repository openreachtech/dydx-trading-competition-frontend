import {
  useFormClerk,
} from '@openreachtech/furo-nuxt'

/**
 * Use form clerk.
 * Receive <form> clerk class and invoke request function.
 *
 * @param {{
 *   FormElementClerk: typeof import('@openreachtech/furo').BaseFormElementClerk<*, *, *>
 *   invokeRequestWithFormValueHash?: (args: {
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
 *   extractFormValueHash: (params: {
 *     formElement: HTMLFormElement
 *   }) => furo.FormValueHashType
 *   validateFormValueHash: (params: {
 *     formElement: HTMLFormElement
 *   }) => import('vue').Ref<furo.ValidatorHashType>
 * }}
 */
export default function useAppFormClerk ({
  FormElementClerk,
  invokeRequestWithFormValueHash = async () => {},
}) {
  const clerk = useFormClerk({
    FormElementClerk,
    invokeRequestWithFormValueHash,
  })

  return {
    validationRef: clerk.validationRef,
    submitForm: clerk.submitForm,
    extractFormValueHash,
    validateFormValueHash,
  }

  /**
   * Extract form value hash.
   *
   * @param {{
   *   formElement: HTMLFormElement
   * }} params - Parameters.
   * @returns {furo.FormValueHashType} Form value hash.
   */
  function extractFormValueHash ({
    formElement,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    return formElementClerk.extractValueHash()
  }

  /**
   * Validate form value hash.
   *
   * @param {{
   *   formElement: HTMLFormElement
   * }} params - Parameters.
   * @returns {import('vue').Ref<furo.ValidatorHashType>}
   */
  function validateFormValueHash ({
    formElement,
  }) {
    const formElementClerk = FormElementClerk.create({
      formElement,
    })

    clerk.validationRef.value = formElementClerk.generateValidationHash()

    return clerk.validationRef
  }
}
