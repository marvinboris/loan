import { UserRole, UserStatus } from '@creditwave/types';

export interface CreateAccountInput {
  email: string;
  account: string; // Alias pour email
  workNum: string;
  name: string;
  password: string;
  entryTime: string;
  group: string;
  weights: number;
  loginSecurityVerification: boolean;
  role: UserRole;
  voiceCollection: boolean;
  staffLvl: string;
  collectionDistributionRules: string;
  rulesApprovingDistribution: string;
}

export type EditAccountInput = Partial<CreateAccountInput> & {
  status?: UserStatus;
};
