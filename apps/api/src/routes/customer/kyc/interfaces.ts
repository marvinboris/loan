export interface SubmitInput {
  customerId: number;

  firstName?: string;
  lastName: string;
  location: string;
  birthdate: string;
  emergencyNumber1: string;
  emergencyNumber2?: string;
  frontPhoto: string;
  backPhoto: string;
  selfie: string;
}
