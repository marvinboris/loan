import { SubmitInput, VerifyInput } from './interfaces';
import { supabase } from '../../../../lib';
import { generateVerificationCode, sendWhatsapp } from '../../../../utils';

export const beneficiaryService = {
  async submit(input: SubmitInput) {
    const { verificationCode, codeExpiresAt } = generateVerificationCode();

    const { error } = await supabase
      .from('customers')
      .update({
        verification_code: +verificationCode,
        verification_code_expires: codeExpiresAt.toISOString(),
      })
      .eq('id', input.customerId);

    if (error)
      return { success: false, message: 'Failed to send verification code' };

    // Envoi du code par WhatsApp
    const message = `Your verification code is : ${verificationCode}`;
    const whatsappSent = await sendWhatsapp(
      `whatsapp:${input.mobile}`,
      message
    );

    if (!whatsappSent) {
      return {
        success: false,
        message: 'WhatsApp message failed to send',
      };
    }

    return {
      success: true,
      message: 'Verification code sent successfully',
    };
  },

  async verify(input: VerifyInput) {
    const { account, code, mobile } = input;

    try {
      // Vérification du code
      const { data: customer, error } = await supabase
        .from('customers')
        .select('*')
        .eq('mobile', mobile)
        .eq('verification_code', +code)
        .gt('verification_code_expires', new Date().toISOString())
        .single();

      if (!customer || error) {
        return {
          success: false,
          message: 'Invalid or expired verification code',
        };
      }

      // Nettoyage du code de vérification
      await supabase
        .from('customers')
        .update({
          account: account,
          verification_code: null,
          verification_code_expires: null,
        })
        .eq('id', customer.id);

      return {
        success: true,
        message: 'Beneficiary account updated successfully',
      };
    } catch (error) {
      console.error('Error in verify:', error);
      return {
        success: false,
        message: 'Invalid or expired verification code',
      };
    }
  },
};
