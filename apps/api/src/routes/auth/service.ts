// routes/auth/service.ts
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { config } from '../../config';
import { supabase } from '../../lib/supabase';
import { sendEmail } from '../../utils';
import {
  LoginInput,
  ForgotPasswordInput,
  ResetPasswordInput,
  AuthResponse,
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
};
