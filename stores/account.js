import {
  computed,
} from 'vue'

import {
  useState,
} from '#imports'

import {
  StorageClerk,
} from '@openreachtech/furo'

import {
  ONBOARDING_STATE,
  ENVIRONMENT_CONFIG_HASH,
  STORAGE_KEY,
} from '~/app/constants'
import {
  AVAILABLE_ENVIRONMENTS,
} from '~/app/import.meta.constants'

/**
 * Use accountStore.
 *
 * @returns {AccountStore}
 */
export default function useAccountStore () {
  const localStorageClerk = StorageClerk.createAsLocal()

  /** @type {import('vue').Ref<AccountState>} */
  const accountStateRef = useState('network', () => ({
    selectedNetwork: /** @type {AccountState['selectedNetwork']} */ (
      localStorageClerk.get('selectedNetwork')
      ?? AVAILABLE_ENVIRONMENTS.default
    ),
    onboardingState: ONBOARDING_STATE.DISCONNECTED,
  }))

  const selectedDydxChainIdComputed = computed(
    () => ENVIRONMENT_CONFIG_HASH[accountStateRef.value.selectedNetwork].dydxChainId
  )

  return {
    accountStateRef,

    // Getters
    selectedDydxChainIdComputed,

    // Actions
    setSelectedNetwork,
    setOnboardingState,
  }

  /**
   * Set `selectedNetwork` in account store.
   *
   * @param {{
   *   selectedNetwork: AccountState['selectedNetwork']
   * }} params - Parameters.
   * @returns {void}
   */
  function setSelectedNetwork ({
    selectedNetwork,
  }) {
    accountStateRef.value.selectedNetwork = selectedNetwork

    localStorageClerk.set(STORAGE_KEY.SELECTED_NETWORK, selectedNetwork)
  }

  /**
   * Set `onboardingState` in account store.
   *
   * @param {{
   *   onboardingState: AccountState['onboardingState']
   * }} params - Parameters.
   * @returns {void}
   */
  function setOnboardingState ({
    onboardingState,
  }) {
    accountStateRef.value.onboardingState = onboardingState
  }
}

/**
 * @typedef {{
 *   accountStateRef: import('vue').Ref<AccountState>
 *   selectedDydxChainIdComputed: import('vue').ComputedRef<string>
 *   setSelectedNetwork: (params: {
 *     selectedNetwork: AccountState['selectedNetwork']
 *   }) => void
 *   setOnboardingState: (params: {
 *     onboardingState: AccountState['onboardingState']
 *   }) => void
 * }} AccountStore
 */

/**
 * @typedef {{
 *   selectedNetwork: keyof typeof ENVIRONMENT_CONFIG_HASH
 *   onboardingState: (typeof ONBOARDING_STATE)[keyof typeof ONBOARDING_STATE]
 * }} AccountState
 */
