import BaseAppGraphqlPayload from '~/app/graphql/client/BaseAppGraphqlPayload'

import useWalletStore from '~/stores/wallet'

/**
 * Company sponsors query graphql launcher.
 *
 * @template {furo.GraphqlRequestVariables} SV - Type of variables for schema.
 * @extends {BaseAppGraphqlPayload<SV>}
 */
export default class BaseAppSignatureGraphqlPayload extends BaseAppGraphqlPayload {
  /**
   * Extract filtered variables.
   *
   * @override
   * @returns {SV} Filtered variables
   */
  extractFilteredVariables () {
    const walletStore = useWalletStore()
    const {
      signature,
    } = walletStore.walletStoreRef.value.credential

    if (!signature) {
      return this.variables
    }

    return /** @type {*} */ ({
      ...this.variables,
      input: {
        ...this.variables.input,
        signature,
      },
    })
  }
}
