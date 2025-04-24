import type {
  Window as KeplrWindow
} from '@keplr-wallet/types'

declare global {
  interface Window extends KeplrWindow {
    // TODO: Find type for phantom. Might need a library.
    phantom?: any;

    // For Google Tag. Don't know the exact type.
    dataLayer?: Array<any>
  }
}

// Needs either an import or export to be considered a module.
export {}
