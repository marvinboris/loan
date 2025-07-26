import { body } from 'express-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { supabase } from '../../lib/supabase';

export const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

export const forgotPasswordValidator = [
  body('email')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail()
    .custom(async (email) => {
      const user = await supabase
        .from('users')
        .select('email')
        .eq('email', email);
      if (!user) {
        throw new Error('No account with that email address exists');
      }
      return true;
    }),
];

export const resetPasswordValidator = [
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('passwordConfirmation')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
  body('token').notEmpty().withMessage('Token is required'),
];

export const changePasswordValidator = [
  body('oldPassword')
    .notEmpty()
    .withMessage('Old password is required')
    .isLength({ min: 6 })
    .withMessage('Old password must be at least 6 characters long'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  body('passwordConfirmation')
    .notEmpty()
    .withMessage('Password confirmation is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
];

export const customerLoginValidator = [
  body('mobile')
    .notEmpty()
    .withMessage('The phone number is required')
    .custom(async (mobile) => {
      // Formatage du numéro pour la vérification (supprime les espaces, etc.)
      const formattedMobile = mobile.replace(/\s+/g, '');

      // Vérification du format international si nécessaire
      if (!isValidPhoneNumber(formattedMobile)) {
        throw new Error(
          'The number must be in international format (eg: +33612345678)'
        );
      }

      return true;
    }),
];

export const verifyCodeValidator = [
  body('mobile')
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone('any')
    .withMessage('Invalid phone number'),
  body('code')
    .notEmpty()
    .withMessage('Verification code is required')
    .isLength({ min: 6, max: 6 })
    .withMessage('The code must contain exactly 6 digits')
    .isNumeric()
    .withMessage('The code must only contain numbers')
    .custom(async (code, { req }) => {
      const { mobile } = req.body;

      // Vérification que le code correspond au mobile
      const { data: customer, error } = await supabase
        .from('customers')
        .select('verification_code, verification_code_expires')
        .eq('mobile', mobile)
        .single();

      if (error || !customer) {
        throw new Error('No account associated with this number');
      }

      if (+customer.verification_code !== +code) {
        throw new Error('Incorrect verification code');
      }

      if (new Date(customer.verification_code_expires) < new Date()) {
        throw new Error('The verification code has expired');
      }

      return true;
    }),
];
