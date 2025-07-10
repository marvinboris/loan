import express from 'express';
import { AuthController } from './controller';
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
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

export { authRouter };
