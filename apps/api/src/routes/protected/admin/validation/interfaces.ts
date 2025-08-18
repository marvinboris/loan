export interface KycValidationInput {
  id: number;
  validated: boolean;
  reason?: string;
}

export interface BorrowValidationInput {
  id: number;
  validated: boolean;
  reason?: string;
}

export interface BorrowCancellationInput {
  id: number;
}
