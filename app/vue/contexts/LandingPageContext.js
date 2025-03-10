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

  /**
   * get: audience
   *
   * @returns {Array<Audience>}
   */
  get audience () {
    return [
      {
        title: 'Beginners',
        subtitle: 'Breaking down entry barriers',
        description: 'Perpetual swap trading has a steep learning curve, and DEX platforms often have additional technical barriers to entry. Our competitions create an approachable environment for newcomers.',
        characteristics: [
          'Fun, gamified elements that make complex trading more approachable',
          'Community-hosted competitions create welcoming entry points',
          'Clear metrics help understand what success looks like',
          'Structured environment to learn about perpetual trading',
        ],
      },
      {
        title: 'Intermediate Traders',
        subtitle: 'Refining your edge',
        description: "Access to successful traders' entry points and position sizing offers valuable insights for improving personal trading strategies and risk management.",
        characteristics: [
          "Learn from winning traders' entry points and position sizing",
          'Compare results against peers at similar experience levels',
          'Observe risk management tactics during volatile conditions',
          'Build connections with other serious traders',
        ],
      },
      {
        title: 'KOLs',
        subtitle: 'Fostering an engaged trader community',
        description: 'Platform for demonstrating expertise while elevating the trading knowledge within communities through verifiable performance.',
        characteristics: [
          'Share knowledge and elevate community understanding',
          'Build credibility through blockchain-verified performance',
          'Host specialized competitions for your followers',
          'Discover promising talent for potential collaborations',
        ],
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

/**
 * @typedef {{
 *   title: string
 *   subtitle: string
 *   description: string
 *   characteristics: Array<string>
 * }} Audience
 */
