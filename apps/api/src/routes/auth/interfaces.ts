import { Customer } from '@creditwave/types';

export interface LoginInput {
  email: string;
  password: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  password: string;
  passwordConfirmation: string;
  token: string;
}

export interface ChangePasswordInput {
  oldPassword: string;
  password: string;
  userId: number;
}

export interface CustomerLoginInput {
  mobile: string;
}

export interface VerifyCodeInput {
  mobile: string;
  code: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    id: number;
    email: string;
  };
  customer?: CustomerWithAuthInfo; // Nouveau type retourné
}

export type CustomerWithAuthInfo = Pick<
  Customer,
  'id' | 'mobile' | 'name' | 'type' | 'user_label' | 'whether_apply'
>;
