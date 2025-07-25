import { body } from 'express-validator';

export const submitValidator = [
  body('amount').isNumeric(),
  body('photo').isBase64(),
];
