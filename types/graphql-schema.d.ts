export {}

declare global {
  namespace schema.graphql {
    // Scalar types
    type DateTime = string
    type Upload = File

    // Common Types
    interface Pagination {
      totalCount: number
      limit: number
      offset: number
    }

    interface Status {
      statusId: number
      name: string
      description: string
    }

    interface StatusPhase {
      statusId: number
      name: string
      phasedAt: DateTime
    }

    interface AddressSummary {
      address: string
      name: string
    }

    interface SortOption {
      targetColumn: string
      orderBy: string
    }

    interface AddressCsvLine {
      address: string
      lineNumber: number
    }

    interface ParticipantEquity {
      competitionParticipantId: number
      equity: string
    }

    // Competition Types
    interface CompetitionSummary {
      competitionId: number
      title: string
      description: string
      participantUpperLimit: number
      participantLowerLimit: number
      host: AddressSummary
      totalPrize: string
      minimumDeposit: string
      minimumTradingVolume: string
      imageUrl?: string
      schedules: Array<CompetitionSchedule>
      status: StatusPhase
    }

    interface Competition {
      competitionId: number
      title: string
      description: string
      participantUpperLimit: number
      participantLowerLimit: number
      host: AddressSummary
      totalPrize: string
      minimumDeposit: string
      minimumTradingVolume: string
      imageUrl?: string
      schedules: Array<CompetitionSchedule>
      status: StatusPhase
      prizeRules: Array<CompetitionPrizeRule>
      outcomeCsvUrl?: string
      defaultLeaderboardSortOption: SortOption
    }

    interface CompetitionSchedule {
      category: ScheduleCategory
      scheduledDatetime: DateTime
    }

    interface ScheduleCategory {
      categoryId: number
      name: string
      description: string
    }

    interface CompetitionPrizeRule {
      rankFrom: number
      rankTo: number
      amount: string
    }

    interface CompetitionRanking {
      address: AddressSummary
      performanceBaseline: number
      ranking: number
      roi: number
      pnl: number
      calculatedAt: DateTime
      totalVolume: number
    }

    interface CompetitionParticipant {
      competitionParticipantId: number
      address: AddressSummary
      status: StatusPhase
      equity: number
    }

    interface CompetitionFinalOutcome {
      address: AddressSummary
      ranking: number
      performanceBaseline: number
      prizeUsdAmount: string
      pnl: number
      roi: number
    }

    interface CompetitionTradingMetric {
      address: AddressSummary
      makerFees: number
      takerFees: number
      totalFees: number
      makeVolume: number
      takerVolume: number
      totalVolume: number
      calculatedAt: DateTime
    }

    interface TransferCategory {
      categoryId: number
      name: string
      description: string
    }

    interface CompetitionTransfer {
      blockHeight: number
      blockTime: DateTime
      category: TransferCategory
      amount: string
      senderAddress: string
      recipientAddress: string
      transactionHash: string
    }

    interface AddressPastCompetition {
      competition: CompetitionSummary
      rank: number
      prize: string
      performanceBaseline: number
      roi?: number
      pnl?: number
    }

    // Result Types
    interface CompetitionsResult {
      competitions: Array<CompetitionSummary>
      pagination: Pagination
    }

    interface CompetitionResult {
      competition: Competition
    }

    interface CompetitionStatisticsResult {
      totalHostedCompetitionsNumber: number
      totalEnrolledCompetitionParticipantsNumber: number
      totalPaidOutPrizesUsdAmount: string
    }

    interface CompetitionLeaderboardResult {
      myRanking?: CompetitionRanking
      rankings: Array<CompetitionRanking>
      pagination: Pagination
    }

    interface CompetitionParticipantsResult {
      myParticipation?: CompetitionParticipant
      participants: Array<CompetitionParticipant>
      pagination: Pagination
    }

    interface CompetitionParticipantResult {
      participant?: CompetitionParticipant
    }

    interface CompetitionFinalOutcomeResult {
      myOutcome?: CompetitionFinalOutcome
      outcomes: Array<CompetitionFinalOutcome>
      pagination: Pagination
    }

    interface CompetitionStatusesResult {
      statuses: Array<Status>
    }

    interface CompetitionParticipantStatusesResult {
      statuses: Array<Status>
    }

    interface CompetitionEnrolledParticipantsNumberResult {
      enrolledParticipantsNumber: number
    }

    interface CompetitionTradingMetricsResult {
      myMetric?: CompetitionTradingMetric
      metrics: Array<CompetitionTradingMetric>
      pagination: Pagination
    }

    interface AddressProfileResult {
      address: string
      name?: string
      addressImageUrl?: string
      xAccountUserName?: string
    }

    interface AddressCurrentCompetitionResult {
      competition?: CompetitionSummary
      ranking?: CompetitionRanking
      competitionParticipantStatus?: StatusPhase
    }

    interface AddressCurrentCompetitionTransfersResult {
      transfers: Array<CompetitionTransfer>
      pagination: Pagination
    }

    interface AddressPastCompetitionsResult {
      competitions: Array<AddressPastCompetition>
      pagination: Pagination
    }

    interface AddressNameResult {
      name?: string
    }

    interface ParticipantsCurrentEquitiesResult {
      equities: Array<ParticipantEquity>
    }

    interface SearchAddressesByNameResult {
      addresses: Array<AddressSummary>
      pagination: Pagination
    }

    interface SearchAddressesResult {
      addresses: Array<AddressSummary>
      pagination: Pagination
    }

    // Mutation Result Types
    interface AddCompetitionResult {
      competitionId: number
    }

    interface UpdateCompetitionResult {
      competitionId: number
    }

    interface UpdateCompetitionStatusResult {
      competitionId: number
    }

    interface UpdateCompetitionSchedulesResult {
      competitionId: number
    }

    interface UpdateCompetitionPrizeRulesResult {
      competitionId: number
    }

    interface UpdateCompetitionLimitsResult {
      competitionId: number
    }

    interface UpdateCompetitionOptionsResult {
      success: boolean
    }

    interface JoinCompetitionResult {
      competitionId: number
    }

    interface putAddressNameResult {
      addressId: number
    }

    interface UnregisterFromCompetitionResult {
      competitionId: number
    }

    interface BulkUpdateParticipantStatusResult {
      success: boolean
    }

    interface GenerateXaccountOauthUrlResult {
      url: string
    }

    interface RevokeXaccountOauthResult {
      success: boolean
      revokedTokens: Array<string>
    }

    interface UploadImageResult {
      imageId: number
      contentType: string
      image: string
      imageUrl: string
    }

    interface PutAddressImageResult {
      addressImageUrl: string
    }

    interface UploadCompetitionParticipantsCsvResult {
      success: boolean
      invalidFormatAddresses: Array<AddressCsvLine>
      alreadyJoinedAddresses: Array<AddressCsvLine>
    }

    // Input Types
    interface PaginationInput {
      limit: number
      offset: number
      sort?: SortInput
    }

    interface SortInput {
      targetColumn: string
      orderBy: string
    }

    interface SignatureInput {
      signDoc: string
      signature: string
      publicKey: string
      address: string
      signatureType: string
    }

    interface CompetitionsInput {
      title?: string
      statusId?: number
      hostAddress?: string
      pagination: PaginationInput
    }

    interface CompetitionInput {
      competitionId: number
    }

    interface CompetitionLeaderboardInput {
      competitionId: number
      address?: string
      pagination: PaginationInput
    }

    interface CompetitionParticipantsInput {
      competitionId: number
      statusId?: number
      address?: string
      pagination: PaginationInput
    }

    interface CompetitionParticipantInput {
      competitionId: number
      address: string
    }

    interface CompetitionFinalOutcomeInput {
      competitionId: number
      address?: string
      pagination: PaginationInput
    }

    interface CompetitionTradingMetricsInput {
      competitionId: number
      address?: string
      pagination: PaginationInput
    }

    interface CompetitionScheduleInput {
      categoryId: number
      scheduledDatetime: DateTime
    }

    interface LeaderboardSortOptionInput {
      targetColumn: string
      orderBy: string
    }

    interface AddCompetitionInput {
      title: string
      description: string
      minimumDeposit: string
      minimumTradingVolume: string
      totalPrize: string
      imageUrl?: string
      participantUpperLimit: number
      participantLowerLimit: number
      schedules: Array<CompetitionScheduleInput>
      prizeRules: Array<PrizeRuleInput>
      leaderboardSortOption: LeaderboardSortOptionInput
      signature: SignatureInput
    }

    interface UpdateCompetitionInput {
      competitionId: number
      title: string
      description: string
      imageUrl?: string
      signature: SignatureInput
    }

    interface UpdateCompetitionStatusInput {
      competitionId: number
      statusId: number
      signature: SignatureInput
    }

    interface UpdateCompetitionSchedulesInput {
      competitionId: number
      schedules: Array<CompetitionScheduleInput>
      signature: SignatureInput
    }

    interface UpdateCompetitionPrizeRulesInput {
      competitionId: number
      prizeRules: Array<PrizeRuleInput>
      signature: SignatureInput
    }

    interface UpdateCompetitionLimitsInput {
      competitionId: number
      participantUpperLimit: number
      participantLowerLimit: number
      minimumDeposit: string
      minimumTradingVolume: string
      signature: SignatureInput
    }

    interface UpdateCompetitionOptionsInput {
      competitionId: number
      defaultLeaderboardSortOption: LeaderboardSortOptionInput
      signature: SignatureInput
    }

    interface PrizeRuleInput {
      rankFrom: number
      rankTo: number
      amount: string
    }

    interface JoinCompetitionInput {
      competitionId: number
      name: string
      signature: SignatureInput
    }

    interface putAddressNameInput {
      name: string
      signature: SignatureInput
    }

    interface UnregisterFromCompetitionInput {
      competitionId: number
      signature: SignatureInput
    }

    interface BulkUpdateParticipantStatusInput {
      competitionParticipantIds: Array<number>
      statusId: number
      signature: SignatureInput
    }

    interface GenerateXaccountOauthUrlInput {
      signature: SignatureInput
    }

    interface RevokeXaccountOauthInput {
      signature: SignatureInput
    }

    interface UploadImageInput {
      file: Upload
    }

    interface PutAddressImageInput {
      file: Upload
      signature: SignatureInput
    }

    interface UploadCompetitionParticipantsCsvInput {
      competitionId: number
      file: Upload
      signature: SignatureInput
    }

    interface AddressProfileInput {
      address: string
    }

    interface AddressCurrentCompetitionInput {
      address: string
    }

    interface AddressCurrentCompetitionTransfersInput {
      address: string
      pagination: PaginationInput
    }

    interface AddressPastCompetitionsInput {
      address: string
      pagination: PaginationInput
    }

    interface AddressNameInput {
      address: string
    }

    interface ParticipantsCurrentEquitiesInput {
      competitionParticipantIds: Array<number>
      timestamp: string
    }

    interface SearchAddressesByNameInput {
      query: string
      pagination: PaginationInput
    }

    interface SearchAddressesInput {
      query: string
      pagination: PaginationInput
    }

    interface CompetitionEnrolledParticipantsNumberInput {
      competitionId: number
    }
  }
}
