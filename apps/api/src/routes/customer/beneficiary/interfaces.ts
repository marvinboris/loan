export interface SubmitInput {
  account: string;
  provider: string;
  mobile: string;
  customerId: number;
}

export interface VerifyInput {
  mobile: string;
  account: string;
  code: string;
}
