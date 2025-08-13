export interface SubmitInput {
  customerId: number;

  firstName?: string;
  lastName: string;
  location: string;
  birthdate: string;
  emergencyNumber1: string;
  emergencyNumber1Name: string;
  emergencyNumber2?: string;
  emergencyNumber2Name?: string;
  frontPhoto: string;
  backPhoto: string;
  selfie: string;
}
