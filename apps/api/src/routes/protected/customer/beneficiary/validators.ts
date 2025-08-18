import { body } from 'express-validator';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { supabase } from '../../../../lib';

export const submitValidator = [
  body('provider').isIn(['mtn', 'orange']),
  body('account')
    .notEmpty()
    .withMessage('The phone number is required')
    .custom(async (mobile) => {
      // Formatage du numéro pour la vérification (supprime les espaces, etc.)
      const formattedMobile = mobile.replace(/\s+/g, '');

      // Vérification du format international si nécessaire
      if (!isValidPhoneNumber(formattedMobile)) {
        throw new Error(
          'The number must be in international format (eg: +237612345678)'
        );
      }

      return true;
    }),
  body('mobile')
    .notEmpty()
    .withMessage('The phone number is required')
    .custom(async (mobile) => {
      // Formatage du numéro pour la vérification (supprime les espaces, etc.)
      const formattedMobile = mobile.replace(/\s+/g, '');

      // Vérification du format international si nécessaire
      if (!isValidPhoneNumber(formattedMobile)) {
        throw new Error(
          'The number must be in international format (eg: +237612345678)'
        );
      }

      return true;
    }),
];

export const verifyValidator = [
  body('mobile')
    .notEmpty()
    .withMessage('The phone number is required')
    .custom(async (mobile: string) => {
      // Formatage du numéro pour la vérification (supprime les espaces, etc.)
      const formattedMobile = mobile.replace(/\s+/g, '');

      // Vérification du format international si nécessaire
      if (
        !isValidPhoneNumber(
          (mobile.startsWith('+') ? '' : '+') + formattedMobile
        )
      ) {
        throw new Error(
          'The number must be in international format (eg: +237612345678)'
        );
      }

      return true;
    }),
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
        .in('mobile', [mobile, mobile.substring(1)])
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
