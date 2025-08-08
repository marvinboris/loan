import express from 'express';
import { AuthController } from './controller';
import {
  loginValidator,
  forgotPasswordValidator,
  resetPasswordValidator,
  customerLoginValidator,
  verifyCodeValidator,
  changePasswordValidator,
  adminChangePasswordValidator,
} from './validators';
import { authenticate, authorize } from '../../middlewares';

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
  '/change-password',
  authenticate,
  changePasswordValidator,
  authController.changePassword
);
authRouter.post(
  '/admin-change-password',
  authenticate,
  authorize('admin'),
  adminChangePasswordValidator,
  authController.adminChangePassword
);
authRouter.post(
  '/customer',
  customerLoginValidator,
  authController.customerLogin
);
authRouter.post('/verify', verifyCodeValidator, authController.verifyCode);

export { authRouter };
