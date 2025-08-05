import { SubmitInput } from './interfaces';
import { supabase } from '../../../../lib';
import { CreateKycInput, KycStatus } from '../../../../types';

export const kycService = {
  async submit(input: SubmitInput) {
    const {
      customerId,

      firstName,
      lastName,
      location,
      birthdate,
      emergencyNumber1,
      emergencyNumber2,
      frontPhoto,
      backPhoto,
      selfie,
    } = input;

    try {
      const { data: existing, error: existingError } = await supabase
        .from('kyc')
        .select('id')
        .eq('customer_id', customerId);

      if (existingError)
        return { success: false, message: 'Failed to check existing KYC' };

      const { error } = await (existing.length
        ? supabase
            .from('kyc')
            .update({
              first_name: firstName,
              last_name: lastName,
              location,
              birthdate,
              emergency_number_1: emergencyNumber1,
              emergency_number_2: emergencyNumber2,
              front_photo: frontPhoto,
              back_photo: backPhoto,
              selfie,
              status: KycStatus.PENDING,
            })
            .eq('customer_id', customerId)
        : supabase.from('kyc').insert({
            customer_id: customerId,
            first_name: firstName,
            last_name: lastName,
            location,
            birthdate,
            emergency_number_1: emergencyNumber1,
            emergency_number_2: emergencyNumber2,
            front_photo: frontPhoto,
            back_photo: backPhoto,
            selfie,
            status: KycStatus.PENDING,
          }));

      if (error)
        return { success: false, message: 'Failed to submit KYC application' };

      return {
        success: true,
        message: 'KYC application submitted successfully',
      };
    } catch (error) {
      console.error('Error in submit:', error);
      return {
        success: false,
        message: 'KYC application submission failed',
      };
    }
  },
};
