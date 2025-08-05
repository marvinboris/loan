import { body } from 'express-validator';

export const submitValidator = [
  body('firstName').optional().isString(),
  body('lastName').notEmpty().isString(),
  body('location').notEmpty().isString(),
  body('birthdate').notEmpty().isDate(),
  body('emergencyNumber1').notEmpty().isString(),
  body('emergencyNumber2').optional().isString(),
];
