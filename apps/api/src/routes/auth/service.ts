import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { config } from '../../config';
import { User } from '../../database/models/user';
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

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, message: 'Invalid credentials' };
    }

    // Generate JWT token
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

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    const resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now

    // Update user with reset token
    const [updated] = await User.update(
      {
        resetPasswordToken: resetToken,
        resetPasswordExpires,
      },
      {
        where: { email },
      }
    );

    if (updated === 0) {
      return {
        success: false,
        message: 'No account with that email address exists',
      };
    }

    // Send email with reset link
    const resetUrl = `${config.frontendUrl}/reset?token=${resetToken}`;
    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetUrl}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    });

    return { success: true, message: 'Password reset email sent' };
  },

  async resetPassword(input: ResetPasswordInput): Promise<AuthResponse> {
    const { password, token } = input;

    // Find user by reset token
    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Sequelize.Op.gt]: new Date() },
      },
    });

    if (!user) {
      return {
        success: false,
        message: 'Password reset token is invalid or has expired',
      };
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user password and clear reset token
    await user.update({
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null,
    });

    return { success: true, message: 'Password has been reset successfully' };
  },
};
