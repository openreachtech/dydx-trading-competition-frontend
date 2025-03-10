import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

/**
 * LandingPageContext
 *
 * @extends {BaseFuroContext<null>}
 */
export default class LandingPageContext extends BaseFuroContext {
  /**
   * get: purposes
   *
   * @returns {Array<Purpose>}
   */
  get purposes () {
    return [
      {
        title: 'Open Creation',
        description: 'Anyone can create their own trading competitions, fostering a democratized environment for skill demonstration. This openness allows communities to develop their own challenges and reward structures.',
      },
      {
        title: 'Full Transparency',
        description: 'Hourly PnL tracking on the decentralized perpetual exchange (dYdX) ensures all results are verifiable and trustworthy. Unlike centralized exchanges, DEXs make trading activity publicly visible on-chain.',
      },
      {
        title: 'Learning Opportunity',
        description: 'Study strategies from genuine top-performing traders with access to their actual positions, timing, and lot sizes. This creates unique opportunities to find role models and learn from verifiably successful strategies.',
      },
      {
        title: 'Authenticity',
        description: "Create a space where trading performance can be verified with blockchain-based evidence rather than relying on unverifiable claims. Competition records are permanently stored as part of a trader's on-chain persona.",
      },
      {
        title: 'Skill Verification',
        description: 'True trading talent should be demonstrated on a DEX with verifiable results. As on-chain identity becomes increasingly important, competition achievements serve as valuable credentials in the crypto space.',
      },
      {
        title: 'Community Building',
        description: 'The shared experience of competing, analyzing results, and discussing strategies fosters a stronger, more knowledgeable trading ecosystem where participants can grow together.',
      },
    ]
  }
}

/**
 * @typedef {{
 *   title: string
 *   description: string
 * }} Purpose
 */
