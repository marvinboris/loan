import { body, query } from 'express-validator';

export const operationValidators = {
  getAccounts: [
    query('account').optional().isString(),
    query('email').optional().isEmail(),
    query('name').optional().isString(),
    query('status').optional().isString(),
    query('group').optional().isString(),
    query('workNum').optional().isString(),
    query('voiceCollection').optional().isIn(['true', 'false']),
    query('staffLvl').optional().isString(),
    query('collectionDistributionRules').optional().isString(),
    query('rulesApprovingDistribution').optional().isString(),
    query('role').optional().isString(),
  ],
  createAccount: [
    body('email').optional().isEmail(),
    body('account').optional().isString(),
    body('workNum').isString(),
    body('name').isString(),
    body('password').isLength({ min: 6 }),
    body('entryTime').optional().isISO8601(),
    body('group').optional().isString(),
    body('weights').optional().isInt(),
    body('loginSecurityVerification').optional().isBoolean(),
    body('role').isString(),
    body('voiceCollection').optional().isBoolean(),
    body('staffLvl').optional().isString(),
    body('collectionDistributionRules').optional().isString(),
    body('rulesApprovingDistribution').optional().isString(),
  ],
};
