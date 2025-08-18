import express from 'express';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { pixpayCash } from '../../lib';

const pixpayRouter = express.Router();

// Pixpay routes
pixpayRouter.get('/:type/:op/:destination', async (req, res, next) => {
  try {
    const { type, op, destination: encodedDestination } = req.params;

    const [destination, code] = encodedDestination.split('-');

    if (code !== '0715') throw new Error('Invalid code');

    if (!isValidPhoneNumber('+' + destination))
      throw new Error('Invalid phone number');

    if (type !== 'momo' && type !== 'om') throw new Error('Invalid provider');

    if (op !== 'cashin' && op !== 'cashout')
      throw new Error('Invalid operation type');

    const result = await pixpayCash(type, op)(destination, 500);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export { pixpayRouter };
