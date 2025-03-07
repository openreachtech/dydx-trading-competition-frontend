declare global {
  interface Window {
    // TODO: Find type for phantom. Might need a library.
    phantom?: any;
  }
}

// Needs either an import or export to be considered a module.
export {}
