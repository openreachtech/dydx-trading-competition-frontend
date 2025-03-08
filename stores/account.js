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
  ONBOARDING_STATUS,
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
      localStorageClerk.get(STORAGE_KEY.SELECTED_NETWORK)
      ?? AVAILABLE_ENVIRONMENTS.default
    ),
    onboardingStatus: ONBOARDING_STATUS.DISCONNECTED,
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
    setOnboardingStatus,
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
   * Set `onboardingStatus` in account store.
   *
   * @param {{
   *   onboardingStatus: AccountState['onboardingStatus']
   * }} params - Parameters.
   * @returns {void}
   */
  function setOnboardingStatus ({
    onboardingStatus,
  }) {
    accountStateRef.value.onboardingStatus = onboardingStatus
  }
}

/**
 * @typedef {{
 *   accountStateRef: import('vue').Ref<AccountState>
 *   selectedDydxChainIdComputed: import('vue').ComputedRef<string>
 *   setSelectedNetwork: (params: {
 *     selectedNetwork: AccountState['selectedNetwork']
 *   }) => void
 *   setOnboardingStatus: (params: {
 *     onboardingStatus: AccountState['onboardingStatus']
 *   }) => void
 * }} AccountStore
 */

/**
 * @typedef {{
 *   selectedNetwork: keyof typeof ENVIRONMENT_CONFIG_HASH
 *   onboardingStatus: (typeof ONBOARDING_STATUS)[keyof typeof ONBOARDING_STATUS]
 * }} AccountState
 */
