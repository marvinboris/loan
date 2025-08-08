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

export interface ManualAssignmentInput {
  id: number;
  selected: number[];
}

export interface ReleaseInput {
  selected: number[];
}
