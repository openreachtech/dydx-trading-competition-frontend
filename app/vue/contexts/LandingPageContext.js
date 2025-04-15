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
        description: 'Users can create their own trading arenas, fostering a democratized environment for skill demonstration. This openness allows communities to develop their own challenges and reward structures.',
      },
      {
        title: 'Full Transparency',
        description: 'Hourly PnL tracking on dYdX ensures all results are verifiable and trustworthy. Unlike centralized exchanges, trading activities on decentralized exchanges are on-chain and publicly visible.',
      },
      {
        title: 'Learning Opportunity',
        description: 'Study strategies from genuine top-performing traders with access to their actual positions, timing, and lot sizes. This creates unique opportunities to find role models and learn from proven, successful strategies.',
      },
      {
        title: 'Authenticity',
        description: "Create a space where trading performance can be verified with blockchain-based system rather than relying on unverifiable claims. Competition records are permanently stored as part of a trader's on-chain persona.",
      },
      {
        title: 'Skill Verification',
        description: 'True trading talent should be demonstrated on a decentralized exchange with verifiable results. As on-chain identity becomes increasingly important, competition achievements serve as valuable credentials in the crypto space.',
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
        description: 'Perpetual swap trading has a steep learning curve, and decentralized exchanges often have additional technical barriers to entry. Our competitions create an approachable environment for newcomers.',
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

  /**
   * get: lifecycle
   *
   * @returns {Lifecycle}
   */
  get lifecycle () {
    return [
      {
        phaseName: 'Before Competition',
        timeline: [
          {
            actor: 'host',
            title: 'Competition Creation',
            description: 'The host initiates a new competition by filling in required details and signing through wallet integration.',
            characteristics: [
              'Define competition title and description',
              'Set minimum deposit requirement',
              'Establish total prize pool and distribution rules',
              'Configure participant limits and timeline',
              'Connect wallet and sign creation transaction',
            ],
          },
          {
            actor: 'trader',
            title: 'Registration & Deposit',
            description: 'Traders can register to participate by connecting their wallets so long as they meet the deposit requirements.',
            characteristics: [
              'Find active competition(s) to join',
              'Link dYdX wallet address to register',
              'Choose display name for leaderboard',
              'Ensure account meets minimum deposit requirements',
              'Sign registration transaction',
            ],
          },
          {
            actor: 'system',
            title: 'Registration Period Ends',
            description: 'The system finalizes the list of participants based on registration and deposit criteria.',
            characteristics: [
              'Close registration at scheduled time',
              'Verify all participants meet minimum deposit',
              "Disqualify traders who don't meet criteria",
              'Finalize list of eligible participants',
              'Prepare for competition start',
            ],
          },
          {
            actor: 'system',
            title: 'Initial PnL Capture',
            description: 'The system records starting points for all qualified traders to establish baseline metrics.',
            characteristics: [
              'Take snapshot of initial account equity',
              'Record baseline balances',
              'Establish starting point for ROI calculations',
            ],
          },
        ],
      },
      {
        phaseName: 'During Competition',
        timeline: [
          {
            actor: 'trader',
            title: 'Active Trading',
            description: 'Traders begin taking positions and executing their strategies on dYdX.',
            characteristics: [
              'Enter positions based on market analysis',
              'Manage risk through position sizing',
              'Make additional deposits as part of strategy',
              'Adjust strategies as market conditions change',
              'Monitor performance relative to competitors',
            ],
          },
          {
            actor: 'system',
            title: 'Hourly PnL Updates',
            description: 'The system continuously tracks performance and updates the leaderboard on an hourly basis.',
            characteristics: [
              'Calculate current PnL and ROI metrics',
              'Update leaderboard rankings',
              'Process data for all active participants',
              'Provide transparent performance tracking',
            ],
          },
          {
            actor: 'system',
            title: 'Capital Flow Monitoring',
            description: 'The system tracks additional deposits and withdrawals to ensure fair competition calculations.',
            characteristics: [
              'Monitor account balance changes',
              'Record all deposits throughout competition',
              'Track withdrawals throughout competition',
              'Adjust baseline calculations accordingly',
              'Ensure accurate ROI measurements',
            ],
          },
        ],
      },
      {
        phaseName: 'After Competition',
        timeline: [
          {
            actor: 'system',
            title: 'Final PnL Snapshot',
            description: 'At the competition end time, the system captures the final performance metrics for all participants.',
            characteristics: [
              'Take final equity snapshot at exact end time',
              'Record final positions and account value',
              'Calculate final PnL for each participant',
              'Determine final ROI for each trader',
              'Lock in competition results',
            ],
          },
          {
            actor: 'system',
            title: 'Results & Prize Calculation',
            description: 'The system processes final rankings and calculates prize allocations based on predefined rules.',
            characteristics: [
              'Sort participants by final ROI',
              'Apply prize distribution rules',
              'Calculate exact prize amount for each winner',
              'Generate final competition standings',
              'Display comprehensive results',
            ],
          },
          {
            actor: 'host',
            title: 'Prize Verification & Export',
            description: 'The host exports detailed competition results to verify prize allocations before distribution.',
            characteristics: [
              'Export comprehensive CSV of final results',
              'Verify accuracy of calculated prize amounts',
              'Confirm all winners meet competition criteria',
              'Prepare for prize distribution process',
            ],
          },
          {
            actor: 'host',
            title: 'Prize Distribution',
            description: 'The host distributes prizes to winners according to the final competition results.',
            characteristics: [
              'Process payments to winning traders',
              'Transfer exact prize amounts per CSV data',
              'Complete competition lifecycle',
            ],
          },
        ],
      },
    ]
  }

  /**
   * get: faqs
   *
   * @returns {Array<Faq>}
   */
  get faqs () {
    return [
      {
        question: 'How do I create my own competition?',
        answer: 'Users can create a competition by visiting the main page, entering the required details (title, description, prize pool, etc.), setting participation criteria, and signing with their wallet. <br /> <br /> However, to prevent spam attacks and impersonation, the platform will initially operate in a permissioned manner. If you are interested in hosting a competition, please contact <a href="https://x.com/dydxfoundation" target="_blank">dYdX Foundation (@dydxfoundation)</a> or <a href="https://x.com/clc_validator" target="_blank">Crypto Learning Club | dYdX Validator (@clc_validator)</a>.',
      },
      {
        question: 'How is my trading performance calculated?',
        answer: 'Performance is calculated using the following formulas: <br /> <b>Baseline</b> = Initial Equity + Total Deposits - Total Withdrawals <br /> <b>PnL</b> = Current Equity - Baseline <br /> <b>ROI</b> = PnL / Baseline <br /> The system takes hourly snapshots to update these metrics throughout the competition.',
      },
      {
        question: 'Is my private key safe when using this platform?',
        answer: 'The platform never retains your private keys, and signatures are used solely for address verification. When generating a dYdX address using MetaMask or Phantom, the signed message functions as the private key; however, our site does not store it in any capacity. Users bear full responsibility for managing their own keys. If you have concerns, we recommend creating a new address specifically for competition participation before joining.',
      },
      {
        question: 'Can I join multiple competitions at once?',
        answer: 'No, you cannot participate in multiple competitions simultaneously. However, you may generate a separate address and meet the minimum deposit requirement separately to participate in another competition.',
      },
      {
        question: 'What happens if I withdraw funds during a competition?',
        answer: 'Withdrawals during a competition are tracked and factored into your performance calculations.',
      },
      {
        question: "I've run out of funds during the competition. Can I make an additional deposit?",
        answer: 'Yes, depositing additional funds during the competition is allowed. However, please note that additional deposits will increase your baseline, which may negatively impact your ROI. Traders can adopt an aggressive strategy that takes additional deposits into account.',
      },
      {
        question: 'How do multiple accounts get prevented?',
        answer: 'Currently, as this is a proof-of-concept, there are limited protections against multiple accounts. In future versions, we plan to implement on-chain identity verification to prevent the use of multiple accounts in the same competition.',
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

/**
 * @typedef {{
 *   question: string
 *   answer: string
 * }} Faq
 */

/**
 * @typedef {Array<{
 *   phaseName: string
 *   timeline: Array<{
 *     actor: 'host' | 'trader' | 'system'
 *     title: string
 *     description: string
 *     characteristics: Array<string>
 *   }>
 * }>} Lifecycle
 */
