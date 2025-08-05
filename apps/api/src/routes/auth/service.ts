// routes/auth/service.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { config } from '../../config';
import { supabase } from '../../lib';
import { Customer, CustomerType } from '../../types';
import { generateVerificationCode, sendEmail, sendWhatsapp } from '../../utils';
import {
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  CustomerLoginInput,
  VerifyCodeInput,
  AuthResponse,
  ChangePasswordInput,
} from './interfaces';

export const authService = {
  async login(input: LoginInput): Promise<AuthResponse> {
    const { email, password } = input;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (!user || error) {
      return { success: false, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      config.jwtSecret,
      { expiresIn: '1h' }
    );

    return {
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    };
  },

  async forgotPassword(input: ForgotPasswordInput): Promise<AuthResponse> {
    const { email } = input;
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000);

    const { error } = await supabase
      .from('users')
      .update({
        reset_password_token: resetToken,
        reset_password_expires: resetPasswordExpires.toISOString(),
      })
      .eq('email', email);

    if (error) {
      return {
        success: false,
        message: 'No account with that email address exists',
      };
    }

    const resetUrl = `${config.frontendUrl}/reset?token=${resetToken}`;
    // Implémenter sendEmail avec votre service d'email
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `Reset link: ${resetUrl}`,
    });

    return { success: true, message: 'Password reset email sent' };
  },

  async resetPassword(input: ResetPasswordInput): Promise<AuthResponse> {
    const { password, token } = input;

    const { data: user, error: findError } = await supabase
      .from('users')
      .select('*')
      .eq('reset_password_token', token)
      .gt('reset_password_expires', new Date().toISOString())
      .single();

    if (!user || findError) {
      return {
        success: false,
        message: 'Password reset token is invalid or has expired',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await supabase
      .from('users')
      .update({
        password: hashedPassword,
        reset_password_token: null,
        reset_password_expires: null,
      })
      .eq('id', user.id);

    return { success: true, message: 'Password has been reset successfully' };
  },

  async changePassword(input: ChangePasswordInput): Promise<AuthResponse> {
    const { oldPassword, password, userId } = input;

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch || error) {
      return { success: false, message: 'Invalid old password' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await supabase
      .from('users')
      .update({
        password: hashedPassword,
      })
      .eq('id', user.id);

    return { success: true, message: 'Password has been updated successfully' };
  },

  async customerLogin(input: CustomerLoginInput): Promise<AuthResponse> {
    const { mobile } = input;

    // Validation du numéro de mobile
    if (!mobile || !isValidPhoneNumber(mobile)) {
      return { success: false, message: 'Invalid phone number' };
    }

    // Génération du code de vérification
    const { verificationCode, codeExpiresAt } = generateVerificationCode();

    console.log(verificationCode);

    try {
      // Recherche du customer existant
      const { data: existingCustomer, error } = await supabase
        .from('customers')
        .select('*')
        .eq('mobile', mobile)
        .single();

      if (error && !existingCustomer) {
        // Création d'un nouveau customer si non trouvé
        const newCustomer: Omit<Customer, 'id' | 'created_at' | 'updated_at'> =
          {
            mobile,
            name: '', // Nom vide par défaut
            type: CustomerType.NEW,
            whether_apply: false,
            whether_assigned: false,
          };

        const { data: createdCustomer, error: createError } = await supabase
          .from('customers')
          .insert(newCustomer)
          .select()
          .single();

        if (createError || !createdCustomer) {
          throw new Error('Customer creation failed');
        }

        // Mise à jour du code de vérification
        await supabase
          .from('customers')
          .update({
            verification_code: +verificationCode,
            verification_code_expires: codeExpiresAt.toISOString(),
          })
          .eq('id', createdCustomer.id);
      } else {
        // Mise à jour du customer existant
        await supabase
          .from('customers')
          .update({
            verification_code: +verificationCode,
            verification_code_expires: codeExpiresAt.toISOString(),
          })
          .eq('id', existingCustomer.id);
      }

      // Envoi du code par WhatsApp
      const message = `Your verification code is : ${verificationCode}`;
      const whatsappSent = await sendWhatsapp(`whatsapp:${mobile}`, message);

      if (!whatsappSent) {
        return {
          success: false,
          message: 'WhatsApp message failed to send',
        };
      }

      return {
        success: true,
        message: 'Verification code sent on WhatsApp',
      };
    } catch (error) {
      console.error('Error in customerLogin:', error);
      return {
        success: false,
        message: 'Failed to send verification code',
      };
    }
  },

  async verifyCode(input: VerifyCodeInput): Promise<AuthResponse> {
    const { mobile, code } = input;

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

      // Génération du token JWT
      const token = jwt.sign(
        {
          customerId: customer.id,
          mobile: customer.mobile,
          type: customer.type,
        },
        config.jwtSecret,
        { expiresIn: '8h' } // Durée plus longue pour les customers
      );

      // Nettoyage du code de vérification
      await supabase
        .from('customers')
        .update({
          verification_code: null,
          verification_code_expires: null,
        })
        .eq('id', customer.id);

      return {
        success: true,
        token,
        customer: {
          id: customer.id,
          mobile: customer.mobile,
          name: customer.name,
          type: customer.type as CustomerType,
          user_label: customer.user_label,
          whether_apply: customer.whether_apply,
        },
      };
    } catch (error) {
      console.error('Error in verifyCode:', error);
      return {
        success: false,
        message: 'Code verification failed',
      };
    }
  },
};
