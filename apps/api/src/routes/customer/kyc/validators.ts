import { body } from 'express-validator';

export const submitValidator = [
  body('firstName').optional().isAlpha(),
  body('lastName').notEmpty().isString(),
  body('location').notEmpty().isString(),
  body('birthdate').notEmpty().isDate(),
  body('emergencyNumber1').notEmpty().isString(),
  body('emergencyNumber2').optional().isString(),
  body('frontPhoto').notEmpty().isBase64(),
  body('backPhoto').notEmpty().isBase64(),
  body('selfie').notEmpty().isBase64(),
];
