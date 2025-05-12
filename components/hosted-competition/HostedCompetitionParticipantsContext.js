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
   * Constructor
   *
   * @param {HostedCompetitionParticipantsContextParams} params - Parameters of this constructor.
   */
  constructor ({
    props,
    componentContext,

    route,
    router,
    selectedParticipantRef,
  }) {
    super({
      props,
      componentContext,
    })

    this.route = route
    this.router = router
    this.selectedParticipantRef = selectedParticipantRef
  }

  /**
   * Factory method to create a new instance of this class.
   *
   * @template {X extends typeof HostedCompetitionParticipantsContext ? X : never} T, X
   * @override
   * @param {HostedCompetitionParticipantsContextFactoryParams} params - Parameters of this factory method.
   * @returns {InstanceType<T>} An instance of this class.
   * @this {T}
   */
  static create ({
    props,
    componentContext,
    route,
    router,
    selectedParticipantRef,
  }) {
    return /** @type {InstanceType<T>} */ (
      new this({
        props,
        componentContext,
        route,
        router,
        selectedParticipantRef,
      })
    )
  }

  /** @override */
  static get EMIT_EVENT_NAME () {
    return {
      BULK_UPDATE_PARTICIPANT_STATUS: 'bulkUpdateParticipantStatus',
    }
  }

  /**
   * get: participants
   *
   * @returns {PropsType['participants']}
   */
  get participants () {
    return this.props.participants
  }

  /**
   * get: pagination
   *
   * @returns {PropsType['pagination']}
   */
  get pagination () {
    return this.props.pagination
  }

  /**
   * get: isBulkUpdatingParticipantStatus
   *
   * @returns {PropsType['isBulkUpdatingParticipantStatus']}
   */
  get isBulkUpdatingParticipantStatus () {
    return this.props.isBulkUpdatingParticipantStatus
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
   * Emit `bulkUpdateParticipantStatus`.
   *
   * @param {{
   *   statusId: string
   * }} params - Parameters.
   * @returns {void}
   */
  emitBulkUpdateParticipantStatus ({
    statusId,
  }) {
    const normalizedStatusId = Number(statusId)

    this.emit(
      this.EMIT_EVENT_NAME.BULK_UPDATE_PARTICIPANT_STATUS,
      {
        competitionParticipantIds: this.extractSelectedParticipantIds(),
        statusId: normalizedStatusId,
      }
    )
  }

  /**
   * Extract selected participant ids.
   *
   * @returns {Array<number>}
   */
  extractSelectedParticipantIds () {
    return Object.keys(this.selectedParticipant)
      .filter(id => this.selectedParticipant[id])
      .map(id => Number(id))
  }

  /**
   * Generate participants table entries.
   *
   * @returns {Array<TableBodyEntry>}
   */
  generateParticipantsTableEntries () {
    return this.participants.map(
      participant => ({
        competitionParticipantId: participant.competitionParticipantId,
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
   * get: selectedParticipants
   *
   * @returns {Record<string, boolean>}
   */
  get selectedParticipant () {
    return this.selectedParticipantRef.value
  }

  /**
   * Check if one or more participants have been selected.
   *
   * @returns {boolean}
   */
  hasSelectedParticipants () {
    return Object.values(this.selectedParticipant)
      .some(it => it)
  }

  /**
   * Get is all participants selected.
   *
   * @returns {boolean} Is all participants selected.
   */
  hasSelectedAllParticipants () {
    if (this.hasIndeterminatelySelectedParticipants()) {
      return true
    }

    const selectedParticipantValues = Object.values(this.selectedParticipant)

    return selectedParticipantValues.length !== 0
      && selectedParticipantValues.every(it => it)
  }

  /**
   * Get is indeterminate select all participants.
   *
   * @returns {boolean} Is indeterminate select all participants.
   */
  hasIndeterminatelySelectedParticipants () {
    const selectedParticipantValues = Object.values(this.selectedParticipant)

    if (
      selectedParticipantValues.length === 0
      || selectedParticipantValues.every(it => it === false)
    ) {
      return false
    }

    if (
      selectedParticipantValues.length < this.participants.length
      && selectedParticipantValues.every(it => it)
    ) {
      return true
    }

    return selectedParticipantValues.some(it => it === false)
  }

  /**
   * Toggle select state of all participants.
   *
   * @returns {void}
   */
  toggleSelectAllParticipants () {
    if (this.hasSelectedAllParticipants()) {
      this.deselectAllParticipants()

      return
    }

    this.selectAllParticipants()
  }

  /**
   * Select all participants.
   */
  selectAllParticipants () {
    /** @type {Record<string, boolean>} */
    const result = {}

    this.participants.forEach(participant => {
      result[participant.competitionParticipantId] = true
    })

    this.selectedParticipantRef.value = result
  }

  /**
   * Deselect all participants.
   */
  deselectAllParticipants () {
    this.selectedParticipantRef.value = {}
  }

  /**
   * Check if a participant is selected.
   *
   * @param {{
   *   participantId: string | number
   * }} params - Parameters.
   * @returns {boolean} Is participant selected.
   */
  isParticipantSelected ({
    participantId,
  }) {
    return this.selectedParticipant[participantId]
  }

  /**
   * Select participant.
   *
   * @param {{
   *   participantId: string | number
   * }} params - Parameters.
   */
  toggleParticipant ({
    participantId,
  }) {
    this.selectedParticipantRef.value[participantId] = !this.selectedParticipant[participantId]
  }

  /**
   * Update statusId query.
   *
   * @param {{
   *   statusId: string
   * }} params - Parameters.
   * @returns {Promise<void>}
   */
  async updateStatusIdQuery ({
    statusId,
  }) {
    const replacementQuery = this.buildReplacementQuery({
      name: 'statusId',
      value: statusId,
    })

    await this.router.replace({
      query: replacementQuery,
    })
  }

  /**
   * Build replacement query.
   *
   * @param {{
   *   name: string
   *   value: string | number
   * }} params - Parameters.
   * @returns {import('vue-router').LocationQuery}
   */
  buildReplacementQuery ({
    name,
    value,
  }) {
    const {
      [name]: _,
      ...restQuery
    } = this.route.query

    return value
      ? {
        ...restQuery,
        [name]: String(value),
      }
      : restQuery
  }

  /**
   * Extract statusId from route.
   *
   * @returns {string}.
   */
  extractStatusIdFromRoute () {
    const competitionIdParam = Array.isArray(this.route.params.competitionId)
      ? this.route.params.competitionId[0]
      : this.route.params.competitionId

    return competitionIdParam
      ?? ''
  }

  /**
   * Generate full participant status select options.
   *
   * @returns {Array<import('~/components/units/AppSelectContext').SelectOption>}
   */
  generateParticipantStatusFullSelectOptions () {
    const participantStatusSelectOptions = this.generateParticipantStatusSelectOptions()

    return [
      {
        label: 'All status',
        value: '',
      },
      ...participantStatusSelectOptions,
    ]
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
 * @typedef {import('@openreachtech/furo-nuxt/lib/contexts/BaseFuroContext').BaseFuroContextParams<PropsType> & {
 *   route: ReturnType<import('vue-router').useRoute>
 *   router: ReturnType<import('vue-router').useRouter>
 *   selectedParticipantRef: import('vue').Ref<Record<string, boolean>>
 * }} HostedCompetitionParticipantsContextParams
 */

/**
 * @typedef {HostedCompetitionParticipantsContextParams} HostedCompetitionParticipantsContextFactoryParams
 */

/**
 * @typedef {{
 *   participants: Array<import('~/app/graphql/client/queries/competitionParticipants/CompetitionParticipantsQueryGraphqlCapsule').Participant>
 *   pagination: Pagination
 *   isBulkUpdatingParticipantStatus: boolean
 * }} PropsType
 */

/**
 * @typedef {{
 *   competitionParticipantId: number
 *   name: string
 *   address: string
 *   equity: number
 *   status: number
 * }} TableBodyEntry
 */

/**
 * @typedef {{
 *   limit: number
 *   totalRecords: number
 * }} Pagination
 */
