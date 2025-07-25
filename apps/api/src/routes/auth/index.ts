import express from 'express';
import { AuthController } from './controller';
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  customerLoginValidator,
  verifyCodeValidator,
} from './validators';

const authController = new AuthController();

const authRouter = express.Router();
authRouter.post('/login', loginValidator, authController.login);
authRouter.post(
  '/forgot',
  forgotPasswordValidator,
  authController.forgotPassword
);
authRouter.post('/reset', resetPasswordValidator, authController.resetPassword);
authRouter.post(
  '/customer',
  customerLoginValidator,
  authController.customerLogin
);
authRouter.post('/verify', verifyCodeValidator, authController.verifyCode);

export { authRouter };
