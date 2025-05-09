import {
  BaseFuroContext,
} from '@openreachtech/furo-nuxt'

import {
  COMPETITION_PARTICIPANT_STATUS,
} from '~/app/constants'

/**
 * HostedCompetitionParticipantsContext
 *
 * @extends {BaseFuroContext<null, PropsType, null>}
 */
export default class HostedCompetitionParticipantsContext extends BaseFuroContext {
  /**
   * get: participants
   *
   * @returns {PropsType['participants']}
   */
  get participants () {
    return this.props.participants
  }

  /**
   * get: participantsHeaderEntries
   *
   * @returns {Array<import('~/app/vue/contexts/AppTableContext').HeaderEntry>}
   */
  get participantsTableHeaderEntries () {
    return [
      {
        key: 'checkbox',
        label: '',
      },
      {
        label: 'Name',
        key: 'name',
      },
      {
        label: 'Wallet Address',
        key: 'address',
      },
      {
        label: 'Equity',
        key: 'equity',
      },
      {
        label: 'Status',
        key: 'status',
        columnOptions: {
          textAlign: 'end',
        },
      },
    ]
  }

  /**
   * Generate participants table entries.
   *
   * @returns {Array<TableBodyEntry>}
   */
  generateParticipantsTableEntries () {
    return this.participants.map(
      participant => ({
        name: participant.address.name,
        address: participant.address.address,
        equity: participant.equity,
        status: participant.status.statusId,
      })
    )
  }

  /**
   * Generate displayed participant address.
   *
   * @param {{
   *   address: string | null
   * }} params - Parameters.
   * @returns {string}
   */
  generateDisplayedParticipantAddress ({
    address,
  }) {
    if (address === null) {
      return '----'
    }

    return this.shortenAddress({
      address,
    })
  }

  /**
   * Shorten wallet address.
   *
   * @param {{
   *   address: string
   * }} params - Parameters
   * @returns {string} Shortened address.
   */
  shortenAddress ({
    address,
  }) {
    if (address.length <= 12) {
      return address
    }

    const firstSevenCharacters = address.slice(0, 7)
    const lastFiveCharacters = address.slice(-5)

    return `${firstSevenCharacters}...${lastFiveCharacters}`
  }

  /**
   * Generate host address URL on Mintscan.
   *
   * @param {{
   *   address: string
   * }} params - Parameters.
   * @returns {string}
   */
  generateParticipantMintscanUrl ({
    address,
  }) {
    return `https://www.mintscan.io/dydx/address/${address}`
  }

  /**
   * Generate participant status select options.
   *
   * @returns {Array<import('~/components/units/AppSelectContext').SelectOption>}
   */
  generateParticipantStatusSelectOptions () {
    const classHash = {
      [COMPETITION_PARTICIPANT_STATUS.ACTIVE.ID]: 'text-success',
      [COMPETITION_PARTICIPANT_STATUS.DISQUALIFIED.ID]: 'text-error',
    }

    return Object.values(COMPETITION_PARTICIPANT_STATUS)
      .map(status => ({
        label: status.NAME,
        value: String(status.ID),
        class: classHash[status.ID],
      }))
  }

  /**
   * Generate participant status name.
   *
   * @param {{
   *   statusId: number
   * }} params - Parameters.
   * @returns {string} Participant status name.
   */
  generateParticipantStatusName ({
    statusId,
  }) {
    return Object.values(COMPETITION_PARTICIPANT_STATUS)
      .find(it => it.ID === statusId)
      ?.NAME
      ?? ''
  }
}

/**
 * @typedef {{
 *   participants: Array<import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').Participant>
 * }} PropsType
 */

/**
 * @typedef {{
 *   name: string
 *   address: string
 *   equity: number
 *   status: number
 * }} TableBodyEntry
 */
